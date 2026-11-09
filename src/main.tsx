import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Shared styles first, so the feature styles can build on them
import "./styles/tailwind.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/products.css";
import "./styles/cart.css";
import "./styles/checkout.css";
import "./styles/toast.css";
import "./styles/react-root.css";
import App from "./App.tsx";
import { ApiError } from "./shared/api/client";

const root = document.getElementById("root");
if (root === null) {
  throw new Error('index.html has no element with id "root"');
}

createRoot(root, {
  // A failed request is already shown to the user by an error boundary.
  // Anything else caught by a boundary is a bug, so it still goes to the Console.
  onCaughtError: (error, info) => {
    if (!(error instanceof ApiError)) {
      console.error(error, info.componentStack);
    }
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
