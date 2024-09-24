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
        let lastTypeRegister = localStorage.getItem("lastTypeRegister");

        const position = await getCurrentPosition();

    // TO-DO:
    // Pq o select não está com a option correspondente?
        if(lastTypeRegister == "entrada") {
            console.log("lastTypeRegister é entrada");
            typeRegister.value = "intervalo";
        }
        if(lastTypeRegister == "intervalo") {
            typeRegister.value = "volta-intervalo";
        }
        if(lastTypeRegister == "volta-intervalo") {
            typeRegister.value = "saida";
        }
        if(lastTypeRegister == "saida") {
            typeRegister.value = "entrada"
        }


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

        localStorage.setItem("lastTypeRegister", typeRegister.value);
        localStorage.setItem("lastDateRegister", ponto.data);
        localStorage.setItem("lastTimeRegister", ponto.hora);
    
        dialogPonto.close();
    
        // TO-DO:
        // CRIAR UM ALERTA NO TOPO DA PÁGINA PRINCIPAL PARA CONFIRMAR O REGISTRO DE PONTO
        // DEVE FICAR ABERTO POR 3 SEGUNDOS E DEVE TER UM EFEITO DE TRANSIÇÃO
        // DEVE PODER SER FECHADO PELO USUÁRIO QUE NÃO QUISER AGUARDAR 3s
        // DEVE MOSTRAR UMA MENSAGEM DE SUCESSO AO REGISTRAR O PONTO
        // CASO OCORRA ALGUM ERRO, MOSTRAR NO ALERTA 
        // AS CORES DEVEM SER DIFERENTES EM CASO DE SUCESSO/ERRO/ALERTA
    
        divAlertaRegistroPonto.classList.remove("hidden");
        divAlertaRegistroPonto.classList.add("show");
        
        // TO-DO:
        // fazer um efeito de transição para o alerta
    
        setTimeout(() => {
            divAlertaRegistroPonto.classList.remove("show");
            divAlertaRegistroPonto.classList.add("hidden");
        }, 5000);
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

    // TO-DO:
    // Verificar se há último registro. Se não houver, tratar o que será escrito na base do dialog
    // Opções: escrever "Sem registros anteriores" ou não escrever nada

    let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
    document.getElementById("dialog-last-register").textContent = lastRegisterText;

    dialogPonto.showModal();

    console.log(localStorage.getItem("lastTypeRegister"));
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