import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/Pages";
import SignupForm from "./_auth/forms/SignupForm";
import SigninForm from "./_auth/forms/SigninForm";

const App = () => {
  return (
    <main>
      {/* Public Routes */}
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/sign_up" element={<SignupForm />} />
          <Route path="/auth/sign_in" element={<SigninForm />} />
        </Route>

        {/* Private Routes */}

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
