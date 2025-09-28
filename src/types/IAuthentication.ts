// IUser
export interface IUser {
  _id: string;
  email: string;
  password?: string;
  name?: string;
}
// IAuthState
export interface IAuthState {
  token: string | null;
  email: string | null;
  user: IUser | null; 
  loading: boolean;
  error: string | null;
}
// Login Response
export interface ILoginResponse {
  token: string;
  email: string;
}
