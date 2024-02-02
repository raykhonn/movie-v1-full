import { http } from 'services';
import { IApi } from './types';

export const Login = (data: IApi.Login.Request) => http.post<IApi.Login.Response>('/auth', data);

export const Register = (data: IApi.Register.Request) => http.post<IApi.Register.Response>('/users', data);
  
export const Me = ({ token }: IApi.Me.Request) =>
  http.get<IApi.Me.Response>('/users/me', { headers: { 'x-auth-token': token } });
