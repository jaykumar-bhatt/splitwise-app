import express from 'express';
import * as groupController from '../controllers/group/group.controller';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.get('/', authentication, groupController.addGroupShow);
router.post('/', authentication, groupController.addGroup);
router.get('/all', authentication, groupController.getGroup);

module.exports = router;
