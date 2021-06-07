interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordHash: string;
    username?: string;
    position?: string;
    experience?: number;
    languages?: Array<string>;
}

export = IUser;
