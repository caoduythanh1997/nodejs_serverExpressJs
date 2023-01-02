const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/login', siteController.login);
router.get('/register', siteController.register);
router.post('/register/store', siteController.store);
router.get('/', siteController.index);

module.exports = router;
