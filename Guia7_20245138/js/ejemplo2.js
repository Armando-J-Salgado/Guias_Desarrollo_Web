const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        let elemento = elementos[index];
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        } else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        } else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        } else if (tipoElemento == "radio" && tipoNode === "INPUT") {
            console.log(elemento);
            totRadio++;
        } else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        } else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        } else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        } else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de input[type="file"] = ${totFile}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.innerHTML = resultado;
    modal.show();
};

// EJERCICIO #2: FUNCIÓN PARA VALIDAR LOS CAMPOS
const validarCampos = function () {
    let valido = true;
    let elementos = formulario.elements;
    let rdMarcados = 0;
    let checkMarcados = 0;
    for (let index = 0; index < elementos.length; index++) {
        let elemento = elementos[index];
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        // Chequeo de nombre y apellido
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            if (elemento.value == "") {
                elemento.classList.add("is-invalid");
                valido = false;
            } else {
                elemento.classList.remove("is-invalid");
            }

            // Chequeo de contraseñas
        } else if (tipoElemento == "password" && tipoNode == "INPUT") {
            if (elemento.getAttribute("id")=="idPassword") {
                if (elemento.value == "") {
                    elemento.classList.add("is-invalid");
                    valido = false;
                } else {
                    elemento.classList.remove("is-invalid");
                }
            } else if (elemento.getAttribute("id") == "idPasswordRepetir") {
                if (document.getElementById("idPassword").value != elemento.value || elemento.value == "") {
                    elemento.classList.add("is-invalid");
                    valido = false;
                } else {
                    elemento.classList.remove("is-invalid");
                }
            }

            // VERIFICAR MAIL
        } else if (tipoElemento == "email" && tipoNode == "INPUT") {
            const regex = /^[\dA-Za-z]([\._\-\+]?[A-Za-z\d]+)*[\dA-Za-z][@][A-Za-z\d]+([\.\-]?[\dA-Za-z]{1,62})*[\.\-][A-Za-z]{2,63}$/;
            if (!regex.test(elemento.value)) {
                elemento.classList.add("is-invalid");
                valido = false;
            } else {
                elemento.classList.remove("is-invalid");
            }

            // VERIFICAR RADIOS
        } else if (tipoElemento == "radio" && tipoNode === "INPUT") {
            if (elemento.checked) {
                rdMarcados++;
            }

            // VERIFICAR CHECKBOXS
        } else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            if (elemento.checked) {
                checkMarcados++;
            }

            // VERIFICAR FILE
        } else if (tipoElemento == "file" && tipoNode == "INPUT") {
            if (elemento.files.length == 0) {
                elemento.classList.add("is-invalid");
                valido = false;
            } else {
                elemento.classList.remove("is-invalid");
            }

            // VERIFICAR FECHA
        } else if (tipoElemento == "date" && tipoNode == "INPUT") {
            let textoFecha = elemento.value;
            if (textoFecha == "") {
                elemento.classList.add("is-invalid");
                valido = false;
                continue;
            }

            let fecha = new Date(textoFecha);
            let fechaActual = new Date();
            fechaActual.setHours(0,0,0,0);

            if (fecha > fechaActual) {
                elemento.classList.add("is-invalid");
                valido = false;
            } else {
                elemento.classList.remove("is-invalid");
            }

            // COMPROBAR SELECT
        } else if (tipoNode == "SELECT") {
            if (elemento.selectedIndex === 0) {
                elemento.classList.add("is-invalid");
                valido = false;
            } else {
                elemento.classList.remove("is-invalid");
            }
        }        
    }
    const feedbackRd = document.getElementById("idDivRadios");
    const feedbackChecks = document.getElementById("idDivCheckboxs");

    if (rdMarcados == 0) {
        feedbackRd.classList.add("d-block");
        valido = false;
    } else {
        feedbackRd.classList.remove("d-block");
    }

    if (checkMarcados == 0) {
        feedbackChecks.classList.add("d-block");
        valido = false;
    } else {
        feedbackChecks.classList.remove("d-block");
    }

    return valido;
}

