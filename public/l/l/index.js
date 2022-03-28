let objeto;

let ia        = document.querySelector('#ia');
let res       = document.querySelector('#res');

let nombre      = document.querySelector('#nombre');
let correo      = document.querySelector('#correo');
let direccion   = document.querySelector('#direccion');
let submit      = document.querySelector('#submit');

class Administrar {
    static 
    insertar() {
        let datos = JSON.stringify({
            id: id.value, 
            nombre: nombre.value, 
            correo: correo.value,
            direccion: direccion.value, 
            submit: submit.value
        });

        fetch('/panel_de_control', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) { 
            objeto          = json;
            submit.value    = 'Insertar';
            
            if(objeto.res === 0) {
                res.innerHTML = 'A llegado al limite de direcciones.';
            } else {
                res.innerHTML = 'Insertado con exito.';
            }
            
            setTimeout(function() { res.innerHTML = ''; }, 4000);

            ia.reset();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
ia.onsubmit = function(evento) {
    evento.preventDefault();
    Administrar.insertar();
};