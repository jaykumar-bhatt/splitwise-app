import express from 'express';
import * as authController from '../controllers/auth/auth.controller';

const router = express.Router();

router.get('/login', authController.loginPage);
router.get('/signin', authController.signinPage);
router.post('/login', authController.login);
router.post('/signin', authController.signin);

module.exports = router;
