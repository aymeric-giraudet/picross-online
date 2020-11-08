import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Provider } from "next-auth/client";

import "../styles/index.css";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <Head>
      <title>Picross Online</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#72B340" />
      <meta name="description" content="Play Picross on any device, any time" />
    </Head>
    <TopProgressBar />
    <Header />
    <main className="max-w-6xl flex-1 bg-white rounded-lg mx-auto my-4 p-4 text-center">
      <Component {...pageProps} />
    </main>
    <BottomNav />
  </Provider>
);

export default MyApp;
