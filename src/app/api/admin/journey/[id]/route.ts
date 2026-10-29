import { NextResponse } from 'next/server';
import { deleteStoredMilestone } from '@/lib/serverStore';

interface Props {
  params: { id: string };
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const deleted = deleteStoredMilestone(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Milestone not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Milestone deleted successfully',
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete milestone' }, { status: 500 });
  }
}
