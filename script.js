let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

 let circleActiv = true;
 let crossActiv = false;

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

function svgCircle(){
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="35" fill="transparent" stroke="#fff" stroke-width="7.4"/>
    </svg>
    `;
}

function svgCross(){
    return`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" transform="rotate(45)">
        <rect x="46.5" y="10" width="7" height="80" rx="3.5" ry="3.5" fill="#fff"/>
        <rect x="10" y="46.5" width="80" height="7" rx="3.5" ry="3.5" fill="#fff"/>
    </svg>
    `;
}

function render(id, index){
    for (let i = 0; i < fields.length; i++){
        document.getElementById(`td${i}`).innerHTML='';
    }
    if (circleActiv) {
        document.getElementById(id).innerHTML=svgCircleAnimation();
    } else{
        document.getElementById(id).innerHTML=svgCrossAnimation();
    }

    for (let i = 0; i < fields.length; i++) {
        let cell = document.getElementById(`td${i}`);

        if (fields[i] === 'cross') {
            cell.innerHTML = svgCross();
        } else if (fields[i] === 'circle') {
            cell.innerHTML = svgCircle();
        }
    }
    
    changeAktivPlayer(index);
}

function changeAktivPlayer(index){
    setTimeout(function(){
        if (circleActiv) {
            fields.splice(index, 1, 'circle');
            document.getElementById("circle").setAttribute("stroke", "#efd8d2");
            document.getElementById("x1").setAttribute("fill", "#fff");
            document.getElementById("x2").setAttribute("fill", "#fff");
        } else {
            fields.splice(index, 1, 'cross');
            document.getElementById("circle").setAttribute("stroke", "#fff");
            document.getElementById("x1").setAttribute("fill", "#efd8d2");
            document.getElementById("x2").setAttribute("fill", "#efd8d2");
        }
        
        circleActiv = !circleActiv;
        crossActiv = !crossActiv;
    }, 500)

}