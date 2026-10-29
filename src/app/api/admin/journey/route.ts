import { NextResponse } from 'next/server';
import { getStoredJourney, saveStoredMilestone } from '@/lib/serverStore';
import { JourneyMilestone } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const journey = getStoredJourney();
    return NextResponse.json({ success: true, journey });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch journey milestones' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: JourneyMilestone = await request.json();

    if (!body.title || !body.year) {
      return NextResponse.json(
        { error: 'Title and year are required' },
        { status: 400 }
      );
    }

    const id = body.id || `m-${Date.now()}`;
    const milestoneToSave: JourneyMilestone = {
      ...body,
      id,
      period: body.period || body.year,
      roleOrDegree: body.roleOrDegree || 'Full-Stack Developer',
      organization: body.organization || 'Software Engineering',
      location: body.location || 'Ahmedabad, India',
      type: body.type || 'experience',
      description: body.description || '',
      keyAchievements: Array.isArray(body.keyAchievements)
        ? body.keyAchievements
        : (body.keyAchievements as string || '').split('\n').map((a) => a.trim()).filter(Boolean),
      tags: Array.isArray(body.tags)
        ? body.tags
        : (body.tags as string || '').split(',').map((t) => t.trim()).filter(Boolean),
    };

    const saved = saveStoredMilestone(milestoneToSave);

    return NextResponse.json({
      success: true,
      message: 'Journey milestone saved successfully',
      milestone: saved,
    });
  } catch (error) {
    console.error('Save journey error:', error);
    return NextResponse.json(
      { error: 'Failed to save journey milestone' },
      { status: 500 }
    );
  }
}
