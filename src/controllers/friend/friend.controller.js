import { v4 } from 'uuid';
import { Friends, Users } from '../../models';
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
    return res.redirect('/allUser');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while add Friend.', error));
    return res.redirect('/allUser');
  }
};

export const getFriends = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await Users.findAll({
      include: {
        model: Users,
        as: 'User_Friend',
        attributes: ['name', 'email', 'id', 'contactNumber'],
      },
      attributes: [],
      where: { id },
    });
    req.flash('response', successResponse(req, res, 'Successfully Fetch Friend.'));
    return res.render('friend', { data: result });
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while Fetch Friend.', error));
    return res.render('login');
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id } = req.query;
    await Friends.destroy({
      where: { id },
    });
    req.flash('response', successResponse(req, res, 'Remove Friend Successfully.'));
    return res.redirect('/friend');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while delete Friend.', error));
    return res.redirect('/friend');
  }
};
