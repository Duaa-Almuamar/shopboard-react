# ShopBoard React

The DH Bags store page built with React and TypeScript. Products come from the
[ShopBoard API](https://shopboard-api.vercel.app). You can search, filter and sort them, and the
cart is saved in `localStorage`, so it survives a refresh.

## Run it

```bash
npm install
npm run dev
```

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Type check and build          |
| `npm run typecheck` | Check the types               |
| `npm run lint`      | Run oxlint, warnings fail     |
| `npm run format`    | Format the code with Prettier |

A pre-commit hook runs oxlint and Prettier on staged files.

## Component tree

```text
App
├── Header           { cartCount }
├── Hero
├── ProductsSection  { status, products, filters, onFiltersChange, onAddToCart, onRetry }
│   ├── ProductFilters  { filters, onChange }
│   └── ProductCard     { product, onAddToCart }          key = product.id
├── CartSection      { lines, total, isWaitingForProducts, onCartAction, onClearCart }
│   └── CartLineItem    { line, onCartAction }            key = line.id
├── RegisterForm
├── Footer
└── Toast            { message, visible }
```

### Props

| Component         | File                                       | Props                                                                                                                                                                                     |
| ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `App`             | `src/App.tsx`                              | None                                                                                                                                                                                      |
| `Header`          | `src/components/Header.tsx`                | `cartCount: number`                                                                                                                                                                       |
| `Hero`            | `src/components/Hero.tsx`                  | None                                                                                                                                                                                      |
| `ProductsSection` | `src/modules/products/ProductsSection.tsx` | `status: ProductsStatus`, `products: Product[]`, `filters: ProductFilters`, `onFiltersChange: (next: ProductFilters) => void`, `onAddToCart: (id: number) => void`, `onRetry: () => void` |
| `ProductFilters`  | `src/modules/products/ProductFilters.tsx`  | `filters: ProductFilters`, `onChange: (next: ProductFilters) => void`                                                                                                                     |
| `ProductCard`     | `src/modules/products/ProductCard.tsx`     | `product: Product`, `onAddToCart: (id: number) => void`                                                                                                                                   |
| `CartSection`     | `src/modules/cart/CartSection.tsx`         | `lines: CartLine[]`, `total: number`, `isWaitingForProducts: boolean`, `onCartAction: (action: CartAction, id: number) => void`, `onClearCart: () => void`                                |
| `CartLineItem`    | `src/modules/cart/CartLineItem.tsx`        | `line: CartLine`, `onCartAction: (action: CartAction, id: number) => void`                                                                                                                |
| `RegisterForm`    | `src/components/RegisterForm.tsx`          | None                                                                                                                                                                                      |
| `Footer`          | `src/components/Footer.tsx`                | None                                                                                                                                                                                      |
| `Toast`           | `src/shared/ui/Toast.tsx`                  | `message: string`, `visible: boolean`                                                                                                                                                     |

### Who owns each piece of state

| State                   | Owner                     | Notes                                                                             |
| ----------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| `products`              | `App`                     | The list from the API                                                             |
| `status`                | `App`                     | `"loading"`, `"error"` or `"ready"`                                               |
| `loadAttempt`           | `App`                     | Try again changes it, which loads the products again                              |
| `filters`               | `App`                     | Search, price, category and sort. `ProductFilters` shows them and reports changes |
| `cart`                  | `App`                     | A copy of the saved cart, so React redraws after a change                         |
| Saved cart              | `cart.state.ts`           | The module that reads and writes `localStorage`                                   |
| `toast`, the hide timer | `useToast`, used by `App` | `Toast` only receives the message and whether it is visible                       |
| Register form fields    | The browser               | Native inputs and HTML validation, no React state                                 |

Everything else is calculated during render: the cart lines, cart count and total in `App`, and the
visible products and catalog total in `ProductsSection`.

## Folder structure

```text
src/
├── App.tsx, main.tsx
├── components/        Header, Hero, RegisterForm, Footer
├── modules/
│   ├── cart/          components, types, guards, logic, state
│   └── products/      components, types, guards, logic, api, default filters
├── shared/
│   ├── api/           client.ts, the only file that calls fetch
│   ├── format/        price formatting
│   ├── types/         shared type guards
│   └── ui/            Toast and useToast
└── styles/            one file per area of the page
```

`debug-lab-log.md` records the 5 bugs from the debug lab, and `CLAUDE.md` holds the project rules.
