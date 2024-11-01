// pages/_app.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import { CartContextProvider } from '@/components/CartContext';
import Loader from '@/components/Loader'; // Import your Loader component
import { Analytics } from '@vercel/analytics/react';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif; // Only include Montserrat since it's now in _document.js
  }
`;

export default function App({ Component, pageProps }) {
  const router = useRouter(); // Use useRouter here
  const [loading, setLoading] = useState(false);
  const Pixel_ID = "1730396151061539"

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  useEffect(() => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      // Initialize Facebook Pixel
      !function(f,b,e,v,n,t,s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', Pixel_ID); // Replace with your Pixel ID
      console.log("process?: ", Pixel_ID)
      fbq('track', 'PageView');

      // Track route changes as page views
      const handleRouteChange = (url) => {
        fbq('track', 'PageView', { page: url });
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      <GlobalStyles />
      {loading && <Loader />} {/* Show loader when loading */}
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
      <Analytics />
    </>
  );
}
