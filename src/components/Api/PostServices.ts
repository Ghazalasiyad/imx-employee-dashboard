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

    // Save the token and employee data to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('employeeId', response.data.employee.id);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to login'
    );
  }
}

//check api

export async function checkIn(): Promise<any> {
  const employeeId = localStorage.getItem('employeeId');
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post(`/attendance/check-in`, { employeeId });
  return response.data;
}

export async function partialCheckout(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  return await Instance.post(`/attendance/partial-checkout`, { employeeId });
}


export async function checkOut(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post(`/attendance/check-out`, { employeeId });
  return response.data;
}