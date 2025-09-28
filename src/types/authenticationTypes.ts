// types/authenticationTypes.ts

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string; // optional in responses
  phone?: string;
  dob?: string;
  genderId?: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

// ===== Register Response =====
export interface IRegisterResponse {
  token: string;
  user: IUser;
}

// ===== Auth State =====
export interface IAuthState {
  token: string | null;
  email: string | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
}
