# ShopBoard React

The front end of DH Bags, a small online store, built with React.

## Stack

- React 19 and TypeScript, built with Vite
- Plain CSS with custom properties
- oxlint, Prettier, husky and lint-staged

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type check and production build
- `npm run typecheck`: check the types
- `npm run lint`: run oxlint, warnings fail
- `npm run format`: format with Prettier

## Folder structure

- `src/App.tsx`: owns the state and connects the modules
- `src/components/`: page parts that belong to no feature
- `src/modules/<feature>/`: one folder per feature, components next to their logic
- `src/shared/`: code used by more than one feature (`api`, `format`, `types`, `ui`)
- `src/styles/`: `base.css` (tokens and shared elements), `layout.css`, one file per feature
- `.claude/skills/`: React guidance to follow when writing components

## Where code goes

- `<feature>.types.ts`: its types
- `<feature>.guards.ts`: type guards for data from outside the code
- `<feature>.logic.ts`: pure functions, no `document`, `fetch` or `localStorage`
- `<feature>.state.ts`: the data it saves
- `<feature>.api.ts`: its server calls, through `shared/api/client.ts`
- `ComponentName.tsx`: one component per file, with a typed Props interface

When the component tree, props or state owners change, update the tree in `README.md`.

# Rules

These come from mistakes found while building this project and in the debug lab.

- Never use the index as a `key`. Use an id from the data. With an index, state stays at the position
  and moves to another product after a sort.
- Do not put a number before `&&` in JSX. `0` is printed on the page. Write `count > 0 &&`.
- Never change state or props in place. `.sort()` changes the array, so sort a copy. Build a new
  object or array, because React skips the render when the reference is the same.
- Keep unrelated state apart. Changing a filter must not touch the loading status, or it hides the
  error message.
- Do not store what can be calculated. Work out totals and visible products during render.
- Every list that loads needs its loading, error, empty and no match message.

## TypeScript

- No `any`, no `as` casts and no `!`. Check unknown data with a type guard.

## HTML

- Use semantic elements, one `h1` per page, and keep heading levels in order.
- Every input has a `<label>` connected with `htmlFor` and `id`.
- Every `img` has an `alt` (`alt=""` if it is decorative).
- Buttons are `<button>` and links are `<a>`.

## CSS

- Mobile-first: `min-width` queries only.
- Use the tokens in `base.css` for colors, spacing and font sizes.
- No `!important`. Style with classes, not IDs.

## Working style

- Make small, focused changes.
- Do not add dependencies without asking first.
- Check the Console while testing. React warnings count as bugs.
