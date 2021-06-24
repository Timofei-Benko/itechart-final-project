import JWT, { JwtPayload } from 'jsonwebtoken';

import isTokenValid from './isTokenValid';
import isSignedIn from "./isSignedIn";
import * as apiService from "../apiService";

export default async (): Promise<void> => {
    if (isSignedIn()) {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        const decoded = JWT.decode(token as string) as JwtPayload;

        if (!isTokenValid() && decoded.id === userId) {
            const response = await apiService.reauthenticate(userId);
            localStorage.setItem('token', response.data.token);
        }
    }
};