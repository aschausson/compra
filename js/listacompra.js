var contenedor
var divCarro

//se llama a las funciones que crean la interface y se intenta recuperar los datos guardados
window.onload = function(){
    generarInterface()
    recuperaLista()
    generarAyuda()
    document.getElementById("inputCantidad").focus()
}


function generarInterface(){
    contenedor = creaNodo(document.body, "div", "contenedor")
    generarTitulo()
    generarBotones()
    generarPanelColores()
    generarInputs()
    divCarro = creaNodo(contenedor, "div", "divCarro")
    listenerBotones()
}


function generarTitulo(){
    var divTitulo = creaNodo(contenedor, "div", "divTitulo")
    var carro = creaNodo(divTitulo, "img", "carro")
    carro.setAttribute("src", "img/cart.png")
    creaNodo(divTitulo, "h1", "titulo", "Lista de la compra")
}


function generarBotones(){
    var botonAyuda = creaBoton(contenedor, "", "botonAyuda")
    var divBotones = creaNodo(contenedor, "div", "divBotones")
    var botonSelect = creaBoton(divBotones, "", "botonSelect")
    var botonNoSelect = creaBoton(divBotones, "", "botonNoSelect")
    var botonTacha = creaBoton(divBotones, "", "botonTacha")
    var botonBorra = creaBoton(divBotones, "", "botonBorra")

    botonSelect.addEventListener("click", function(){seleccionaTodo(true)}, false)
    botonNoSelect.addEventListener("click", function(){seleccionaTodo(false)}, false)
    botonBorra.addEventListener("click", borraProducto, false)
    botonTacha.addEventListener("click", tachaProducto, false)
    botonAyuda.addEventListener("click", function(){mostrarAyuda()}, false)
	
    creaNodo(botonBorra, "span", null, null, null, "glyphicon glyphicon-trash")
    creaNodo(botonNoSelect, "span", null, null, null, "glyphicon glyphicon-unchecked")
    creaNodo(botonTacha, "span", null, null, null, "glyphicon glyphicon-ban-circle")
    creaNodo(botonSelect, "span", null, null, null, "glyphicon glyphicon-check")
    creaNodo(botonAyuda, "span", null, null, null, "glyphicon glyphicon-question-sign")
}


function generarPanelColores(){
    var divPanel = creaNodo(contenedor, "div", "divPanel", "Categoría:")
    var botonReinicia = creaBoton(divPanel, "", "botonReinicia")
    var botonColor1 = creaBoton(divPanel, " ", "botonColor1", "botonColor")
    var botonColor2 = creaBoton(divPanel, " ", "botonColor2", "botonColor")
    var botonColor3 = creaBoton(divPanel, " ", "botonColor3", "botonColor")
    var botonColor4 = creaBoton(divPanel, " ", "botonColor4", "botonColor")
    var botonOrdena = creaBoton(divPanel, "", "botonOrdena")

    botonColor1.setAttribute("style", "background-color: lightskyblue")
    botonColor2.setAttribute("style", "background-color: lightsalmon")
    botonColor3.setAttribute("style", "background-color: lightgreen")
    botonColor4.setAttribute("style", "background-color: lightgoldenrodyellow")
	
    creaNodo(botonReinicia, "span", null, null, null, "glyphicon glyphicon-refresh")
    creaNodo(botonOrdena, "span", null, null, null, "glyphicon glyphicon-resize-vertical")
}


