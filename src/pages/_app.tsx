import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  const queryClient = new QueryClient();
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-gray-100">
      <QueryClientProvider client={queryClient}>
        {Component.PageLayout ? (
          /* @ts-ignore */
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </div>
  );
}
