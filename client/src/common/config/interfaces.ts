import rootReducer from '../../redux/rootReducer';

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

export type RootState = ReturnType<typeof rootReducer>;

export interface IQuestionsState {
    current: {
        loading: boolean,
        data: Array<any>,
        error: string,
    }
}

