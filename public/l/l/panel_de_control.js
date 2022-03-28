let objeto, limitar;

let ia        = document.querySelector('#ia');
let consulta  = document.querySelector('#consulta');
let res       = document.querySelector('#res');

let id              = document.querySelector('#id');
let nombre          = document.querySelector('#nombre');
let clasificacion   = document.querySelector('#clasificacion');
let tematica        = document.querySelector('#tematica');
let nivel           = document.querySelector('#nivel');
let enlace          = document.querySelector('#enlace');
let submit          = document.querySelector('#submit');

let busqueda        = document.querySelector("#busqueda");
let encontrar       = document.querySelector('#buscar');
let por             = document.querySelector('#por');
let himOrHer        = document.querySelector('#himOrHer');
let orden           = document.querySelector('#orden');
let ordenar         = document.querySelector('#ordenar');
let paginacion      = document.querySelector('#paginacion');
let paginaciones    = document.querySelector('#paginaciones');
let pagina          = document.querySelector('#pagina');
let paginas         = document.querySelector('#paginas');
let anterior        = document.querySelector('#anterior');
let siguiente       = document.querySelector('#siguiente');

const LIMITE = 5;

class Administrar {
    static 
    insertar() {
        let datos = JSON.stringify({
            id: id.value, nombre: nombre.value, clasificacion: clasificacion.value,
            tematica: tematica.value, nivel: nivel.value, enlace: enlace.value, submit: submit.value
        });

        fetch('/administrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto = json;

            submit.value = 'Insertar';
            res.innerHTML = 'Insertado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            ia.reset();
            
            Administrar.colocar();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    obtener(post) {
        fetch('/administrar/' + post , {
            method: 'GET'
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto = json;

            res.innerHTML = 'Ordenado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            Administrar.colocar();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    colocar() {
        let salida = '';

        for(let i in objeto) {
            let fecha = new Date(objeto[i].fecha);

            salida += `
                <tr>
                    <td>${objeto[i].id}</td>
                    <td title="${objeto[i].nombre}">${objeto[i].nombre}</td>
                    <td title="${objeto[i].clasificaciones}">${objeto[i].clasificaciones}</td>
                    <td title="${objeto[i].tematicas}">${objeto[i].tematicas}</td>
                    <td>${objeto[i].nivel}</td>
                    <td title="${objeto[i].enlace}"><a href="${objeto[i].enlace}" target="_blank">Abrir</a></td>
                    <td>${new Intl.DateTimeFormat('es').format(fecha)}</td>
                    <td>
                        <button type='submit' onclick="Administrar.editar(${objeto[i].id})">Editar</button>
                    </td> 
                    <td>
                        <button type='button' onclick="Administrar.eliminar(${objeto[i].id})">Eliminar</button>
                    </td>  
                </tr>
            `;  
        }

        if(salida !== '') {
            consulta.innerHTML = salida;
        } else {
            consulta.innerHTML = `
                <tr>
                    <td colspan='9' style='text-align: center; padding: 16px 0px;'>
                        No hay resultados...
                    </td>
                </tr>
            `;
        }
    }
    static
    editar(editar) {
        fetch('/administrar/editar/' + editar, {
            method: "GET"
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) {
            res.innerHTML = 'Listo para actualizar.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            id.value            = json[0].id;
            nombre.value        = json[0].nombre;
            clasificacion.value = json[0].clasificaciones;
            tematica.value      = json[0].tematicas;
            nivel.value         = json[0].nivel;
            enlace.value        = json[0].enlace;
            submit.value        = 'Actualizar';
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    eliminar(eliminar) { 
        fetch('/administrar/' + eliminar, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto          = json; 
            res.innerHTML   = 'Eliminado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);

            Administrar.colocar();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    buscar(buscar) {
        fetch('/administrar/buscar', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buscar: buscar })
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) { console.log(json);
            objeto = json;
            
            Administrar.colocar();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    limite() {
        fetch('/administrar/limite/id', {
            method: 'GET'
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) {
            limitar = json[0].limite;
            
            Administrar.paginaciones(limitar);
        });
    }
    static
    paginacion() {
        let datos = JSON.stringify({ pagina: pagina.value });
        
        fetch('/administrar/pagina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) {
            objeto = json;

            Administrar.colocar();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
        
        Administrar.paginaciones(limitar);
    }
    static
    paginaciones(limitar) {
        let total   = Math.ceil(limitar / LIMITE);
        let pagina  = Number(paginas.value);

        if(pagina === 0) {
            paginaciones.innerHTML = "1/" + (total + 1);
        } else {
            paginaciones.innerHTML = (pagina + 1) + "/" + (total + 1);
        }
        
        if(pagina <= 0) {
            anterior.style.visibility = 'hidden';
        } else if(pagina >= total){
            siguiente.style.visibility = 'hidden';
        } else {
            anterior.style.visibility = 'visible';
            siguiente.style.visibility = 'visible';
        }
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
ia.onsubmit = function(evento) {
    evento.preventDefault();
    Administrar.insertar();
};
window.onload = function() {
    Administrar.obtener();
    Administrar.limite();
};
busqueda.oninput = function(evento) {
    evento.preventDefault();
    Administrar.buscar(encontrar.value);
};
por.oninput = function() {
    Administrar.obtener(himOrHer .value); 
};
orden.oninput = function() {
    Administrar.obtener(ordenar.value); 
};

/* Paginación 
--------------------------------------------------------------------------------*/
anterior.onclick = function () {
    pagina.stepDown(LIMITE);
    paginas.stepDown(1);
    Administrar.paginacion();
    
};
siguiente.onclick = function () {
    pagina.stepUp(LIMITE);
    paginas.stepUp(1);
    Administrar.paginacion();
};
paginacion.oninput = function () {
    Administrar.paginacion();
};
