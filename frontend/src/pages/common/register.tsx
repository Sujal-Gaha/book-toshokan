import { useState } from "react";
import { Input } from "../../components/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Image } from "@nextui-org/react";
import { Button } from "../../components/button";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/checkbox";
import { Divider } from "../../components/divider";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleIsPasswordVisible = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleIsConfirmPasswordVisible = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <main className="flex bg-black">
      <section className="h-screen w-1/2 overflow-clip">
        <Image radius="none" width={1000} height={1000} src="/register.jpg" />
      </section>
      <section className="h-screen w-1/2 flex items-center justify-center">
        <form>
          <div className="w-[450px] p-6 flex flex-col gap-6 rounded-md">
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-medium text-white">Create Account</h1>
              <p className="text-gray-400 text-sm">
                Sign up for a new account to get started.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Input
                color="primary"
                type="email"
                variant="underlined"
                label="Enter Address"
                placeholder="Enter your email"
                isRequired
              />
              <Input
                color="primary"
                variant="underlined"
                type={isPasswordVisible ? "text" : "password"}
                label="Password"
                placeholder="Create a password"
                isRequired
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleIsPasswordVisible}
                    aria-label="toggle password visibility"
                  >
                    {isPasswordVisible ? (
                      <FiEyeOff className="text-2xl text-gray-400 hover:text-white ease-soft-spring" />
                    ) : (
                      <FiEye className="text-2xl text-gray-400 hover:text-white ease-soft-spring" />
                    )}
                  </button>
                }
              />
              <Input
                color="primary"
                variant="underlined"
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="!placeholder:text-white"
                label="Confirm Password"
                placeholder="Confirm your password"
                isRequired
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleIsConfirmPasswordVisible}
                    aria-label="toggle password visibility"
                  >
                    {isConfirmPasswordVisible ? (
                      <FiEyeOff className="text-2xl text-gray-400 hover:text-white ease-soft-spring" />
                    ) : (
                      <FiEye className="text-2xl text-gray-400 hover:text-white ease-soft-spring" />
                    )}
                  </button>
                }
              />
            </div>
            <Checkbox>
              I agree with the{" "}
              <span
                className="text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Terms
              </span>{" "}
              and{" "}
              <span
                className="text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </span>
            </Checkbox>
            <div>
              <Button type="submit" color="blue" size="lg">
                Sign Up
              </Button>
            </div>
            <p className="text-white text-center">
              Already have an account?{" "}
              <Link
                to={"/auth/login"}
                className="text-blue-500 hover:underline"
              >
                Log In
              </Link>
            </p>
            <div className="flex items-center gap-2">
              <Divider />
              <span className="text-gray-300 text-sm">OR</span>
              <Divider />
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="bordered" type="button" color="default">
                <div className="flex items-center gap-2">
                  <FaGoogle />
                  <span>Sign Up with Google</span>
                </div>
              </Button>
              <Button variant="bordered" type="button" color="default">
                <div className="flex items-center gap-2">
                  <FaGithub />
                  <span>Sign Up with Github</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};
