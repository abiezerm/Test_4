let objeto, salida, limitar;

let busqueda    = document.querySelector("#busqueda");
let encontrar   = document.querySelector('#buscar');
let consulta    = document.querySelector('#plantillas');

let paginacion      = document.querySelector('#paginacion');
let paginaciones    = document.querySelector('#paginaciones');
let pagina          = document.querySelector('#pagina');
let paginas         = document.querySelector('#paginas');
let anterior        = document.querySelector('#anterior');
let siguiente       = document.querySelector('#siguiente');

const LIMITE = 2;

class Templates {
    static
    obtener(estilo) {
        fetch('/consulta', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) {
            objeto = json;
            
            Templates.colocar(estilo);
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    colocar(estilo) {
        salida = '';
            
        for(let i in objeto) {
            salida += `
                <section class="plantilla" style="width: ${estilo};">
                    <ul>
                        <li><span>ID: </span>${objeto[i].id}<li>
                        <li><span>Nombre: </span>${objeto[i].nombre}<li>
                        <li><span>Clasificación: </span>${objeto[i].clasificaciones}<li>
                        <li><span>Tematica: </span>${objeto[i].tematicas}<li>
                        <li><span>Nivel: </span>${objeto[i].nivel}<li>
                    </ul>
                    <a href="${objeto[i].enlace}" target="_blank">Abrir</a>
                    <iframe src="${objeto[i].enlace}"></iframe>
                </section>
            `;          
        }

        if(salida !== '') {
            consulta.innerHTML = salida;
        } else {
            consulta.innerHTML = `
                <div style='text-align: center; padding: 16px 0px;'>
                    No hay resultados...
                </div>
            `;
        }
    }
    static
    buscar(buscar) {
        fetch('/buscar', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buscar: buscar })
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) {
            objeto = json;
            
            Templates.colocar();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    limite() {
        fetch('/limite/id', {
            method: 'GET'
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) {
            paginas.value   = '';
            limitar         = json[0].limite;
            
            Templates.paginaciones(limitar);
        });
    }
    static
    buscarLimite(buscar) {
        fetch('/buscarLimite', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buscar: buscar })
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamadagdgfdg"; }
        }).then(function (json) {
            paginas.value   = '';
            limitar         = null;
            limitar         = json[0].limite;
            
            Templates.paginaciones(limitar);
        });
    }
    static
    paginacion() {
        let url;
        let datos = JSON.stringify({ pagina: pagina.value, buscar: encontrar.value });

        encontrar.value === "" ? url = "/pagina" : url = "/busqueda";

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) {
            objeto = json;

            Templates.colocar();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });

        Templates.paginaciones(limitar);
    }
    static
    paginaciones(limitar) {
        let total   = Math.ceil(limitar / LIMITE);
        let pagina  = Number(paginas.value);

        if(pagina === 0) {
            paginaciones.innerHTML = "1/" + total;
        } else {
            paginaciones.innerHTML = (pagina + 1) + "/" + total;
        }
        
        if(pagina <= 0) {
            anterior.style.visibility = 'hidden';
        } else if(pagina === (total - 1)){
            siguiente.style.visibility = 'hidden';
        } else {
            anterior.style.visibility = 'visible';
            siguiente.style.visibility = 'visible';
        }
    }
}
window.onload = function() {
    Templates.obtener();
    Templates.limite();
};

busqueda.oninput = function(evento) {
    evento.preventDefault();
    
    if(encontrar.value === "") {
        Templates.obtener();
        Templates.limite();
    } else {
        Templates.buscar(encontrar.value);
        Templates.buscarLimite(encontrar.value);
    }
};

/* Paginación 
--------------------------------------------------------------------------------*/
anterior.onclick = function () {
    pagina.stepDown(LIMITE);
    paginas.stepDown(1);
    Templates.paginacion();
};
siguiente.onclick = function () {
    pagina.stepUp(LIMITE);
    paginas.stepUp(1);
    Templates.paginacion();
};
paginacion.oninput = function () {
    Templates.paginacion();
};