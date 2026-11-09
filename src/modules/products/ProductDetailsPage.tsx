import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, useParams } from "react-router";

import { ApiError } from "../../shared/api/client";
import LoadingMessage from "../../shared/ui/LoadingMessage";
import RetryMessage from "../../shared/ui/RetryMessage";
import ProductDetails from "./ProductDetails";
import ProductNotFound from "./ProductNotFound";
import { resetProductsCache } from "./products.cache";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const id = Number(productId);

  return (
    <section className="products">
      <Link className="back-link" to="/products">
        Back to products
      </Link>
      {Number.isInteger(id) && id > 0 ? (
        <ErrorBoundary
          onReset={resetProductsCache}
          fallbackRender={({ error, resetErrorBoundary }) =>
            // Trying again cannot help when the product does not exist
            error instanceof ApiError && error.status === 404 ? (
              <ProductNotFound />
            ) : (
              <RetryMessage
                message="This product could not be loaded."
                onRetry={resetErrorBoundary}
              />
            )
          }
        >
          <Suspense fallback={<LoadingMessage message="Loading product…" />}>
            <ProductDetails id={id} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <ProductNotFound />
      )}
    </section>
  );
}
