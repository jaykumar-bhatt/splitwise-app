import express from 'express';
import * as friendController from '../controllers/friend/friend.controller';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.get('/', authentication, friendController.addFriend);

module.exports = router;
