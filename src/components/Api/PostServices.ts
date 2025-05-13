import { Instance } from "./api";
import { loginResponse, ILeaveRequest } from "./types";

// Login
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
    // localStorage.setItem('token', response.data.token);
    // localStorage.setItem('employeeId', response.data.employee.id);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to login'
    );
  }
}

// Check-in

export async function checkIn(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post("/attendance/check-in", { employeeId });
  return response.data;
}

// Partial Checkout
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function partialCheckout(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post("/attendance/partial-checkout", { employeeId });
  return response.data;
}

// Checkout
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function checkOut(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post("/attendance/check-out", { employeeId });
  return response.data;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAttendanceSummary(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const today = new Date().toISOString().split("T")[0];
  const response = await Instance.get(
    `/attendance/getAttendanceSummary/${employeeId}?date=${today}`
  );
  return response.data;
}

// Add Leave Request
export async function AddLeave(newLeave: FormData): Promise<ILeaveRequest> {
  try {
    const response = await Instance.post("/leaveRequest/applyLeave", newLeave, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to add Leave Request"
    );
  }
}

// Get Leaves
export async function getLeaves(): Promise<ILeaveRequest[]> {
  const response = await Instance.get("/leaveRequest/myLeaves");
  return response.data.data;
}