const crearTabla = function () {
    // Recolectar la información necesaria
    const nombres = document.getElementById("idNombre").value;
    const apellidos = document.getElementById("idApellidos").value;
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value;
    const password = document.getElementById("idPassword").value;

    const select = document.getElementById("idCmPais"); 
    const pais = select.options[select.selectedIndex].text;

    const archivo = document.getElementById("idArchivo").files[0].name;
    
    // Construir texto para intereses seleccionados
    let intereses = "";
    const checks = document.getElementsByName("idIntereses");
    for (let interes of checks) {
        if (interes.checked) {
            const id = interes.getAttribute("id");
            const texto = document.querySelector(`#${id} + label`).textContent;
            intereses = intereses == "" ? `${texto}` : `${intereses}, ${texto}`;
        }
    };

    // determinar carrera
    let carrera;
    const radios = document.getElementsByName("idRdCarrera");
    for (let radio of radios) {
        if (radio.checked) {
            const texto = document.querySelector(`#${radio.getAttribute("id")} + label`).textContent;
            carrera = texto;
            break;
        }
    };

    // Construir titulos de tabla
    const encabezadoNombre = document.createElement("th");
    encabezadoNombre.textContent = "Nombres";

    const encabezadoApellidos = document.createElement("th");
    encabezadoApellidos.textContent = "Apellidos";

    const encabezadoFechaNac = document.createElement("th");
    encabezadoFechaNac.textContent = "Fecha de nacimiento";

    const encabezadoCorreo = document.createElement("th");
    encabezadoCorreo.textContent = "Correo";

    const encabezadoPass = document.createElement("th");
    encabezadoPass.textContent = "Contraseña";

    const encabezadoIntereses = document.createElement("th");
    encabezadoIntereses.textContent = "Intereses";

    const encabezadoCarrera = document.createElement("th");
    encabezadoCarrera.textContent = "Carrera";

    const encabezadoPais = document.createElement("th");
    encabezadoPais.textContent = "País";

    const encabezadoArchivo = document.createElement("th");
    encabezadoArchivo.textContent = "Archivo";

    const trEncabezados = document.createElement("tr");
    trEncabezados.append(encabezadoNombre, encabezadoApellidos, encabezadoFechaNac, encabezadoCorreo, encabezadoPass, encabezadoIntereses,
        encabezadoCarrera, encabezadoPais, encabezadoArchivo);

    const thead = document.createElement("thead");
    thead.setAttribute("class", "table-dark");
    thead.appendChild(trEncabezados);

    // Cuerpo de la tabla
    const filaNombre = document.createElement("td");
    filaNombre.textContent = nombres;

    const filaApellidos = document.createElement("td");
    filaApellidos.textContent = apellidos;

    const filaFechaNac = document.createElement("td");
    filaFechaNac.textContent = fechaNac;

    const filaCorreo = document.createElement("td");
    filaCorreo.textContent = correo;

    const filaPass = document.createElement("td");
    filaPass.textContent = password;

    const filaIntereses = document.createElement("td");
    filaIntereses.textContent = intereses;

    const filaCarrera = document.createElement("td");
    filaCarrera.textContent = carrera;

    const filaPais = document.createElement("td");
    filaPais.textContent = pais;

    const filaArchivo = document.createElement("td");
    filaArchivo.textContent = archivo;

    const trFilas = document.createElement("tr");
    trFilas.append(filaNombre, filaApellidos, filaFechaNac, filaCorreo, filaPass, filaIntereses,
        filaCarrera, filaPais, filaArchivo);
    
    const tBody = document.createElement("tbody");
    tBody.appendChild(trFilas);

    // CREAR TABLA Y CONTENEDOR
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped table-bordered table-hover align-middle");
    tabla.append(thead, tBody);

    const div = document.createElement("div");
    div.setAttribute("class", "table-responsive");
    div.appendChild(tabla);

    const contenedor = document.createElement("div");
    contenedor.setAttribute("class", "container my-4");
    contenedor.appendChild(div);
    
    //Colocar en el modal
    const modalTabla = new bootstrap.Modal(document.getElementById("idModalTabla"), {});
    const bodyModalTabla = document.getElementById("idCuerpoModal");

    bodyModalTabla.replaceChildren(contenedor);
    modalTabla.show();
}

button.onclick = () => {
    recorrerFormulario();
    const formularioValido = validarCampos();
    if (formularioValido) {
        crearTabla(); //Aquí irá la función para construir la tabla
    }
};