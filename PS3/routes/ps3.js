const express = require('express');
const router = express.Router();

/* GET a string */
//router.get('/', (req, res) => res.render('ps3', {String: 'Hey now'}));
router.get('/', (req, res, next) => {
    const str = {string: 'Liverpool, the new kings of Europe'};
    res.render('ps3', str);
});

/* POST a string */
router.post('/', (req, res, next) => {
    const str = {string: req.body.string, length: req.body.string.length}
    res.render('ps3', str);
});

module.exports = router;