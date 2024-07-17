import React from "react";
import Homepage from "./pages/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Mainlayout from "./layouts/Mainlayout";
import Loginpage from "./pages/Loginpage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EditBlogPage from "./pages/EditBlogPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserProvider } from "./UserContext";
import RegisterPage from "./pages/RegisterPage";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <RegisterPage />;
}

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route
              path="/create-blog"
              element={
                <ProtectedRoutes>
                  <CreateBlogPage />
                </ProtectedRoutes>
              }
            />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route
              path="/edit-blog/:id"
              element={
                <ProtectedRoutes>
                  <EditBlogPage />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};
export default App;
