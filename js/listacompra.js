var contenedor;
var divCarro;

window.onload = function(){
    generarInterface();
    recuperaLista();
    document.getElementById("inputCantidad").focus();
}


function generarInterface(){
    contenedor = creaNodo(document.body, "div", "contenedor");
    generarTitulo();
    generarBotones();
    generarPanelColores();
    generarInputs();
    divCarro = creaNodo(contenedor, "div", "divCarro");
    listenerBotones();
}


function generarTitulo(){
    divTitulo = creaNodo(contenedor, "div", "divTitulo");
    carro = creaNodo(divTitulo, "img", "carro");
    carro.setAttribute("src", "img/cart.png");
    titulo = creaNodo(divTitulo, "h1", "titulo", "Lista de la compra");
}

function generarBotones(){
    divBotones = creaNodo(contenedor, "div", "divBotones");
    botonSelect = creaBoton(divBotones, "", "botonSelect");
    botonNoSelect = creaBoton(divBotones, "", "botonNoSelect");
    botonTacha = creaBoton(divBotones, "", "botonTacha");
    botonBorra = creaBoton(divBotones, "", "botonBorra");

    botonSelect.addEventListener("click", function(){seleccionaTodo(true)}, false);
    botonNoSelect.addEventListener("click", function(){seleccionaTodo(false)}, false);
    botonBorra.addEventListener("click", borraProducto, false);
    botonTacha.addEventListener("click", tachaProducto, false);
	
	creaNodo(botonBorra, "span", null, null, null, "glyphicon glyphicon-trash");
    creaNodo(botonNoSelect, "span", null, null, null, "glyphicon glyphicon-unchecked");
    creaNodo(botonTacha, "span", null, null, null, "glyphicon glyphicon-ban-circle");
	creaNodo(botonSelect, "span", null, null, null, "glyphicon glyphicon-check");
}

function generarPanelColores(){
    divPanel = creaNodo(contenedor, "div", "divPanel", "Categoría:");
    botonReinicia = creaBoton(divPanel, "", "botonReinicia");
    botonColor1 = creaBoton(divPanel, " ", "botonColor1", "botonColor");
    botonColor2 = creaBoton(divPanel, " ", "botonColor2", "botonColor");
    botonColor3 = creaBoton(divPanel, " ", "botonColor3", "botonColor");
    botonColor4 = creaBoton(divPanel, " ", "botonColor4", "botonColor");
    botonOrdena = creaBoton(divPanel, "", "botonOrdena");

    botonColor1.setAttribute("style", "background-color: lightskyblue");
    botonColor2.setAttribute("style", "background-color: lightsalmon");
    botonColor3.setAttribute("style", "background-color: lightgreen");
    botonColor4.setAttribute("style", "background-color: lightgoldenrodyellow");
	
	creaNodo(botonReinicia, "span", null, null, null, "glyphicon glyphicon-refresh");
    creaNodo(botonOrdena, "span", null, null, null, "glyphicon glyphicon-resize-vertical");
}

function generarInputs(){
    divInputs = creaNodo(contenedor, "div", "divInputs");
    inputCantidad = creaNodo(divInputs, "input", "inputCantidad",null,"number");
    inputUnidad = creaNodo(divInputs, "input", "inputUnidad",null,"text");
    inputProducto = creaNodo(divInputs, "input", "inputProducto",null,"text");

    inputCantidad.setAttribute("placeholder","Cant.");
    inputUnidad.setAttribute("placeholder","Unid.");
    inputProducto.setAttribute("placeholder","Producto");

    botonMas = creaBoton(divInputs, "", "botonMas");
	creaNodo(botonMas, "span", null, null, null, "glyphicon glyphicon-plus-sign");

    inputProducto.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 es enter
            nuevoProducto();
        }}, false);
}



function listenerBotones(){
    botonMas = document.getElementById("botonMas");
    botonMas.addEventListener("click", nuevoProducto, false);

    var botonesColor = [];
    botonesColor = document.getElementsByClassName("botonColor");
    Array.prototype.forEach.call(botonesColor, function(element){
        element.addEventListener("click", cambiaColor, false);
    }); 

    botonReinicia = document.getElementById("botonReinicia");
    botonReinicia.addEventListener("click", reiniciarColor, false);

    botonOrdena = document.getElementById("botonOrdena");
    botonOrdena.addEventListener("click", reordenaColor, false);
}



function seleccionaTodo(modo){
    hijos = divCarro.getElementsByClassName("producto");
    for (i = 0; i < hijos.length; i++) {
        check = hijos[i].getElementsByClassName("check");
        if (modo == true){
            check[0].checked = true;
        }
        else{
            check[0].checked = false;
        } 
    }
}


function nuevoProducto(){
    cantidadProducto = document.getElementById("inputCantidad").value;
    unidadProducto =  document.getElementById("inputUnidad").value;
    nombreProducto = document.getElementById("inputProducto").value;

    if (cantidadProducto == "" || nombreProducto == "")
        alert("Algun de los campos está vacío.");
    else{
        producto = creaNodo(divCarro, "div", null, cantidadProducto + unidadProducto + " " + nombreProducto, null, "producto");
        check = creaNodo(producto, "input", null, null, "checkbox", "check");
        producto.setAttribute("style", "background-color: white");

        document.getElementById("inputCantidad").value = "";
        document.getElementById("inputUnidad").value = "";
        document.getElementById("inputProducto").value = "";
        almacenaLista();
        document.getElementById("inputCantidad").focus();
    }

    

}

