export type Priority = 'Critical' | 'High' | 'Medium' | 'Nice-to-Have'

export interface Topic {
  id: string
  title: string
  priority: Priority
  points: string[]
  project: string
}

export interface Phase {
  id: string
  number: number
  title: string
  timeline: string
  topics: Topic[]
  description: string
}

export const PHASES: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'TypeScript Mastery & Core React',
    timeline: '5–7 weeks',
    description: 'Build a rock-solid foundation with advanced TypeScript and React performance patterns.',
    topics: [
      {
        id: 'p1-t1',
        title: 'TypeScript Fundamentals',
        priority: 'Critical',
        points: [
          'Types vs Interfaces',
          'Basic types, Enums, and Tuples',
          'Function typing and overloads',
          'Union and Intersection types',
          'Type narrowing and type guards',
          'The `unknown` and `never` types',
        ],
        project: 'Build a strongly-typed utility library',
      },
      {
        id: 'p1-t2',
        title: 'Advanced TypeScript Patterns',
        priority: 'Critical',
        points: [
          'Generics and advanced type constraints',
          'Utility types (Partial, Pick, Omit, Record, etc.)',
          'Discriminated unions and type guards',
          'Conditional types and mapped types',
          'Type inference and `infer` keyword',
          'Branded types for runtime safety',
        ],
        project: 'Build a type-safe API client wrapper with full inference',
      },
      {
        id: 'p1-t3',
        title: 'React Performance Optimization',
        priority: 'Critical',
        points: [
          'useMemo, useCallback, and React.memo deep dive',
          'Code splitting and lazy loading strategies',
          'Virtual scrolling and windowing (react-window)',
          'Web Vitals (LCP, FID, CLS, INP)',
          'React DevTools Profiler mastery',
          'Concurrent rendering and transitions',
        ],
        project: 'Optimize a poorly-performing dashboard with 10k+ data points',
      },
      {
        id: 'p1-t4',
        title: 'Advanced React Patterns',
        priority: 'Critical',
        points: [
          'Compound components pattern',
          'Render props vs Custom Hooks',
          'Higher-Order Components (HOCs) when appropriate',
          'Controlled vs Uncontrolled components',
          'Error boundaries and error handling strategies',
          'Portal usage and modal management',
        ],
        project: 'Build a reusable component library with 5 complex components',
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Modern React Ecosystem',
    timeline: '4–6 weeks',
    description: 'Master the modern React ecosystem: RSC, state management, forms, and styling architecture.',
    topics: [
      {
        id: 'p2-t1',
        title: 'React Server Components & Next.js App Router',
        priority: 'Critical',
        points: [
          'Server Components vs Client Components',
          'Streaming and Suspense',
          'Server Actions and mutations',
          'App Router patterns and best practices',
          'Partial Prerendering (PPR)',
          'Route handlers and API routes',
        ],
        project: 'Build a blog platform with SSR, ISR, and dynamic routes',
      },
      {
        id: 'p2-t2',
        title: 'State Management Evolution',
        priority: 'Critical',
        points: [
          'Context API advanced patterns',
          'Zustand for client state',
          'TanStack Query deep dive (Caching, Deduping, Mutations)',
          'Optimistic updates and cache invalidation',
          'State machine concepts (XState introduction)',
        ],
        project: 'E-commerce cart system with complex state requirements',
      },
      {
        id: 'p2-t3',
        title: 'Form Management & Validation',
        priority: 'High',
        points: [
          'React Hook Form deep dive',
          'Zod schema validation',
          'Complex form scenarios (wizards, dynamic fields)',
          'File uploads and progress tracking',
          'Accessibility in forms',
        ],
        project: 'Multi-step onboarding wizard with validation',
      },
      {
        id: 'p2-t4',
        title: 'Modern Styling Architecture',
        priority: 'High',
        points: [
          'Tailwind CSS architecture and best practices',
          'Shadcn UI and headless component patterns',
          'CSS Modules for scoped styling',
          'CSS-in-JS trade-offs (Styled Components/Emotion)',
          'Design tokens and theming strategies',
          'Component Driven Development with Storybook',
        ],
        project: 'Build a design system with Tailwind, Shadcn, and Storybook',
      },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Build Tools & Developer Experience',
    timeline: '3–4 weeks',
    description: 'Understand the build pipeline deeply and establish top-tier DX in every project.',
    topics: [
      {
        id: 'p3-t1',
        title: 'Vite & Modern Build Tools',
        priority: 'Critical',
        points: [
          'Vite configuration and optimization',
          'Build vs dev mode differences',
          'Environment variables and modes',
          'Plugin ecosystem',
          'Comparison with Webpack/Turbopack',
        ],
        project: 'Configure a monorepo with Vite and shared configs',
      },
      {
        id: 'p3-t2',
        title: 'Testing Strategy',
        priority: 'Critical',
        points: [
          'Vitest for unit testing',
          'React Testing Library patterns',
          'Integration testing approaches',
          'Playwright for E2E testing',
          'Test coverage and quality metrics',
          'Mocking strategies (MSW)',
        ],
        project: 'Achieve 80%+ coverage on a feature-rich component',
      },
      {
        id: 'p3-t3',
        title: 'Code Quality & Tooling',
        priority: 'High',
        points: [
          'ESLint advanced rules and custom rules',
          'Prettier and formatting automation',
          'Husky and pre-commit hooks',
          'TypeScript strict mode',
          'Bundle analysis and optimization',
        ],
        project: 'Set up a complete DX toolkit from scratch',
      },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Accessibility & User Experience',
    timeline: '3–4 weeks',
    description: 'Build inclusive, delightful interfaces with a deep understanding of accessibility and UX principles.',
    topics: [
      {
        id: 'p4-t1',
        title: 'Advanced Accessibility (A11y)',
        priority: 'Critical',
        points: [
          'ARIA patterns and best practices',
          'Keyboard navigation and focus management',
          'Screen reader testing and optimization',
          'Color contrast and visual accessibility',
          'WCAG 2.2 compliance',
          'Accessible animations and reduced motion',
        ],
        project: 'Audit and fix accessibility issues in a complex app',
      },
      {
        id: 'p4-t2',
        title: 'Responsive & Adaptive Design',
        priority: 'High',
        points: [
          'Advanced CSS Grid and Flexbox patterns',
          'Container queries',
          'Responsive images and lazy loading',
          'Touch and gesture support',
          'Mobile-first development',
        ],
        project: 'Build a responsive data visualization dashboard',
      },
      {
        id: 'p4-t3',
        title: 'Animation & Micro-interactions',
        priority: 'High',
        points: [
          'Framer Motion advanced patterns',
          'CSS animations and transitions',
          'Performance considerations',
          'Gesture-based interactions',
          'Page transitions and loading states',
        ],
        project: 'Create an animated portfolio site with smooth transitions',
      },
      {
        id: 'p4-t4',
        title: 'UX Principles for Developers',
        priority: 'High',
        points: [
          'Laws of UX (Fitts, Hicks, Jacob)',
          'Visual hierarchy and spacing',
          'Feedback loops (Loading, Success, Error states)',
          'Empty states and onboarding flows',
          'Perceived performance vs Actual performance',
        ],
        project: 'UX audit and redesign of a complex form',
      },
    ],
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Backend Fundamentals for Frontend',
    timeline: '3–4 weeks',
    description: 'Become a more complete engineer by understanding APIs, databases, and auth.',
    topics: [
      {
        id: 'p5-t1',
        title: 'API Design & Implementation',
        priority: 'High',
        points: [
          'RESTful API design principles',
          'Next.js API Routes and Route Handlers',
          'HTTP methods, status codes, and headers',
          'Error handling and validation (Zod)',
        ],
        project: 'Build a robust REST API for a task manager',
      },
      {
        id: 'p5-t2',
        title: 'Database & Data Management',
        priority: 'High',
        points: [
          'Relational vs Non-relational databases',
          'PostgreSQL basics',
          'ORMs (Prisma or Drizzle)',
          'Schema design and relationships',
          'Migrations and seeding',
        ],
        project: 'Integrate a Postgres database with Prisma',
      },
      {
        id: 'p5-t3',
        title: 'Authentication & Authorization',
        priority: 'Critical',
        points: [
          'Auth flows (OAuth, Magic Links)',
          'Session vs JWT',
          'Implementing NextAuth.js (Auth.js)',
          'Role-based access control (RBAC)',
          'Protecting routes and API endpoints',
        ],
        project: 'Build a secure auth system with roles',
      },
    ],
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Architecture & Patterns',
    timeline: '4–5 weeks',
    description: 'Design scalable, maintainable systems and communicate technical decisions confidently.',
    topics: [
      {
        id: 'p6-t1',
        title: 'Application Architecture',
        priority: 'Critical',
        points: [
          'Feature-based folder structure',
          'Separation of concerns',
          'Dependency injection patterns',
          'Repository pattern for data access',
          'Feature-Sliced Design (FSD) principles',
          'Monorepo strategies (Turborepo, Nx)',
        ],
        project: 'Architect a scalable multi-app monorepo',
      },
      {
        id: 'p6-t2',
        title: 'API Integration Patterns',
        priority: 'Critical',
        points: [
          'REST API best practices',
          'GraphQL with Apollo/URQL',
          'WebSocket connections',
          'Real-time updates (Polling, SSE, WebSockets)',
          'Error handling and retry logic',
          'API versioning strategies',
        ],
        project: 'Build a real-time collaborative tool',
      },
      {
        id: 'p6-t3',
        title: 'Security Best Practices',
        priority: 'Critical',
        points: [
          'XSS and CSRF prevention',
          'Authentication patterns (JWT, OAuth)',
          'Secure token storage',
          'Content Security Policy',
          'Input sanitization',
          'Dependency vulnerability scanning',
        ],
        project: 'Implement secure authentication flow',
      },
    ],
  },
  {
    id: 'phase-7',
    number: 7,
    title: 'Performance & Optimization',
    timeline: '3–4 weeks',
    description: 'Ship fast, efficient experiences that delight users and pass every audit.',
    topics: [
      {
        id: 'p7-t1',
        title: 'Web Performance',
        priority: 'Critical',
        points: [
          'Lighthouse optimization',
          'Image optimization (WebP, AVIF)',
          'Font loading strategies',
          'Critical CSS and above-the-fold content',
          'Service Workers and caching strategies',
          'CDN usage and asset optimization',
        ],
        project: 'Optimize an app to 90+ Lighthouse score',
      },
      {
        id: 'p7-t2',
        title: 'Bundle Optimization',
        priority: 'High',
        points: [
          'Tree shaking and dead code elimination',
          'Dynamic imports and route-based splitting',
          'Bundle analysis and size reduction',
          'Dependency audit and lightweight alternatives',
        ],
        project: 'Reduce bundle size by 50%',
      },
      {
        id: 'p7-t3',
        title: 'Runtime Performance',
        priority: 'High',
        points: [
          'Memory leak detection and prevention',
          'Long task optimization',
          'Debouncing and throttling',
          'Web Workers for heavy computation',
          'RequestAnimationFrame usage',
        ],
        project: 'Profile and optimize a complex animation',
      },
    ],
  },
  {
    id: 'phase-8',
    number: 8,
    title: 'Advanced Topics',
    timeline: '4–6 weeks',
    description: 'Explore cutting-edge tooling, CI/CD, and architectural patterns that push the craft forward.',
    topics: [
      {
        id: 'p8-t1',
        title: 'AI-Assisted Development',
        priority: 'High',
        points: [
          'GitHub Copilot advanced usage',
          'AI code review tools',
          'ChatGPT/Claude for debugging',
          'Prompt engineering for developers',
          'AI pair programming workflows',
        ],
        project: 'Document your AI-assisted development process',
      },
      {
        id: 'p8-t2',
        title: 'CI/CD & DevOps for Frontend',
        priority: 'High',
        points: [
          'GitHub Actions for automated testing and linting',
          'Docker basics for frontend developers',
          'Continuous Deployment pipelines (Vercel, Netlify)',
          'Preview environments and visual regression',
          'Monitoring and Observability (Sentry, Datadog)',
        ],
        project: 'Set up a complete CI/CD pipeline with automated testing',
      },
      {
        id: 'p8-t3',
        title: 'Astro for Content Sites',
        priority: 'Medium',
        points: [
          'Island architecture concept',
          'Partial hydration strategies',
          'Content collections',
          'Integrations with React components',
          'When to use Astro vs Next.js',
        ],
        project: 'Build a documentation site with Astro',
      },
      {
        id: 'p8-t4',
        title: 'Microfrontend Architecture',
        priority: 'Medium',
        points: [
          'Module Federation',
          'When to use microfrontends',
          'Independent deployment strategies',
          'Shared dependencies management',
          'Communication patterns between apps',
        ],
        project: 'Create a microfrontend proof-of-concept',
      },
    ],
  },
  {
    id: 'phase-9',
    number: 9,
    title: 'Career Prep & Interview Mastery',
    timeline: 'Ongoing',
    description: 'Develop the senior-level soft skills, communication, and interview readiness that separate great engineers.',
    topics: [
      {
        id: 'p9-t1',
        title: 'Code Review & Mentorship',
        priority: 'Critical',
        points: [
          'Effective code review techniques',
          'Constructive feedback delivery',
          'Knowledge sharing strategies',
          'Mentoring junior developers',
          'Documentation best practices',
        ],
        project: 'Review 20+ PRs with detailed feedback',
      },
      {
        id: 'p9-t2',
        title: 'Technical Communication',
        priority: 'Critical',
        points: [
          'Writing technical documentation',
          'Architecture Decision Records (ADRs)',
          'Technical proposals and RFCs',
          'Presenting to stakeholders',
          'Estimating and planning',
        ],
        project: 'Write 5 comprehensive technical docs',
      },
      {
        id: 'p9-t3',
        title: 'System Design & Trade-offs',
        priority: 'Critical',
        points: [
          'Scalability considerations',
          'Performance vs maintainability trade-offs',
          'Technical debt management',
          'When to refactor vs rewrite',
          'Cost-benefit analysis of technical decisions',
        ],
        project: 'Design 3 complex features end-to-end',
      },
      {
        id: 'p9-t4',
        title: 'Interview Preparation',
        priority: 'Critical',
        points: [
          'React lifecycle and Virtual DOM deep dive',
          'Common JavaScript interview questions (Closures, Event Loop)',
          'Live coding challenges practice',
          'System design interview patterns',
          'Behavioral interview preparation',
        ],
        project: 'Mock interview sessions',
      },
    ],
  },
]

export const ALL_TOPICS = PHASES.flatMap((p) => p.topics.map((t) => ({ ...t, phaseId: p.id, phaseNumber: p.number })))

export const TOTAL_TOPICS = ALL_TOPICS.length

export function getPhaseById(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id)
}

export function getTopicById(topicId: string): (Topic & { phaseId: string; phaseNumber: number }) | undefined {
  return ALL_TOPICS.find((t) => t.id === topicId)
}
