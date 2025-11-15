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

inputTxtCarnet.focus()