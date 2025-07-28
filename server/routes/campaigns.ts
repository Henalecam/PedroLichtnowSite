import { Router } from "express";
import { db } from "../db";
import { campaigns, minigames, userPurchases, users } from "../db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin?: boolean;
  };
}

// Middleware de autenticação admin
const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", async (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ 
        error: "Forbidden",
        message: "Forbidden resource",
        statusCode: 403,
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path
      });
    }

    // Verificar se o usuário é admin
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, decoded.id),
      });

      if (!user || !user.isAdmin) {
        return res.status(403).json({ 
          error: "Forbidden",
          message: "Forbidden resource",
          statusCode: 403,
          timestamp: new Date().toISOString(),
          method: req.method,
          path: req.path
        });
      }

      req.user = { ...decoded, isAdmin: true };
      next();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao verificar permissões" });
    }
  });
};

// Rotas de campanhas
router.get("/campaigns", async (req, res) => {
  try {
    const allCampaigns = await db.query.campaigns.findMany({
      orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
    });
    res.json(allCampaigns);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar campanhas" });
  }
});

router.get("/campaigns/:id", async (req, res) => {
  try {
    const campaign = await db.query.campaigns.findFirst({
      where: eq(campaigns.id, req.params.id),
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar campanha" });
  }
});

// Rotas de minigames
router.get("/minigames/campaign/:campaignId", authenticateAdmin, async (req, res) => {
  try {
    const campaignMinigames = await db.query.minigames.findMany({
      where: eq(minigames.campaignId, req.params.campaignId),
      orderBy: (minigames, { desc }) => [desc(minigames.createdAt)],
    });
    res.json(campaignMinigames);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar minigames" });
  }
});

// Ranking de top compradores
router.get("/campaigns/:campaignId/top-buyers", async (req, res) => {
  try {
    const { campaignId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    // Buscar top compradores usando SQL raw para agregação
    const topBuyers = await db
      .select({
        userId: userPurchases.userId,
        totalAmount: sql<string>`SUM(CAST(${userPurchases.amount} AS DECIMAL))`.as('total_amount'),
        purchaseCount: sql<number>`COUNT(*)`.as('purchase_count'),
        userName: users.name,
        userEmail: users.email,
      })
      .from(userPurchases)
      .leftJoin(users, eq(userPurchases.userId, users.id))
      .where(eq(userPurchases.campaignId, campaignId))
      .groupBy(userPurchases.userId, users.name, users.email)
      .orderBy(desc(sql`total_amount`))
      .limit(limit);

    // Formatar a resposta
    const formattedBuyers = topBuyers.map((buyer, index) => ({
      rank: index + 1,
      userId: buyer.userId,
      userName: buyer.userName,
      userEmail: buyer.userEmail,
      totalAmount: parseFloat(buyer.totalAmount || '0').toFixed(2),
      purchaseCount: buyer.purchaseCount,
    }));

    res.json({
      campaignId,
      topBuyers: formattedBuyers,
      totalCount: formattedBuyers.length,
    });
  } catch (error) {
    console.error("Erro ao buscar top compradores:", error);
    res.status(500).json({ error: "Erro ao buscar ranking de compradores" });
  }
});

// Criar campanha (admin)
router.post("/campaigns", authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { name, description, startDate, endDate, isActive } = req.body;

    const newCampaign = await db.insert(campaigns).values({
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isActive: isActive ?? true,
    }).returning();

    res.status(201).json(newCampaign[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar campanha" });
  }
});

// Criar minigame (admin)
router.post("/minigames", authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { campaignId, name, description, type, config, isActive } = req.body;

    const newMinigame = await db.insert(minigames).values({
      campaignId,
      name,
      description,
      type,
      config: JSON.stringify(config),
      isActive: isActive ?? true,
    }).returning();

    res.status(201).json(newMinigame[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar minigame" });
  }
});

// Registrar compra
router.post("/purchases", authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { userId, campaignId, amount } = req.body;

    const newPurchase = await db.insert(userPurchases).values({
      userId,
      campaignId,
      amount: amount.toString(),
    }).returning();

    res.status(201).json(newPurchase[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar compra" });
  }
});

export default router;