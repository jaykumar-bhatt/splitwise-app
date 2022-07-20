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
    return res.send(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email }, attributes: ['email', 'id', 'contactNumber', 'password'],
    });

    if (!user) {
      return res.send('Invalid credential.');
    }

    const result = await bcrypt.compare(password, user.dataValues.password);
    if (!result) {
      return res.send('Invalid credential.');
    }

    const token = createToken(user.dataValues);
    res.cookie('token', token);

    return res.render('welcome');
  } catch (error) {
    return res.send(error);
  }
};
