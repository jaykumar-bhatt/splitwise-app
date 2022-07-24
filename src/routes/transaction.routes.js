import express from 'express';
import * as transactionController from '../controllers/transaction/transaction.controller';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.get('/', authentication, transactionController.addTransactionView);
router.post('/', authentication, transactionController.addTransaction);
// router.get('/get', transactionController.getTransaction);
router.get('/group', authentication, transactionController.showAddGroupTransaction);

module.exports = router;
