import { v4 } from 'uuid';
import { Transactions, Groups, GroupUsers, Users } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addTransactionView = async (req, res) => {
  const { id } = req.query;
  res.render('addTransaction', { id });
};

export const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      totalAmount,
      friendId,
      description,
      userAmount,
      friendAmount,
    } = req.body;
    if (parseFloat(totalAmount) !== (parseFloat(friendAmount) + parseFloat(userAmount))) {
      req.flash('response', errorResponse(req, res, 'Divide Proper.'));
      return res.redirect('/');
    }
    const id = v4();
    const payload = {
      id,
      userId,
      friendId,
      description,
      friendAmount: parseFloat(friendAmount),
    };
    await Transactions.create(payload);
    req.flash('response', successResponse(req, res, 'Successfully add Expense.'));
    return res.redirect('/');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while add Friend.'));
    return res.redirect('/');
  }
};

export const showAddGroupTransaction = async (req, res) => {
  const { id } = req.query;
  // const result = await Groups.findOne({
  //   include: { model: GroupUsers, as: 'group' },
  //   where: { id },
  //   attributes: ['id', 'groupName'],
  // });
  const result = await Groups.findOne({
    where: { id },
    attributes: ['groupName', 'id'],
  });
  // console.log(result);

  res.render('addGroupTransaction', { data: result });
};

export const addGroupTransaction = async (req, res) => {
  try {

  } catch (error) {

  }
};

// export const getTransaction = async (req, res) => {
//   try {
//     const result = await Transactions.findAll({
//       include: {
//         model: Users,
//         as: 'friend',
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
