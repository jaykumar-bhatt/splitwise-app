import express from 'express';
import * as userController from '../controllers/user/user.controller';

const router = express.Router();

router.get('/', userController.loginPage);
router.get('/signin', userController.signinPage);
router.post('/', userController.login);
router.post('/signin', userController.signin);

module.exports = router;
