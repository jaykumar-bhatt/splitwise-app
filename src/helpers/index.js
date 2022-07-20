import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const createToken = (data) => {
  const newObj = {
    id: data.id,
    email: data.email,
    contactNumber: data.contactNumber,
  };
  const token = jwt.sign(newObj, process.env.SECRET, { expiresIn: '12h' });
  return token;
};
