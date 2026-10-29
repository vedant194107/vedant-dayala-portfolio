import { NextResponse } from 'next/server';
import { getStoredProjects, saveStoredProject } from '@/lib/serverStore';
import { ProjectData } from '@/types';

export async function GET() {
  try {
    const projects = getStoredProjects();
    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: ProjectData = await request.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: 'Project name and category are required' },
        { status: 400 }
      );
    }

    // Generate id and number if new
    const existing = getStoredProjects();
    const id = body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const number = body.number || (existing.length + 1).toString().padStart(2, '0');

    const projectToSave: ProjectData = {
      ...body,
      id,
      number,
      status: body.status || 'active',
      images: Array.isArray(body.images) ? body.images : [],
      year: body.year || new Date().getFullYear().toString(),
      tags: Array.isArray(body.tags) ? body.tags : (body.tags as string || '').split(',').map((t) => t.trim()).filter(Boolean),
      caseStudy: body.caseStudy || {
        challenge: body.description || '',
        solution: body.impact || '',
        technicalHighlights: ['Production deployed', 'Responsive architecture'],
        outcomes: 'Delivered high performance and reliability.',
      },
    };

    const saved = saveStoredProject(projectToSave);

    return NextResponse.json({
      success: true,
      message: 'Project saved successfully',
      project: saved,
    });
  } catch (error) {
    console.error('Save project error:', error);
    return NextResponse.json(
      { error: 'Failed to save project' },
      { status: 500 }
    );
  }
}
