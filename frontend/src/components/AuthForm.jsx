import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const authFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters" }),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const token = await loginUser({
          email: data.email,
          password: data.password,
        });
        setToken(token);
      } else {
        const token = await registerUser(data);
        setToken(token);
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during submission:", error);
      setError("root", {
        message: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg text-black`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg text-black`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {errors.root && (
            <p className="text-red-500 text-center text-sm">
              {errors.root.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <div className="flex gap-4">
              Need an account ?
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-500 underline"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              Already have an account ?
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-500 underline"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
