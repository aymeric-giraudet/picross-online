import UserBottomNav from "./UserBottomNav";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNav() {
  const router = useRouter();
  return (
    <section
      id="bottom-navigation"
      className="block sticky bottom-0 z-10 bg-white shadow"
    >
      <nav id="tabs" className="flex justify-between">
        <Link href="/">
          <a
            className={`w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 ${
              router.pathname === "/" ? "text-teal-500" : ""
            }`}
          >
            <i className="text-2xl inline-block mb-1 fas fa-home"></i>
            <span className="block text-xs">Home</span>
          </a>
        </Link>
        <Link href="/create">
          <a
            className={`w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 ${
              router.pathname === "/create" ? "text-teal-500" : ""
            }`}
          >
            <i className="text-2xl inline-block mb-1 fas fa-plus"></i>
            <span className="block text-xs">Create</span>
          </a>
        </Link>
        <Link href="/random">
          <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <i className="text-2xl inline-block mb-1 fas fa-random"></i>
            <span className="block text-xs">Random</span>
          </a>
        </Link>
        <UserBottomNav />
      </nav>
    </section>
  );
}
