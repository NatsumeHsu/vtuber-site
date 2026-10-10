import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import path from "node:path";
import {
    eventHandler,
    getRequestURL,
    sendStream,
    createError,
    setHeader,
} from "h3";

export default eventHandler(async (event) => {
    const pathname = getRequestURL(event).pathname;

    if (!pathname.startsWith("/static/")) return;

    const method = event.node.req.method;

    if (method !== "GET" && method !== "HEAD") {
        throw createError({ statusCode: 405 });
    }

    const { uploadDir } = useRuntimeConfig(event);
    const root = path.resolve(uploadDir);

    let relativePath: string;

    try {
        relativePath = decodeURIComponent(
            pathname.slice("/static/".length)
        );
    } catch {
        throw createError({ statusCode: 400 });
    }

    if (
        !relativePath ||
        relativePath.includes("\0")
    ) {
        throw createError({ statusCode: 400 });
    }

    const filePath = path.resolve(root, relativePath);

    // Reject paths outside the upload directory.
    if (!filePath.startsWith(root + path.sep)) {
        throw createError({ statusCode: 403 });
    }

    let realRoot: string;
    let realFile: string;

    try {
        realRoot = await realpath(root);
        realFile = await realpath(filePath);
    } catch {
        throw createError({ statusCode: 404 });
    }

    // Reject symbolic links pointing outside the upload directory.
    if (!realFile.startsWith(realRoot + path.sep)) {
        throw createError({ statusCode: 403 });
    }

    const info = await stat(realFile);

    if (!info.isFile()) {
        throw createError({ statusCode: 404 });
    }

    const mimeTypes: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".pdf": "application/pdf",
        ".txt": "text/plain; charset=utf-8",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".mp3": "audio/mpeg",
    };

    const ext = path.extname(realFile).toLowerCase();

    setHeader(
        event,
        "Content-Type",
        mimeTypes[ext] || "application/octet-stream"
    );

    setHeader(event, "Content-Length", info.size);
    setHeader(event, "Cache-Control", "no-cache");
    setHeader(event, "X-Content-Type-Options", "nosniff");

    if (method === "HEAD") {
        event.node.res.end();
        return;
    }

    return sendStream(
        event,
        createReadStream(realFile)
    );
});
