// Variables globales

"use strict";

let cita = {
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

document.addEventListener("DOMContentLoaded", function () {
  crearServicios();
  validarCita();
  validacionInputNombre();
  validacionInputFecha();
  validacionInputHora();
});

async function crearServicios() {
  const response = await fetch("../servicios.json");
  const res_servicios = await response.json();

  const { servicios } = res_servicios;

  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;

    //crear parrafo nombre
    const nombreParrafo = document.createElement("P");
    nombreParrafo.textContent = nombre;
    nombreParrafo.classList.add("nombre-servicio");

    //crear parrafo precio
    const precioParrafo = document.createElement("P");
    precioParrafo.textContent = "$" + precio;
    precioParrafo.classList.add("precio-servicio");

    //crear contenedor parrafo
    const div = document.createElement("DIV");
    div.classList.add("contenedor-servicio");
    div.dataset.servicio = `${id}`;

    //llamar a la funcion que da click en los divs

    div.onclick = seleccionarDiv;

    //agregar los parrafos al div
    div.appendChild(nombreParrafo);
    div.appendChild(precioParrafo);

    //inyectarlo al HTML
    const listadoServicios = document.querySelector(".listado-servicios");
    listadoServicios.appendChild(div);
  });
}

function seleccionarDiv(e) {
  let elemento;

  if (e.target.tagName == "FONT") {
    elemento = e.target.parentElement.parentElement.parentElement;
  } else if (e.target.tagName == "P") {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
  }

  const servicio = document.querySelector(
    `[data-servicio="${elemento.dataset.servicio}"]`
  );

  if (servicio.classList.contains("seleccionado")) {
    servicio.classList.remove("seleccionado");

    eliminandoCita(elemento.dataset.servicio);

    console.log(cita.servicios.length);

    if (cita.servicios.length === 0) {
      validarCita();
      console.log("paso por validar cita");
    }
  } else {
    servicio.classList.add("seleccionado");

    console.log(elemento.firstElementChild.textContent);

    let servicios = {
      id: elemento.dataset.servicio,
      nombre: elemento.firstElementChild.textContent,
      precio: elemento.firstElementChild.nextElementSibling.textContent,
    };

    agregarCita(servicios);
  }
}

function agregarCita(serviciosObj) {
  let { servicios } = cita;

  cita.servicios = [...servicios, serviciosObj];

  console.log(cita);
}

function eliminandoCita(id) {
  let { servicios } = cita;

  cita.servicios = servicios.filter((servicio) => servicio.id !== id);

  console.log(cita);
}

function validarCita() {
  let total = 0;

  if (Object.values(cita).includes("")) {
    if (document.querySelector(".contenido-parrafo")) {
      document.querySelector(".contenido-parrafo").remove();
    }

    if (document.querySelector(".titulo-informacion-cliente")) {
      document.querySelector(".titulo-informacion-cliente").remove();
    }
    if (document.querySelector(".contenido-informacion-cliente")) {
      document.querySelector(".contenido-informacion-cliente").remove();
    }

    const div = document.createElement("div");
    div.classList.add("contenido-parrafo");

    const p = document.createElement("p");
    p.textContent = "Faltan datos de Servicios nombre , fecha , hora ";
    p.classList.add("parrafo-vacio");

    div.appendChild(p);

    const divSeccion_resumen = document.querySelector(".contenido-resumen");
    divSeccion_resumen.appendChild(div);
  } else {
    if (document.querySelector(".contenido-informacion-cliente")) {
      document.querySelector(".contenido-informacion-cliente").remove();
    }

    const { nombre, fecha, hora, servicios } = cita;

    if (document.querySelector(".contenido-parrafo")) {
      document.querySelector(".contenido-parrafo").remove();
    }

    if (document.querySelector(".titulo-informacion-cliente")) {
      document.querySelector(".titulo-informacion-cliente").remove();
    }
    let h3InfoCliente = document.createElement("h3");
    h3InfoCliente.classList.add("titulo-informacion-cliente");
    h3InfoCliente.textContent = "Informacion Cliente";

    let pNombre = document.createElement("p");
    pNombre.innerHTML = `<span>Nombre:  </span>${nombre}`;

    let pFecha = document.createElement("p");
    pFecha.innerHTML = `<span>Fecha:  </span>${fecha}`;

    let pHora = document.createElement("p");
    pHora.innerHTML = `<span>Hora:  </span>${hora}`;

    let divContenidoServicio;
    let divContenidoInformacion = document.createElement("div");
    divContenidoInformacion.classList.add("contenido-informacion-cliente");

    divContenidoInformacion.appendChild(pNombre);
    divContenidoInformacion.appendChild(pFecha);
    divContenidoInformacion.appendChild(pHora);

    //inyectarlo al HTML

    const seccion = document.querySelector(".contenido-resumen");
    seccion.appendChild(h3InfoCliente);
    seccion.appendChild(divContenidoInformacion);

    let h3InfoServicios = document.createElement("h3");
    h3InfoServicios.textContent = "Informacion servicios";

    divContenidoServicio = document.createElement("div");
    divContenidoInformacion.classList.add("contenido-informacion-servicio");

    divContenidoInformacion.appendChild(h3InfoServicios);

    servicios.forEach((servicio) => {
      let pServicio = document.createElement("p");
      pServicio.classList.add("nombre-servicio");
      pServicio.innerHTML = ` ${servicio.nombre} `;

      let pServicioPrecio = document.createElement("p");
      pServicioPrecio.classList.add("precio-servicio");
      pServicioPrecio.innerHTML = `$ ${servicio.precio} `;

      divContenidoInformacion.appendChild(pServicio);
      divContenidoInformacion.appendChild(pServicioPrecio);

      let precio = servicio.precio.split("$");

      total += parseInt(precio[1]);
    });

    if (cita.servicios.length === 0) {
      let pServicio = document.createElement("p");
      pServicio.classList.add("nombre-servicio");
      pServicio.innerHTML = `Los servicios estan vacíos, seleccionelos para continuar`;
      divContenidoInformacion.appendChild(pServicio);
    } else {
      let pTotal = document.createElement("p");
      pTotal.classList.add("cantidad-pagar");
      pTotal.innerHTML = ` <span>Total Pagar: </span>$ ${total} `;
      divContenidoInformacion.appendChild(pTotal);
    }

    seccion.appendChild(divContenidoServicio);
  }
}

