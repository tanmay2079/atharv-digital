import { getPortfolio } from '../studio/utils';

export async function GET() {
  try {
    const portfolio = await getPortfolio();
    return Response.json(portfolio);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}
