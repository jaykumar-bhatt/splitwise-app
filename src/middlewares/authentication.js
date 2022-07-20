/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { errorResponse } from '../helpers/index';

// Authentication Middelware
const authentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return errorResponse(req, res, 'Token not found', 404);
    }

    jwt.verify(token, process.env.SECRET, (error, user) => {
      if (error) {
        return errorResponse(req, res, 'You are not authorize.', 403);
      }
      req.user = user;

      next();
    });
  } catch (error) {
    return errorResponse(req, res, 'Error in authentication.', 500);
  }
};

export default authentication;
