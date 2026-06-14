# 9, rue du Val-des-Cèdres

Immersive bilingual (FR/EN) luxury listing site for a riverside craftsman property in
Morin-Heights, Laurentides. Cinematic scroll journey + WebGL accents.

See [docs/design-spec.md](docs/design-spec.md) for the full design.

## Stack
Vite + React + TS + Tailwind v4 + GSAP/ScrollTrigger + Lenis + React-Three-Fiber.
Backend: Express 5 + Resend (single service). Host: Railway.

## Develop
```
npm install
cp .env.example .env   # fill in Resend keys, or leave blank for stub mode
npm run dev            # vite (5173) + express api (3001), vite proxies /api
```

## Build and run (production / Railway)
```
npm run build          # builds client -> dist/
npm start              # express serves dist/ + /api/contact on $PORT
```

Railway: single service, auto-deploy from GitHub `main`. Build `npm run build`,
start `npm start`. Set env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

## Verify
```
npm run typecheck      # tsc --noEmit
```
