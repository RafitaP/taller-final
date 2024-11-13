class Programa {
  constructor(idPrograma, nombre, duracion, modalidad, fechaInicio) {
    this.idPrograma = idPrograma;
    this.nombre = nombre;
    this.duracion = duracion;
    this.modalidad = modalidad;
    this.fechaInicio = fechaInicio;
  }
}

function guardarProgramas() {
  const idPrograma = document.getElementById("codigo");
  const nombre = document.getElementById("nombre");
  const duracion = document.getElementById("duracion");
  const modalidad = document.getElementById("modalidad");
  const fechaInicio = document.getElementById("fechaInicio");

  const programa = new Programa(
    idPrograma.value,
    nombre.value,
    duracion.value,
    modalidad.value,
    fechaInicio.value
  );
  const programas = JSON.parse(localStorage.getItem("programas") || "[]");

  if (!validarPrograma(programa, programas)) {
    return;
  }

  programas.push(programa);
  localStorage.setItem("programas", JSON.stringify(programas));

  alert("Programa registrado correctamente.");
  console.log(programas);

  idPrograma.value = "";
  nombre.value = "";
  duracion.value = "";
  modalidad.value = "";
  fechaInicio.value = "";
  idPrograma.focus();
}

function validarPrograma(programa, programas) {
  const idRegex = /^[a-zA-Z0-9]+$/;
  const nombreRegex = /^[a-zA-Z\s]+$/;

  if (!idRegex.test(programa.idPrograma)) {
    alert("Código inválido. Debe ser un número único alfanumérico.");
    return false;
  }

  if (programas.some((p) => p.idPrograma === programa.idPrograma)) {
    alert("Código ya existe. Debe ser único para cada programa.");
    return false;
  }

  if (!nombreRegex.test(programa.nombre)) {
    alert("Nombre inválido. Debe contener solo caracteres alfabéticos.");
    return false;
  }

  // Validación de la fecha de inicio (no debe ser mayor a la fecha actual)
  const fechaInicio = new Date(programa.fechaInicio);
  const fechaActual = new Date();

  if (fechaInicio > fechaActual) {
    alert("La fecha de inicio no puede ser mayor a la fecha actual.");
    return false;
  }

  return true;
}
