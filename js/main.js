// **** VARIABLES  Globales **** //

// modal
var modal = document.getElementById("modal");

// boton add una nota
var btnAdd = document.getElementsByClassName("btn-add");

// elemento <span> para cerrar el modal
var closeModal = document.getElementsByClassName("close-modal");

//Boton cancelar nota (modal)
var btnCancel = document.getElementById("btnCancel");

//Boton añadir nota (modal)
var btnAcept = document.getElementById("btnAcept");

//Boton Update(modal)
var btnUpdate = document.getElementById("btnUpdate");

//Boton añadir nota (modal)
var removeNota = document.getElementsByClassName("remove");

// caja texto nota agregamos un texto 
var cajaTexto = document.getElementById("cajaTexto");

var listadoNotasElement = document.getElementById("listadoNotas");

var listadoNotasChecked = document.getElementById("listadoNotasChecked");

var EditarNota = document.getElementsByClassName("edit");

var tituloNotas = document.getElementsByClassName("titulo-notas");

//declaramos el array vacio para mas abajo ir rellenandolo
var listadoNotas = [];

//declaramos el array vacio para mas abajo ir rellenandolo
var listaChecked = [];


$(document).ready(function () {
    //creamos los eventos
    $(btnAdd).on('click', abrirModal);
    $(btnUpdate).on('click', updateNota);
    $(btnAcept).on('click', guardarNota);
    $(btnCancel).on('click', cerrarModal);
});

//Funciones

function cargaDatos() { // Refrescar la lista del html y pintarla de las notas activas

    listadoNotasElement.innerHTML = ''; // Vaciamos el ul (to do) para que no tenga nada de li = <ul> </ul>
    listadoNotasChecked.innerHTML = ''; // Vaciamos el ul (done) 
    var listaChecked = []; 

    if (listadoNotas.length > 0) {
        //si hay alguna nota añadimos el titulo To Do
        var h4ToDo = document.createElement("h4"); // Crear el elemento html <h4> </h4>
        h4ToDo.className = "titulo-notas"; // Añadir la clase
        var textoToDo = document.createTextNode('To Do'); // Crear el elemento texto
        h4ToDo.appendChild(textoToDo); // Añadimos el texto al elemento <h4> Texto </h4>
        var hr = document.createElement("hr"); // Crear el elemento html <hr>
        h4ToDo.appendChild(hr); //añadimoa el hr al h4
        listadoNotasElement.appendChild(h4ToDo); // añadimos el h4 al ul To Do

        //si hay alguna nota añadimos el titulo Done
        var h4Done = document.createElement("h4"); // Crear el elemento html <h4> </h4>
        h4Done.className = "titulo-notas"; // Añadir la clase
        var textoDone = document.createTextNode('Done'); // Crear el elemento texto
        h4Done.appendChild(textoDone); // Añadimos el texto al elemento <h4> Texto </h4>
        var hrDone = document.createElement("hr"); // Crear el elemento html <hr>
        h4Done.appendChild(hrDone); //añadimoa el hr al h4
        listadoNotasChecked.appendChild(h4Done); // añadimos el h4 al ul Done

        //recorremos el array de notas To Do
        for (let i = 0; i < listadoNotas.length; i++) {
            const nota = listadoNotas[i]; // La nota de la posicion de i
            var li = document.createElement("li"); // Crear el elemento html <li> </li>
            li.className = "nota"; // Añadir la clase
            var divTexto = document.createElement("div"); // Crear el elemento html <li> </li>
            divTexto.className = "texto-notas"; // Añadir la clase
            li.appendChild(divTexto); // Añadimos el texto al elemento <li> Texto </li>
            var text = document.createTextNode(nota.texto); // Crea un elemento de text
            divTexto.appendChild(text); // Añadimos el texto al elemento <li> Texto </li>
            var divIcons = document.createElement("div"); // Crear elemento <div> </div>
            divIcons.className = "icons"; // Añadir la clase
            li.appendChild(divIcons); // Añadimos el icono al li <li> Texto <div class="icons"> </div>

            var iconEdit = document.createElement("div"); // Crear elemento <div> </div>
            iconEdit.className = "icon-edit"; // Añadir la clase

            divIcons.appendChild(iconEdit); // al div icons le añadimos el div iconEdit
            var iEdit = document.createElement("i"); // Crear elemento <i> </i>
            iEdit.className = "fas fa-pencil-alt"; // Añadir la clase
            iconEdit.appendChild(iEdit); // al div le añadimos el icono de editar

            var iconDelete = document.createElement("div"); // Crear elemento <div> </div>
            iconDelete.className = "icon-delete remove"; // Añadir la clase
            // Evento en escucha del click por cada elemento de la lista
            divIcons.appendChild(iconDelete); // al div icons le añadimos el div iconDelete
            var iDelete = document.createElement("i"); // Crear elemento <i> </i>
            iDelete.className = "fas fa-times"; // Añadir la clase
            iconDelete.appendChild(iDelete); // al div le añadimos el icono de delete

            //si la nota esta tachada añade la clase y añade el li al ul de Done
            if (nota.checked) {
                $(divTexto).addClass('tachado');
                listaChecked.push(nota); //sube la nota al array de checked
                console.log(listaChecked);
                listadoNotasChecked.appendChild(li); // Añadimos este elemento li al ul (Done)
            } else { //si no --> borra la clase y añade el li al ul de To Do
                $(divTexto).removeClass('tachado');
                listadoNotasElement.appendChild(li); // Añadimos este elemento li al ul (To Do)
            }

            // Evento en escucha del click por cada elemento de la lista
            iconEdit.addEventListener('click', function () {
                editNota(i, nota); // Llamamos a la función pasandole la posicion que queremos editar en el caso de que hagamos click
            });
            divTexto.addEventListener('click', function () {
                tacharNota(i); // Llamamos a la función para cuando demos click se tache el texto
            });
            iconDelete.addEventListener('click', function () {
                deleteNota(i); //Llamamos a la función pasandole la posicion que queremos borrar en el caso de que hagamos click
            });
        }
        $('.cont-total').text(listadoNotas.length);  //(To Do)
        $('.cont-check').text(listaChecked.length);  //(Done)
    } else {
        $('.cont-total').text('0'); //si no hay ninguna nota el contador esta en 0

    }
}

