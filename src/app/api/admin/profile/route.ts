import { NextResponse } from 'next/server';
import { getStoredProfile, saveStoredProfile } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profile = getStoredProfile();
    return NextResponse.json({ success: true, profile });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = saveStoredProfile(body);
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updated,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return PUT(request);
}
