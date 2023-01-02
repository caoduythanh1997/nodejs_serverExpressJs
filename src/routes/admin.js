const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');

router.get('/dashboard', adminController.dashboard);
router.get('/account_manager', adminController.accountManager);
router.put('/store', adminController.store);
router.get('/notice', adminController.notice);
router.get('/', adminController.index);

module.exports = router;
