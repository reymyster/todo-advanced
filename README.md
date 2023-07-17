This is a more advanced To-Do List [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). For the more basic To-Do List project, check [here](https://github.com/reymyster/todo-basic).

## View Working Demo

https://todo-advanced-ruddy.vercel.app

## Technologies Used in this Stack

### Back End
- Routing / API / Full Stack meta-framework via [NextJS with App Router](https://nextjs.org/)
- Database hosted on [Vercel Postgres](https://vercel.com/storage/postgres)
- TypeScript ORM via [Drizzle ORM](https://orm.drizzle.team)

### Utility
- TypeScript-first schema validation with static type inference via [Zod](https://zod.dev)
- Automated code-formatting via [Prettier](https://prettier.io)
    - automatic tailwind class sorting with [Prettier plugin for Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- simpler date manipulation via [date-fns](https://date-fns.org)

### State Management
- Most state management involving database/api persistence via [TanStack Query](https://tanstack.com/query/v3/)
- Other basic state management via the lightweight [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

### UI
- Utility-first CSS framework in [Tailwind CSS](https://tailwindcss.com)
    - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) is a Tailwind CSS plugin for beautiful animations
- More advanced animation work via [Framer Motion](https://www.framer.com/motion/)
- component library based on headless [Radix UI](https://www.radix-ui.com) and Tailwind CSS with [shadcn/ui](https://ui.shadcn.com)
    - DataTable in shadcn/ui implemented with [TanStack Table](https://tanstack.com/table/v8)