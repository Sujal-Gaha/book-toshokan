import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Image } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from '../../components/divider';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { getAppsPath } from '../../utils/getAppsPath';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../data/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginUserSchema,
  TApiResponse,
  TApiError,
  TLoginUserInput,
  TLoginUserOutput,
} from '@book-toshokan/libs/domain';
import { toastError, toastSuccess } from '../../components/toast';
import { Button, Checkbox, Input } from '@book-toshokan/libs/shared-ui';
import { authClient } from '../../utils/auth';

export const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const loginMtn = useMutation<TApiResponse<TLoginUserOutput>, TApiError, TLoginUserInput>({ mutationFn: loginUser });

  const loginForm: SubmitHandler<TLoginUserInput> = async (data) => {
    try {
      await loginMtn.mutateAsync(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (data) => {
            toastSuccess(data.body.message);
            navigate('/');
          },
          onError: (error) => {
            toastError(error.body.message);
          },
        }
      );
    } catch (error) {
      console.error('error ', error);
    }
  };

  const toggleIsPasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);

  const { forgotPasswordPage, registerPage } = getAppsPath();
  return (
    <main className="flex bg-black">
      <section className="h-screen w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit(loginForm)}>
          <div className="w-[450px] p-6 flex flex-col gap-6 rounded-md">
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-medium text-white">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Log in to your account to continue</p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Input
                color="primary"
                type="email"
                variant="underlined"
                label="Enter Address"
                placeholder="Enter your email"
                {...register('email')}
                isInvalid={!!errors.email?.message}
                errorMessage={errors.email?.message}
              />
              <Input
                color="primary"
                variant="underlined"
                type={isPasswordVisible ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                {...register('password')}
                isInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
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
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>Remember me</Checkbox>
              <Link to={forgotPasswordPage} className="text-gray-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" color="primary" size="lg" disabled={loginMtn.isPending}>
              {loginMtn.isPending ? 'Logging In...' : 'Log In'}
            </Button>
            <p className="text-white text-center">
              Need to create an account?{' '}
              <Link to={registerPage} className="text-blue-500 hover:underline">
                Sign Up
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
                  <span>Continue with Google</span>
                </div>
              </Button>
              <Button variant="bordered" type="button" color="default">
                <div className="flex items-center gap-2">
                  <FaGithub />
                  <span>Continue with Github</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </section>
      <section className="h-screen w-1/2 overflow-clip">
        <Image radius="none" width={1000} height={1000} src="/register.jpg" />
      </section>
    </main>
  );
};
