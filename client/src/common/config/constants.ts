const PASSWORD_VALIDATION =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const ALREADY_SIGNED_UP =
  'it appears that you already have an account, try signing in';
const INVALID_PASSWORD_FORMAT = `password must be at least 9 characters long, contain upper-, lowercase letters and special symbols`;
const PASSWORDS_DO_NOT_MATCH = 'passwords do not match';
const INVALID_PASSWORD = 'password is incorrect';
const INVALID_EMAIL = 'user with this email does not exist';

const LS_USER_ID = 'user_id';

const ERRORS = {
  ALREADY_SIGNED_UP,
  INVALID_PASSWORD_FORMAT,
  PASSWORDS_DO_NOT_MATCH,
  INVALID_PASSWORD,
  INVALID_EMAIL,
};

export { ERRORS, PASSWORD_VALIDATION, LS_USER_ID };
