const formulario = document.getElementById("idForm");
const inputTxtCarnet = document.getElementById("idTxtCarnet");
const inputTxtName = document.getElementById("idTxtName");
const inputTxtDui = document.getElementById("idTxtDui");
const inputTxtNit = document.getElementById("idTxtNit");
const inputTxtBirthDate = document.getElementById("idTxtBirthDate");
const inputTxtEmail = document.getElementById("idTxtEmail");
const inputTxtAge = document.getElementById("idTxtAge");

const buttonRegistrarEstudiante = document.getElementById("idBtnGuardar");
const buttonLimpiarFormulario = document.getElementById("idBtnReset");

const notificacion = document.getElementById("idNotificacionRegistro");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensajeRegistro");

inputTxtCarnet.focus();

// Variable para determinar el estado del formulario
let formularioValido = true;

// Funciones para comprobar

function comprobarCarnet(carnet) {
    const regex = /^[A-Za-z]{2}\d{3}$/;
    const valido = regex.test(carnet); 
    inputTxtCarnet.classList.remove("is-valid", "is-invalid");
    inputTxtCarnet.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

function comprobarNombre(nombre) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóú]{2,}(\s+[A-Za-zÁÉÍÓÚáéíóú]+)+$/;
    const valido = regex.test(nombre);
    inputTxtName.classList.remove("is-valid", "is-invalid");
    inputTxtName.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

function comprobarDui(dui) {
    const regex = /^\d{8}\-\d$/;
    const valido = regex.test(dui);
    inputTxtDui.classList.remove("is-valid", "is-invalid");
    inputTxtDui.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

function comprobarNit(nit) {
    const regex = /^\d{4}\-\d{6}\-\d{3}\-\d$/;
    const valido = regex.test(nit);
    inputTxtNit.classList.remove("is-valid", "is-invalid");
    inputTxtNit.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

function comprobarFecha(fecha) {
    const regex = /^[0123][\d]\/[01][\d]\/[\d]{4}$/;
    const valido = regex.test(fecha);
    inputTxtBirthDate.classList.remove("is-valid", "is-invalid");
    inputTxtBirthDate.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

function comprobarCorreo(correo) {
    const regex = /^[\dA-Za-z]([\._\-\+]?[A-Za-z\d]+)*[\dA-Za-z][@][A-Za-z\d]+([\.\-]?[\dA-Za-z]{1,62})*[\.\-][A-Za-z]{2,63}$/;
    const valido = regex.test(correo);
    inputTxtEmail.classList.remove("is-valid", "is-invalid");
    inputTxtEmail.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

function comprobarEdad(edad) {
    const regex = /^[\d]{1,3}$/;
    const valido = regex.test(edad);
    inputTxtAge.classList.remove("is-invalid", "is-valid");
    inputTxtAge.classList.add(valido ? "is-valid" : "is-invalid");
    formularioValido = valido ? formularioValido : false;
};

//Función para limpiar campos
const limpiarCampos = function () {
    inputTxtCarnet.value = "";
    inputTxtName.value = "";    
    inputTxtDui.value = "";
    inputTxtNit.value = "";    
    inputTxtAge.value = 18;
    inputTxtEmail.value = "";
    const fechaActual = new Date();
    const fechaActualTxt = fechaActual.toISOString().split('T')[0];
    inputTxtBirthDate.value= fechaActualTxt;
    
    limpiarValidaciones();
    inputTxtCarnet.focus();
};

// Función para limpiar las validaciones
const limpiarValidaciones = function () {
    inputTxtCarnet.classList.remove("is-valid", "is-invalid");
    inputTxtName.classList.remove("is-valid", "is-invalid");
    inputTxtDui.classList.remove("is-valid", "is-invalid");
    inputTxtNit.classList.remove("is-valid", "is-invalid");
    inputTxtAge.classList.remove("is-valid", "is-invalid");
    inputTxtEmail.classList.remove("is-valid", "is-invalid");
    inputTxtBirthDate.classList.remove("is-valid", "is-invalid");
    formulario.classList.remove("was-validated");
    formularioValido = true;
};

// Recolectar datos y llamar validaciones
const validarFormulario = function () {
    const carnet = inputTxtCarnet.value.trim()
    const nombre = inputTxtName.value.trim()
    const dui = inputTxtDui.value.trim()
    const nit = inputTxtNit.value.trim()
    const [anyo, mes, dia] = inputTxtBirthDate.value.split("-");
    const fechaNacimiento = `${dia}/${mes}/${anyo}`;
    const correo = inputTxtEmail.value;
    const edad = inputTxtAge.value;

    comprobarCarnet(carnet);
    comprobarNombre(nombre);
    comprobarDui(dui);
    comprobarNit(nit);
    comprobarFecha(fechaNacimiento);
    comprobarCorreo(correo);
    comprobarEdad(edad);

    if(formularioValido) {
        mensaje.innerHTML = `<p>Estudiante ${nombre} creado de forma exitosa: <br>
        Carnet: ${carnet}<br>
        DUI: ${dui}<br>
        NIT: ${nit}<br>
        Fecha de nacimiento: ${fechaNacimiento}<br>
        Edad: ${edad}<br>
        Correo: ${correo}</p>`;
        toast.show();
    };
};

// Añadir a evento
buttonRegistrarEstudiante.addEventListener("click", () => {
    limpiarValidaciones();
    validarFormulario();
}, false);
buttonLimpiarFormulario.addEventListener("click", limpiarCampos);