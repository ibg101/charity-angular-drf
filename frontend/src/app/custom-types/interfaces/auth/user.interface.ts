export interface IUser {
  id?: number,
  email: string,
  password?: string,
  rememberMe?: boolean,
  username?: string,
  confirmPassword?: string,
  token?: string,
  documents?: [{
    name: string,
    size: number,
    content: Blob | null,
  }],
  donated?: number,
  collected?: number,
}