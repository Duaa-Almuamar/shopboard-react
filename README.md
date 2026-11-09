# ShopBoard React

The DH Bags store as a multi-page React and TypeScript app. Products come from the
[ShopBoard API](https://shopboard-api.vercel.app). You can search, filter and sort them, open one
product, keep a cart that survives a refresh, and place an order through a validated checkout.

## Run it

```bash
npm install
npm run dev
```

| Command                | What it does                  |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start the dev server          |
| `npm run build`        | Type check and build          |
| `npm run typecheck`    | Check the types               |
| `npm run lint`         | Run oxlint, warnings fail     |
| `npm run format`       | Format the code with Prettier |
| `npm run format:check` | Check the formatting          |

The pre-commit hook runs oxlint and Prettier on staged files, then the type check. A commit with
`any`, `as`, `!` or an index as a key is rejected.

To test a state, add a switch to `BASE_URL` in `src/shared/api/client.ts`: `/delay/3000` (slow),
`/fail/500` (error) or `/empty` (no products).

## Routes

Every page is loaded the first time it is opened (`lazy` in `src/App.tsx`).

| Path                   | Page                 | What it shows                              |
| ---------------------- | -------------------- | ------------------------------------------ |
| `/`                    | `HomePage`           | The hero                                   |
| `/products`            | `ProductsPage`       | Search, filters, sort and the product list |
| `/products/:productId` | `ProductDetailsPage` | One product, loaded from the API by its id |
| `/cart`                | `CartPage`           | The cart                                   |
| `/checkout`            | `CheckoutPage`       | The delivery form and the order summary    |
| `/register`            | `RegisterPage`       | The register form                          |
| `*`                    | `NotFoundPage`       | The 404 page                               |

## Component tree

```text
App
└── RootLayout                  ErrorBoundary and Suspense around the page
    ├── Header
    ├── HomePage
    │   └── Hero
    ├── ProductsPage
    │   ├── ProductFilters      { filters, onChange }
    │   └── ProductsBoundary    { loadingMessage, errorMessage, children }
    │       └── ProductsCatalog { filters }
    │           └── ProductCard { product }             key = product.id
    │               └── AddToCartButton { product }
    ├── ProductDetailsPage      ErrorBoundary and Suspense around ProductDetails
    │   ├── ProductDetails      { id }
    │   │   └── AddToCartButton { product }
    │   └── ProductNotFound
    ├── CartPage
    │   ├── EmptyCartMessage
    │   └── ProductsBoundary    { loadingMessage, errorMessage, children }
    │       └── CartContents
    │           ├── CartLineItem { line }               key = line.id
    │           └── EmptyCartMessage
    ├── CheckoutPage
    │   ├── EmptyCartMessage
    │   ├── CheckoutForm        { onOrderPlaced }
    │   │   └── CheckoutField   { id, label, error, registration, type, autoComplete }
    │   └── ProductsBoundary    { loadingMessage, errorMessage, children }
    │       └── OrderSummary
    ├── RegisterPage
    │   └── RegisterForm
    ├── NotFoundPage
    ├── Footer
    └── Toast
```

While something loads or fails, a boundary shows `LoadingMessage { message }` or
`RetryMessage { message, onRetry }` in its place. The router shows one page at a time.

### Who owns each piece of state

| State                    | Owner                                  | Who changes it                                     |
| ------------------------ | -------------------------------------- | -------------------------------------------------- |
| The cart                 | `useCartStore` in `cart.state.ts`      | Only the store's actions. It saves to localStorage |
| Toast message            | `useToastStore` in `toast.state.ts`    | Only `showToast`                                   |
| Products from the API    | `products.cache.ts` (one promise each) | Try again clears it                                |
| Search, filters, sort    | The page address                       | `useProductFilters`                                |
| Form values and errors   | `useForm` in `CheckoutForm`            | react-hook-form                                    |
| Customer name on success | `useState` in `CheckoutPage`           | `onOrderPlaced`                                    |
| Register form fields     | The browser                            | Native inputs, no React state                      |

Cart lines, totals and the visible products are calculated during render and are not stored.

### Why Zustand

The cart is read in the header, the product pages, the cart page and checkout. With a Zustand
selector, a component redraws only when the value it reads changes, and the `persist` middleware
saves the cart without hand-written localStorage code. Context would redraw every consumer on each
cart change.

## Folder structure

```text
src/
├── App.tsx, main.tsx
├── modules/           One folder per feature
│   ├── cart/          Components, types, guards, logic, store
│   ├── checkout/      Components and the Zod schema
│   ├── home/
│   ├── layout/        RootLayout, Header, Footer
│   ├── not-found/
│   ├── products/      Components, types, guards, logic, api, cache
│   └── register/
├── shared/
│   ├── api/           client.ts, the only file that calls fetch
│   ├── format/        Price formatting
│   ├── types/         Shared type guards
│   └── ui/            Toast, messages, cn, and shadcn/ (generated components)
└── styles/            One file per area of the page
```

`debug-lab-log.md` records the 5 bugs from the debug lab, and `CLAUDE.md` holds the project rules.
