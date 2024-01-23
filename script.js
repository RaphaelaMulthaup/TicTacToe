let fields = [null, null, null, null, null, null, null, null, null];

let circleActiv = true;
let crossActiv = false;
let animationInProgress = false;

function render(id, index) {
  // Abfrage, ob die Animation des vorherigen Spielzugs noch läuft
  if (animationInProgress) {
    return;
  }
  renderVisual(id);
  // onclick-Funktion und Coursor werden von der td entfernt.
  document.getElementById(id).removeAttribute("onclick");
  document.getElementById(id).classList.remove("tdHover");

  goingOn(index);
}

function renderVisual(id) {
  // die Felder werden geleert
  for (let i = 0; i < fields.length; i++) {
    document.getElementById(`td${i}`).innerHTML = "";
  }
  // Animation erscheint
  if (circleActiv) {
    document.getElementById(id).innerHTML = svgCircleAnimation();
  } else {
    document.getElementById(id).innerHTML = svgCrossAnimation();
  }
  //   Status: laufende Animation.
  animationInProgress = true;
  // die restlichen Grafiken werden geladen
  for (let i = 0; i < fields.length; i++) {
    let cell = document.getElementById(`td${i}`);

    if (fields[i] === "cross") {
      cell.innerHTML = svgCross();
    } else if (fields[i] === "circle") {
      cell.innerHTML = svgCircle();
    }
  }
}

function svgCircleAnimation() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="35" fill="transparent" stroke="#fff" stroke-width="7.4"
                stroke-dasharray="220" stroke-dashoffset="220" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" values="220;0" dur="0.5s" keyTimes="0;1" fill="freeze"/>
        </circle>
    </svg>
    `;
}

function svgCrossAnimation() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" transform="rotate(45)">
        <rect x="46.5" y="10" width="7" height="80" rx="3.5" ry="3.5" fill="#fff">
            <animate attributeName="height" values="0;80" dur="0.5s" keyTimes="0;1" fill="freeze"/>
        </rect>
        <rect x="10" y="46.5" width="80" height="7" rx="3.5" ry="3.5" fill="#fff">
            <animate attributeName="width" values="0;80" dur="0.5s" keyTimes="0;1" fill="freeze"/>
        </rect>
    </svg>
    `;
}

function svgCircle() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="35" fill="transparent" stroke="#fff" stroke-width="7.4"/>
    </svg>
    `;
}

function svgCross() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" transform="rotate(45)">
        <rect x="46.5" y="10" width="7" height="80" rx="3.5" ry="3.5" fill="#fff"/>
        <rect x="10" y="46.5" width="80" height="7" rx="3.5" ry="3.5" fill="#fff"/>
    </svg>
    `;
}

function goingOn(index) {
  // Erst nach der Animation ist der nächste Spielzug möglich.
  setTimeout(function () {
    // Status, dass die Animation nicht mehr aktiv ist.
    animationInProgress = false;
    changeActivPlayer(index);
  }, 500);
}

function changeActivPlayer(index) {
  if (circleActiv) {
    // Das angeklickte Feld im Array eintragen.
    fields.splice(index, 1, "circle");

    if (checkWinner() == null) {
      crossIsActivNow();
      changeAktivPlayerVariables();
    }
  } else {
    // Das angeklickte Feld im Array eintragen.
    fields.splice(index, 1, "cross");

    if (checkWinner() == null) {
      circleIsActivNow();
      changeAktivPlayerVariables();
    }
  }
}

function crossIsActivNow() {
  document.getElementById("circle").setAttribute("stroke", "#efd8d2");
  document.getElementById("x1").setAttribute("fill", "#fff");
  document.getElementById("x2").setAttribute("fill", "#fff");
}

function circleIsActivNow() {
  document.getElementById("circle").setAttribute("stroke", "#fff");
  document.getElementById("x1").setAttribute("fill", "#efd8d2");
  document.getElementById("x2").setAttribute("fill", "#efd8d2");
}

