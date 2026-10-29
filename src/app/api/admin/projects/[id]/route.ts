import { NextResponse } from 'next/server';
import { getStoredProjectById, saveStoredProject, deleteStoredProject } from '@/lib/serverStore';

interface Props {
  params: { id: string };
}

export async function GET(request: Request, { params }: Props) {
  try {
    const project = getStoredProjectById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve project' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const body = await request.json();
    const existing = getStoredProjectById(params.id);

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updated = saveStoredProject({
      ...existing,
      ...body,
      id: params.id,
    });

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      project: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const deleted = deleteStoredProject(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
