const data = [
    {
      min: 0,
      max: 18.4,
      classification: ">18,5",
      info: "Underweight",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "18,5 - 24,9",
      info: "Healthy",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "25,0 - 29,9",
      info: "Overweight",
      obesity: "0",
    },
    {
      min: 30,
      max: 39.9,
      classification: "30,0 - 35",
      info: "Obese Class I",
      obesity: "I",
    },
    {
        min: 35.1,
        max: 40,
        classification: "35 - 40",
        info: "Obese Class II",
        obesity: "II",
      },
    {
      min: 40.1,
      max: 99,
      classification: ">40,0",
      info: "Obese Class III",
      obesity: "III",
    },
  ];


const bmiTable = document.querySelector("#bmi-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const bmiNumber = document.querySelector("#bmi-number span");
const bmiInfo = document.querySelector("#bmi-info span");
const backBtn = document.querySelector("#back-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");


function createTable(data) {
  data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("table-data");

      const classification = document.createElement("p");
      classification.innerText = item.classification;

      const info = document.createElement("p");
      info.innerText = item.info;

      const obesity = document.createElement("p");
      obesity.innerText = item.obesity;

      div.appendChild(classification);
      div.appendChild(info);
      div.appendChild(obesity);

      bmiTable.appendChild(div);
  });
};

function cleanInputs() {
  heightInput.value = ""
  weightInput.value = ""
  bmiNumber.classList = ""
  bmiInfo.classList = ""
};

function validDigits(text){
  return text.replace(/[^0-9,]/g, "")
};

function calcBmi(weight, height) {
  // Check if height is valid to avoid division by zero
  if (height <= 0) {
      console.error("Height must be greater than zero");
      return null;
  }

  const bmi = (weight / (height * height)).toFixed(1);

  if (isNaN(bmi)) {
      console.error("Invalid BMI calculation");
      return null;
  }

  return bmi;
};

function showOrHideResults(){
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

createTable(data);

[heightInput, weightInput].forEach((el) =>{
el.addEventListener("input", (e) =>{
    const updatedValue = validDigits(e.target.value)
    e.target.value = updatedValue
});
});

calcBtn.addEventListener("click", (e) =>{
  e.preventDefault()
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  if(!weight || !height) return;

  const bmi = calcBmi(weight, height);
  let info;

  data.forEach((item) =>{
    if(bmi >= item.min && bmi <= item.max){
        info = item.info;
    }
  });

  
  console.log(weight, height, typeof(bmi))

  if(!info) return;

  bmiNumber.innerText = bmi;
  bmiInfo.innerText = info;

  switch(info){
    case "Underweight":
      bmiNumber.classList.add("low");
      bmiInfo.classList.add("low");
      break;
    case "Healthy":
      bmiNumber.classList.add("good");
      bmiInfo.classList.add("good");
      break;
    case "Overweight":
      bmiNumber.classList.add("low");
      bmiInfo.classList.add("low");
      break;
    case "Obese Class I":
      bmiNumber.classList.add("medium");
      bmiInfo.classList.add("medium");
      break;
    case "Obese Class II":
      bmiNumber.classList.add("high");
      bmiInfo.classList.add("high");
      break;
    case "Obese Class III":
      bmiNumber.classList.add("extreme");
      bmiInfo.classList.add("extreme");
      break;
  }
  showOrHideResults();
});

clearBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  cleanInputs();
});


backBtn.addEventListener("click", ()=>{
  cleanInputs();
  showOrHideResults()
})