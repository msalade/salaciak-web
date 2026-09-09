# salaciak-web

Command links open portfolio content directly: `/?command=projects`,
`/?command=cat%20experience.md`, or `/?command=help`.
Use `encodeURIComponent(command)` when creating links with arguments.
The command runs once when its terminal session opens; visitors can continue typing
commands or use `clear` normally. Unknown commands show the usual error message.
Empty, repeated, multiline, or overlong (more than 256 characters) command parameters
are ignored. Ordinary visits keep the existing welcome screen.

Search is available with `search [QUERY]`; it searches experience, skills, projects,
and the profile summary. Results include links back to terminal commands, for example
`/?command=search%20kubernetes`.

The terminal starts as the only visible interface. Type `help` for commands, and press Tab
to complete a command or a known file, theme, or recent search argument.

Command history is saved locally and available through `history`. Type `accessible` to print
the semantic portfolio view, `motion reduce` or `motion on` to change motion, and `lang en`
or `lang pl` to switch language.
Use `cursor block`, `cursor bar`, `cursor underline`, or `cursor pulse` to choose a terminal
cursor style; the selection is saved locally and restored on the next visit.

Quality checks are grouped in `npm run ci`: lint, typecheck, tests, production build,
Playwright end-to-end tests, and `npm audit --audit-level=high`. Install the browser once
with `npm run e2e:install`; run `npm run e2e` locally. GitHub Actions runs these checks as
separate pipeline steps for pushes and
pull requests. Husky runs the same checks before every local commit; run commands from
the `src` directory.
In CI, the unit runner writes `test-results/unit.xml` and Playwright writes
`test-results/e2e.xml`; both are published as GitHub check runs and uploaded as artifacts.
After cloning, run `npm install` from `src` once to install Husky and refresh the lockfile
if your checkout predates the Husky dependency.

### My [personal website](https://michalsalaciak.pl/) in form of terminal.

![image](/img/my-web.png)

The application, Next.js configuration, service worker, and sitemap generator use strict TypeScript.

The terminal opens with a 750 ms CRT power-on animation on every page load and refresh. Press any key or click to skip it. Shared command links skip the entrance; system reduced-motion preferences and `motion reduce` disable the animation.

Use Node.js 24 LTS or newer. From `src`, run `npm install`, then `npm run dev`.
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
