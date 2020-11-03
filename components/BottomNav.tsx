import UserBottomNav from "./UserBottomNav";

const BottomNav = () => (
  <section
    id="bottom-navigation"
    className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
  >
    <nav id="tabs" className="flex justify-between">
      <a
        href="#"
        className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <i className="text-2xl inline-block mb-1 fas fa-home"></i>
        <span className="block text-xs">Home</span>
      </a>
      <a
        href="#"
        className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <i className="text-2xl inline-block mb-1 fas fa-search"></i>
        <span className="block text-xs">Explore</span>
      </a>
      <a
        href="#"
        className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <i className="text-2xl inline-block mb-1 fas fa-random"></i>
        <span className="block text-xs">Random</span>
      </a>
      <UserBottomNav />
    </nav>
  </section>
);

export default BottomNav;