function tacharNota(posicion) {  //tachamos la nota sleeccionada
    var notaLocal = listadoNotas[posicion]; //tenemos la posicion de la nota
    /*     if(notaLocal.checked){
            notaLocal.checked = false;
        }else{
            notaLocal.checked = true;
        } */
    /* notaLocal.checked ? false : true; */

    notaLocal.checked = !notaLocal.checked; //si nota esta checked (true) que se ponga en (false)
    listadoNotas[posicion] = notaLocal;
    cargaDatos();
}

function editNota(posicion, nota) { //boton editar nota
    cajaTexto.value = nota.texto;
    posicionUpdate = posicion;
    console.log("Has dado click en editar nota");
    //hay que comprobar si la nota esta tachada si lo esta no se puede editar si no si
    if (nota.checked) {
        alert("La nota seleccionada no se puede editar");
    } else {
        abrirModal();
        $(btnAcept).css({ 'display': 'none' });
        //visualizaremos el boton de update cuando demos click en el boton de editar y le añadiremos que cuando de click ejecute guardar nota
        $(btnUpdate).css({ 'display': 'block' });
        console.log(cajaTexto.value);
    }
}

function deleteNota(posicion) { //boton eliminar nota
    var alerta = confirm("¿Está seguro que desea eliminar la nota?");
    if (alerta == true) {
        listadoNotas.splice(posicion, 1);
        cargaDatos();
    }
}

function abrirModal() { //abrir el modal
    $(modal).css({ 'display': 'block' });
    console.log("Se ha abierto el modal");
    //campo texto con focus
    $(cajaTexto).focus();

}

function cerrarModal() { //cerra el modal
    $(modal).css({ 'display': 'none' });
    console.log("Se ha cerrado el modal");

}

function agregarNota() { //añadir la nota al html
    //tenemos que pasar el objeto a un array para mostrarlo en pantalla
    listadoNotas.push(nuevaNota);
    //console.log(listadoNotas);

    cargaDatos();
    cerrarModal();
    cajaTexto.value = ""; //Vacie la caja de texto al cerrar el modal
}

function guardarNota() { //crear la nota y guardarla
    //var textoValor = document.getElementById("cajaTexto").value;
    if (cajaTexto.value != "" && cajaTexto.value != null) {
        console.log(cajaTexto.value);
        // variable global del fichero js
        nuevaNota = new Nota(cajaTexto.value, false); // Creamos un objeto nuevo de tipo Nota
        //cuando demos al boton aceptar ejecutara la funcion
        agregarNota();
    } else {
        // TODO --> Mostrar mensaje al usuario
        alert("Nota vacia, escriba un texto");
    }
}

function updateNota() { //actualizar la nueva nota (editada)
    //falta agregar la nota al html
    listadoNotas[posicionUpdate].texto = cajaTexto.value;
    console.log(listadoNotas[posicionUpdate]);
    cargaDatos();
    cerrarModal();
    cajaTexto.value = ""; //Vacie la caja de texto al cerrar el modal
}

function Nota(texto, checked) { // Objeto Nota
    //this.id = id; // number
    this.texto = texto; // String
    this.checked = checked; // Boolean
}