function generarAyuda(){
    var mensajeSelect = creaNodo(contenedor, "span", null, "Selecciona los productos", null, "ayuda")
    var mensajeNoSelect = creaNodo(contenedor, "span", null, "Deselecciona los productos", null, "ayuda")
    var mensajeTacha = creaNodo(contenedor, "span", null, "Tacha lo seleccionado", null, "ayuda")
    var mensajeBorra = creaNodo(contenedor, "span", null, "Borra lo seleccionado", null, "ayuda")
    var mensajeReinicia = creaNodo(contenedor, "span", null, "Reinicia los colores", null, "ayuda")
    var mensajeOrdena = creaNodo(contenedor, "span", null, "Ordena los productos por color", null, "ayuda")
    var mensajeMas = creaNodo(contenedor, "span", null, "Crea un producto con los datos", null, "ayuda")

    var divBotones = document.getElementById("divBotones")
    var divPanel = document.getElementById("divPanel")
    var divInputs = document.getElementById("divInputs")

    divBotones.insertBefore(mensajeSelect, document.getElementById("botonSelect"))
    divBotones.insertBefore(mensajeNoSelect, document.getElementById("botonNoSelect"))
    divBotones.insertBefore(mensajeTacha, document.getElementById("botonTacha"))
    divBotones.insertBefore(mensajeBorra, document.getElementById("botonBorra"))

    divPanel.insertBefore(mensajeReinicia, document.getElementById("botonReinicia"))
    divPanel.insertBefore(mensajeOrdena, document.getElementById("botonOrdena"))

    divInputs.insertBefore(mensajeMas, document.getElementById("botonMas"))

    mostrarAyuda()
}

function mostrarAyuda(){
    var ayudas = document.getElementsByClassName("ayuda")
    for (var i = 0; i < ayudas.length; i++) {
        if (ayudas[i].style.display == "none")
            ayudas[i].style.display = "inline"
        else
            ayudas[i].style.display = "none"
    }
}


function generarInputs(){
    var divInputs = creaNodo(contenedor, "div", "divInputs")
    var inputCantidad = creaNodo(divInputs, "input", "inputCantidad",null,"number")
    var inputUnidad = creaNodo(divInputs, "input", "inputUnidad",null,"text")
    var inputProducto = creaNodo(divInputs, "input", "inputProducto",null,"text")

    inputCantidad.setAttribute("placeholder","Cant.")
    inputUnidad.setAttribute("placeholder","Unid.")
    inputProducto.setAttribute("placeholder","Producto")

    var botonMas = creaBoton(divInputs, "", "botonMas")
    creaNodo(botonMas, "span", null, null, null, "glyphicon glyphicon-plus-sign")

    inputProducto.addEventListener("keypress", function (e) {
        var key = e.which || e.keyCode
        if (key === 13) { // 13 es enter
            nuevoProducto()
        }}, false)
}



function listenerBotones(){
    var botonMas = document.getElementById("botonMas")
    botonMas.addEventListener("click", nuevoProducto, false)

    var botonesColor = []
    botonesColor = document.getElementsByClassName("botonColor")
    Array.prototype.forEach.call(botonesColor, function(element){
        element.addEventListener("click", cambiaColor, false)
    })

    var botonReinicia = document.getElementById("botonReinicia")
    botonReinicia.addEventListener("click", reiniciarColor, false)

    var botonOrdena = document.getElementById("botonOrdena")
    botonOrdena.addEventListener("click", reordenaColor, false)
}



function seleccionaTodo(modo){
    var hijos = divCarro.getElementsByClassName("producto")
    for (var i = 0; i < hijos.length; i++) {
        var check = hijos[i].getElementsByClassName("check")
        if (modo == true){
            check[0].checked = true
        }
        else{
            check[0].checked = false
        } 
    }
}


function nuevoProducto(){
    var cantidadProducto = document.getElementById("inputCantidad").value
    var unidadProducto =  document.getElementById("inputUnidad").value
    var nombreProducto = document.getElementById("inputProducto").value

    if (cantidadProducto == "" || nombreProducto == "")
        alert("Algun de los campos está vacío.")
    else{
        var producto = creaNodo(divCarro, "div", null, cantidadProducto + unidadProducto + " " + nombreProducto, null, "producto")
        creaNodo(producto, "input", null, null, "checkbox", "check")
        producto.setAttribute("style", "background-color: white")

        document.getElementById("inputCantidad").value = ""
        document.getElementById("inputUnidad").value = ""
        document.getElementById("inputProducto").value = ""
        almacenaLista()
        document.getElementById("inputCantidad").focus()
    }
}


