import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/Pages";
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