function changeAktivPlayerVariables() {
  circleActiv = !circleActiv;
  crossActiv = !crossActiv;
}

function checkWinner() {
  checkLines();
  checkColumns();
  checkDiagonals();
  // Alle Felder sind angeklickt, ohne, dass es einen Gewinner gibt.
  if (!fields.includes(null)) {
    gameOver();
  }
  // Das Spiel ist noch nicht vorbei.
  return null;
}

function checkLines() {
  // Überprüfe Zeilen
  for (let i = 0; i < 3; i++) {
    if (
      fields[i * 3] === fields[i * 3 + 1] &&
      fields[i * 3 + 1] === fields[i * 3 + 2] &&
      fields[i * 3] !== null
    ) {
      // ändere die Farbe zu Sabei
      changeSvgElementColors(`td${i * 3}`);
      changeSvgElementColors(`td${i * 3 + 1}`);
      changeSvgElementColors(`td${i * 3 + 2}`);
      gameOver();
    }
  }
}

function checkColumns() {
  // Überprüfe Spalten
  for (let i = 0; i < 3; i++) {
    if (
      fields[i] === fields[i + 3] &&
      fields[i + 3] === fields[i + 6] &&
      fields[i] !== null
    ) {
      // ändere die Farbe zu Sabei
      changeSvgElementColors(`td${i}`);
      changeSvgElementColors(`td${i + 3}`);
      changeSvgElementColors(`td${i + 6}`);
      gameOver();
    }
  }
}

function checkDiagonals() {
  // Überprüfe Diagonalen
  if (
    fields[0] === fields[4] &&
    fields[4] === fields[8] &&
    fields[0] !== null
  ) {
    // ändere die Farbe zu Sabei
    changeSvgElementColors("td0");
    changeSvgElementColors("td4");
    changeSvgElementColors("td8");
    gameOver();
  }
  if (
    fields[2] === fields[4] &&
    fields[4] === fields[6] &&
    fields[2] !== null
  ) {
    // ändere die Farbe zu Sabei
    changeSvgElementColors("td2");
    changeSvgElementColors("td4");
    changeSvgElementColors("td6");
    gameOver();
  }
}

// Funktion zum Ändern der Füll- und Strichfarbe der circle- und rect-Elemente in einer Zelle
function changeSvgElementColors(cellId) {
  //   alle svg-Elemente in einer Zelle
  let svgElements = document
    .getElementById(cellId)
    .querySelectorAll("svg circle, svg rect");

  for (let j = 0; j < svgElements.length; j++) {
    if (svgElements[j].tagName === "circle") {
      // Setze nur die Strichfarbe des Kreises, lasse die Füllfarbe transparent
      svgElements[j].style.stroke = "#8B9C8B";
    } else if (svgElements[j].tagName === "rect") {
      // Setze die Füllfarbe des Rechtecks
      svgElements[j].style.fill = "#8B9C8B";
    }
  }
}

function gameOver() {
  // Entferne die onclick-Attribute von den td-Elementen
  for (let i = 0; i < fields.length; i++) {
    let cell = document.getElementById(`td${i}`);
    cell.removeAttribute("onclick");
    cell.classList.remove("tdHover");
  }
  document.getElementById("restartButton").style.display = "block";
}

function resetGame() {
  // Setze die Spielvariablen zurück (innerhalb der Funktion deklariert)
  fields = [null, null, null, null, null, null, null, null, null];

  // Setze die Inhalte der td-Elemente zurück und führt die onclick-Attribute wieder ein.
  for (let i = 0; i < fields.length; i++) {
    let cell = document.getElementById(`td${i}`);
    cell.innerHTML = "";
    cell.onclick = function () {
      render(`td${i}`, i);
    };
  }
  // Entferne den "Noch einmal spielen!"-Button
  document.getElementById("restartButton").style.display = "none";
}
