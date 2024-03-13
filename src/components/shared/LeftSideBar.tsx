import { sidebarLinks } from "@/constants";
import { INITIAL_USER, useAuthContext } from "@/context/AuthContext";
import { nameTruncate } from "@/lib/helper";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOut } from "@/lib/react-query/mutations";
import { useEffect } from "react";
import Loader from "./Loader";

const LeftSideBar = () => {
  const { user, setIsAuthenticated, setUser } = useAuthContext();
  const { pathname } = useLocation();
  const {
    mutate: signOut,
    isSuccess: isSignedOut,
    isPending: isSigningOut,
  } = useSignOut();

  useEffect(() => {
    if (isSignedOut) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
    }
  }, [isSignedOut]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={"/"}>
          <img
            src="/assets/images/logo_withoutbg.png"
            alt="logo"
            className="h-12"
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || "assets/icons/profile_placeholder.png"}
            alt="profile picture"
            className="h-11 w-11 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="body-bold">{nameTruncate(user.name)}</h2>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <Link
                  to={link.route}
                  className={`shad-button_ghost py-2 px-2 ${
                    isActive && "invert-white"
                  }`}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="group-hover:invert-white h-6"
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => {
          signOut();
        }}
      >
        {isSigningOut ? (
          <>
            <Loader />
            Loading
          </>
        ) : (
          <>
            <img src="/assets/icons/Logout.png" alt="logout" className="h-6" />
            <p className="">Logout</p>
          </>
        )}
      </Button>
    </nav>
  );
};
export default LeftSideBar;
