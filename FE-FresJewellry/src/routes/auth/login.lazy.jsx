import * as React from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactLoading from "react-loading";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export const Route = createLazyFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log("Login successful with:", formData);
      setIsLoading(false);
      navigate({ to: "/" });
    }, 1500);
  };

  const isFormFilled =
    formData.emailOrPhone.trim() !== "" && formData.password.trim() !== "";

  return (
    <main className="bg-white h-screen flex items-center justify-center">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src="/logoprimary.svg"
            alt="Pattern Background"
            className="absolute inset-0 w-full h-full object-cover filter blur-[1px]"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="w-2/3">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="emailOrPhone"
                  className="mb-2 text-gray-700 block"
                >
                  Email/Phone Number
                </label>
                <Input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  placeholder="Example: johndee@gmail.com"
                  className="p-3 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#85986d]"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 text-gray-700 block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    className="p-3 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#85986d]"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full rounded-lg mt-3 bg-[#CB9531] text-white h-12 hover:bg-[#6C4C35] transition-all duration-300"
                disabled={!isFormFilled || isLoading}
              >
                {isLoading ? (
                  <ReactLoading
                    type="spin"
                    color="#FFFFFF"
                    height={24}
                    width={24}
                    className="mx-auto"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/auth/register"
                className="text-[#CB9531] font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
