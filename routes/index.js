var express = require('express');
var router  = express.Router();
let administrar = require('../s/l/panel_de_control');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Empresa X' });
});
router.get('/panel_de_control', function(req, res, next) {
    res.render('panel_de_control', { title: 'Panel de control' });
});

router.post('/panel_de_control', administrar.crear);
router.post('/panel_de_control/pagina', administrar.paginacion);
router.post('/panel_de_control/buscar', administrar.buscar);
router.get('/panel_de_control/:id', administrar.obtener);
router.get('/panel_de_control/editar/:id', administrar.editar);
router.get('/panel_de_control/limite/:id', administrar.limite);
router.delete('/panel_de_control/:id', administrar.eliminar);

module.exports = router;
