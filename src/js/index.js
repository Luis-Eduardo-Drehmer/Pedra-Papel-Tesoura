'use strict'

const controleTema = document.querySelectorAll(".icon");
const container = document.getElementsByClassName("container");

const escolhasJogador = document.querySelectorAll(".escolha-jogador");
const escolhasCompurador = document.querySelectorAll(".escolha-computador");


const nomeJogador = document.getElementById("jogador");
const pontos = document.querySelectorAll(".pontos");

const mensagem = document.getElementById("mensagens");


function mostrarMensagem(texto) { mensagem.innerHTML = texto; }
function atualizarPontos(index, quantidadePontos, mensagem) {
    pontos[index].innerHTML = quantidadePontos;
    mostrarMensagem(mensagem);
}
function sortear(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
//0 empate 1 jogador 2 computador
function definirGanhador(jogador, computador) {
    if (jogador - computador == 0) {
        return 0;
    }
    else if (jogador == 0 && computador == 1) {
        return 2;
    }
    else if (jogador == 0 && computador == 2) {
        return 1;
    }
    else if (jogador == 1 && computador == 0) {
        return 1;
    }
    else if (jogador == 1 && computador == 2) {
        return 2;
    }
    else if (jogador == 2 && computador == 0) {
        return 2;
    }
    else if (jogador == 2 && computador == 1) {
        return 1;
    }
}
function somarPontos(ganhador) {
    if (ganhador === 0) { mostrarMensagem("Empate!"); }
    else if (ganhador === 1) {
        pontosJogador++;
        atualizarPontos(0, pontosJogador, `${nome} venceu!`)

    } else if (ganhador === 2) {
        pontosComputador++;
        atualizarPontos(1, pontosComputador, "Computador venceu!");
    }
}

let pontosJogador = 0;
let pontosComputador = 0;

let jogadaComputador = 0;
let jogadaFeita = false;

let nome = prompt("Digite seu nome.");

if (nome !== "") { nomeJogador.innerHTML = nome; } else { nome = nomeJogador.innerHTML; }

controleTema.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        icon.classList.add("inativo");
        if (index === 0) {
            controleTema[1].classList.remove("inativo");
            container[0].classList.remove("claro");
        } else {
            controleTema[0].classList.remove("inativo");
            container[0].classList.add("claro");
        }
    });
});

escolhasJogador.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        if (!jogadaFeita) {
            jogadaFeita = true;
            icon.classList.add("selecionado");
            jogadaComputador = sortear(0, 2);
            escolhasCompurador[jogadaComputador].classList.add("selecionado");
            somarPontos(definirGanhador(index, jogadaComputador));
            setTimeout(() => {
                icon.classList.remove("selecionado");
                escolhasCompurador[jogadaComputador].classList.remove("selecionado");
                jogadaFeita = false;
                mostrarMensagem(`${nome}, escolha sua próxima jogada!`);
            }, 2000);
        }
    })
})

mostrarMensagem(`Bem vindo ${nome}, escolha sua jogada!`);
