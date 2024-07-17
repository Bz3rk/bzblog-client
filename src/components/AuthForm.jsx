import React, { useState } from "react";
import { FaEnvelope, FaUserLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { TOKEN } from "../constant";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";

const AuthForm = ({ route, method }) => {
  // State to manage form input values
  const { setUser } = useUser();
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const customId = "custom-id-yes";

  const formName = method === "login" ? "Login" : "Register";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const res = await api.post(route, { email, password, confirmPassword });

      if (method === "login") {
        localStorage.setItem(TOKEN, res.data.token);

        setUser(res.data.userData.email);
        navigate("/");
        if (user) {
          toast.success(`hey 👋 ${user}`, {
            position: "top-center",
            toastId: customId,
            draggablePercent: 60,
          });
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error(` ${error.message}`, {
        position: "top-center",
        toastId: customId,
        draggablePercent: 60,
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex rounded-3xl items-center max-w-auto drop-shadow-2xl bg-white">
        <div className="hidden md:block w-1/2">
          <img className="px-2 my-4 rounded-3xl" src="img/login3.png" alt="" />
        </div>
        <div className="w-full space-y-12 m-6 md:m-2 md:space-y-2 md:w-1/2">
          <h1 className="text-2xl font-semibold text-primary-600 font-sans text-center">
            {formName}
          </h1>
          <form className="m-2 space-y-6" onSubmit={handleSubmit}>
            <div className="r">
              <label className="italic font-medium text-sm" htmlFor="email">
                Email
              </label>
              <div className="flex items-center shadow font-light pr-4 w-full rounded-e-sm">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <FaEnvelope className="text-sm text-primary-400" />
              </div>
            </div>
            <div className="">
              <label className="italic font-medium text-sm" htmlFor="password">
                Password
              </label>
              <div className="flex items-center shadow font-light pr-4 w-full rounded-e-sm">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <FaUserLock className="text-sm text-primary-400" />
              </div>
            </div>
            {method !== "login" && (
              <div className="">
                <label
                  className="italic text-sm font-medium"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="flex items-center shadow font-light pr-4 w-full rounded-e-sm">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    className="input"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <FaUserLock className="text-sm text-primary-400" />
                </div>
              </div>
            )}
            <center className="space-y-2">
              {method === "register" ? (
                <div>
                  <button
                    disabled={isLoading}
                    className={`rounded-sm p-1 text-white w-full font-sans font-medium italic ${
                      isLoading ? "bg-primary-200" : "bg-primary-600"
                    }`}
                    type="submit"
                  >
                    Sign up
                  </button>
                  <p className="text-sm py-2">
                    Already have an account{" "}
                    <span>
                      <Link
                        to={"/login"}
                        className="text-primary-600 font-medium italic ml-4"
                      >
                        Sign in
                      </Link>
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    disabled={isLoading}
                    className={`rounded-sm p-1 text-white w-full font-sans font-medium italic ${
                      isLoading ? "bg-primary-200" : "bg-primary-600"
                    }`}
                    type="submit"
                  >
                    Sign in
                  </button>
                  <p className="text-sm my-2">
                    Don't have an account{" "}
                    <span>
                      <Link
                        to={"/register"}
                        className="text-primary-600 font-medium italic ml-4"
                      >
                        Sign up
                      </Link>
                    </span>
                  </p>
                </div>
              )}
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
