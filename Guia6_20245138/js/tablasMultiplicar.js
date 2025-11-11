//Accedemos al contenedor donde se mostrarán las tablas
const containerResultado = document.querySelector('#idContainerResultado');

//Accedemos a cada boton por medio de la API DOM
const btnCalcular = document.querySelector("#idBtnCalcular");

//Agregamos el evento click al botno calcular
//Se le asigna la funcion que realizará la operación
btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    //Capturando el valor del campo
    const inputTabla = document.querySelector("#inputTabla").value;

    //inicializamos un contador
    let contador = 1;

    //Verfiquemos que el dato colocado sea entero y positivo
    if (inputTabla > 0) {
        let tabla = `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;

        //Utilizaremos do while para generar la tabla de multiplicar
        // que el usuario ha indicado

        do {
            let resultado = contador * inputTabla;
            tabla += `<div class="row text-center">`;
            tabla += `<div class="col-md-1 colum"><h3>${contador}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>x</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${inputTabla}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>=</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${resultado}</h3></div>`;
            tabla += `</div>`;
            
            //Incrementamos el contador para salir del do while
            contador++;
        } while (contador <= 12);

        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = tabla;
    } else {
        alert("No se ha ingresado un número válido");
    }
}