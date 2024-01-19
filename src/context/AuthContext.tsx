import { getCurrentUser } from "@/lib/appwrite/auth";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  username: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuth: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          username: currentUser.username,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      navigate("/sign_in");
      return;
    }
    checkAuth();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
