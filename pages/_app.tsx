import { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/index.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Header />
    <div className="px-4">
      <div className="max-w-3xl bg-white rounded-lg mx-auto my-16 p-16">
        <Component {...pageProps} />
      </div>
    </div>
  </>
);

export default MyApp;
