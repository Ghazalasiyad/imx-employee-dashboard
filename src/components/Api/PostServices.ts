import { Instance } from "./api";
import { loginResponse, ILeaveRequest } from "./types";

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


// start break
export async function StartBreak(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post("/attendance/start-break", { employeeId });
  return response.data;
}

// end break
export async function endBreak(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post("/attendance/end-break", { employeeId });
  return response.data;
}


// Checkout
export async function checkOut(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const response = await Instance.post("/attendance/check-out", { employeeId });
  return response.data;
}


export async function getAttendanceSummary(): Promise<any> {
  const employeeId = localStorage.getItem("employeeId");
  if (!employeeId) {
    throw new Error("Employee ID not found");
  }

  const today = new Date().toISOString().split("T")[0];
  const response = await Instance.get(
    `/attendance/summary/${employeeId}`
  );
  return response.data.data;
}

export async function AddLeave(newLeave: FormData): Promise<ILeaveRequest> {
  try {
    const response = await Instance.post("/leaveRequest/applyLeave", newLeave, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to add Leave Request"
    );
  }
}

export async function getLeaves(): Promise<ILeaveRequest[]> {
  const response = await Instance.get("/leaveRequest/myLeaves");
  return response.data.data;
}
