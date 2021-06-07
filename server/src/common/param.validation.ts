const isValidPassword = (password: string): boolean => password.length > 4;

const isValidEmail = (email: string): boolean => {
    const REG_EXP: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return REG_EXP.test(email);
};