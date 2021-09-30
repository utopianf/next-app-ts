import "styles/globals.css";
import "styles/ress.css";

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} style={{ padding: 0, margin: 0 }} />
  );
}

export default MyApp;
