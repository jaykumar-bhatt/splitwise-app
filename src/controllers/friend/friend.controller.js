/* eslint-disable import/prefer-default-export */
import { v4 } from 'uuid';
import { Friends } from '../../models';
import { successResponse, errorResponse } from '../../helpers/index';


export const addFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.query;
    const id = v4();
    const payload = {
      id,
      friendId,
      userId,
    };
    await Friends.create(payload);
    req.flash('response', successResponse(req, res, 'Successfully add Friend.'));
    res.redirect('/allUser');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while add Friend.', error));
    res.redirect('/allUser');
  }
};