function borraProducto(){
    if (confirm("¿Desea borrar los elementos seleccionados?")){
        hijos = divCarro.getElementsByClassName("producto");
        contador = 0;
        for (i = hijos.length-1; i >= 0; i--) {
            check = hijos[i].getElementsByClassName("check");
     
            if (check[0].checked){
                contador++;
                hijoInterno = hijos[i].firstChild;
                while (hijoInterno != null) {
                    borra = hijoInterno;
                    hijoInterno = hijoInterno.nextSibling
                    hijos[i].removeChild(borra);
                }
                divCarro.removeChild(hijos[i]);
            }
        }
        if (contador == 0)
            alert("No se ha seleccionado ningún elemento.");
    }
    almacenaLista();

}


function tachaProducto(){
    hijos = divCarro.getElementsByClassName("producto");
    for (i = 0; i < hijos.length; i++) {
        check = hijos[i].getElementsByClassName("check");

        if (check[0].checked)
            if (hijos[i].style.textDecoration == "line-through")
                hijos[i].style.textDecoration = "";
            else
                hijos[i].style.textDecoration = "line-through";
        
    }
    almacenaLista();
    
}


function cambiaColor(){
    color = this.style.backgroundColor;
    
    hijos = divCarro.getElementsByClassName("producto");
    for (i = 0; i < hijos.length; i++) {
        check = hijos[i].getElementsByClassName("check");

        if (check[0].checked)
        hijos[i].setAttribute("style", "background-color: " + color);
        
    }
    almacenaLista();
}


function reiniciarColor(){
    color = "white";
    
    hijos = divCarro.getElementsByClassName("producto");
    for (i = 0; i < hijos.length; i++) {
        check = hijos[i].getElementsByClassName("check");
        hijos[i].setAttribute("style", "background-color: " + color);
        
    }
    almacenaLista();
}



function reordenaColor(){
    arrayColores = ["lightskyblue", "lightsalmon", "lightgreen", "lightgoldenrodyellow"];
    contador = 0;
    for (var i = 0; i < arrayColores.length; i++) {
        
        hijos = divCarro.getElementsByClassName("producto");
        for (j = contador; j < hijos.length; j++) {
            if (hijos[j].style.backgroundColor == arrayColores[i]){
                divCarro.insertBefore(hijos[j], hijos[contador]);
                contador++;
            }
        }
    }
    almacenaLista();
}



//funcion generica para crear nodos
function creaNodo(padre, tagNodo, id, texto, tipo, clase, source, valor){
    nodo = document.createElement(tagNodo);
    padre.appendChild(nodo);

    if (texto != null)
        nodo.textContent = texto;
    if (tagNodo == "input")
        nodo.setAttribute("type", tipo);
    if (id != null)
        nodo.id = id;
    if (source != null)
        nodo.setAttribute("src", source);
    if (clase != null)
        nodo.className = clase;
    if (valor != null)
        nodo.value = valor;
    return nodo;
}


//funcion generica para crear botones
function creaBoton(padre, texto, id, clase){
    nodo = document.createElement("button");
    nodo.textContent = texto;
    if (id != null)
        nodo.id = id;
    if (clase != null)
        nodo.className = clase;
    padre.appendChild(nodo);
    return nodo;
}


//almacenamiento en localstorage de la lista para navegadores que lo soporten
function almacenaLista(){
    if(window.navigator.userAgent.indexOf("Edge") == -1){
        lista = divCarro.getElementsByClassName("producto");
        guardar = "";
        for (var i = 0; i < lista.length; i++) {
            guardar += lista[i].textContent + "|";
            guardar += lista[i].style.backgroundColor + "|";
            if (lista[i].style.textDecoration == "line-through")
                guardar += "false" + "|";
            else
                guardar += "true" + "|";
        }
//        alert(lista[0].textContent);
    //    localStorage.setItem("lista", JSON.stringify(lista));
   //     alert("guardado");
    localStorage.setItem("lista", guardar);
    }
}

function recuperaLista(){
    if(window.navigator.userAgent.indexOf("Edge") == -1){
       // var lista = [];
      //  lista = JSON.parse(localStorage.getItem("lista"));
      storage = localStorage.getItem("lista");
      if (storage != null){
        guardado = storage.split("|");
        
            for (var i = 0; i < guardado.length-2; i= i+3) {
           //     divCarro.appendChild(lista[i]);
             //   alert(lista[i].textContent);
             producto = creaNodo(divCarro, "div", null, guardado[i + 0], null, "producto");
             check = creaNodo(producto, "input", null, null, "checkbox", "check");
             producto.setAttribute("style", "background-color: " + guardado[i + 1]);
             if (guardado[i + 2] == "false")
                producto.style.textDecoration = "line-through";
             divCarro.appendChild(producto);

            }
        }
       //alert("recuperado");
    }
}