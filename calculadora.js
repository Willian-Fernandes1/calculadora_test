// Variáveis para armazenar os valores e operações
let valorAtual = '';
let operador = '';
let valorAnterior = '';
let resultadoCalculado = false;

// Função para adicionar números ao display
function adicionarNumero(numero) {
    const display = document.getElementById('display');
    
    // Se o resultado foi calculado e um novo número é digitado, limpa o display
    if (resultadoCalculado) {
        display.value = '';
        resultadoCalculado = false;
    }
    
    // Adiciona o número ao display
    display.value += numero;
    valorAtual = display.value;
}

// Função para adicionar operador
function adicionarOperador(op) {
    const display = document.getElementById('display');
    
    // Se já existe um valor atual, armazena como valor anterior
    if (valorAtual !== '') {
        valorAnterior = valorAtual;
        valorAtual = '';
        operador = op;
        display.value = '';
        resultadoCalculado = false;
    }
}

// Função para limpar o display
function limpar() {
    const display = document.getElementById('display');
    display.value = '';
    valorAtual = '';
    operador = '';
    valorAnterior = '';
    resultadoCalculado = false;
}

// Função para calcular o resultado
function calcular() {
    const display = document.getElementById('display');
    
    // Verifica se temos valores suficientes para calcular
    if (valorAnterior !== '' && valorAtual !== '' && operador !== '') {
        let resultado = 0;
        const num1 = parseFloat(valorAnterior);
        const num2 = parseFloat(valorAtual);
        
        // Realiza a operação correspondente
        switch (operador) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case '*':
                resultado = num1 * num2;
                break;
            case '/':
                // Verifica divisão por zero
                if (num2 !== 0) {
                    resultado = num1 / num2;
                } else {
                    display.value = 'Erro';
                    valorAtual = '';
                    operador = '';
                    valorAnterior = '';
                    resultadoCalculado = true;
                    return;
                }
                break;
        }
        
        // Exibe o resultado
        display.value = resultado;
        valorAtual = resultado.toString();
        operador = '';
        valorAnterior = '';
        resultadoCalculado = true;
    }
}

// Adiciona suporte para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números de 0 a 9
    if (key >= '0' && key <= '9') {
        adicionarNumero(key);
    }
    // Operadores
    else if (key === '+') {
        adicionarOperador('+');
    }
    else if (key === '-') {
        adicionarOperador('-');
    }
    else if (key === '*') {
        adicionarOperador('*');
    }
    else if (key === '/') {
        event.preventDefault(); // Evita que o navegador interprete como atalho
        adicionarOperador('/');
    }
    // Enter ou = para calcular
    else if (key === 'Enter' || key === '=') {
        calcular();
    }
    // Escape ou Backspace para limpar
    else if (key === 'Escape' || key === 'Backspace') {
        limpar();
    }
});