const User = require('./user.model');
import IUser = require('./user.interface');

const getSafeResponse = (
  userData: IUser
): Omit<IUser, 'password' | 'passwordHash'> => {
  const {
    _id,
    firstName,
    lastName,
    email,
    username,
    position,
    experience,
    languages,
    questionQty,
    answerQty,
    likedAnswerQty,
    bestAnswerQty,
  } = userData;

  return {
    _id,
    firstName,
    lastName,
    email,
    username,
    position,
    experience,
    languages,
    questionQty,
    answerQty,
    likedAnswerQty,
    bestAnswerQty,
  };
};

const isValidPassword = (password: string): boolean => password.length > 4;

const isValidEmail = (email: string): boolean => {
  const REG_EXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return REG_EXP.test(email);
};

const exists = async (filter: object): Promise<boolean> => User.exists(filter);

const create = async (userData: IUser): Promise<IUser> => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    passwordHash: userData.passwordHash,
    username: userData.username,
    position: userData.position,
    experience: userData.experience,
    languages: userData.languages,
  });
  await user.save();
  return user;
};

const getOne = async (filter: object): Promise<IUser & { _id: string }> =>
  User.findOne(filter);

const updateStats = async (
  userId: string | IUser,
  statsItem: string
): Promise<void> => {
  const user = await User.findOne({ _id: userId });
  await User.findOneAndUpdate(
    { _id: userId },
    {
      [statsItem]: user[statsItem] + 1,
    }
  );
};

const deleteOneById = async (filter: object): Promise<void> =>
  User.findByIdAndDelete(filter);

export = {
  getSafeResponse,
  isValidPassword,
  isValidEmail,
  exists,
  create,
  deleteOneById,
  getOne,
  updateStats,
};
