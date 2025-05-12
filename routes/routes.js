const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

router.get('/', controller.message);
router.get('/details/:id', controller.details);
router.get('/form', controller.form);
router.post('/delete/:messageId', controller.deleteM);
router.post('/send', controller.send);

module.exports = router;
