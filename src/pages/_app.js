import styles from "@styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "@src/store";
import { ThemeProvider } from "@material-tailwind/react";
import Header from "@src/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
