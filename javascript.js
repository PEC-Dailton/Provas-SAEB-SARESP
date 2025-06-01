// Inicializa os valores a partir do localStorage ou usa os padrões---------------------------------------------------------

let daysProva1 = parseInt(localStorage.getItem('daysProva1')) || 141;
let daysProva2 = parseInt(localStorage.getItem('daysProva2')) || 156;
let totalSeconds = 3600; // 1 hora em segundos

function updateCountdown() {

// Atualiza contagem da Prova 1--------------------------------------------------------------------------------------------

if (daysProva1 > 0) {daysProva1--;

localStorage.setItem('daysProva1', daysProva1); 
// Atualiza o elemento HTML com a contagem regressiva
document.getElementById('prova1').innerHTML = `<strong><span class="blue">SAEB:</span></strong> Faltam <strong>${daysProva1}</strong> dias`;

} else {
        document.getElementById('prova1').innerHTML = `<strong><span class="blue">SAEB:</span></strong> A prova é amanhã!`;
}

// Atualiza contagem da Prova 2---------------------------------------------------------------------------------------------
if (daysProva2 > 0) {daysProva2--;
localStorage.setItem('daysProva2', daysProva2);
// Atualiza o elemento HTML com a contagem regressiva
document.getElementById('prova2').innerHTML = `<strong><span class="blue">SARESP:</span></strong> Faltam <strong>${daysProva2}</strong> dias`;

} else {
        document.getElementById('prova2').innerHTML = `<strong><span class="blue">SARESP:</span></strong> A prova é amanhã!`;
    }
}
//----------------------------------------------------------------------------------------------------------------------------
// Verifica se 24 horas se passaram e atualiza a contagem

function checkAndUpdate() {
    const lastUpdate = parseInt(localStorage.getItem('lastUpdate')) || Date.now();
    const now = Date.now();

// Verifica se 24 horas se passaram

if (now - lastUpdate >= 86400000) { // 24 horas em milissegundos
        updateCountdown();
        localStorage.setItem('lastUpdate', now); // Atualiza o timestamp
    }
}

// Chama a função imediatamente e configura o intervalo

document.addEventListener('DOMContentLoaded', () => {
    checkAndUpdate(); // Verifica e atualiza no carregamento
    setInterval(checkAndUpdate, 60000); // Verifica a cada minuto 
});


// Atualiza o relógio--------------------------------------------------------------------------------------------------------

function updateClock() {

console.log("Atualizando o relógio..."); // Mova o log para dentro da função

if (totalSeconds <= 0) {
        document.getElementById('clock').textContent = "Tempo esgotado!";
        clearInterval(interval); // Para o cronômetro
    return;
}
    
const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
const seconds = String(totalSeconds % 60).padStart(2, '0');
    
document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
document.getElementById('clock').setAttribute('title', `Tempo restante: ${hours}:${minutes}:${seconds}`);
document.getElementById('clock').setAttribute('aria-label', `Tempo restante: ${hours}:${minutes}:${seconds}`);

totalSeconds--; // Diminui o tempo
    if (totalSeconds < 0) {
        totalSeconds = 0; // Garante que não fique negativo
    }
}

// Inicia o relógio---------------------------------------------------------------------------------------------------------

const interval = setInterval(updateClock, 1000); // Chama a função a cada segundo

// Remova a segunda chamada para updateClock

updateClock(); // Chama imediatamente para mostrar o tempo inicial
