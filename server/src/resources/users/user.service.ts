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

const getOne = async (filter: object): Promise<IUser> => User.findOne({ filter }).exec();

const deleteOneById = async (userId: string): Promise<void> => User.findByIdAndDelete({_id: userId});

module.exports = {
    getSafeResponse,
    exists,
    create,
    deleteOneById,
    getOne,
}
