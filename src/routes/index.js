import express from 'express';
import auth from './auth.routes';
import user from './user.routes';

const router = express.Router();

router.use('/', auth);
router.use('/', user);


module.exports = router;
