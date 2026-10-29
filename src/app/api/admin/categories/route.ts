import { NextResponse } from 'next/server';
import { getStoredCategories, saveStoredCategory, deleteStoredCategory } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = getStoredCategories();
    return NextResponse.json({ success: true, categories });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const updatedCategories = saveStoredCategory(name.trim());

    return NextResponse.json({
      success: true,
      message: `Category "${name.trim()}" created successfully`,
      categories: updatedCategories,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const updatedCategories = deleteStoredCategory(name);

    return NextResponse.json({
      success: true,
      message: `Category "${name}" removed`,
      categories: updatedCategories,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
