import express from 'express';
import user from './user.routes';
import home from './home.routes';

const router = express.Router();

router.use('/', user);

router.use('/', home);

module.exports = router;
