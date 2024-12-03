const {shortLinkGenrater,redirectToOriginalUrl} = require('../controllers/LinkController')
const express = require('express')
const router = express.Router();

router.post('/url',shortLinkGenrater);
router.post('/:shortUrl',redirectToOriginalUrl)

module.exports = router