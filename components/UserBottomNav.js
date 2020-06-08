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
          className="inline-block mb-1 rounded-full h-6 w-6"
          src={session.user.image}
        />
      ) : (
        <i className="text-2xl inline-block mb-1 fas fa-user"></i>
      )}
      <span className="block text-xs">
        {session && session.user.name}
        {!session && loading && "Loading..."}
        {!session && !loading && "Sign in"}
      </span>
    </a>
  );
};

export default UserBottomNav;
