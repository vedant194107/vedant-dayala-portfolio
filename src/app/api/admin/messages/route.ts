import { NextResponse } from 'next/server';
import { getStoredMessages, toggleMessageRead, deleteStoredMessage } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const messages = getStoredMessages();
    return NextResponse.json({ success: true, messages });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const updated = toggleMessageRead(id);
    return NextResponse.json({ success: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to toggle message read status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const deleted = deleteStoredMessage(id);
    return NextResponse.json({ success: deleted });
  } catch {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
