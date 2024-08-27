const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent=getCurrentDay();
diaMesAno.textContent= getCurrentDate();
horaMinSeg.textContent= getCurrentHour();

function getCurrentDay(){
    const dia= new Date();
    const DiasSemana = [
        "Domingo", "Segunda", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"
    ];
    
    const DiaIndex = dia.getDay();
    return DiasSemana[DiaIndex]; 
}

function getCurrentDate(){ 
    const date= new Date();
    const isUS = navigator.language === 'en-US';
    if (isUS){
        return (date.getMonth()+1).toString().padStart(2, '0')+ "/"  + date.getDate().toString().padStart(2, '0') + "/" + date.getFullYear();   
    }
    return date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth()+1).toString().padStart(2, '0') + "/" + date.getFullYear();
}

function getCurrentHour(){
    const hms = new Date();
    return hms.getHours().toString().padStart(2, '0') + ":" + hms.getMinutes().toString().padStart(2, '0') + ":" + hms.getSeconds().toString().padStart(2, '0');
}