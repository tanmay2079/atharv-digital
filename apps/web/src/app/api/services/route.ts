import { getServices } from '../studio/utils';

export async function GET() {
  try {
    const services = await getServices();
    return Response.json(services);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
