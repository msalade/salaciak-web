# salaciak-web

### My [personal website](https://michalsalaciak.pl/) in form of terminal.

![image](/img/my-web.png)

The application, Next.js configuration, service worker, and sitemap generator use strict TypeScript.

Use Node.js 22.14 or newer. From `src`, run `npm ci`, then `npm run dev`.
For a production build, run `npm run build` followed by `npm start`.

Create `src/.env.local` with these settings:

```dotenv
SITE_URL=https://michalsalaciak.pl
NEXT_PUBLIC_RECAPTCHA_WEB_SECRET=your-public-recaptcha-site-key
RECAPTCHA_API_SECRET=your-private-recaptcha-secret
EMAIL=your-contact-email
CSV_DOWNLOAD_URL=https://example.com/your-cv.pdf
```

`CSV_DOWNLOAD_URL` retains its existing name for deployment compatibility and points to a PDF.
Only the public reCAPTCHA site key is exposed to the browser. Missing server settings disable the corresponding protected operation.

Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm audit` from `src` to verify changes.
The tests mock external services and do not use CAPTCHA credentials.

PWA builds use Serwist with Webpack; service workers are disabled during development.
The generated `public/sw.js` must be deployed with each production build. Protected `/api/` responses are network-only and carry `Cache-Control: private, no-store`.
The postbuild script regenerates the sitemap and robots.txt.

TypeScript 6 and ESLint 9 are pinned for compatibility with the current Next.js lint plugins; those plugins do not yet support TypeScript 7 and ESLint 10 together.
The scoped Browserslist override patches Serwist's pinned vulnerable version. Revisit it when Serwist updates its dependency.
