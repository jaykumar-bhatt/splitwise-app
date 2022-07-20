import express from 'express';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.get('/', authentication, (req, res) => {
  res.render('welcome');
});

module.exports = router;
