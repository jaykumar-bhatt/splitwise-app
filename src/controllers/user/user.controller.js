/* eslint-disable import/prefer-default-export */
import { Op } from 'sequelize';
import { Users } from '../../models';
import { errorResponse, successResponse } from '../../helpers';

export const allUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const searchWord = req.query.searchWord || '';
    const result = await Users.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchWord}%` } },
          { email: { [Op.iLike]: `%${searchWord}%` } },
        ],
        [Op.and]: { [Op.not]: { id: userId } },
      },
      attributes: ['email', 'name', 'contactNumber', 'id'],
      order: [['createdAt', 'DESC']],
    });
    req.flash('response', successResponse(req, res, 'Successfully Featch all Users.', 200));
    res.render('allUsers', { data: result });
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while fatch Users.', error, 500));
    res.redirect('/friend');
  }
};
