# MTX Enterprise Secure Browser Prototype

Interactive landing-page prototype for an enterprise browsing product with remote browser isolation. The experience helps security, architecture, IT, privacy, and support teams explore session routing, browsing policy, content controls, governance, and adoption.

## Technology

* React 19
* TypeScript
* Vite
* Lucide React
* Recharts
* Responsive CSS

The site is static. It does not use a backend, authentication, customer data, live websites, a proxy, or a remote browser service.

## Local setup

Requires Node.js 22 or a compatible current LTS release.

```bash
npm install
npm run dev
```

Vite prints the local development URL.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`. Vite uses a relative base path so assets work when GitHub Pages hosts the site below a repository path.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds and publishes `dist/` after updates reach `main`.

In the repository settings:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions** if it is not already selected.
3. Merge or push the implementation to `main`.
4. Review the **Deploy GitHub Pages** workflow run.

## Prototype data and product claims

Destinations use the reserved `.example` domain and never load remote pages. Sessions, policies, events, user counts, and chart values are fictional and labeled as illustrative.

Before external publication, MTX should review:

* Product availability and deployment model
* Remote isolation and rendering architecture
* Download, upload, clipboard, print, and data-entry controls
* Logging, retention, masking, and session-recording behavior
* Identity and security integration availability
* Managed services and coverage hours
* Browser, operating system, hosting, region, tenancy, and data-residency support
* Product maturity labels and operating evidence

Do not add customer outcomes, benchmarks, certifications, compatibility claims, or geographic claims without approved evidence.

## Updating content

Browsing destinations, challenge content, role views, deployment models, control statuses, roadmap phases, console records, and chart values are local TypeScript objects in `src/data.ts`.

Page structure and policy options are in `src/App.tsx`. Visual tokens, layouts, focus states, and responsive rules are in `src/App.css`.

## Replacing the contact action

The demonstration form in `src/App.tsx` prevents network submission and displays a local confirmation. To connect it to an approved lead process:

1. Complete privacy, security, accessibility, and legal review.
2. Replace `submitForm` with an approved endpoint or form service.
3. Add consent and privacy notices required for the intended audience.
4. Validate error handling, retention, and abuse controls.
