import * as React from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactLoading from "react-loading";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAuthStore } from "@/store/authStore";
import ErrorModal from "@/components/ErrorModal/ErrorModal";

export const Route = createLazyFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    profilePicture: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name === "password" || name === "confirmPassword") {
      const updatedForm = { ...formData, [name]: value };
      if (
        updatedForm.password &&
        updatedForm.confirmPassword &&
        updatedForm.password !== updatedForm.confirmPassword
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setApiError("");
    setShowErrorModal(false);

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.address,
        formData.phoneNumber,
        formData.profilePicture
      );

      // hanya navigasi jika register berhasil
      console.log("Registration successful with:", formData);
      navigate({ to: "/auth/login" });
    } catch (error) {
      console.error("Registration failed:", error);

      if (
        error.response &&
        error.response.data &&
        error?.response?.data?.message
      ) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Registration failed. Please try again.");
      }
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormFilled =
    formData.name.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.phoneNumber.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.profilePicture !== null &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

  return (
    <main className="bg-white h-screen flex items-center justify-center overflow-hidden">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src="/logoprimary.svg"
            alt="Pattern Background"
            className="absolute inset-0 w-full h-full object-cover filter blur-[1px]"
          />
        </div>
        <div className="flex items-center justify-center flex-col p-4">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 text-gray-700 block text-sm"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="p-2 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#85986d] text-sm"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-1 text-gray-700 block text-sm"
                >
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="p-2 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#85986d] text-sm"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1 text-gray-700 block text-sm"
                >
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Example: 081234567890"
                  className="p-2 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#85986d] text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-gray-700 block text-sm"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Example: johndee@gmail.com"
                  className="p-2 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#CB9531] text-sm"
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label
                  htmlFor="profilePicture"
                  className="mb-1 text-gray-700 block text-sm"
                >
                  Profile Picture
                </label>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="p-1 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#CB9531] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#CB9531] file:text-white hover:file:bg-[#6C4C35]"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 text-gray-700 block text-sm"
                >
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
                    className="p-2 border rounded-lg w-full transition-all duration-300 border-gray-300 focus:border-[#85986d] text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEye size={18} />
                    ) : (
                      <IoMdEyeOff size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 text-gray-700 block text-sm"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`p-2 border rounded-lg w-full transition-all duration-300 text-sm ${
                      passwordError
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-[#CB9531]"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IoMdEye size={18} />
                    ) : (
                      <IoMdEyeOff size={18} />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>

              {/* Error message */}
              {apiError && (
                <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">
                  {apiError}
                </p>
              )}

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full rounded-lg mt-2 bg-[#CB9531] text-white h-10 hover:bg-[#6C4C35] transition-all duration-300 text-sm"
                disabled={!isFormFilled || isLoading}
              >
                {isLoading ? (
                  <ReactLoading
                    type="spin"
                    color="#FFFFFF"
                    height={20}
                    width={20}
                    className="mx-auto"
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-[#CB9531] font-semibold hover:underline"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Registration Error"
        message={apiError}
      />
    </main>
  );
}

export default Register;
