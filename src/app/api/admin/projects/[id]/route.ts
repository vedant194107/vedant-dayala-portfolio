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
  } catch {
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
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';
    const deleted = deleteStoredProject(params.id, permanent);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Project permanently deleted' : 'Project marked as deleted',
      id: params.id,
      permanent,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const body = await request.json();
    const { status } = body;
    if (status !== 'active' && status !== 'deleted') {
      return NextResponse.json({ error: 'Status must be active or deleted' }, { status: 400 });
    }
    const existing = getStoredProjectById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    const updated = saveStoredProject({
      ...existing,
      status,
    });
    return NextResponse.json({
      success: true,
      message: `Project status updated to ${status}`,
      project: updated,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
