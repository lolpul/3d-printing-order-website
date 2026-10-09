import "server-only";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import { env } from "@/lib/env";

const allowedMime = new Set(["image/jpeg", "image/png", "image/webp"]);

export type StoredImage = {
  originalPath: string;
  largePath: string;
  mediumPath: string;
  thumbPath: string;
  webpPath: string;
  width: number;
  height: number;
};

function uploadRoot() {
  return path.resolve(/*turbopackIgnore: true*/ process.cwd(), env.UPLOAD_DIR);
}

function publicPath(relative: string) {
  return `/uploads/${relative.replaceAll(path.sep, "/")}`;
}

export function safeUploadPath(relativePath: string) {
  const root = uploadRoot();
  const full = path.resolve(root, relativePath);
  const relative = path.relative(root, full);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error("Invalid upload path");
  }
  return full;
}

export async function storePortfolioImage(file: File): Promise<StoredImage> {
  if (!allowedMime.has(file.type)) {
    throw new Error("Неподдерживаемый формат изображения.");
  }
  const maxBytes = env.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`Файл слишком большой. Максимум ${env.MAX_UPLOAD_SIZE_MB} МБ.`);
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = await fileTypeFromBuffer(buffer);
  if (!detected || !allowedMime.has(detected.mime)) {
    throw new Error("Не удалось подтвердить формат изображения.");
  }
  const image = sharp(buffer, { failOn: "error" }).rotate();
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error("Не удалось прочитать изображение.");
  }

  const folder = path.join("portfolio", new Date().toISOString().slice(0, 10));
  const dir = path.join(uploadRoot(), folder);
  await mkdir(dir, { recursive: true });
  const name = randomUUID();

  const originalRelative = path.join(folder, `${name}-original.webp`);
  const largeRelative = path.join(folder, `${name}-large.webp`);
  const mediumRelative = path.join(folder, `${name}-medium.webp`);
  const thumbRelative = path.join(folder, `${name}-thumb.webp`);

  await Promise.all([
    sharp(buffer).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(safeUploadPath(originalRelative)),
    sharp(buffer).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(safeUploadPath(largeRelative)),
    sharp(buffer).rotate().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 80 }).toFile(safeUploadPath(mediumRelative)),
    sharp(buffer).rotate().resize({ width: 360, height: 260, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(safeUploadPath(thumbRelative))
  ]);

  return {
    originalPath: publicPath(originalRelative),
    largePath: publicPath(largeRelative),
    mediumPath: publicPath(mediumRelative),
    thumbPath: publicPath(thumbRelative),
    webpPath: publicPath(largeRelative),
    width: metadata.width,
    height: metadata.height
  };
}

export async function removeStoredImage(paths: Array<string | null | undefined>) {
  const unique = new Set(paths.filter(Boolean).map((item) => String(item).replace(/^\/uploads\//, "")));
  await Promise.all([...unique].map((item) => rm(safeUploadPath(item), { force: true })));
}

export async function ensureUploadDir() {
  await mkdir(uploadRoot(), { recursive: true });
  await writeFile(path.join(uploadRoot(), ".keep"), "", { flag: "a" });
}
