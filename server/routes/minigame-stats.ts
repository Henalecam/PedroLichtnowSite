import { db } from "../db";
import { 
  minigameParticipations, 
  minigameStatistics, 
  campaignStatistics,
  type NewMinigameParticipation 
} from "../db/schema";
import { eq, and, sql, desc } from "drizzle-orm";

export class MinigameStatsService {
  /**
   * Records a new minigame participation and updates all related statistics
   */
  static async recordParticipation(data: {
    userId: string;
    minigameId: string;
    campaignId: string;
    score: number;
    numbers: number[];
    playDuration?: number;
    metadata?: Record<string, any>;
  }) {
    // 1. Insert the participation record
    const [participation] = await db.insert(minigameParticipations).values({
      userId: data.userId,
      minigameId: data.minigameId,
      campaignId: data.campaignId,
      score: data.score,
      numbers: data.numbers,
      playDuration: data.playDuration,
      metadata: data.metadata || {},
    }).returning();

    // 2. Update user statistics
    await this.updateUserStatistics(data);

    // 3. Update campaign statistics
    await this.updateCampaignStatistics(data);

    return participation;
  }

  /**
   * Updates user-specific minigame statistics
   */
  private static async updateUserStatistics(data: {
    userId: string;
    minigameId: string;
    campaignId: string;
    score: number;
    numbers: number[];
    playDuration?: number;
  }) {
    // Get existing statistics or create new
    const [existingStats] = await db
      .select()
      .from(minigameStatistics)
      .where(
        and(
          eq(minigameStatistics.userId, data.userId),
          eq(minigameStatistics.minigameId, data.minigameId)
        )
      );

    if (!existingStats) {
      // Create new statistics record
      await db.insert(minigameStatistics).values({
        userId: data.userId,
        minigameId: data.minigameId,
        campaignId: data.campaignId,
        totalPlays: 1,
        totalScore: data.score,
        averageScore: data.score.toString(),
        highestNumber: Math.max(...data.numbers),
        lowestNumber: Math.min(...data.numbers),
        mostFrequentNumber: data.numbers[0], // Will be updated properly below
        luckyNumbers: data.numbers.slice(0, 5),
        allNumbersPlayed: this.createNumberFrequencyMap(data.numbers),
        bestScore: data.score,
        worstScore: data.score,
        currentStreak: 1,
        bestStreak: 1,
        lastPlayedAt: new Date(),
        totalPlayTime: data.playDuration || 0,
        averagePlayTime: (data.playDuration || 0).toString(),
      });
    } else {
      // Update existing statistics
      const updatedNumbersPlayed = this.updateNumberFrequencyMap(
        existingStats.allNumbersPlayed as Record<number, number>,
        data.numbers
      );
      
      const totalPlays = existingStats.totalPlays + 1;
      const totalScore = existingStats.totalScore + data.score;
      const averageScore = (totalScore / totalPlays).toFixed(2);
      
      const totalPlayTime = existingStats.totalPlayTime + (data.playDuration || 0);
      const averagePlayTime = data.playDuration 
        ? (totalPlayTime / totalPlays).toFixed(2)
        : existingStats.averagePlayTime;

      // Calculate most frequent number and lucky numbers
      const { mostFrequent, luckyNumbers } = this.calculateNumberStats(updatedNumbersPlayed);

      // Update streak
      const hoursSinceLastPlay = existingStats.lastPlayedAt 
        ? (new Date().getTime() - new Date(existingStats.lastPlayedAt).getTime()) / (1000 * 60 * 60)
        : 24;
      
      const currentStreak = hoursSinceLastPlay <= 24 
        ? existingStats.currentStreak + 1 
        : 1;
      
      const bestStreak = Math.max(currentStreak, existingStats.bestStreak);

      await db
        .update(minigameStatistics)
        .set({
          totalPlays,
          totalScore,
          averageScore,
          highestNumber: Math.max(existingStats.highestNumber || 0, ...data.numbers),
          lowestNumber: Math.min(existingStats.lowestNumber || 999999, ...data.numbers),
          mostFrequentNumber: mostFrequent,
          luckyNumbers,
          allNumbersPlayed: updatedNumbersPlayed,
          bestScore: Math.max(existingStats.bestScore, data.score),
          worstScore: Math.min(existingStats.worstScore || 999999, data.score),
          currentStreak,
          bestStreak,
          lastPlayedAt: new Date(),
          totalPlayTime,
          averagePlayTime,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(minigameStatistics.userId, data.userId),
            eq(minigameStatistics.minigameId, data.minigameId)
          )
        );
    }
  }

