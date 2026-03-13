# Codebase Security Audit findings

## 1. Exposed API Keys / Credentials
- [ ] **EmailJS Credentials**: In `src/components/ContactForm.jsx`, the following are hardcoded:
  - Service ID: `service_qdlv6x6`
  - Template IDs: `template_ibof6py`, `template_z48xd8j`
  - Public Key: `kWXpmJZNrXzXz9PHt`
  - *Risk*: Low (Public Key is intended to be public), but it's best practice to use environment variables.
- [ ] **Sanity Project ID**: Hardcoded in `src/lib/sanity.js` (`1r5lk62n`).
  - *Risk*: Traceable, but Sanity project IDs are usually public.
- [ ] **Google Site Verification**: Hardcoded in `src/components/SEO.jsx` and `prerender.js` (`r3hVpGRHUOO4mx2O30EZ6eyUYx62mJBLucBDW9cLPZI`).
  - *Risk*: Informational.

## 2. Unprotected Routes & Missing Auth
- [ ] **Frontend Routing**: All routes in `src/App.jsx` are public.
  - *Risk*: Low, as this is a public landing page. No admin routes or sensitive data areas found in the frontend.
- [ ] **Sanity Studio**: Located in `/studio-merlign`.
  - [ ] Check `sanity.config.ts` for authentication provider.
  - *Risk*: Sanity handles auth by default for the studio.

## 3. Unsanitised Inputs / Injection Risks
- [ ] **Contact Form**: In `src/components/ContactForm.jsx`, `formData` is sent to EmailJS.
  - While it's used in a template, there is no explicit sanitization beyond `.trim()`.
  - *Mitigation*: Ensure EmailJS templates are configured to escape HTML/scripts if they render this data as HTML.
- [ ] **SEO Content Injection**: In `prerender.js`, Sanity data is injected directly into HTML:
  - `seoContent += <h1>${data.heroSans || ''} ... </h1>`
  - *Risk*: If a malicious user gains access to Sanity (CMS), they could inject malicious scripts that get prerendered into the final HTML.
  - *Recommendation*: Sanitize CMS content before injecting into HTML templates.

## 4. Other Recommendations
- [ ] **Environment Variables**: Move all IDs (Sanity, EmailJS) to a `.env` file and use `import.meta.env` (Vite).
- [ ] **Security Headers**: Check if proper security headers (CSP, X-Frame-Options, etc.) are set in the hosting environment (e.g., Vercel).
- [ ] **Content Security Policy**: No CSP meta tag or header detected.
