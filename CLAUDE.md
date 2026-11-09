# ShopBoard React

The front end of DH Bags, a small online store, built as a multi-page React app.

## Stack

- React 19 and TypeScript, built with Vite
- React Router (lazy routes), Zustand (shared state)
- react-hook-form, Zod and shadcn/ui (forms)
- Plain CSS with custom properties; Tailwind only for the shadcn/ui components
- oxlint, Prettier, husky and lint-staged

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type check and production build
- `npm run typecheck`: check the types
- `npm run lint`: run oxlint, warnings fail
- `npm run format`: format with Prettier
- `npm run format:check`: check the formatting

To test a state, add `/delay/3000`, `/fail/500` or `/empty` to `BASE_URL` in `shared/api/client.ts`.

## Folder structure

- `src/App.tsx`: the routes. `src/main.tsx`: starts React
- `src/modules/<feature>/`: one folder per feature, components next to their logic
- `src/shared/`: code used by more than one feature (`api`, `format`, `types`, `ui`)
- `src/shared/ui/shadcn/`: shadcn/ui components, which keep shadcn's lowercase file names
- `src/styles/`: `tailwind.css`, `base.css` (tokens and shared elements), `layout.css`, one file per
  feature
- `.claude/skills/`: React guidance to follow when writing components

## Where code goes

- `<feature>.types.ts`: its types
- `<feature>.guards.ts`: type guards for data from outside the code
- `<feature>.logic.ts`: pure functions, no `document`, `fetch` or `localStorage`
- `<feature>.state.ts`: its Zustand store
- `<feature>.api.ts`: its server calls, through `shared/api/client.ts`
- `<feature>.cache.ts`: the promises that Suspense reads
- `<feature>.schema.ts`: its Zod schema
- `use<Name>.ts`: a hook. `ComponentName.tsx`: one component per file, with a typed Props interface

When a route, component, prop or state owner changes, update `README.md`.

# Rules

These come from mistakes found while building this project and in the debug lab.

## State

- Each piece of state has one owner and one copy. Calculate totals and visible products during render.
- State many pages need goes in a store. State one component needs stays in that component.
- Components change a store only through its actions. Select only the value the component uses.
- Do not pass a prop through a component that does not use it. Read the store where it is needed.
- Never change state or props in place. `.sort()` changes the array, so sort a copy. React skips the
  render when the reference is the same.

## Loading and errors

- Load data with `use()` inside `Suspense`, not in an effect. Use an effect only to sync with
  something outside React.
- Suspense needs the same promise on every render, so read it from `<feature>.cache.ts`.
- A failed promise stays failed. Try again must clear the cache, or it shows the same error.
- Put boundaries around the slow part only, so the header, filters and forms keep working.
- `RouterProvider` runs navigation in a transition, which hides `Suspense` fallbacks. `RootLayout`
  gives `Suspense` a `key` of the pathname so opening a page shows its loading message.
- Every list that loads needs its loading, error, empty and no match message.

## JSX

- Never use the index as a `key`. Use an id from the data.
- Do not put a number before `&&`. `0` is printed on the page. Write `count > 0 &&`.

## Tools

- Import `RouterProvider` from `react-router/dom`. From `react-router`, `flushSync` does not work.
- After running the shadcn CLI, read `package.json` and the imports. It installed an unrelated `cn`
  package and pointed the components at it.
- Windows Application Control can stop Tailwind from scanning files, and the build still passes with
  no classes. When a shadcn/ui file uses a new class, add it to `@source inline` in `tailwind.css`.
- A passing test does not prove the page looks right. Open it and look.
- Prove a check works by making it fail. The hook let `any` through until its rules were enabled.

## TypeScript

- No `any`, no `as` casts and no `!`. Check unknown data with a type guard.

## HTML

- Use semantic elements, one `h1` per page, and keep heading levels in order.
- Every input has a `<label>` connected with `htmlFor` and `id`.
- Every `img` has an `alt` (`alt=""` if it is decorative).
- Buttons are `<button>` and links are `<a>` or `<Link>`.

## CSS

- Mobile-first: `min-width` queries only.
- Use the tokens in `base.css` for colors, spacing and font sizes.
- No `!important`. Style with classes, not IDs.

## Working style

- Make small, focused changes.
- Do not add dependencies without asking first.
- Check the Console while testing. React warnings count as bugs.
