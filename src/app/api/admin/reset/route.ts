import { NextResponse } from 'next/server';
import { resetStoreToDefault } from '@/lib/serverStore';

export async function POST() {
  try {
    const store = resetStoreToDefault();
    return NextResponse.json({
      success: true,
      message: 'Store reset to defaults successfully',
      store,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset store' }, { status: 500 });
  }
}
