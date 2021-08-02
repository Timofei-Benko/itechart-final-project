import JWT from 'jsonwebtoken';

export default (): boolean => {
  const token = localStorage.getItem('token');
  let decoded;

  if (token) decoded = JWT.decode(token);
  else return false;

  const currentTime: number = new Date().getTime() / 1000;

  return !(currentTime > decoded.exp);
};
