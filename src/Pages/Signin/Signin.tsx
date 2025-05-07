import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import logo from '../../assets/imx-logo.jpg';
import Field from '../../components/Field/field';
import Button from '../../components/Button/button';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/components/Api/PostServices';
// import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter email')
    .email('Enter a valid email')
    .max(30, 'Email should not exceed 30 characters'),
  password: z
    .string()
    .min(1, 'Please enter password')
    .max(15, 'Password should not exceed 15 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();


  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('Login successful');
      // navigate('/dashboard');
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
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
    // setError(null);
  };
  return (
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
            <Field  label="Email" htmlFor="email" error={errors.email?.message}>
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

            <Button type="submit" variant="primary" className="w-full !bg-[#2c3445]">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
