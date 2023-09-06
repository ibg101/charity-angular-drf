export interface IUser {
  id?: number,
  email: string,
  password: string,
  rememberMe?: boolean,
  username?: string,
  confirmPassword?: string,
  authtoken?: string,
}