  /**
   * Updates campaign-wide statistics
   */
  private static async updateCampaignStatistics(data: {
    campaignId: string;
    minigameId: string;
    score: number;
    numbers: number[];
    userId: string;
  }) {
    const [existingStats] = await db
      .select()
      .from(campaignStatistics)
      .where(
        and(
          eq(campaignStatistics.campaignId, data.campaignId),
          eq(campaignStatistics.minigameId, data.minigameId)
        )
      );

    if (!existingStats) {
      // Create new campaign statistics
      await db.insert(campaignStatistics).values({
        campaignId: data.campaignId,
        minigameId: data.minigameId,
        totalParticipants: 1,
        totalPlays: 1,
        globalMostPlayedNumber: data.numbers[0],
        globalLeastPlayedNumber: data.numbers[0],
        numberDistribution: this.createNumberFrequencyMap(data.numbers),
        globalBestScore: data.score,
        globalBestUserId: data.userId,
        averageScoreAllUsers: data.score.toString(),
        lastUpdatedAt: new Date(),
      });
    } else {
      // Update existing statistics
      const updatedDistribution = this.updateNumberFrequencyMap(
        existingStats.numberDistribution as Record<number, number>,
        data.numbers
      );

      const { mostPlayed, leastPlayed } = this.findMostAndLeastPlayedNumbers(updatedDistribution);

      // Check if this is a new participant
      const participantCount = await db
        .selectDistinct({ userId: minigameParticipations.userId })
        .from(minigameParticipations)
        .where(
          and(
            eq(minigameParticipations.campaignId, data.campaignId),
            eq(minigameParticipations.minigameId, data.minigameId)
          )
        );

      const totalPlays = existingStats.totalPlays + 1;
      
      // Calculate new average
      const allScores = await db
        .select({ score: minigameParticipations.score })
        .from(minigameParticipations)
        .where(
          and(
            eq(minigameParticipations.campaignId, data.campaignId),
            eq(minigameParticipations.minigameId, data.minigameId)
          )
        );

      const averageScore = (
        allScores.reduce((sum, record) => sum + record.score, 0) / allScores.length
      ).toFixed(2);

      await db
        .update(campaignStatistics)
        .set({
          totalParticipants: participantCount.length,
          totalPlays,
          globalMostPlayedNumber: mostPlayed,
          globalLeastPlayedNumber: leastPlayed,
          numberDistribution: updatedDistribution,
          globalBestScore: data.score > existingStats.globalBestScore 
            ? data.score 
            : existingStats.globalBestScore,
          globalBestUserId: data.score > existingStats.globalBestScore 
            ? data.userId 
            : existingStats.globalBestUserId,
          averageScoreAllUsers: averageScore,
          lastUpdatedAt: new Date(),
        })
        .where(
          and(
            eq(campaignStatistics.campaignId, data.campaignId),
            eq(campaignStatistics.minigameId, data.minigameId)
          )
        );
    }
  }

  /**
   * Helper: Creates a frequency map from an array of numbers
   */
  private static createNumberFrequencyMap(numbers: number[]): Record<number, number> {
    return numbers.reduce((map, num) => {
      map[num] = (map[num] || 0) + 1;
      return map;
    }, {} as Record<number, number>);
  }

  /**
   * Helper: Updates an existing frequency map with new numbers
   */
  private static updateNumberFrequencyMap(
    existing: Record<number, number>,
    newNumbers: number[]
  ): Record<number, number> {
    const updated = { ...existing };
    newNumbers.forEach(num => {
      updated[num] = (updated[num] || 0) + 1;
    });
    return updated;
  }

  /**
   * Helper: Calculates most frequent number and top 5 lucky numbers
   */
  private static calculateNumberStats(frequencyMap: Record<number, number>) {
    const entries = Object.entries(frequencyMap)
      .map(([num, count]) => ({ number: parseInt(num), count }))
      .sort((a, b) => b.count - a.count);

    const mostFrequent = entries[0]?.number || 0;
    const luckyNumbers = entries.slice(0, 5).map(e => e.number);

    return { mostFrequent, luckyNumbers };
  }

  /**
   * Helper: Finds most and least played numbers from distribution
   */
  private static findMostAndLeastPlayedNumbers(distribution: Record<number, number>) {
    const entries = Object.entries(distribution)
      .map(([num, count]) => ({ number: parseInt(num), count }))
      .sort((a, b) => b.count - a.count);

    const mostPlayed = entries[0]?.number || 0;
    const leastPlayed = entries[entries.length - 1]?.number || 0;

    return { mostPlayed, leastPlayed };
  }

  /**
   * Get user statistics for a specific minigame
   */
  static async getUserStats(userId: string, minigameId: string) {
    const [stats] = await db
      .select()
      .from(minigameStatistics)
      .where(
        and(
          eq(minigameStatistics.userId, userId),
          eq(minigameStatistics.minigameId, minigameId)
        )
      );

    return stats;
  }

  /**
   * Get campaign statistics
   */
  static async getCampaignStats(campaignId: string, minigameId?: string) {
    const conditions = [eq(campaignStatistics.campaignId, campaignId)];
    
    if (minigameId) {
      conditions.push(eq(campaignStatistics.minigameId, minigameId));
    }

    const stats = await db
      .select()
      .from(campaignStatistics)
      .where(and(...conditions));

    return stats;
  }

  /**
   * Get leaderboard for a minigame
   */
  static async getLeaderboard(minigameId: string, limit = 10) {
    const leaderboard = await db
      .select({
        userId: minigameStatistics.userId,
        bestScore: minigameStatistics.bestScore,
        totalPlays: minigameStatistics.totalPlays,
        averageScore: minigameStatistics.averageScore,
        currentStreak: minigameStatistics.currentStreak,
      })
      .from(minigameStatistics)
      .where(eq(minigameStatistics.minigameId, minigameId))
      .orderBy(desc(minigameStatistics.bestScore))
      .limit(limit);

    return leaderboard;
  }
}