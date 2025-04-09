import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Image } from '@heroui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Divider } from '../../components/divider';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { getAppsPath } from '../../utils/getAppsPath';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toastError, toastSuccess } from '../../components/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserSchema, TCreateUserInput } from '@book-toshokan/libs/domain';
import { Button, Checkbox, Input } from '@book-toshokan/libs/shared-ui';
import { authClient } from '../../auth/authClient';

export const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasTermsBeenAccepted, setHasTermsBeenAccepted] = useState(false);

  const [isRegisteringUser, setIsRegisteringUser] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';

  const { loginPage } = getAppsPath();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      password: '',
      email: email ? email : '',
    },
  });

  const password = watch('password');
  const passwordMatches = confirmPassword === password;

  const registerForm: SubmitHandler<TCreateUserInput> = async (input) => {
    await authClient.signUp.email(
      {
        name: input.username,
        email: input.email,
        password: input.password,
      },
      {
        onRequest: (ctx) => {
          setIsRegisteringUser(true);
        },
        onSuccess: (ctx) => {
          setIsRegisteringUser(false);
          toastSuccess('Created user successfully!');
          navigate('/auth/login');
        },
        onError: (ctx) => {
          console.error(ctx);
          setIsRegisteringUser(false);
          toastError(ctx.error.message);
        },
      }
    );
  };

  const toggleIsPasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleIsConfirmPasswordVisible = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <main className="flex bg-black">
      <section className="h-screen w-1/2 overflow-clip">
        <Image radius="none" width={1000} height={1000} src="/register.jpg" />
      </section>
      <section className="h-screen w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit(registerForm)}>
          <div className="w-[450px] p-6 flex flex-col gap-6 rounded-md">
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-medium text-white">Create Account</h1>
              <p className="text-gray-400 text-sm">Sign up for a new account to get started</p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Input
                color="primary"
                type="text"
                variant="underlined"
                label="Username"
                placeholder="Create your username"
                isRequired
                {...register('username')}
                isInvalid={!!errors.username?.message}
                errorMessage={errors.username?.message}
              />
              <Input
                color="primary"
                type="email"
                variant="underlined"
                label="Enter Address"
                placeholder="Enter your email"
                isRequired
                {...register('email')}
                isInvalid={!!errors.email?.message}
                errorMessage={errors.email?.message}
              />
              <Input
                color="primary"
                variant="underlined"
                type={isPasswordVisible ? 'text' : 'password'}
                label="Password"
                placeholder="Create a password"
                isRequired
                {...register('password')}
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
                isInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
              />
              <Input
                color="primary"
                variant="underlined"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                className="!placeholder:text-white"
                label="Confirm Password"
                placeholder="Confirm your password"
                isRequired
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                isInvalid={!passwordMatches}
                errorMessage={'Password doesnot match'}
              />
            </div>
            <Checkbox isRequired onChange={(e) => setHasTermsBeenAccepted(e.currentTarget.checked)}>
              I agree with the{' '}
              <span className="text-blue-500 hover:underline" onClick={(e) => e.stopPropagation()}>
                Terms & Privacy Policy
              </span>
            </Checkbox>
            <Button type="submit" color="primary" size="lg" disabled={isRegisteringUser || !hasTermsBeenAccepted}>
              {isRegisteringUser ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <p className="text-white text-center">
              Already have an account?{' '}
              <Link to={loginPage} className="text-blue-500 hover:underline">
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
