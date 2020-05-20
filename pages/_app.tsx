import { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import "../styles/index.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Picross Online</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#72B340" />
      <meta
        name="description"
        content="Play Picross on any device, any time"
      />
    </Head>
    <Header />
    <div className="px-4">
      <div className="max-w-3xl table bg-white rounded-lg mx-auto my-4 p-4">
        <Component {...pageProps} />
      </div>
    </div>
  </>
);

export default MyApp;
