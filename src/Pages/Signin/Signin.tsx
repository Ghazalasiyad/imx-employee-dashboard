import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import logo from '../../assets/imx-logo.jpg';
import Field from '../../components/Field/field';
import Button from '../../components/Button/button';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/components/Api/PostServices';
import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
  email: z.string().min(1, 'Please enter email').email('Enter a valid email').max(30),
  password: z.string().min(1, 'Please enter password').max(15),
});

type SignInFormData = z.infer<typeof signInSchema>;

// ✅ Full screen loader component
const FullScreenLoader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const SignInForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('Login successful');
      navigate('/dashboard');
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(errorMessage);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    mutate(data);
  };

  return (
    <>
      {isPending && <FullScreenLoader />}
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl px-12 py-10 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Company Logo" width={160} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <div className="space-y-6">
              <Field label="Email" htmlFor="email" error={errors.email?.message}>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </Field>

              <Field
                label="Password"
                htmlFor="password"
                error={errors.password?.message}
              >
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </Field>

              <Button type="submit" disabled={isPending} className="w-full !bg-[#2c3445]">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
