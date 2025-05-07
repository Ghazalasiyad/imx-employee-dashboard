import { Instance } from "./api";
import { loginResponse } from "./types";

export async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<loginResponse> {
    try {
      const response = await Instance.post(`/employee/login`, { email, password });
      localStorage.setItem('isAuthenticated', 'true');
  
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to login',
      );
    }
  }