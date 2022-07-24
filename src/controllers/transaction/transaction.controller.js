import { v4 } from 'uuid';
import { Transactions, Groups, GroupUsers } from '../../models';
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
    const payload = {
      id: v4(),
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
  const result = await Groups.findOne({
    include: { model: GroupUsers, as: 'group', atrributes: ['userId'] },
    where: { id },
    attributes: ['groupName', 'id'],
  });

  return res.render('addGroupTransaction', { data: result });
};

export const addGroupTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId, totalAmount, description } = req.body;
    const { count, rows } = await GroupUsers.findAndCountAll({
      where: { groupId },
    });
    const perParson = totalAmount / count;
    const payloadArray = [];
    for (let i = 0; i < count; i += 1) {
      if (!(userId === rows[i].dataValues.userId)) {
        const payload = {
          id: v4(),
          userId,
          description,
          friendId: rows[i].dataValues.userId,
          friendAmount: perParson,
          groupId,
        };
        payloadArray.push(payload);
      }
    }
    await Transactions.bulkCreate(payloadArray);
    res.send('success');
  } catch (error) {
    console.log(error);
  }
};

// export const getTransaction = async (req, res) => {
//   try {
//     const userId = req.user.id;

//   } catch (error) {
//     console.log(error);
//   }
// };
