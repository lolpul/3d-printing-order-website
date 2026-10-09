import path from "node:path";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { env } from "@/lib/env";
import { safeUploadPath } from "@/lib/storage";

describe("upload path containment", () => {
  const root = path.resolve(process.cwd(), env.UPLOAD_DIR);

  it("keeps valid relative paths inside the upload root", () => {
    expect(safeUploadPath("portfolio/fixture.webp")).toBe(path.join(root, "portfolio", "fixture.webp"));
  });

  it("rejects an absolute sibling sharing the root prefix", () => {
    expect(() => safeUploadPath(path.join(`${root}-sibling`, "fixture.webp"))).toThrow("Invalid upload path");
  });

  it("rejects a relative parent escape", () => {
    expect(() => safeUploadPath(path.join("..", "fixture.webp"))).toThrow("Invalid upload path");
  });

  it("rejects a parent escape after an ordinary subdirectory", () => {
    expect(() => safeUploadPath(path.join("portfolio", "..", "..", "fixture.webp"))).toThrow("Invalid upload path");
  });

  it("allows an absolute path inside the root", () => {
    const file = path.join(root, "portfolio", "fixture.webp");
    expect(safeUploadPath(file)).toBe(file);
  });
});
