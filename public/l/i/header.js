/* nav
--------------------------------------------------------------------------------*/
class Navegacion {
    static
    lanzar(detonador) {
        detonador.style.display === "block" ? detonador.style.display = "none" : detonador.style.display = "block";
    }
    static
    tablet() {
        let detonador = document.querySelector(".nav_tablet");
        Navegacion.lanzar(detonador);
    }
    static
    celular() {
        let detonador = document.querySelector(".minimo");
        Navegacion.lanzar(detonador);
    }
}

document.querySelector('#nav_tablet').onclick = function() { Navegacion.tablet(); };
document.querySelector('#nav_celular').onclick = function() { Navegacion.celular(); };

/* Ajuste del nav a bajar 80px
--------------------------------------------------------------------------------*/
window.onscroll = function () { desplazarse(); };

function 
desplazarse() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('nav').style.padding = "0.50em 3em 0.50em 3em";
        document.querySelector('h1').style.fontSize = "1.00em";
        document.querySelector('.nav_tablet').style.top = "31px";
        document.querySelector('.minimo').style.top = "31px";
    } else {
        document.querySelector('nav').style.padding = "1.50em 3em 1.50em 3em";
        document.querySelector('h1').style.fontSize = "1.50em";
        document.querySelector('.nav_tablet').style.top = "62px";
        document.querySelector('.minimo').style.top = "62px";
    }
}


