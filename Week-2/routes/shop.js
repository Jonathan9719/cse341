const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<h1>Just the /');
});

module.exports = router;