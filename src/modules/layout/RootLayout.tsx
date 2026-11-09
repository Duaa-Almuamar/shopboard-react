import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, ScrollRestoration, useLocation } from "react-router";

import LoadingMessage from "../../shared/ui/LoadingMessage";
import RetryMessage from "../../shared/ui/RetryMessage";
import Toast from "../../shared/ui/Toast";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <main>
        {/* If a page fails to open, the header and footer stay usable */}
        <ErrorBoundary
          resetKeys={[pathname]}
          fallbackRender={() => (
            // A page file that failed to download is only fetched again by a reload
            <RetryMessage
              message="This page could not be opened."
              onRetry={() => window.location.reload()}
            />
          )}
        >
          {/* The key gives each page its own boundary, so opening one shows the loading message */}
          <Suspense key={pathname} fallback={<LoadingMessage message="Loading page…" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <Toast />
      <ScrollRestoration />
    </>
  );
}
