import { v4 } from 'uuid';
import { Groups, GroupUsers, Users } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addGroupShow = async (req, res) => {
  const { id } = req.user;
  const result = await Users.findAll({
    include: {
      model: Users,
      as: 'User_Friend',
      attributes: ['name', 'id'],
    },
    attributes: [],
    where: { id },
  });
  return res.render('addGroup', { data: result });
};

export const addGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupName, friends } = req.body;
    const id = v4();
    const groupPayload = {
      id,
      groupName,
      userId,
    };
    const groupUserPayload = [{
      id: v4(),
      groupId: id,
      userId,
    }];
    for (let i = 0; i < friends.length; i += 1) {
      const payload = {
        id: v4(),
        groupId: id,
        userId: friends[i],
      };
      groupUserPayload.push(payload);
    }
    await Groups.create(groupPayload);
    await GroupUsers.bulkCreate(groupUserPayload);
    res.send('Success');
  } catch (error) {
    console.log(error);
  }
};

export const getGroup = async (req, res) => {
  const userId = req.user.id;
  const result = await Groups.findAll({
    include: {
      model: GroupUsers,
      as: 'group',
      attributes: ['userId'],
      include: {
        model: Users,
        as: 'groupMember',
        attributes: ['name'],
      },
    },
    where: { userId },
    attributes: ['groupName', 'id'],
  });
  res.render('showGroup', { data: result });
};

export const deleteGroup = async (req, res) => {
  const { id } = req.query;
  await Groups.destroy({
    where: { id },
  });
  res.send('success');
};
