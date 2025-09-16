export interface LoginResponse {
  user: { id: string; name: string; email: string }; // adjust to your user model
  token: string;
}