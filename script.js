const lista_gifs = ["assets/bobrossparrot.gif",
"assets/explodyparrot.gif",
"assets/fiestaparrot.gif",
"assets/metalparrot.gif",
"assets/revertitparrot.gif",
"assets/tripletsparrot.gif",
"assets/unicornparrot.gif",
]

function shuffleArray(array) {
    let j, temp;
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function quantCartas(){
    let ok = false;
    let numCartas;
    while(ok !== true){
        numCartas = Number(prompt("Escolha um número par entre 4 e 14:"))
        if ((numCartas > 3) && (numCartas < 15) && (numCartas%2 == 0)){
            ok = true;
        } else {
            alert("Número inválido");
        }
    }
    return numCartas;
}

function sortCartas(numCartas, lista_gifs){
    numCartas = numCartas/2;
    let  lista_cartas_gifs = [];
    for (let i = 0; i < numCartas; i++){
        lista_cartas_gifs.push(lista_gifs[i]);
        lista_cartas_gifs.push(lista_gifs[i]);
    }
    shuffleArray(lista_cartas_gifs);
    return lista_cartas_gifs;
}

function distribuiCartas(mesa, qCartas, lista_cartas_gifs){
    for (let i = 0; i<qCartas; i++){
        mesa.innerHTML += 
        `<div  onclick="viraCarta(this)" class="carta">
            <img class="img-carta" src="assets/back.png" alt="carta virada para baixo">
            <img class="img-carta escondido" src="${lista_cartas_gifs[i]}" alt="carta virada para baixo">
        </div>`;
    }
}

function viraCarta(carta){
    let imagens = carta.querySelectorAll(".img-carta");
    for (let i = 0; i < imagens.length; i++){
        imagens[i].classList.toggle("escondido");
    }
}

function escolheCarta(){
    
}

function iniciaJogo(){
    const mesa = document.querySelector(".mesa-cartas");
    const qCartas = quantCartas();
    const lista_cartas_gifs = sortCartas(qCartas, lista_gifs);
    console.log(lista_cartas_gifs);
    distribuiCartas(mesa, qCartas, lista_cartas_gifs);
    
}


iniciaJogo();

