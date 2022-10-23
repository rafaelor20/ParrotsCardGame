const lista_gifs = ["assets/bobrossparrot.gif",
"assets/explodyparrot.gif",
"assets/fiestaparrot.gif",
"assets/metalparrot.gif",
"assets/revertitparrot.gif",
"assets/tripletsparrot.gif",
"assets/unicornparrot.gif",
]

let par_rodada;
let contadorParaVitoria;//começa com valor zero em cada partida e define fim da partida quando for igual a qCartas/2;
let qCartas;
let jogadas;//conta a quant de jogadas

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
    shuffleArray(lista_gifs);
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
            <div class="lado-da-carta costa">
                <img class="img-carta" src="assets/back.png" alt="costas da carta ${i}">
            </div>
            <div class="lado-da-carta frente">
                <img class="img-carta" src="${lista_cartas_gifs[i]}" alt="frente da carta">
            </div>
        </div>`;
    }
}

function viraCarta(carta){
    let lados = carta.querySelectorAll(".lado-da-carta");
    for (let i = 0; i < lados.length; i++){
        lados[i].classList.toggle("frente");
        lados[i].classList.toggle("costa");
    }
}

function viradaPraCima(carta){
    const frente = carta.querySelector(".costa").innerHTML;
    carta.innerHTML = 
    `    
    <div class="lado-da-carta costa">
        ${frente}
    </div>
    `
}

function acerto(){
    const costa0 = par_rodada[0].querySelector(".frente");
    const costa1 = par_rodada[1].querySelector(".frente");
    const frente0 = par_rodada[0].querySelector(".costa");
    const frente1 = par_rodada[1].querySelector(".costa");
    if (costa0.isEqualNode(costa1)){
            return false;
        }
    else {
        if (frente0.isEqualNode(frente1)){
            return true;
        } else {
            return false;
        }
    }
}

function clicaCarta(carta){
    viraCarta(carta);
    jogadas++;
    par_rodada.push(carta);
    if (par_rodada.length == 2){
        if (!acerto()){
            setTimeout(viraCarta, 1000, par_rodada[0]);
            setTimeout(viraCarta, 1000, par_rodada[1]);
            par_rodada = [];
        } else {
            viradaPraCima(par_rodada[0]);
            viradaPraCima(par_rodada[1]);
            contadorParaVitoria++;
            par_rodada = [];
        }
    }
    if (contadorParaVitoria >= (qCartas/2)){
        /*alert(`Você ganhou em ${jogadas} jogadas!`);*/
        setTimeout(alert , 500, `Você ganhou em ${jogadas} jogadas!`);
        setTimeout(reiniciar, 1000);
        /*reiniciar();*/
    }
}

function iniciaJogo(){
    contadorParaVitoria = 0;
    jogadas = 0;
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

