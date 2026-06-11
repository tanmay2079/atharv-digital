import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'studio.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initTables(db);
  }
  return db;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon_name TEXT,
      features TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_required TEXT NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedIfEmpty(db);
}

function seedIfEmpty(db: Database.Database) {
  const count = db.prepare('SELECT COUNT(*) as count FROM services').get() as { count: number };
  if (count.count === 0) {
    const insertService = db.prepare(
      'INSERT INTO services (title, description, icon_name, features) VALUES (?, ?, ?, ?)'
    );
    const insertPortfolio = db.prepare(
      'INSERT INTO portfolio (title, category, image_url, status) VALUES (?, ?, ?, ?)'
    );

    const seedTx = db.transaction(() => {
      insertService.run(
        'Passport Size Photos',
        'High-quality instant passport and visa photos with lighting optimization.',
        'Camera',
        JSON.stringify(['Instant printing', 'Digital copy provided', 'Visa compliance check'])
      );
      insertService.run(
        'Wedding Photography',
        'Cinematic and traditional wedding photography to capture your special day.',
        'Heart',
        JSON.stringify(['Pre-wedding shoot', 'Cinematic highlights', 'Luxury photo albums'])
      );
      insertService.run(
        'Event Coverage',
        'Comprehensive coverage for birthdays, anniversaries, and ceremonies.',
        'Calendar',
        JSON.stringify(['Professional lighting', 'Group portraits', 'Event highlights'])
      );
      insertService.run(
        'Digital Services',
        'Photo restoration, lamination, and expert photo editing services.',
        'Sparkles',
        JSON.stringify(['Photo restoration', 'High-end retouching', 'ID card printing'])
      );
      insertPortfolio.run(
        'The Royal Wedding',
        'Wedding',
        '/placeholder.svg',
        'Featured'
      );
      insertPortfolio.run(
        'Cultural Portraits',
        'Studio',
        '/placeholder.svg',
        'New'
      );
      insertPortfolio.run(
        'Ceremony Moments',
        'Events',
        '/placeholder.svg',
        'Featured'
      );
      insertPortfolio.run(
        'Corporate Identity',
        'Passport',
        '/placeholder.svg',
        'Active'
      );
    });
    seedTx();
  }
}

export default getDb;