function borraProducto(){
    if (confirm("¿Desea borrar los elementos seleccionados?")){
        var hijos = divCarro.getElementsByClassName("producto")
        var contador = 0
        for (var i = hijos.length-1; i >= 0; i--) {
            var check = hijos[i].getElementsByClassName("check")
     
            if (check[0].checked){
                contador++
                var hijoInterno = hijos[i].firstChild
                while (hijoInterno != null) {
                    var borra = hijoInterno
                    hijoInterno = hijoInterno.nextSibling
                    hijos[i].removeChild(borra)
                }
                divCarro.removeChild(hijos[i])
            }
        }
        if (contador == 0)
            alert("No se ha seleccionado ningún elemento.")
    }
    almacenaLista()
}


function tachaProducto(){
    var hijos = divCarro.getElementsByClassName("producto")
    for (var i = 0; i < hijos.length; i++) {
        var check = hijos[i].getElementsByClassName("check")

        if (check[0].checked)
            if (hijos[i].style.textDecoration == "line-through")
                hijos[i].style.textDecoration = ""
            else
                hijos[i].style.textDecoration = "line-through"
        
    }
    almacenaLista()
}


function cambiaColor(){
    var color = this.style.backgroundColor
    
    var hijos = divCarro.getElementsByClassName("producto")
    for (var i = 0; i < hijos.length; i++) {
        var check = hijos[i].getElementsByClassName("check")
        if (check[0].checked)
            hijos[i].setAttribute("style", "background-color: " + color)
    }
    almacenaLista()
}


function reiniciarColor(){
    var color = "white"
    
    var hijos = divCarro.getElementsByClassName("producto")
    for (var i = 0; i < hijos.length; i++) {
        hijos[i].getElementsByClassName("check")
        hijos[i].setAttribute("style", "background-color: " + color)
        
    }
    almacenaLista()
}


function reordenaColor(){
    var arrayColores = ["lightskyblue", "lightsalmon", "lightgreen", "lightgoldenrodyellow"]
    var contador = 0
    for (var i = 0; i < arrayColores.length; i++) {
        
        var hijos = divCarro.getElementsByClassName("producto")
        for (var j = contador; j < hijos.length; j++) {
            if (hijos[j].style.backgroundColor == arrayColores[i]){
                divCarro.insertBefore(hijos[j], hijos[contador])
                contador++
            }
        }
    }
    almacenaLista()
}


//funcion generica para crear nodos
function creaNodo(padre, tagNodo, id, texto, tipo, clase, source, valor){
    var nodo = document.createElement(tagNodo)
    padre.appendChild(nodo)

    if (texto != null)
        nodo.textContent = texto
    if (tagNodo == "input")
        nodo.setAttribute("type", tipo)
    if (id != null)
        nodo.id = id
    if (source != null)
        nodo.setAttribute("src", source)
    if (clase != null)
        nodo.className = clase
    if (valor != null)
        nodo.value = valor
    return nodo
}


//funcion generica para crear botones
function creaBoton(padre, texto, id, clase){
    var nodo = document.createElement("button")
    nodo.textContent = texto
    if (id != null)
        nodo.id = id
    if (clase != null)
        nodo.className = clase
    padre.appendChild(nodo)
    return nodo
}


//almacenamiento en localstorage de la lista para navegadores que lo soporten
function almacenaLista(){
    if(window.navigator.userAgent.indexOf("Edge") == -1){
        var lista = divCarro.getElementsByClassName("producto")
        var guardar = ""
        for (var i = 0; i < lista.length; i++) {
            guardar += lista[i].textContent + "|"
            guardar += lista[i].style.backgroundColor + "|"
            if (lista[i].style.textDecoration == "line-through")
                guardar += "false" + "|"
            else
                guardar += "true" + "|"
        }
        localStorage.setItem("lista", guardar)
    }
}


function recuperaLista(){
    if(window.navigator.userAgent.indexOf("Edge") == -1){
        var storage = localStorage.getItem("lista")
        if (storage != null){
            var guardado = storage.split("|")
        
            for (var i = 0; i < guardado.length-2; i= i+3) {
                var producto = creaNodo(divCarro, "div", null, guardado[i + 0], null, "producto")
                creaNodo(producto, "input", null, null, "checkbox", "check")
                producto.setAttribute("style", "background-color: " + guardado[i + 1])
                if (guardado[i + 2] == "false")
                    producto.style.textDecoration = "line-through"
                divCarro.appendChild(producto)
            }
        }
    }
}