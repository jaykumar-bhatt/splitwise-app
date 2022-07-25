import express from 'express';
import * as transactionController from '../controllers/transaction/transaction.controller';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.get('/', authentication, transactionController.addTransactionView);
router.post('/', authentication, transactionController.addTransaction);
router.get('/group', authentication, transactionController.showAddGroupTransaction);
router.post('/group', authentication, transactionController.addGroupTransaction);

router.get('/owes', authentication, transactionController.getOwesTransaction);
router.get('/borrow', authentication, transactionController.getBorrowsTransaction);
router.get('/update', authentication, transactionController.updateTransaction);

module.exports = router;
