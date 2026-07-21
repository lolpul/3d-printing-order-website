import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ cookies: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

describe("admin session token", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("AUTH_SECRET", "local-test-secret-with-more-than-32-characters");
  });

  it("accepts valid signed session values", async () => {
    const { createSessionValue, verifySessionValue } = await import("@/lib/auth");
    const value = createSessionValue("admin@example.local", Date.now());
    expect(verifySessionValue(value)).toBe("admin@example.local");
  });

  it("rejects tampered session values", async () => {
    const { createSessionValue, verifySessionValue } = await import("@/lib/auth");
    const value = createSessionValue("admin@example.local", Date.now());
    const [payload, signature] = value.split(".");
    const tamperedPayload = Buffer.from(JSON.stringify({ email: "user@example.local", exp: Date.now() + 10000 })).toString("base64url");
    expect(verifySessionValue(`${tamperedPayload}.${signature}`)).toBeNull();
    expect(payload).not.toBe(tamperedPayload);
  });
});
