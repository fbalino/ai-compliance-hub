# Regulome

The central destination for understanding, navigating, and acting on AI regulation worldwide.

Built with Next.js 15 (App Router), Tailwind CSS, Neon Postgres + Drizzle ORM, and deployed on Vercel.

## Getting Started

```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Neon Postgres + Drizzle ORM
- **Deployment:** Vercel
- **Analytics:** PostHog
- **Payments:** Stripe
- **AI:** Claude API (compliance checker)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
