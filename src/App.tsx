import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import RootLayout from "./modules/layout/RootLayout";

// Each page is a separate file that downloads the first time it is opened
const HomePage = lazy(() => import("./modules/home/HomePage"));
const ProductsPage = lazy(() => import("./modules/products/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./modules/products/ProductDetailsPage"));
const CartPage = lazy(() => import("./modules/cart/CartPage"));
const CheckoutPage = lazy(() => import("./modules/checkout/CheckoutPage"));
const RegisterPage = lazy(() => import("./modules/register/RegisterPage"));
const NotFoundPage = lazy(() => import("./modules/not-found/NotFoundPage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
