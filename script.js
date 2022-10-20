function quantCartas(){
    let ok = false;
    let nCartas;
    while(ok !== true){
        nCartas = Number(prompt("Escolha um número par entre 4 e 14:"))
        if ((nCartas > 3) && (nCartas < 15) && (nCartas%1 === 0)){
            ok = true;
        } else {
            alert("Número inválido");
        }
    }
    return nCartas;
}

function distribuiMesa(){
    let mesa = document.querySelector(".mesa-cartas");
    const qCartas = quantCartas();
    console.log = qCartas;
    for (let i = 0; i<qCartas; i++){
        mesa.innerHTML += 
        `<div class="carta">
            <img class="img-carta" src="assets/back.png" alt="carta virada para baixo">
        </div>`;
    }
}

let lCartas = ["assets/bobrossparrot.gif",
"assets/explodyparrot.gif",
"assets/fiestaparrot.gif",
"assets/metalparrot.gif",
"assets/revertitparrot.gif",
"assets/tripletsparrot.gif",
"assets/unicornparrot.gif",
]

distribuiMesa();