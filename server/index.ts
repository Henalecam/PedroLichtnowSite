import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { posts, users } from "./db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware de autenticação
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = user;
    next();
  });
};

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Rotas de autenticação
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Rotas de posts
  app.get("/api/posts", async (req, res) => {
    try {
      const allPosts = await db.query.posts.findMany({
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      });
      res.json(allPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await db.query.posts.findFirst({
        where: eq(posts.id, req.params.id),
      });

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      res.json(post);
    } catch (error) {
      console.error("Erro ao buscar post:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.post("/api/posts", authenticateToken, async (req, res) => {
    try {
      const { title, slug, content, excerpt, status, featuredImage } = req.body;

      const newPost = await db.insert(posts).values({
        title,
        slug,
        content,
        excerpt,
        status,
        featuredImage,
      }).returning();

      res.status(201).json(newPost[0]);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.put("/api/posts/:id", authenticateToken, async (req, res) => {
    try {
      const { title, slug, content, excerpt, status, featuredImage } = req.body;

      const updatedPost = await db.update(posts)
        .set({
          title,
          slug,
          content,
          excerpt,
          status,
          featuredImage,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, req.params.id))
        .returning();

      if (!updatedPost.length) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      res.json(updatedPost[0]);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.delete("/api/posts/:id", authenticateToken, async (req, res) => {
    try {
      const deletedPost = await db.delete(posts)
        .where(eq(posts.id, req.params.id))
        .returning();

      if (!deletedPost.length) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      res.json({ message: "Post excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Rota de upload de imagens
  app.post("/api/upload", authenticateToken, upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem enviada" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
