
let listaDeNumerosSorteados = [];
let numeroLimite = 3;
let numeroSecreto = gerarUmNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do numero secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");

}


function verificarChute(){
    let chute = document.querySelector("input").value;

    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o numero secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela("h1", "Você acertou!!!");
        exibirTextoNaTela("p", mensagemTentativas);

        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela("h1", "Você ainda não acertou!!!");
            exibirTextoNaTela("p", `O número ${chute} é maior do que o número secreto!`);
        } else {
            exibirTextoNaTela("h1", "Você ainda não acertou!!!");
            exibirTextoNaTela("p", `O número ${chute} é menor do que o número secreto!`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarUmNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarUmNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarUmNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}