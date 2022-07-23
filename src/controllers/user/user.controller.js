/* eslint-disable radix */
import { Op } from 'sequelize';
import { Users } from '../../models';
import { errorResponse, successResponse } from '../../helpers';

// eslint-disable-next-line import/prefer-default-export
export const allUser = async (req, res) => {
  try {
    const searchWord = req.query.searchWord || '';
    const result = await Users.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchWord}%` } },
          { email: { [Op.iLike]: `%${searchWord}%` } },
        ],
      },
      attributes: ['email', 'name', 'contactNumber', 'id'],
      order: [['createdAt', 'DESC']],
    });
    console.log(result);
    req.flash('response', successResponse(req, res, 'Successfully Featch all Users.'));
    res.render('allUsers', { data: result });
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while create user.', error));
    res.redirect('/');
  }
};
