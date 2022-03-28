var express = require('express');
var router  = express.Router();
let panel   = require('../s/l/panel_de_control');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Empresa X' });
});
router.get('/panel_de_control', function(req, res, next) {
    res.render('panel_de_control', { title: 'Panel de control' });
});

router.post('/panel_de_control', panel.crear);
router.post('/panel_de_control/pagina', panel.paginacion);
router.post('/panel_de_control/buscar', panel.buscar);
router.get('/panel_de_control/:id', panel.obtener);
router.get('/panel_de_control/editar/:id', panel.editar);
router.get('/panel_de_control/limite/:id', panel.limite);
router.delete('/panel_de_control/:id', panel.eliminar);

module.exports = router;
