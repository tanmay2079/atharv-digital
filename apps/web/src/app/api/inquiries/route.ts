import { createInquiry } from '../studio/utils';
import { sendInquiryEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.service_required) {
      return Response.json(
        { error: 'Name, phone, and service_required are required' },
        { status: 400 }
      );
    }

    const result = await createInquiry({
      name: body.name,
      phone: body.phone,
      service_required: body.service_required,
      message: body.message || '',
    });

    sendInquiryEmail({
      name: body.name,
      phone: body.phone,
      service_required: body.service_required,
      message: body.message || '',
    }).catch((err) => console.error('Email send failed (non-blocking):', err));

    return Response.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Inquiry error:', error);
    return Response.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
