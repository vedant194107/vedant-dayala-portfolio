import { NextResponse } from 'next/server';
import { verifyAdminCredentials, getStore } from '@/lib/serverStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const store = getStore();

    // Create session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Authenticated successfully',
      user: {
        username: store.admin.username,
        email: store.admin.email,
      },
    });

    response.cookies.set({
      name: 'admin_session',
      value: Buffer.from(`${store.admin.username}:${Date.now()}`).toString('base64'),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
