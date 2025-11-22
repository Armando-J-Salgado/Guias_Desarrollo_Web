const newForm = document.getElementById("idNewForm");
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const cmbElemento = document.getElementById("idCmbElemento");
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// EJERCICIO 1: ARREGLO PARA ALMACENAR IDS, AYUDA A VALIDAR QUE NO HAYA ID REPETIDOS
const nombresComponentes = []
const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("idToast"));
const toastMessageContainer = document.getElementById("idMessage");

//EJERCICIO 1: BOTÓN PARA VALIDAR Y VARIABLE DE FORMULARIO VÁLIDO
const buttonValidar = document.getElementById("idBtnValidar");
let formularioValido;

// EJERCICIO 1: FUNCIÓN PARA VALIDAR SI UN ID YA EXISTE
const validarId = function (nombre) {
    return nombresComponentes.includes(nombre);
};

//EJERCICIO 1: FUNCION PARA VALIDAR LOS CAMPOS DEL FORMULARIO
const validarCampos = function () {
    formularioValido = true;
    const elementos = newForm.elements;
    if (elementos.length == 0) {
        alert("Formulario vacío");
        return
    }
    for (let index = 0; index < elementos.length; index++) {
        const elemento = elementos[index];
        let categoria = elemento.type;
        let tipo = elemento.nodeName;

        if (tipo == "SELECT" || (tipo == "INPUT" && categoria != "radio" && categoria != "checkbox") || tipo=="TEXTAREA") {
            if (elemento.value == "") {
                elemento.classList.add("is-invalid");
                formularioValido = false;
            } else {
                elemento.classList.remove("is-invalid");
            }
        } else if (categoria == "radio" || categoria == "checkbox") {
            if (!elemento.checked) {
                elemento.classList.add("is-invalid");
                formularioValido = false;
            } else  {
                elemento.classList.remove("is-invalid");
            }
        }
    }
    if (formularioValido) {
        alert("Todos los campos son correctos!");
    }
};

const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const newSelect = function () {
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divFeedback = document.createElement("div");
    divFeedback.setAttribute("class", "invalid-feedback");
    divFeedback.textContent = "Debes seleccionar una opción";

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    divElemento.appendChild(divFeedback);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divFeedback = document.createElement("div");
    divFeedback.setAttribute("class", "invalid-feedback");
    divFeedback.textContent = "Debes checkear el botón";

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    divElemento.appendChild(divFeedback);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let addElemento = 
    newElemento == "textarea"
    ? document.createElement("textarea")
    : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divFeedback = document.createElement("div");
    divFeedback.setAttribute("class", "invalid-feedback");
    divFeedback.textContent = "Debes ingresar un valor";

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    divElemento.appendChild(divFeedback);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {

        if (validarId(nombreElemento.value)) {
            const mensaje = document.createElement("p");
            mensaje.textContent = `El nombre ${nombreElemento.value} ya existe, no puedes usar el mismo ID dos veces`;
            toastMessageContainer.replaceChildren(mensaje);
            toast.show()
        } else {
            nombresComponentes.push(nombreElemento.value);
            let elemento = cmbElemento.value;

            if (elemento == "select") {
                newSelect();
            } else if(elemento == "radio" || elemento == "checkbox") {
                newRadioCheckbox(elemento);
            } else {
                newInput(elemento);
            }
        }
    } else {
        alert("Faltan campos por completar");
    }
};

buttonValidar.onclick = () => {
    validarCampos();
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});