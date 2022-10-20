const lista_gifs = ["assets/bobrossparrot.gif",
"assets/explodyparrot.gif",
"assets/fiestaparrot.gif",
"assets/metalparrot.gif",
"assets/revertitparrot.gif",
"assets/tripletsparrot.gif",
"assets/unicornparrot.gif",
]

let par_rodada;
let contadorParaVitoria;
let qCartas;

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
        `<div  onclick="clicaCarta(this)" class="carta">
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

function acerto(){
    if (par_rodada[0].isEqualNode(par_rodada[1])){
        return true;
    } else {
        return false;
        
    }
}

function clicaCarta(carta){
    viraCarta(carta);
    par_rodada.push(carta);
    if (par_rodada.length == 2){
        if (!acerto()){
            viraCarta(par_rodada[0]);
            viraCarta(par_rodada[1]);
            par_rodada = [];
        } else {
            contadorParaVitoria++;
            par_rodada = [];
        }
    }
    if (contadorParaVitoria >= (qCartas/2)){
        alert("Você ganhou!")
        reiniciar();
    }
}

function iniciaJogo(){
    contadorParaVitoria = 0;
    par_rodada = [];
    const mesa = document.querySelector(".mesa-cartas");
    mesa.innerHTML = "";
    qCartas = quantCartas();
    const lista_cartas_gifs = sortCartas(qCartas, lista_gifs);
    distribuiCartas(mesa, qCartas, lista_cartas_gifs);
}

function reiniciar(){
    let resposta = "";
    let condicao = true;
    while (condicao){
        resposta = prompt("Quer reiniciar? sim ou não?");
        if (resposta == "sim"){
            condicao = false;
            iniciaJogo();
        } else if (resposta == "não") {
            condicao = false;
        } else {
            alert("sim ou não minúsculo!");
        }
    }
}

iniciaJogo();

