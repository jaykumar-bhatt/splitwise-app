import express from 'express';
import * as userController from '../controllers/user/user.controller';

const router = express.Router();

router.get('/login', userController.loginPage);
router.get('/signin', userController.signinPage);
router.post('/login', userController.login);
router.post('/signin', userController.signin);

module.exports = router;
