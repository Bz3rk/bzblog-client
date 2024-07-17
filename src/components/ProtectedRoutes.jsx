import { Navigate } from "react-router-dom";
import { TOKEN } from "../constant";
import { useState, useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState("d");

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const auth = async () => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      return;
    }
  };

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
