import { NextResponse } from 'next/server';
import { getStoredContactDetails, saveStoredContactDetails } from '@/lib/serverStore';

export async function GET() {
  try {
    const contactDetails = getStoredContactDetails();
    return NextResponse.json({ success: true, contactDetails });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contact details' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = saveStoredContactDetails(body);
    return NextResponse.json({
      success: true,
      message: 'Contact section details updated successfully',
      contactDetails: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact details' },
      { status: 500 }
    );
  }
}
