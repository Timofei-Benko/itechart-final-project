const User = require('./user.model');
import IUser = require('./user.interface');

const getSafeResponse = (reqBody: IUser): Partial<IUser> => {
    const {
        firstName,
        lastName,
        email,
        username,
        position,
        experience,
        languages
    } = reqBody;

    return {
        firstName,
        lastName,
        email,
        username,
        position,
        experience,
        languages
    };
};

const isValidPassword = (password: string): boolean => password.length > 4;

const isValidEmail = (email: string): boolean => {
    const REG_EXP: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return REG_EXP.test(email);
};

const exists = async (filter: object): Promise<boolean> => User.exists(filter);

const create = async (userData: IUser): Promise<void> => {
    const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        passwordHash: userData.passwordHash,
        username: userData.username,
        position: userData.position,
        experience: userData.experience,
        languages: userData.languages
    });
    await user.save();
}

const getOne = async (filter: object): Promise<IUser & { _id: string }> => User.findOne(filter).exec();

const deleteOneById = async (filter: object): Promise<void> => User.findByIdAndDelete(filter);

export = {
    getSafeResponse,
    isValidPassword,
    isValidEmail,
    exists,
    create,
    deleteOneById,
    getOne,
};
