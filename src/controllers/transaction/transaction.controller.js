import { v4 } from 'uuid';
import { Transactions, Groups, GroupUsers } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addTransactionView = async (req, res) => {
  try {
    const { id } = req.query;
    req.flash('response', successResponse(req, res, 'You can add Transaction here.', 200));
    return res.render('addTransaction', { id });
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while Load Page.', error, 500));
    return res.redirect('/friend');
  }
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
      req.flash('response', errorResponse(req, res, 'Divide Proper.', 400));
      return res.redirect('/transaction');
    }

    try {
      const payload = {
        id: v4(),
        userId,
        friendId,
        description,
        friendAmount: parseFloat(friendAmount),
      };

      await Transactions.create(payload);
    } catch (error) {
      req.flash('response', errorResponse(req, res, 'Error while create Expense.', 500));
      return res.redirect('/transaction');
    }

    req.flash('response', successResponse(req, res, 'Successfully add Expense.', 201));
    return res.redirect('/friend');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while add Expense.', 500));
    return res.redirect('/transaction');
  }
};

export const showAddGroupTransaction = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await Groups.findOne({
      include: { model: GroupUsers, as: 'group', atrributes: ['userId'] },
      where: { id },
      attributes: ['groupName', 'id'],
    });

    req.flash('response', successResponse(req, res, 'You can add Expense Here.', 200));
    return res.render('addGroupTransaction', { data: result });
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while Load Page.', 500));
    return res.redirect('/friend');
  }
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

    req.flash('response', successResponse(req, res, 'Expense Added Successfully.', 201));
    return res.redirect('/group');
  } catch (error) {
    req.flash('response', errorResponse(req, res, 'Error while Add Expense.', 500));
    return res.redirect('/group');
  }
};

// export const getTransaction = async (req, res) => {
//   try {
//     const userId = req.user.id;

//   } catch (error) {
//     console.log(error);
//   }
// };
