import Link from "next/link";
import User from "./User";
import picross from "./Picross.svg";

const Header: React.FC = () => (
  <>
    <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 inline-flex items-center">
        <Link href="/">
          <a>
            <img src={picross} width={32} height={32} />
          </a>
        </Link>
        <Link href="/">
          <a className="font-semibold text-xl tracking-tight px-4">
            Picross Online
          </a>
        </Link>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
            <li>
              <Link href="/about">
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  About
                </a>
              </Link>
            </li>
            <User />
          </ul>
        </nav>
      </div>
    </header>
  </>
);

export default Header;
