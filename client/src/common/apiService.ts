import axios from 'axios';
import routes from "./config/routes";

const token: string | null = localStorage.getItem('token');

const API = axios.create({
    baseURL: process.env.API_HOST,
});

const signUp = async (userData) => {
    return API({
        method: 'POST',
        url: routes.users.signUp,
        data: {
            user: userData,
        },
    })
};

const signIn = async (userData) => {
    return API({
        method: 'POST',
        url: routes.users.signIn,
        data: {
            user: userData,
        },
    })
};

const reauthenticate = async (userId) => {
    return API({
        method: 'POST',
        url: routes.users.reauthenticate(userId),
    });
}

const getUser = async (userId) => {
    return API({
        method: 'GET',
        url: routes.users.getOne(userId),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export {
    signUp,
    signIn,
    reauthenticate,
    getUser,
};
