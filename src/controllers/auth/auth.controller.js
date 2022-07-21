import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Users } from '../../models';
import { createToken, errorResponse, successResponse } from '../../helpers';

export const loginPage = async (req, res) => res.render('login');

export const signinPage = async (req, res) => res.render('signin');

export const signin = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    const { name, email, contactNumber } = req.body;
    const id = v4();

    const payload = {
      id,
      name,
      email,
      contactNumber,
      password,
    };


    const newUser = await Users.create(payload);

    const token = createToken(newUser.dataValues);
    res.cookie('token', token);

    req.flash('response', successResponse(req, res, 'User Created Successfully.'));
    return res.redirect('/');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while create user.', error));
    return res.redirect('/signin');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email }, attributes: ['email', 'id', 'contactNumber', 'password'],
    });

    if (!user) {
      req.flash('response', errorResponse(req, res, 'Invalid credential.'));
      return res.redirect('/login');
    }

    const result = await bcrypt.compare(password, user.dataValues.password);
    if (!result) {
      req.flash('response', errorResponse(req, res, 'Invalid credential.'));
      return res.redirect('/login');
    }

    const token = createToken(user.dataValues);
    res.cookie('token', token);

    req.flash('response', successResponse(req, res, 'User Login Successfully.'));
    return res.redirect('/');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while create user.', error));
    return res.redirect('/login');
  }
};
