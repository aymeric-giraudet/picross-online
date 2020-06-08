import { signin, signout, useSession } from "next-auth/client";

const UserBottomNav = () => {
  const [session, loading] = useSession();
  return (
    <a
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      onClick={(e) => {
        e.preventDefault();
        session ? signout() : signin();
      }}
    >
      {session ? (
        <img
          width="25"
          height="25"
          className="inline-block mb-1 rounded-full"
          src={session.user.image}
        />
      ) : (
        <div></div>
      )}
      <i width="25" height="25" class="inline-block mb-1 fas fa-camera"></i>
      <span className="tab tab-whishlist block text-xs">
        {session && session.user.name}
        {!session && loading && "Loading..."}
        {!session && !loading && "Sign in"}
      </span>
    </a>
  );
};

export default UserBottomNav;