function validacionInputNombre() {
  const inputNombre = document.querySelector("#nombre");

  inputNombre.addEventListener("input", function (e) {
    if (e.target.value.length <= 3 || e.target.value.trim() == "") {
      mensajeError("el nombre es muy corto o no puede estar vacio", "error");
      cita.nombre = "";

      return;
    }

    //inyectar en el objeto de cita lo que el usuario escribe en el input

    cita.nombre = e.target.value.trim();
  });
}

function mensajeError(mensaje, tipo) {
  let pError = document.createElement("p");
  pError.innerHTML = `<span> ${mensaje}</span> `;
  pError.classList.add("erro-p");

  let divError = document.createElement("div");
  divError.classList.add(tipo);
  divError.appendChild(pError);

  if (document.querySelector(".error")) {
    console.log("Esta pasando por aqui");
    document.querySelector(".error").remove();
  }

  //inyectarlo al HTML

  const formulario = document.querySelector(".formulario");
  formulario.appendChild(divError);

  setTimeout(() => {
    divError.remove();
  }, 3000);
}

function validacionInputFecha() {
  const inputFecha = document.querySelector("#fecha");

  inputFecha.addEventListener("input", function (e) {
    let dia = new Date(e.target.value).getUTCDay();

    validarFechaAnterior(fecha);

    console.log([0].includes(dia));

    if ([0].includes(dia) || [6].includes(dia)) {
      mensajeError("No hay citas para sabados o domingos", "error");

      e.target.value = "";
      cita.fecha = "";
    } else {
      cita.fecha = e.target.value;
    }

    console.log(cita);
  });

  validarFechaAnterior();
}

function validarFechaAnterior(fecha) {
  let inputFecha = document.querySelector("#fecha");

  let fechaActual = new Date();

  let year = fechaActual.getUTCFullYear();
  let mes = fechaActual.getMonth() + 1;
  let dia = fechaActual.getDate();

  console.log(`${year}-0${mes}-0${dia}`);

  //FORMATO DESEADO AAAA-MM-DD

  inputFecha.min = `${year}-0${mes}-0${dia}`;
}

function validacionInputHora() {
  let inputHora = document.querySelector("#hora");

  inputHora.addEventListener("input", function (e) {
    let hora = e.target.value.split(":");

    console.log(parseInt(hora[0]));

    if (hora[0] > 21 || hora[0] < 8) {
      mensajeError(
        "No hay citas antes de las 8AM o despues de las 10PM",
        "error"
      );
      cita.hora = "";
      e.target.value = "";

      return;
    }

    cita.hora = e.target.value;
  });
}
