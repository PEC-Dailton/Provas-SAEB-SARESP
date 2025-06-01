// Inicializa os valores a partir do localStorage ou usa os padrões---------------------------------------------------------

let daysProva1 = parseInt(localStorage.getItem('daysProva1')) || 141;
let daysProva2 = parseInt(localStorage.getItem('daysProva2')) || 156;



function updateCountdown() {

// Atualiza contagem da Prova 1--------------------------------------------------------------------------------------------

    if (daysProva1 > 0) {
        daysProva1--;
        localStorage.setItem('daysProva1', daysProva1);
        document.getElementById('prova1').innerHTML = `<strong><span class="blue">SAEB:</span></strong> Faltam <strong>${daysProva1}</strong> dias`;
    } else {
        document.getElementById('prova1').innerHTML = `<strong><span class="blue">SAEB:</span></strong> A prova é amanhã!`;
    }

    // Atualiza contagem da Prova 2
    if (daysProva2 > 0) {
        daysProva2--;
        localStorage.setItem('daysProva2', daysProva2);
        document.getElementById('prova2').innerHTML = `<strong><span class="blue">SARESP:</span></strong> Faltam <strong>${daysProva2}</strong> dias`;
    } else {
        document.getElementById('prova2').innerHTML = `<strong><span class="blue">SARESP:</span></strong> A prova é amanhã!`;
    }
}

// Verifica se 24 horas se passaram e atualiza a contagem
function checkAndUpdate() {
    const lastUpdate = parseInt(localStorage.getItem('lastUpdate')) || 0;
    const now = Date.now();

    // Se for a primeira execução (lastUpdate = 0), atualize imediatamente
    if (lastUpdate === 0 || now - lastUpdate >= 86400000) {
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



let totalSeconds = 141 * 24 * 60 * 60; // 141 dias em segundos


// Atualiza o relógio
function updateClock() {
    console.log("Atualizando o relógio...");

    if (totalSeconds <= 0) {
        document.getElementById('clock').textContent = "Tempo esgotado!";
        clearInterval(interval); // Para o cronômetro
        return;
    }

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

       document.getElementById('clock').textContent = ` ${hours}: ${minutes}: ${seconds}`;
  
      totalSeconds--; // Diminui o tempo
     
}

// Inicia o relógio
const interval = setInterval(updateClock, 1000); // Chama a função a cada segundo

// Chama imediatamente para mostrar o tempo inicial
updateClock();
