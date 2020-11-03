import { signin, signout, useSession } from "next-auth/client";

const User = () => {
  const [session, loading] = useSession();
  return (
    <li>
      {!session && (
        <>
          <a
            href={`/api/auth/signin`}
            className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
            onClick={(e) => {
              e.preventDefault();
              signin();
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session && (
        <div className="flex">
          <span className="lg:p-4 py-3 px-0 block border-b-2 border-transparent">
            <strong>{session.user.email}</strong>
          </span>
          <a
            className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signout();
            }}
          >
            Sign out
          </a>
        </div>
      )}
    </li>
  );
};

export default User;
