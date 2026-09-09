import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import type { NextApiRequest, NextApiResponse } from "next";
import { createValidator } from "../captcha/validator";
import validator from "../captcha/validator";
import { withCaptchaValidator } from "../captcha/captchaDecorator";

const originalFetch = globalThis.fetch;
const originalIsValid = validator.isValid;
afterEach(() => {
  globalThis.fetch = originalFetch;
  validator.isValid = originalIsValid;
});

function responseFixture() {
  let status = 200;
  let body: unknown;
  const headers = new Map<string, string>();
  const response = {
    headersSent: false,
    setHeader(name: string, value: string) { headers.set(name, value); },
    status(code: number) { status = code; return this; },
    json(value: unknown) { body = value; return this; },
  };
  return {
    response: response as unknown as NextApiResponse,
    headers,
    get status() { return status; },
    get body() { return body; },
  };
}

test("CAPTCHA sends encoded credentials in the POST body", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://www.google.com/recaptcha/api/siteverify");
    assert.equal(options?.method, "POST");
    assert.equal(options?.cache, "no-store");
    assert.ok(options?.body instanceof URLSearchParams);
    assert.equal(options.body.get("secret"), "secret&value");
    assert.equal(options.body.get("response"), "token&success=true");
    return Response.json({ success: true });
  };
  assert.equal(await createValidator("secret&value").isValid("token&success=true"), true);
});

test("CAPTCHA fails closed on malformed, false, and non-boolean results", async () => {
  for (const result of [null, {}, { success: false }, { success: "true" }, { success: 1 }]) {
    globalThis.fetch = async () => Response.json(result);
    assert.equal(await createValidator("secret").isValid("token"), false);
  }
  globalThis.fetch = async () => new Response("unavailable", { status: 503 });
  await assert.rejects(createValidator("secret").isValid("token"));
  await assert.rejects(createValidator("").isValid("token"));
});

test("protected routes reject malformed tokens without invoking verification", async () => {
  validator.isValid = async () => { throw new Error("Must not be called"); };
  const handler = withCaptchaValidator(() => assert.fail("Must not be called"));
  for (const token of [undefined, "", "  ", ["one", "two"], "a".repeat(4097)]) {
    const fixture = responseFixture();
    await handler({ method: "GET", query: { token } } as unknown as NextApiRequest, fixture.response);
    assert.equal(fixture.status, 400);
    assert.equal(fixture.headers.get("Cache-Control"), "private, no-store");
  }
});

test("protected routes reject unsupported methods and invalid CAPTCHA", async () => {
  const handler = withCaptchaValidator(() => assert.fail("Must not be called"));
  const fixture = responseFixture();
  await handler({ method: "POST", query: {} } as unknown as NextApiRequest, fixture.response);
  assert.equal(fixture.status, 405);
  assert.equal(fixture.headers.get("Allow"), "GET");
  validator.isValid = async () => false;
  const invalid = responseFixture();
  await handler({ method: "GET", query: { token: "token" } } as unknown as NextApiRequest, invalid.response);
  assert.equal(invalid.status, 400);
});

test("wrapper awaits handlers and hides asynchronous failures", async () => {
  validator.isValid = async () => true;
  const fixture = responseFixture();
  await withCaptchaValidator(async () => {
    await Promise.resolve();
    throw new Error("private backend URL and credentials");
  })({ method: "GET", query: { token: "token" } } as unknown as NextApiRequest, fixture.response);
  assert.equal(fixture.status, 500);
  assert.deepEqual(fixture.body, { message: "Unable to process request" });
});
