import { NextResponse } from 'next/server';
import { updateAdminPassword } from '@/lib/serverStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const success = updateAdminPassword(currentPassword, newPassword);

    if (!success) {
      return NextResponse.json(
        { error: 'Current password does not match' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin password updated successfully',
    });
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { error: 'Failed to update admin password' },
      { status: 500 }
    );
  }
}
