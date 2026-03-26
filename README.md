# ContentAI — AI-Powered Content Generator

> Generate professional LinkedIn posts, cold emails, and profile bios in seconds using Claude AI.

**[Live Demo](https://contentai.vercel.app)** · [Report Bug](https://github.com/yourname/contentai/issues)

## Features

- **3 AI Tools** : LinkedIn posts, cold outreach emails, professional bios
- **Smart Credits** : 5 free generations per day, unlimited with Pro
- **Streaming Responses** : See your content appear word by word
- **Generation History** : Access and copy all your past generations
- **Stripe Billing** : Seamless subscription management
- **Secure Auth** : Email/password authentication with NextAuth v5

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=flat&logo=stripe&logoColor=white)

## Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourname/contentai.git
   cd contentai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your values (see table below)
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `DATABASE_URL` | PostgreSQL connection string | [neon.tech](https://neon.tech) |
| `NEXTAUTH_SECRET` | Random secret | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` |
| `ANTHROPIC_API_KEY` | Claude AI API key | [console.anthropic.com](https://console.anthropic.com) |
| `STRIPE_SECRET_KEY` | Stripe secret key (test) | [Stripe Dashboard](https://dashboard.stripe.com) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Stripe CLI |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe Dashboard |
| `NEXT_PUBLIC_APP_URL` | App URL | `http://localhost:3000` |

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourname/contentai)

Set all environment variables in Vercel dashboard before deploying.

## License

MIT
