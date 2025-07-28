import { db } from "../db";
import { campaigns, users, userPurchases, minigames } from "../db/schema";
import bcrypt from "bcrypt";

async function seedCampaigns() {
  console.log("Starting to seed campaigns data...");

  try {
    // Criar usuário admin se não existir
    const adminEmail = "admin@example.com";
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, adminEmail),
    });

    let adminId: string;
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const [newAdmin] = await db.insert(users).values({
        email: adminEmail,
        password: hashedPassword,
        name: "Administrator",
        isAdmin: true,
      }).returning();
      adminId = newAdmin.id;
      console.log("Admin user created");
    } else {
      adminId = existingAdmin.id;
      // Atualizar usuário existente para ser admin
      await db.update(users)
        .set({ isAdmin: true })
        .where((users, { eq }) => eq(users.id, adminId));
      console.log("Admin user updated");
    }

    // Criar usuários de teste
    const testUsers = [];
    for (let i = 1; i <= 10; i++) {
      const email = `user${i}@example.com`;
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash("password123", 10);
        const [newUser] = await db.insert(users).values({
          email,
          password: hashedPassword,
          name: `Usuário ${i}`,
          isAdmin: false,
        }).returning();
        testUsers.push(newUser);
      } else {
        testUsers.push(existingUser);
      }
    }
    console.log(`${testUsers.length} test users created/found`);

    // Criar campanha de teste
    const campaignId = "f0956192-801d-4f8f-858f-41f017e61a98";
    const existingCampaign = await db.query.campaigns.findFirst({
      where: (campaigns, { eq }) => eq(campaigns.id, campaignId),
    });

    if (!existingCampaign) {
      await db.insert(campaigns).values({
        id: campaignId,
        name: "Campanha de Natal 2025",
        description: "Promoções especiais de fim de ano com jogos e prêmios",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
        isActive: true,
      });
      console.log("Test campaign created");
    }

    // Criar minigame de teste
    const existingMinigame = await db.query.minigames.findFirst({
      where: (minigames, { eq }) => eq(minigames.campaignId, campaignId),
    });

    if (!existingMinigame) {
      await db.insert(minigames).values({
        campaignId,
        name: "Quiz de Natal",
        description: "Teste seus conhecimentos sobre o Natal",
        type: "quiz",
        config: JSON.stringify({
          questions: [
            {
              question: "Qual é a cor tradicional do Natal?",
              options: ["Vermelho", "Azul", "Verde", "Amarelo"],
              correct: 0
            }
          ]
        }),
        isActive: true,
      });
      console.log("Test minigame created");
    }

    // Criar compras de teste para os usuários
    for (const user of testUsers) {
      // Gerar entre 1 e 5 compras por usuário
      const numPurchases = Math.floor(Math.random() * 5) + 1;
      
      for (let i = 0; i < numPurchases; i++) {
        const amount = (Math.random() * 500 + 50).toFixed(2); // Entre 50 e 550
        await db.insert(userPurchases).values({
          userId: user.id,
          campaignId,
          amount,
          purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Últimos 30 dias
        });
      }
    }
    console.log("Test purchases created");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

// Execute seeding
seedCampaigns().catch(console.error);