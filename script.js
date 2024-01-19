let fields = [
    null,
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
];

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

function render() {
    // let table = document.querySelector('table');

    for (let i = 0; i < fields.length; i++) {
        let cell = document.getElementById(`td${i}`);

        if (fields[i] === 'cross') {
            cell.innerHTML = svgCross();
        } else if (fields[i] === 'circle') {
            cell.innerHTML = svgCircle();
        } else if (fields[i] === null) {
            cell.innerHTML = ''; // leeren, wenn der Wert null ist
        }
    }
}