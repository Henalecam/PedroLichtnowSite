import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcrypt";

async function createAdmin() {
  const email = "admin@pedrolichtnow.com";
  const password = "admin123"; // Você deve mudar isso em produção
  const name = "Admin";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });

    console.log("Usuário admin criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error);
  } finally {
    process.exit();
  }
}

createAdmin(); 