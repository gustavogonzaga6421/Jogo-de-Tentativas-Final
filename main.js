let secret_number; // Definição global
let tentativas = 0; // Inicializando tentativas com 0
const MAX_TENTATIVAS = 3; // Define o máximo de tentativas

function getSecretNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

function exibeTextoTag(tag, texto) {
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto;
    responsiveVoice.speak(texto, 'UK English Male', { pitch: 2 });
}

function atualizaTentativasRestantes() {
    let tentativasRestantes = MAX_TENTATIVAS - tentativas;
    exibeTextoTag('p', `Tentativas restantes: ${tentativasRestantes}`);
}

function inicializaTexto() {
    exibeTextoTag('h1', 'Secret Number');
    exibeTextoTag('p', 'Type a number between 1 and 10');
    atualizaTentativasRestantes(); // Atualiza as tentativas restantes ao inicializar
}

function verificarChute() {
    let guess = parseInt(document.querySelector('input').value);

    if (guess === secret_number) {
        exibeTextoTag('h1', 'Parabéns, você acertou!');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (tentativas >= MAX_TENTATIVAS - 1) {
            exibeTextoTag('h1', 'Número máximo de tentativas atingido. O número era ' + secret_number + '.');
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (guess < secret_number) {
                exibeTextoTag('p', 'Tente novamente, o número é maior!');
            } else {
                exibeTextoTag('p', 'Tente novamente, o número é menor!');
            }
        }
    }

    tentativas++; // Incrementa o número de tentativas
    atualizaTentativasRestantes(); // Atualiza a quantidade de tentativas restantes
    limpaInput();
}

function reiniciarJogo() {
    tentativas = 0; // Reseta o número de tentativas
    secret_number = getSecretNumber(); // Gera novo número secreto
    inicializaTexto(); // Recarrega o texto inicial
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desativa o botão de reinício
    limpaInput(); // Limpa o input
}

function limpaInput() {
    document.querySelector('input').value = ''; // Limpa o valor do campo de entrada
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        verificarChute(); // Chama a função de verificação ao pressionar Enter
    }
}

document.querySelector('input').addEventListener('keypress', handleKeyPress);

document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

// Inicializa o jogo ao carregar a página
reiniciarJogo();
