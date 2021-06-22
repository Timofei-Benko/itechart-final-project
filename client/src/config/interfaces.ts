export interface ISignUpUserData {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    passwordConfirmation?: string,
    username?: string,
    position?: string,
    experience?: number,
    languages?: (string | undefined)[],
}
