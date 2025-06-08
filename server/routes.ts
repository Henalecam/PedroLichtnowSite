import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Router } from "express";
import { db } from "./db";
import { posts, users } from "./db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
});

// Middleware de autenticação
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = user;
    next();
  });
};

// Autenticação
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

// Posts
router.get("/posts", async (req, res) => {
  try {
    const allPosts = await db.query.posts.findMany({
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, req.params.id),
      with: {
        author: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar post" });
  }
});

router.post("/posts", authenticateToken, async (req, res) => {
  const { title, slug, content, excerpt, status, featuredImage } = req.body;

  try {
    const post = await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt,
      status,
      featuredImage,
      authorId: req.user.id,
      publishedAt: status === "published" ? new Date() : null,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar post" });
  }
});

router.put("/posts/:id", authenticateToken, async (req, res) => {
  const { title, slug, content, excerpt, status, featuredImage } = req.body;

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, req.params.id),
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ error: "Não autorizado" });
    }

    const updatedPost = await db
      .update(posts)
      .set({
        title,
        slug,
        content,
        excerpt,
        status,
        featuredImage,
        updatedAt: new Date(),
        publishedAt: status === "published" && post.status !== "published" ? new Date() : post.publishedAt,
      })
      .where(eq(posts.id, req.params.id));

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar post" });
  }
});

router.delete("/posts/:id", authenticateToken, async (req, res) => {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, req.params.id),
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ error: "Não autorizado" });
    }

    await db.delete(posts).where(eq(posts.id, req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir post" });
  }
});

// Upload de imagens
router.post("/upload", authenticateToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhuma imagem enviada" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

export default router;
