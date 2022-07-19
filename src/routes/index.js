import express from 'express';
import user from './public.route';

const router = express.Router();

router.use('/', user);

module.exports = router;
