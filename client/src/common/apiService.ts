import React from "react";
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.API_HOST,
});

const signUp = async (userData) => {
    return API({
        method: 'POST',
        url: '/auth/signup',
        data: userData,
    })
};

export { signUp };
