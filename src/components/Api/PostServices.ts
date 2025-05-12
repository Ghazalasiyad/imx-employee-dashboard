import { Instance } from "./api";
import { loginResponse,ILeaveRequest } from "./types";


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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to login',
      );
    }
  }




//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
 export async function AddLeave(newLeave: FormData): Promise<ILeaveRequest > {
  try {
    const response = await Instance.post(`/leaveRequest/applyLeave`, newLeave, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to add Leave Request',
    );
  }
}






// export async function AddLeave(newLeave: FormData): Promise<any> {
//   try {
//     const token = localStorage.getItem("token"); // or sessionStorage, depending on where you store it

//     const response = await Instance.post(`/leaveRequest/applyLeave`, newLeave, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || error.message || 'Failed to add Leave Request'
//     );
//   }
// }
