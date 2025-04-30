import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '@/components/common/Loading';
import { usePageLoading } from '@/lib/hooks/usePageLoading';
import '@/styles/main.scss';
import AuthProvider from '@/lib/context/authContext';

export default function App({
  Component,
  'pageProps': { session, ...pageProps },
}: AppProps) {
  const { isPageLoading } = usePageLoading();

  return (
    isPageLoading ? <Loading /> :
      <SessionProvider session={session}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SessionProvider>
  );
}