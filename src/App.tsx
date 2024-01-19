import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/Pages";
import SignupForm from "./_auth/forms/SignupForm";
import SigninForm from "./_auth/forms/SigninForm";
import { useAuthContext } from "./context/AuthContext";
import LoaderBig from "./components/shared/LoaderBig";

const App = () => {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <LoaderBig />;
  }

  return (
    <main>
      {/* Public Routes */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign_up" element={<SignupForm />} />
          <Route path="/sign_in" element={<SigninForm />} />
        </Route>

        {/* Private Routes */}

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
