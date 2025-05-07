export interface loginResponse {
    token: string;
    user: {
      email: string;
      password: string;
    };
  }