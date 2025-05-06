import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import logo from '../../assets/imx logo.jpg';
import Field from '../../components/Field/field';
import Button from '../../components/Button/button';

// Validation schema
const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter email')
    .email()
    .max(30, 'Email should not be greater than 30 characters.'),
  password: z
    .string()
    .min(1, 'Please enter password')
    .max(15, 'Password should not be greater than 15 characters.'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm: React.FC = () => {

  
  const [error, setError] = useState<string | null>(null);

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    setError(null);
    console.log(data);
   
  };

  return (
    <div className=" h-screen w-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-lg rounded-xl px-30 py-20  max-w-full"> 
    <div className="flex justify-center mb-10">
      <img src={logo} alt="Company Logo" width={200} />
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
      )}

      <div className="space-y-4">
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register('password')}
              className="w-full px-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
            />
            
          </div>
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
