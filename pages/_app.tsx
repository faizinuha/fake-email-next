import type { AppProps } from 'next/app';
import './styles/globals';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}