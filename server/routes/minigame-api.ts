import { Router } from "express";
import { db } from "../db";
import { minigames, minigameParticipations, minigameStatistics, users, campaignStatistics } from "../db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { MinigameStatsService } from "./minigame-stats";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Record a new minigame participation
router.post("/participations", authMiddleware, async (req, res) => {
  try {
    const { minigameId, campaignId, score, numbers, playDuration, metadata } = req.body;
    const userId = req.user!.id;

    if (!minigameId || !campaignId || score === undefined || !numbers || !Array.isArray(numbers)) {
      return res.status(400).json({ 
        error: "Missing required fields: minigameId, campaignId, score, numbers (array)" 
      });
    }

    // Record participation and update statistics
    const participation = await MinigameStatsService.recordParticipation({
      userId,
      minigameId,
      campaignId,
      score,
      numbers,
      playDuration,
      metadata,
    });

    res.json({
      success: true,
      participation,
      message: "Participation recorded successfully",
    });
  } catch (error) {
    console.error("Error recording participation:", error);
    res.status(500).json({ error: "Failed to record participation" });
  }
});

// Get user statistics for a minigame
router.get("/stats/user/:minigameId", authMiddleware, async (req, res) => {
  try {
    const { minigameId } = req.params;
    const userId = req.user!.id;

    const stats = await MinigameStatsService.getUserStats(userId, minigameId);

    if (!stats) {
      return res.json({
        hasPlayed: false,
        message: "No statistics found for this user and minigame",
      });
    }

    res.json({
      hasPlayed: true,
      stats: {
        totalPlays: stats.totalPlays,
        bestScore: stats.bestScore,
        averageScore: parseFloat(stats.averageScore),
        currentStreak: stats.currentStreak,
        bestStreak: stats.bestStreak,
        lastPlayedAt: stats.lastPlayedAt,
        highestNumber: stats.highestNumber,
        lowestNumber: stats.lowestNumber,
        mostFrequentNumber: stats.mostFrequentNumber,
        luckyNumbers: stats.luckyNumbers,
        totalPlayTime: stats.totalPlayTime,
        averagePlayTime: parseFloat(stats.averagePlayTime),
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Failed to fetch user statistics" });
  }
});

// Get campaign statistics
router.get("/stats/campaign/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { minigameId } = req.query;

    const stats = await MinigameStatsService.getCampaignStats(
      campaignId, 
      minigameId as string | undefined
    );

    res.json({
      campaignId,
      minigameId: minigameId || "all",
      statistics: stats.map(stat => ({
        minigameId: stat.minigameId,
        totalParticipants: stat.totalParticipants,
        totalPlays: stat.totalPlays,
        globalMostPlayedNumber: stat.globalMostPlayedNumber,
        globalLeastPlayedNumber: stat.globalLeastPlayedNumber,
        globalBestScore: stat.globalBestScore,
        averageScoreAllUsers: parseFloat(stat.averageScoreAllUsers),
        lastUpdatedAt: stat.lastUpdatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching campaign stats:", error);
    res.status(500).json({ error: "Failed to fetch campaign statistics" });
  }
});

// Get leaderboard for a minigame
router.get("/leaderboard/:minigameId", async (req, res) => {
  try {
    const { minigameId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const leaderboard = await MinigameStatsService.getLeaderboard(minigameId, limit);

    // Fetch user details
    const userIds = leaderboard.map(entry => entry.userId);
    const userDetails = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(sql`${users.id} = ANY(${userIds})`);

    const userMap = new Map(userDetails.map(user => [user.id, user]));

    const enrichedLeaderboard = leaderboard.map((entry, index) => {
      const user = userMap.get(entry.userId);
      return {
        rank: index + 1,
        userId: entry.userId,
        userName: user?.name || "Unknown Player",
        bestScore: entry.bestScore,
        totalPlays: entry.totalPlays,
        averageScore: parseFloat(entry.averageScore),
        currentStreak: entry.currentStreak,
      };
    });

    res.json({
      minigameId,
      leaderboard: enrichedLeaderboard,
      totalEntries: leaderboard.length,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Get user's recent participations
router.get("/participations/recent", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const limit = parseInt(req.query.limit as string) || 10;

    const recentPlays = await db
      .select({
        id: minigameParticipations.id,
        minigameId: minigameParticipations.minigameId,
        campaignId: minigameParticipations.campaignId,
        score: minigameParticipations.score,
        numbers: minigameParticipations.numbers,
        playDuration: minigameParticipations.playDuration,
        createdAt: minigameParticipations.createdAt,
      })
      .from(minigameParticipations)
      .where(eq(minigameParticipations.userId, userId))
      .orderBy(desc(minigameParticipations.createdAt))
      .limit(limit);

    res.json({
      userId,
      recentParticipations: recentPlays,
      count: recentPlays.length,
    });
  } catch (error) {
    console.error("Error fetching recent participations:", error);
    res.status(500).json({ error: "Failed to fetch recent participations" });
  }
});

// Get number distribution for a campaign
router.get("/stats/numbers/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { minigameId } = req.query;

    const conditions = [eq(campaignStatistics.campaignId, campaignId)];
    if (minigameId) {
      conditions.push(eq(campaignStatistics.minigameId, minigameId as string));
    }

    const [stats] = await db
      .select({
        numberDistribution: campaignStatistics.numberDistribution,
        globalMostPlayedNumber: campaignStatistics.globalMostPlayedNumber,
        globalLeastPlayedNumber: campaignStatistics.globalLeastPlayedNumber,
      })
      .from(campaignStatistics)
      .where(and(...conditions));

    if (!stats) {
      return res.json({
        message: "No number statistics found for this campaign",
        numberDistribution: {},
      });
    }

    // Convert distribution to sorted array
    const distribution = stats.numberDistribution as Record<number, number>;
    const sortedNumbers = Object.entries(distribution)
      .map(([num, count]) => ({ number: parseInt(num), count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      campaignId,
      minigameId: minigameId || "all",
      mostPlayedNumber: stats.globalMostPlayedNumber,
      leastPlayedNumber: stats.globalLeastPlayedNumber,
      numberDistribution: sortedNumbers,
      totalNumbers: sortedNumbers.length,
    });
  } catch (error) {
    console.error("Error fetching number distribution:", error);
    res.status(500).json({ error: "Failed to fetch number distribution" });
  }
});

export default router;