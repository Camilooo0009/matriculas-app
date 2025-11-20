import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export function getDb() {
  if (!db) throw new Error('DB no inicializada');
  return db;
}

export function initDb() {
  const dbPath = path.join(__dirname, '..', '..', 'data', 'app.sqlite');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      rol TEXT NOT NULL CHECK(rol IN ('estudiante','docente','admin')),
      creado_en TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed admin
  const adminEmail = 'admin@colegio.edu';
  const row = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(adminEmail);
  if (!row) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?,?,?,?)'
    ).run('Administrador', adminEmail, hash, 'admin');
    console.log('Usuario admin creado: admin@colegio.edu / admin123');
  }
}
