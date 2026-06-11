import { query, queryOne, execute } from '@/app/api/utils/sql';

interface ServiceRow {
  id: number;
  title: string;
  description: string;
  icon_name: string | null;
  features: string;
  created_at: string;
}

interface PortfolioRow {
  id: number;
  title: string;
  category: string;
  image_url: string;
  status: string | null;
  created_at: string;
}

interface InquiryInput {
  name: string;
  phone: string;
  service_required: string;
  message?: string;
}

export async function getServices() {
  const rows = await query<ServiceRow>('SELECT * FROM services ORDER BY created_at DESC');
  return rows.map((row) => ({
    id: String(row.id),
    title: row.title,
    description: row.description,
    icon_name: row.icon_name || undefined,
    features: JSON.parse(row.features || '[]') as string[],
  }));
}

export async function getPortfolio() {
  const rows = await query<PortfolioRow>('SELECT * FROM portfolio ORDER BY created_at DESC');
  return rows.map((row) => ({
    id: String(row.id),
    title: row.title,
    category: row.category,
    image_url: row.image_url,
    status: row.status || undefined,
  }));
}

export async function createInquiry(data: InquiryInput) {
  const { name, phone, service_required, message } = data;
  const result = await execute(
    'INSERT INTO inquiries (name, phone, service_required, message) VALUES (?, ?, ?, ?)',
    [name, phone, service_required, message || '']
  );
  return result;
}
