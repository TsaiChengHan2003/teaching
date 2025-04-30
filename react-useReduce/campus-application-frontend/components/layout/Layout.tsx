import Head from 'next/head';

import Navbar from '@/components/layout/Navbar';

/**
 *
 * 共用佈局
 * @param children 每頁畫面元素
 * @returns 共用佈局
 *
 * @since 1.0.0
 */

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>北商資管系 | 校園應用系統入口網站</title>
        <meta name="description" content="北商資管系校園應用系統入口網站" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}