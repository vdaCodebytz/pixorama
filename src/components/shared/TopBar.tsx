import { INITIAL_USER, useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useSignOut } from "@/lib/react-query/mutations";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TopBar = () => {
  const { user, setIsAuthenticated, setUser } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess: isSignedOut } = useSignOut();

  useEffect(() => {
    if (isSignedOut) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
    }
  }, [isSignedOut]);

  return (
    <section className="topbar">
      <div className="flex justify-between py-2 px-2  items-center">
        <Link to={"/"}>
          <img
            src="/assets/images/logo_withoutbg.png"
            alt="logo"
            className="h-10"
          />
        </Link>
        <div className="flex">
          <Button
            variant={"ghost"}
            className="shad-button_ghost"
            onClick={() => {
              signOut();
            }}
          >
            <img src="/assets/icons/Logout.png" alt="logout" className="h-6" />
          </Button>
          <Button onClick={() => navigate(`/profile${user.id}`)}>
            <img
              src={user.imageUrl || "/assets/icons/profile_placeholder.png"}
              alt="profile picture"
              className="h-8 w-8 rounded-full"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};
export default TopBar;
