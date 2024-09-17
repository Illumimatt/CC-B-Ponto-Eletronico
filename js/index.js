function updateCurrentHour() {
    const hms = new Date();
    return hms.getHours().toString().padStart(2, '0') + ":" +
        hms.getMinutes().toString().padStart(2, '0') + ":" +
        hms.getSeconds().toString().padStart(2, '0');
}

function updateCurrentHourDisplay() {
    const currentHour = updateCurrentHour();
    horaMinSeg.textContent = currentHour;
}

function updateCurrentHourModal() {
    const currentHour = updateCurrentHour();
    dialogHora.textContent = currentHour;
}

let registerLocalStorage = getRegisterLocalStorage();

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent = getCurrentDay();
diaMesAno.textContent = getCurrentDate();
updateCurrentHourDisplay();
setInterval(updateCurrentHourDisplay, 1000);

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

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", async () => {
    try {
        let typeRegister = document.getElementById("tipos-ponto").value;

        const position = await getCurrentPosition();

        let ponto = {
            "data": getCurrentDate(),
            "hora": updateCurrentHour(),
            "localizacao": {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            "id": 1,
            "tipo": typeRegister
        };

        console.log(ponto);

        saveRegisterLocalStorage(ponto);

        localStorage.setItem("lastTypeRegister", typeRegister);

        dialogPonto.close();
    } catch (error) {
        console.error("Erro ao obter a localização:", error);
    }
});

function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
} 

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    if(!registers) {
        return [];
    }
    return JSON.parse(registers);
}

function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + updateCurrentHour();
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