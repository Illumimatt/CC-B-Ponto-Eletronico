let registerLocalStorage = getRegisterLocalStorage();

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent = getCurrentDay();
diaMesAno.textContent = getCurrentDate();
updateCurrentHour();
setInterval(updateCurrentHour, 1000);

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");

dialogData.textContent = getCurrentDate();
updateCurrentHourModal();
setInterval(updateCurrentHourModal, 1000);

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// TO-DO:
// Por que esta função não retorna a localização?
// [doc]
function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        return position;
    });
}


const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", () => {

    let typeRegister = document.getElementById("tipos-ponto").value;

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": getCurrentPosition(),
        "id": 1,
        "tipo": typeRegister
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastTypeRegister", typeRegister);

    dialogPonto.close();

    // TO-DO:
    // Fechar o dialog ao bater ponto e apresentar, de alguma forma
    // uma confirmação (ou não) para o usuário
});


function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
} 


// Esta função deve retornar sempre um ARRAY, mesmo que seja vazio
function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if(!registers) {
        return [];
    }

    return JSON.parse(registers); // converte de JSON para Array
}


function register() {
    // TO-DO:
    // Atualizar hora a cada segundo e data 00:00:00
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    dialogPonto.showModal();
}

function getCurrentDay() {
    const dia = new Date();
    const DiasSemana = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
    ];
    const DiaIndex = dia.getDay();
    return DiasSemana[DiaIndex]; 
}

function getCurrentDate() { 
    const date = new Date();
    const isUS = navigator.language === 'en-US';
    if (isUS) {
        return (date.getMonth() + 1).toString().padStart(2, '0') + "/" +
            date.getDate().toString().padStart(2, '0') + "/" + date.getFullYear();   
    }
    return date.getDate().toString().padStart(2, '0') + "/" +
        (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear();
}

function updateCurrentHour() {
    const hms = new Date();
    horaMinSeg.textContent = hms.getHours().toString().padStart(2, '0') + ":" +
        hms.getMinutes().toString().padStart(2, '0') + ":" +
        hms.getSeconds().toString().padStart(2, '0');
}

function updateCurrentHourModal() {
    const hms = new Date();
    dialogHora.textContent = hms.getHours().toString().padStart(2, '0') + ":" +
        hms.getMinutes().toString().padStart(2, '0') + ":" +
        hms.getSeconds().toString().padStart(2, '0');
}

function register(){
    dialogPonto.showModal();
}