import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Shared styles first, so the feature styles can build on them
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/products.css";
import "./styles/cart.css";
import "./styles/toast.css";
import "./styles/react-root.css";
import App from "./App.tsx";

const root = document.getElementById("root");
if (root === null) {
  throw new Error('index.html has no element with id "root"');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
