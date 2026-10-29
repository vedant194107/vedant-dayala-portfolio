import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getStore } from '@/lib/serverStore';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const store = getStore();

    return NextResponse.json({
      authenticated: true,
      user: {
        username: store.admin.username,
        email: store.admin.email,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
