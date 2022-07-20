import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Users } from '../../models';
import { createToken } from '../../helpers';

export const loginPage = async (req, res) => res.render('login');

export const signinPage = async (req, res) => res.render('signin');

export const signin = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    const { name, email, contactNumber } = req.body;
    const createdAt = new Date();
    const id = v4();
    const payload = {
      id,
      name,
      email,
      contactNumber,
      password,
      createdAt,
    };

    const newUser = await Users.create(payload);
    const token = createToken(newUser.dataValues);
    res.cookie('token', token);
    return res.render('welcome');
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {

};
