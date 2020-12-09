export interface IUser {
  isLoggedIn: boolean;
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
