# Frontaura

A frontend curriculum tracker for levelling up from mid-junior to senior frontend engineer. 9 phases, 32 topics, 7–9 months of focused learning.

## Stack

- **Vite 8** + **React 19** + **TypeScript 7**
- **Tailwind CSS v4** (CSS-first, no config file — theme defined in `src/index.css` with `@theme`)
- **React Router v7** (client-side routing)
- **lucide-react** for icons
- **localStorage** for progress persistence (no backend)

## How to run

```
npm run dev
```

Serves on port 5000. Workflow: `Start application`.

## Project structure

```
src/
  data/curriculum.ts      — All 9 phases + 32 topics (static data)
  hooks/useProgress.ts    — localStorage read/write + computed stats
  context/ProgressContext.ts — React context for progress
  components/             — Layout, Sidebar, NeuCard, ProgressBar, PhaseCard, TopicItem
  pages/                  — Dashboard, Curriculum, TopicDetail, Progress, Projects, Settings
  index.css               — Tailwind v4 @theme + custom CSS (neumorphic + CRT design)
```

## Design system

Dark neumorphism + retrofuturistic CRT blend:
- Base: `#0d0f14` (deep dark blue-black)
- Neumorphic surfaces: `#141820` with dual shadow (lighter + darker)
- Accent: cyan `#00e5ff`, green `#39ff14` (phosphor), amber `#ff9f1c`
- CRT effects: slow scan-line animation, subtle scanline overlay
- Font: JetBrains Mono (monospace) + Inter (body)
- Dark mode by default (sustainable web design principle)

## Tailwind v4 note

No `tailwind.config.ts` — all theme customisation is in `src/index.css` under `@theme {}`. The Vite plugin `@tailwindcss/vite` handles compilation.

## User preferences

- Dark mode always on (no toggle needed)
- Stop and ask for decisions on non-trivial choices
- Git commits after each major feature checkpoint
