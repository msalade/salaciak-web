import { createServer } from "node:http";
import next from "next";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const port = Number(process.env.PORT ?? 3101);
process.env.EMAIL = "e2e@example.test";
process.env.RECAPTCHA_API_SECRET = "e2e-secret";

const mockServer = setupServer(
  http.post("https://www.google.com/recaptcha/api/siteverify", async ({ request }) => {
    const body = await request.text();
    if (!body.includes("secret=e2e-secret") || !body.includes("response=e2e-valid-token")) {
      return HttpResponse.json({ success: false });
    }
    return HttpResponse.json({ success: true });
  }),
);

mockServer.listen({ onUnhandledRequest: "bypass" });
const app = next({ dev: true, hostname: "127.0.0.1", port });
await app.prepare();
const handle = app.getRequestHandler();
const server = createServer((request, response) => handle(request, response));
server.listen(port, "127.0.0.1");

const shutdown = async () => {
  mockServer.close();
  await app.close();
  server.close();
};
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
