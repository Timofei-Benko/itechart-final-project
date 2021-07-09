import axios, { AxiosResponse } from 'axios';
import routes from "./config/routes";

import { ISignUpUserData } from './config/interfaces';

const token: string | null = localStorage.getItem('token');

const API = axios.create({
    baseURL: process.env.API_HOST,
});

const signUp = async (userData: ISignUpUserData): Promise<AxiosResponse> => {
    return API({
        method: 'POST',
        url: routes.users.signUp(),
        data: {
            user: userData,
        },
    })
};

const signIn = async (userData: { email: string, password: string }): Promise<AxiosResponse> => {
    return API({
        method: 'POST',
        url: routes.users.signIn(),
        data: {
            user: userData,
        },
    })
};

const reauthenticate = async (userId: string): Promise<AxiosResponse> => {
    return API({
        method: 'GET',
        url: routes.users.reauthenticate(userId),
    });
};

const getUser = async (userId: string): Promise<AxiosResponse> => {
    return API({
        method: 'GET',
        url: routes.users.getOne(userId),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const getAllQuestions = async (queryParam: string): Promise<AxiosResponse> => {
    return API({
        method: 'GET',
        url: routes.questions.getAll(queryParam),
    })
};

const getAllUserQuestions = async (userId: string, queryParam: string): Promise<AxiosResponse> => {
    return API({
        method: 'GET',
        url: routes.questions.getAllByUserId(userId, queryParam),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

export {
    signUp,
    signIn,
    reauthenticate,
    getUser,
    getAllQuestions,
    getAllUserQuestions,
};
