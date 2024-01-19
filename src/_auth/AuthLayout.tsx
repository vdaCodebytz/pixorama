import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Already signed in",
        description: "Please logout first",
      });
      navigate("/");
      return;
    }
  }, []);

  return (
    <>
      <section className="flex">
        <div className="flex flex-1 justify-center items-center">
          <Outlet />
        </div>
        <img
          src="assets\images\auth-side-img-dark.jpg"
          alt=""
          className="hidden lg:block h-screen w-3/5 object-cover bg-no-repeat"
        />
      </section>
    </>
  );
};
export default AuthLayout;
