# Debug lab log

The 5 bugs from <https://shopboard-api.vercel.app/debug-lab>. TypeScript shows no errors for any of
them.

## Bug 1: Missing key on the category chips

**What I saw:** On page load the Console warned: `Each child in a list should have a unique "key"
prop. Check the render method of CategoryChips.`

**Component:** `CategoryChips`

**How I found it:** Console warning. It names the component, so I opened `CategoryChips.tsx` in
Sources.

**Cause:** `categories.map((category) => <span className="chip">{category}</span>)` gives the
`<span>` no `key`, so React cannot tell the list items apart between renders.

**Fix:** Use the category name, which is unique in this list:

```tsx
<span key={category} className="chip">
  {category}
</span>
```

## Bug 2: A "0" that nobody wrote

**What I saw:** The two sold-out cards (Mini Crossbody Bag and Wool Scarf) show a `0` where the
stock note goes. The empty cart shows a `0` under its heading.

**Component:** `StockNote` and `CartPanel`

**How I found it:** I looked at the page, then read both files in Sources for a number used before
`&&`.

**Cause:** `{stock && <span>…</span>}` and `{cart.length && <ul>…</ul>}`. When the number is `0`,
`&&` returns `0`, and React prints a number. It only skips `false`, `null` and `undefined`.

**Fix:** Make the left side a real boolean:

```tsx
<p className="stock">{stock > 0 && <span>Only {stock} left</span>}</p>
```

```tsx
<aside className="cart">{cart.length > 0 && <ul>…</ul>}</aside>
```

## Bug 3: The heart moves to another product

**What I saw:** I saved the Leather Tote Bag and sorted by "Price: low to high". The heart moved to
the Wool Scarf, which is now first in the list.

**Component:** `ProductList` (the state is in `ProductCard`)

**How I found it:** Keys. Each `ProductCard` has its key next to its name in the Components tab, and
`ProductList.tsx` sets it from the index.

**Cause:** `key={index}` in `ProductList`. `saved` is state inside `ProductCard`. After sorting, the
card at key `0` is a different product, but React keeps the state for key `0`.

**Fix:** Use the product's own id, so the state follows the product:

```tsx
<ProductCard key={product.id} product={product} onAdd={onAdd} />
```

## Bug 4: "Featured" is not the original order anymore

**What I saw:** After sorting by price and going back to "Featured", the list stayed in price order
(Wool Scarf first) instead of the order from page load (Leather Tote Bag first).

**Component:** `ProductList`

**How I found it:** Props. I compared the `products` prop on `ProductList` before and after sorting,
then read the sort line in Sources.

**Cause:** `products.sort(...)` sorts the array in place, and that array is the shared `PRODUCTS`
constant. The original order is gone after the first sort.

**Fix:** Sort a copy:

```tsx
const shown = sort === "price-asc" ? [...products].sort((a, b) => a.price - b.price) : products;
```

## Bug 5: The + button does nothing, then jumps

**What I saw:** With the Canvas Backpack in the cart, I clicked + twice. It stayed at `× 1` and
`Total: $49`. After I added White Sneakers, the backpack jumped to `× 3` and the total to `$222`.

**Component:** `CartRow` (with `onChange` from `App`)

**How I found it:** State and props. The number on screen did not match `item.qty`, and nothing
re-rendered on the click. Then I read `increase` in `CartRow.tsx` and `onChange` in `App.tsx`.

**Cause:** `item.qty = item.qty + 1` changes the state object directly, then `setCart(cart)` passes
the same array. React sees the same reference and skips the render. The next real update shows the
changed numbers.

**Fix:** Let `App` build a new array, and have `CartRow` report only the id:

```tsx
function increase(id: number) {
  setCart(cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
}
```
