const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent="Domingo"
diaMesAno.textContent= getCurrentDate();

function getCurrentDate(){ 
    const date= new Date();
    return date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth()+1).toString().padStart(2, '0') + "/" + date.getFullYear();
}
