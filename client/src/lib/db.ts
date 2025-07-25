import initSqlJs from 'sql.js';

let db: any = null;

interface BlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export async function initDatabase() {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  // Try to load existing database from localStorage
  const dbData = localStorage.getItem('blogDatabase');
  if (dbData) {
    const buf = Uint8Array.from(atob(dbData), c => c.charCodeAt(0));
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
    
    // Create posts table
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        slug TEXT UNIQUE NOT NULL,
        image TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        published INTEGER DEFAULT 0
      )
    `);
    
    saveDatabase();
  }

  return db;
}

function saveDatabase() {
  if (!db) return;
  
  const data = db.export();
  const buffer = new Uint8Array(data);
  const binary = Array.from(buffer).map(byte => String.fromCharCode(byte)).join('');
  localStorage.setItem('blogDatabase', btoa(binary));
}

export async function getAllPosts(publishedOnly = false): Promise<BlogPost[]> {
  await initDatabase();
  
  const query = publishedOnly 
    ? "SELECT * FROM posts WHERE published = 1 ORDER BY createdAt DESC"
    : "SELECT * FROM posts ORDER BY createdAt DESC";
    
  const stmt = db.prepare(query);
  const posts: BlogPost[] = [];
  
  while (stmt.step()) {
    const row = stmt.getAsObject();
    posts.push({
      ...row,
      published: Boolean(row.published)
    } as BlogPost);
  }
  
  stmt.free();
  return posts;
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  await initDatabase();
  
  const stmt = db.prepare("SELECT * FROM posts WHERE id = ?");
  stmt.bind([id]);
  
  if (stmt.step()) {
    const post = stmt.getAsObject() as BlogPost;
    stmt.free();
    return {
      ...post,
      published: Boolean(post.published)
    };
  }
  
  stmt.free();
  return null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await initDatabase();
  
  const stmt = db.prepare("SELECT * FROM posts WHERE slug = ?");
  stmt.bind([slug]);
  
  if (stmt.step()) {
    const post = stmt.getAsObject() as BlogPost;
    stmt.free();
    return {
      ...post,
      published: Boolean(post.published)
    };
  }
  
  stmt.free();
  return null;
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
  await initDatabase();
  
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO posts (title, content, excerpt, slug, image, createdAt, updatedAt, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.bind([
    post.title,
    post.content,
    post.excerpt,
    post.slug,
    post.image || null,
    now,
    now,
    post.published ? 1 : 0
  ]);
  
  stmt.step();
  stmt.free();
  
  saveDatabase();
  
  return db.exec("SELECT last_insert_rowid()")[0].values[0][0] as number;
}

export async function updatePost(id: number, post: Partial<BlogPost>): Promise<void> {
  await initDatabase();
  
  const updates: string[] = [];
  const values: any[] = [];
  
  if (post.title !== undefined) {
    updates.push("title = ?");
    values.push(post.title);
  }
  
  if (post.content !== undefined) {
    updates.push("content = ?");
    values.push(post.content);
  }
  
  if (post.excerpt !== undefined) {
    updates.push("excerpt = ?");
    values.push(post.excerpt);
  }
  
  if (post.slug !== undefined) {
    updates.push("slug = ?");
    values.push(post.slug);
  }
  
  if (post.image !== undefined) {
    updates.push("image = ?");
    values.push(post.image);
  }
  
  if (post.published !== undefined) {
    updates.push("published = ?");
    values.push(post.published ? 1 : 0);
  }
  
  updates.push("updatedAt = ?");
  values.push(new Date().toISOString());
  
  values.push(id);
  
  const stmt = db.prepare(`UPDATE posts SET ${updates.join(", ")} WHERE id = ?`);
  stmt.bind(values);
  stmt.step();
  stmt.free();
  
  saveDatabase();
}

export async function deletePost(id: number): Promise<void> {
  await initDatabase();
  
  const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.free();
  
  saveDatabase();
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[àáäâãåăą]/g, 'a')
    .replace(/[èéëêěę]/g, 'e')
    .replace(/[ìíïîį]/g, 'i')
    .replace(/[òóöôõøő]/g, 'o')
    .replace(/[ùúüûůű]/g, 'u')
    .replace(/[çćč]/g, 'c')
    .replace(/[ñń]/g, 'n')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}