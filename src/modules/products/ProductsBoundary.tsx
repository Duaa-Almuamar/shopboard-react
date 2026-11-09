// Loading and error handling for anything that reads the product list.
// Only this part of the page waits or fails; the rest keeps working.
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import LoadingMessage from "../../shared/ui/LoadingMessage";
import RetryMessage from "../../shared/ui/RetryMessage";
import { resetProductsCache } from "./products.cache";

interface ProductsBoundaryProps {
  loadingMessage: string;
  errorMessage: string;
  children: ReactNode;
}

export default function ProductsBoundary({
  loadingMessage,
  errorMessage,
  children,
}: ProductsBoundaryProps) {
  return (
    <ErrorBoundary
      onReset={resetProductsCache}
      fallbackRender={({ resetErrorBoundary }) => (
        <RetryMessage message={errorMessage} onRetry={resetErrorBoundary} />
      )}
    >
      <Suspense fallback={<LoadingMessage message={loadingMessage} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
