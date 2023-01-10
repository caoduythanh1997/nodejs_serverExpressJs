const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/ApiController');

router.post('/login', apiController.checkAccount, apiController.UpdateToken, apiController.login);
router.get('/notice', apiController.noticeApi);
router.get('/full_account', apiController.fullAccountApi);
router.post('/account_by_id', apiController.getAccountById);
router.post('/register_account', apiController.checkValueRegister, apiController.checkAccountIsOnline,apiController.checkEmailIsOnline,apiController.checkPhoneIsOnline ,apiController.Register);
router.delete('/delete_account', apiController.delete_account);

module.exports = router;
