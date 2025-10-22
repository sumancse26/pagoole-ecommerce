import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const baseDir = path.join(process.cwd(), 'src', 'app', 'uploads', 'users');

function getContentType(filename) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        case '.svg':
            return 'image/svg+xml';
        case '.avif':
            return 'image/avif';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}

export async function GET(request, { params }) {
    try {
        const filename = await params?.filename;
        if (!filename || filename !== path.basename(filename)) {
            return new Response('Bad Request', { status: 400 });
        }

        const filePath = path.join(baseDir, filename);
        if (!fs.existsSync(filePath)) {
            return new Response('Not Found', { status: 404 });
        }

        const fileBuffer = await fs.promises.readFile(filePath);
        const contentType = getContentType(filename);

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': String(fileBuffer.length),
                'Content-Disposition':
                    contentType === 'application/pdf'
                        ? `inline; filename="${filename}"` // show PDF in browser
                        : `inline; filename="${filename}"`,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });
    } catch (err) {
        console.error('File serve error:', err);
        return new Response('Internal Server Error', { status: 500 });
    }
}
