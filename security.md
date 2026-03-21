# Codebase Security Audit findings

## 1. Exposed API Keys / Credentials
- [x] **EmailJS Credentials**: Moved to `.env`.
- [x] **Sanity Project ID**: Hardcoded fallback removed from `src/lib/sanity.js`.
- [ ] **Google Site Verification**: Hardcoded in `src/components/SEO.jsx` and `prerender.js`. (Low risk).

## 2. Unprotected Routes & Missing Auth
- [ ] **Frontend Routing**: All routes in `src/App.jsx` are public.
  - *Risk*: Low, as this is a public landing page. No admin routes or sensitive data areas found in the frontend.
- [ ] **Sanity Studio**: Located in `/studio-merlign`.
  - [ ] Check `sanity.config.ts` for authentication provider.
  - *Risk*: Sanity handles auth by default for the studio.

## 3. Unsanitised Inputs / Injection Risks
- [x] **Contact Form**: Basic HTML entity encoding added to `ContactForm.jsx`.
- [x] **Prompt Injection**: Implemented `<scanned_content>` tags and system-level instructions in `api/analyze.js`.
- [x] **SSRF (Server-Side Request Forgery)**: Implemented hostname and IP-range validation in `api/analyze.js`.

## 4. Other Recommendations
- [x] **Environment Variables**: Migrated main keys to `.env`.
- [ ] **Security Headers**: No CSP (Content Security Policy) detected in `index.html` or response headers.
- [ ] **Rate Limiting**: `api/analyze.js` has a basic 429 handler, but no global rate limiting per IP on the edge.
