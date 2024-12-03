const {shortLinkGenrater,redirectToOriginalUrl,shortUrlGetByEmail} = require('../controllers/LinkController')
const express = require('express')
const router = express.Router();

router.post('/url',shortLinkGenrater);
router.get('/:shortUrl',redirectToOriginalUrl);
router.get('/data/:email',shortUrlGetByEmail)

module.exports = router