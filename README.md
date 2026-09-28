# Mohamed Waled · Portfolio

Next.js 16 + Tailwind CSS 4 + Framer Motion.

## Edit content

All text lives in `src/data/portfolio.ts` (experience, projects, skills, links).
Images live in `public/projects/`. Your portrait is `public/profile-hero.webp` (background removed, bottom faded) and is shown in the 3D hero; the games on the hero ring are the first 9 projects with a screenshot (thumbnails in `public/ring/`). To update the downloadable CV, replace `public/Mohamed_Waled_Resume.pdf`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Deploy to Vercel

**Option A: CLI**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B: GitHub (auto-deploy on every push)**

1. Push this folder to a new GitHub repo.
2. At vercel.com/new, import the repo. The defaults work as-is (framework: Next.js).
