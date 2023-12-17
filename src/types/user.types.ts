import { IFormData } from './form.types';

export interface IUser {
  username: string;
  email: string;
  token: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface IUserRequest {
  user: IFormData;
}
