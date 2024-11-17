import { useState } from "react";
import { Input } from "../../components/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

export const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleIsPasswordVisible = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleIsConfirmPasswordVisible = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <main className="flex">
      <section className="h-screen w-1/2 bg-red-500"></section>
      <section className="h-screen w-1/2 flex items-center justify-center">
        <form>
          <motion.div
            className="w-[450px] p-6 flex flex-col gap-4 rounded-md border"
            initial={{ x: "-100vh" }}
            animate={{ x: "0" }}
          >
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-medium">Create Account</h1>
              <p className="text-gray-400 text-sm">
                Sign up for a new account to get started.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Input
                color="primary"
                type="email"
                variant="underlined"
                placeholder="Enter your email"
              />
              <Input
                color="primary"
                variant="underlined"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Create a password"
                endContent={
                  <button
                    className="focus:outline-none p-1 hover:bg-gray-200 rounded-full ease-in-out"
                    type="button"
                    onClick={toggleIsPasswordVisible}
                    aria-label="toggle password visibility"
                  >
                    {isPasswordVisible ? (
                      <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FiEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
              <Input
                color="primary"
                variant="underlined"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm your password"
                endContent={
                  <button
                    className="focus:outline-none p-1 hover:bg-gray-200 rounded-full ease-in-out"
                    type="button"
                    onClick={toggleIsConfirmPasswordVisible}
                    aria-label="toggle password visibility"
                  >
                    {isConfirmPasswordVisible ? (
                      <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FiEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            </div>
          </motion.div>
        </form>
      </section>
    </main>
  );
};
