import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    // Also support single file upload key 'file'
    const singleFile = formData.get('file') as File | null;
    const allFiles = [...files, ...(singleFile ? [singleFile] : [])];

    if (allFiles.length === 0) {
      return NextResponse.json(
        { error: 'No files provided for upload' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    let canWriteLocal = true;
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    } catch {
      canWriteLocal = false;
    }

    const uploadedUrls: string[] = [];

    for (const file of allFiles) {
      if (!file || typeof file.arrayBuffer !== 'function') continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const originalName = file.name || 'image.png';
      const ext = path.extname(originalName).toLowerCase() || '.png';
      const baseName = path
        .basename(originalName, ext)
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .substring(0, 30);

      if (canWriteLocal) {
        try {
          const fileName = `${Date.now()}_${baseName}${ext}`;
          const filePath = path.join(uploadDir, fileName);
          await fs.promises.writeFile(filePath, buffer);
          uploadedUrls.push(`/uploads/projects/${fileName}`);
          continue;
        } catch {
          // If write fails (e.g. read-only filesystem), fallback to Data URL
        }
      }

      // Serverless fallback: Encode as inline base64 Data URL
      const mimeType = file.type || 'image/png';
      const base64Data = buffer.toString('base64');
      uploadedUrls.push(`data:${mimeType};base64,${base64Data}`);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedUrls.length} file(s)`,
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'File upload failed' },
      { status: 500 }
    );
  }
}
