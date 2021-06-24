const PASSWORD_VALIDATION = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const ALREADY_SIGNED_UP: string = 'it appears that you already have an account, try signing in';
const INVALID_PASSWORD_FORMAT: string = `password must be at least 9 characters long, contain upper-, lowercase letters and special symbols`;
const PASSWORDS_DO_NOT_MATCH: string = 'passwords do not match';
const INVALID_PASSWORD: string = 'password is incorrect';
const INVALID_EMAIL: string = 'user with this email does not exist';

const ERRORS = {
    ALREADY_SIGNED_UP,
    INVALID_PASSWORD_FORMAT,
    PASSWORDS_DO_NOT_MATCH,
    INVALID_PASSWORD,
    INVALID_EMAIL,
};

export {
    ERRORS,
    PASSWORD_VALIDATION
};
