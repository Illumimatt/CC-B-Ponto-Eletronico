navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position)
});


const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent = getCurrentDay();
diaMesAno.textContent = getCurrentDate();
updateCurrentHour();
setInterval(updateCurrentHour, 1000);

const modalData = document.getElementById("modal-data");
const modalHora = document.getElementById("modal-hora");

modalData.textContent = getCurrentDate();
updateCurrentHourModal();
setInterval(updateCurrentHourModal, 1000);

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

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
    modalHora.textContent = hms.getHours().toString().padStart(2, '0') + ":" +
        hms.getMinutes().toString().padStart(2, '0') + ":" +
        hms.getSeconds().toString().padStart(2, '0');
}

function register(){
    dialogPonto.showModal();
}