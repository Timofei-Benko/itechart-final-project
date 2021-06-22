import axios from 'axios';

const API = axios.create({
    baseURL: `http://localhost:5000/api`,
});

const signUp = async (userData): Promise<void> => {
    await API({
        method: 'POST',
        url: '/auth/signup',
        data: userData,
    });
};

export { signUp };
