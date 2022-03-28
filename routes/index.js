var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/panel_de_control', function(req, res, next) {
    res.render('panel_de_control', { title: 'Panel de control' });
});

module.exports = router;
