import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/serverStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const saved = saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Transmission dispatched successfully to Vedant Dayala',
      id: saved.id,
    });
  } catch (error) {
    console.error('Contact transmission error:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch signal' },
      { status: 500 }
    );
  }
}
