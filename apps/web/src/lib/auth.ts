/**
 * Authentication configuration.
 * Uses Neon PostgreSQL when DATABASE_URL is set (production),
 * falls back to SQLite for local development.
 */
import { Pool, neonConfig } from '@neondatabase/serverless';
import Database from 'better-sqlite3';
import { argon2Verify } from 'argon2-wasm-edge';
import { betterAuth } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { verifyPassword } from 'better-auth/crypto';
import { bearer } from 'better-auth/plugins';
import ws from 'ws';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'studio.db');

function getDatabase() {
  if (process.env.DATABASE_URL) {
    neonConfig.webSocketConstructor = ws;
    return new Pool({ connectionString: process.env.DATABASE_URL });
  }

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.EXPO_PUBLIC_PROXY_BASE_URL,
  process.env.NEXT_PUBLIC_CREATE_BASE_URL,
  process.env.NEXT_PUBLIC_CREATE_HOST
    ? `https://${process.env.NEXT_PUBLIC_CREATE_HOST}`
    : null,
].filter((v): v is string => Boolean(v));

async function verifyCompatiblePassword({
  hash,
  password,
}: {
  hash: string;
  password: string;
}) {
  if (hash.startsWith('$argon2')) {
    return argon2Verify({ hash, password });
  }
  return verifyPassword({ hash, password });
}

const authConfig: any = {
  database: getDatabase(),
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    password: {
      verify: verifyCompatiblePassword,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== '/sign-up/email') return;
      const body = ctx.body as { email?: unknown; name?: unknown } | undefined;
      if (!body || typeof body.email !== 'string') return;
      if (typeof body.name === 'string' && body.name.trim().length > 0) return;
      const derived = body.email.split('@')[0];
      body.name = derived && derived.length > 0 ? derived : 'User';
    }),
  },
  advanced: {
    cookiePrefix: 'better-auth',
    defaultCookieAttributes: {
      sameSite: 'none' as const,
      secure: true,
      httpOnly: true,
      path: '/',
    },
    cookies: {
      sessionToken: {
        attributes: {
          sameSite: 'none' as const,
          secure: true,
        },
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  user: {
    additionalFields: {
      image: {
        type: 'string',
        required: false,
      },
    },
  },
  plugins: [bearer()],
};

const authDisabled = !process.env.DATABASE_URL;

export const auth = authDisabled
  ? {
      api: {
        getSession: async () => null,
      },
      $Infer: { Session: null },
    } as any
  : betterAuth(authConfig);

export type Session = typeof auth.$Infer.Session;
