import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useSignOut } from "@/lib/react-query/mutations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TopBar = () => {
  const { user, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess: isSignedOut } = useSignOut();

  useEffect(() => {
    if (isSignedOut) {
      setIsAuthenticated(false);
      navigate("/sign_in");
    }
  }, [isSignedOut]);

  return (
    <section className="flex justify-between py-2 px-2 bg-dark-3 items-center">
      <div>
        <img
          src="assets/images/logo_withoutbg.png"
          alt="logo"
          className="h-10"
        />
      </div>
      <div className="flex">
        <Button
          variant={"ghost"}
          className="shad-button_ghost"
          onClick={() => {
            signOut();
          }}
        >
          <img src="assets/icons/Logout.svg" alt="logout" className="h-6" />
        </Button>
        <Button>
          <img
            src={user.imageUrl || "assets/icons/profile_placeholder.svg"}
            alt="profile picture"
            className="h-8 w-8 rounded-full"
          />
        </Button>
      </div>
    </section>
  );
};
export default TopBar;
