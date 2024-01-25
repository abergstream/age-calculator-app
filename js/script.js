let dayInput = document.getElementById('dayInput');
let monthInput = document.getElementById('monthInput');
let yearInput = document.getElementById('yearInput');

dayInput.addEventListener("input", calcTimeAlive);
monthInput.addEventListener("input", calcTimeAlive);
yearInput.addEventListener("input", calcTimeAlive); 

const d = new Date();
const yearNow = d.getFullYear();
const monthNow = d.getMonth() + 1;
const dateNow = d.getDate();

const fullDate = yearNow + "-" + monthNow + "-" + dateNow;



function calcTimeAlive() {
  const inputDate = new Date(yearInput.value + "-" + monthInput.value + "-" + dayInput.value);
  const inputTimeSec = inputDate.getTime() / 1000;

  const errorPast = document.querySelector('.future-error');
  
  const timeNowSec = d.getTime() / 1000;
  const timeDiff = timeNowSec - inputTimeSec;
  
  const validDay = validateInput(dayInput, 1, 31, "Day");
  const validMonth = validateInput(monthInput, 1, 12, "Month");
  const validYear = validateInput(yearInput, 100, yearNow, "Year");

  if(validDay && validMonth && validYear) {
    if(timeDiff > 0) {

      redBorder(false);
      errorPast.style.display = "none";
      let dayInSec = (60 * 60 * 24);
      let monthInSec = dayInSec * 30.44;
      let yearInSec = dayInSec * 365.25;

      let yearsAlive = Math.floor(timeDiff / yearInSec);
      let monthsAlive = Math.floor(timeDiff / monthInSec) - (yearsAlive * 12);
      if(monthsAlive < 0) { monthsAlive = 0; }
      
      let daysAlive = Math.floor((timeDiff / dayInSec) - (yearsAlive * 365.25) - (monthsAlive * 30.44));

      document.getElementById('aliveYears').innerHTML = yearsAlive;
      document.getElementById('aliveMonths').innerHTML = monthsAlive;
      document.getElementById('aliveDays').innerHTML = daysAlive;
    }
    else {
      // Kryptiskt meddelande om att vi inte kan se in i framtiden
      errorPast.style.display = "block";
      redBorder(true);
      clearTimeAlive();
    }
  }
}

function redBorder(error) {
  let border = "1px solid #c50000";
  if(!error) {
    border = "";
  }
  dayInput.style.border = border;
  monthInput.style.border = border;
  yearInput.style.border = border;  
}


function validateInput(input, min, max, errorID) {
  const value = input.value;
  if(value < min || value > max) {
    input.style.border = "1px solid #c50000";
    document.getElementById("error" + errorID).style.display = "block";
    document.getElementById("label" + errorID).style = "color: #c50000;";
    
    clearTimeAlive();
    return false;
  }
  else {
    input.style.border = "";
    document.getElementById("error" + errorID).style.display = "none";
    document.getElementById("label" + errorID).style = "";
    return true;
  }
}
function clearTimeAlive() {
  document.getElementById('aliveYears').innerHTML = "--";
  document.getElementById('aliveMonths').innerHTML = "--";
  document.getElementById('aliveDays').innerHTML = "--";
}