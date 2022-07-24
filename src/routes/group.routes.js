import express from 'express';
import * as groupController from '../controllers/group/group.controller';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.get('/add', authentication, groupController.addGroupShow);
router.post('/', authentication, groupController.addGroup);
router.get('/', authentication, groupController.getGroup);
router.get('/delete', authentication, groupController.deleteGroup);

module.exports = router;
