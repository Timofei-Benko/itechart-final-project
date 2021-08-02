import JWT, { JwtPayload } from 'jsonwebtoken';
import isTokenFresh from './isTokenFresh';
import * as apiService from '../apiService';
import { LS_USER_ID } from '../config/constants';

type useAuth = {
  isSignedIn: boolean;
  token: string | null;
};

export default async (): Promise<Partial<useAuth>> => {
  const userId = localStorage.getItem(LS_USER_ID);
  if (userId) {
    let token = localStorage.getItem('token');
    const decoded = JWT.decode(token as string) as JwtPayload;
    if (!isTokenFresh() && decoded.id === userId) {
      const response = await apiService.reauthenticate(userId);
      localStorage.setItem('token', response.data.token);
      token = response.data.token;
    }
    return {
      isSignedIn: true,
      token,
    };
  }
  return {
    isSignedIn: false,
  };
};
