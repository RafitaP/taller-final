class Estudiante {
  constructor(idEstudiante, nombre, fechaNacimiento, correo, telefono) {
    this.idEstudiante = idEstudiante;
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.correo = correo;
    this.telefono = telefono;
  }
}

function validarEstudiante(estudiante, estudiantes) {
  const idRegex = /^[a-zA-Z0-9]+$/;
  const nombreRegex = /^[a-zA-Z\s]+$/;

  if (!idRegex.test(estudiante.id)) {
    alert("Identificación inválida. Debe ser un número único alfanumérico.");
    return false;
  }

  if (estudiantes.some((e) => e.id === estudiante.id)) {
    alert("Identificación ya existe. Debe ser única para cada estudiante.");
    return false;
  }

  if (!nombreRegex.test(estudiante.nombre)) {
    alert("Nombre inválido. Debe contener solo caracteres alfabéticos.");
    return false;
  }

  // Validación de la fecha de nacimiento (no debe ser mayor a la fecha actual)
  const fechaNacimiento = new Date(estudiante.fechaNacimiento);
  const fechaActual = new Date();

  if (fechaNacimiento > fechaActual) {
    alert("La fecha de nacimiento no puede ser mayor a la fecha actual.");
    return false;
  }

  return true;
}

function registrar() {
  const idEstudiante = document.getElementById("idEstudiante");
  const nombre = document.getElementById("nombreEstudiante");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");

  const estudiante = new Estudiante(
    idEstudiante.value,
    nombre.value,
    fechaNacimiento.value,
    correo.value,
    telefono.value
  );
  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");

  if (!validarEstudiante(estudiante, estudiantes)) {
    return;
  }

  estudiantes.push(estudiante);
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

  idEstudiante.value = "";
  nombre.value = "";
  fechaNacimiento.value = "";
  correo.value = "";
  telefono.value = "";
  idEstudiante.focus();

  alert("Estudiante guardado con éxito");
  console.log(estudiantes);
}
