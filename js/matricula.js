// : El sistema debe permitir registrar la matrícula de estudiantes en los programas académicos. Cada matrícula debe asociar a un estudiante con un programa, incluyendo los siguientes datos:
// •	Identificación de matrícula (Número único alfanumérico) - Obligatorio y único para cada matrícula.
// •	Identificación del estudiante - Obligatorio y debe corresponder a un estudiante registrado en el sistema.
// •	Código del programa - Obligatorio y debe corresponder a un programa registrado en el sistema.
// •	Fecha de matrícula - Obligatorio y debe ser una fecha actual o futura.
// •	Estado de la matrícula (activa, en proceso, finalizada, cancelada) - Obligatorio y debe seleccionarse de una lista predefinida.

class Matricula {
  constructor(id, idEstudiante, idPrograma, fecha, estado) {
    this.id = id;
    this.idEstudiante = idEstudiante;
    this.idPrograma = idPrograma;
    this.fecha = fecha;
    this.estado = estado;
  }
}

function guardarMatricula() {
  const idMatricula = document.getElementById("codigo");
  const idEstudiante = document.getElementById("idEstudiante");
  const idPrograma = document.getElementById("idPrograma");
  const fecha = document.getElementById("fecha");
  const estado = document.getElementById("estado");

  const matricula = new Matricula(
    idMatricula.value,
    idEstudiante.value,
    idPrograma.value,
    fecha.value,
    estado.value
  );

  const matriculas = JSON.parse(localStorage.getItem("matriculas") || "[]");

  if (!validarMatricula(matricula, matriculas)) {
    return;
  }

  matriculas.push(matricula);
  localStorage.setItem("matriculas", JSON.stringify(matriculas));

  alert("Matrícula registrada correctamente.");

  idMatricula.value = "";
  idEstudiante.value = "";
  idPrograma.value = "";
  fecha.value = "";
  estado.value = "";
  idMatricula.focus();

  cargarMatriculas();
}

function validarMatricula(matricula, matriculas) {
  const idRegex = /^[a-zA-Z0-9]+$/;

  if (
    !matricula.id ||
    !matricula.idEstudiante ||
    !matricula.idPrograma ||
    !matricula.fecha ||
    !matricula.estado
  ) {
    alert("Todos los campos son obligatorios.");
    return false;
  }

  if (!idRegex.test(matricula.id)) {
    alert("Código inválido. Debe ser un número único alfanumérico.");
    return false;
  }

  if (matriculas.some((m) => m.id === matricula.id)) {
    alert("Código ya existe. Debe ser único para cada matrícula.");
    return false;
  }

  const fechaActual = new Date();
  const fechaMatricula = new Date(matricula.fecha);

  if (fechaMatricula < fechaActual) {
    alert("Fecha de matrícula inválida. Debe ser una fecha actual o futura.");
    return false;
  }

  return true;
}

function cargarEstudiantes() {
  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
  const idEstudiante = document.getElementById("idEstudiante");

  if (estudiantes.length === 0) {
    alert(
      "No hay estudiantes registrados. Debe registrar un estudiante primero."
    );
    window.location.href = "estudiante.html";
    return;
  }

  estudiantes.forEach((estudiante) => {
    const option = document.createElement("option");
    option.value = estudiante.idEstudiante;
    option.text = `${estudiante.nombre} - ${estudiante.idEstudiante}`;
    idEstudiante.appendChild(option);
  });
}

function cargarProgramas() {
  const programas = JSON.parse(localStorage.getItem("programas") || "[]");
  const idPrograma = document.getElementById("idPrograma");

  if (programas.length === 0) {
    alert("No hay programas registrados. Debe registrar un programa primero.");
    window.location.href = "programa.html";
    return;
  }

  programas.forEach((programa) => {
    const option = document.createElement("option");
    option.value = programa.idPrograma;
    option.text = `${programa.nombre} - ${programa.idPrograma}`;
    idPrograma.appendChild(option);
  });
}

function cargarMatriculas() {
  const matriculas = JSON.parse(localStorage.getItem("matriculas") || "[]");
  const tabla = document.getElementById("tablaMatriculas");
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }

  if (matriculas.length === 0) {
    const row = tabla.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 5;
    cell.textContent = "No hay matrículas registradas.";
    return;
  }

  matriculas.forEach((matricula) => agregarFilaMatricula(matricula));
}

function agregarFilaMatricula(matricula) {
  const tabla = document.getElementById("tablaMatriculas");
  const row = tabla.insertRow();
  row.insertCell().textContent = matricula.id;
  row.insertCell().textContent = matricula.idEstudiante;
  row.insertCell().textContent = matricula.idPrograma;
  row.insertCell().textContent = matricula.fecha;
  row.insertCell().textContent = matricula.estado;
}

cargarEstudiantes();
cargarProgramas();
cargarMatriculas();



