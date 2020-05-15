import { AppProps } from "next/app";
import { FC } from "react";
import "../styles/index.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
