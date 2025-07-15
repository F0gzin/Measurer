const myElements = document.getElementsByClassName("TankItemMainDiv");

import { Table1 } from './Tables1.js'; // tanques 1 e 2
import { Table2 } from './Tables2.js'; // tanques 3 e 4
import { Table3 } from './Tables3.js'; // tanques 5
import { Table4 } from './Tables4.js'; // tanques 6
import { Table5 } from './Tables5.js'; // tanques 7 e 8

let isInput = true;
const InputDiv = document.getElementById("InputMainDiv");
const OutputDiv = document.getElementById("OutputMainDiv");
const ConfirmButton = document.getElementById("ConfirmButton");
const BackButton = document.getElementById("BackButton");

let Tanks = [
    {
        Nome:"Tanque 1",
        Modelo:"XXX-123",
        Tabela: Table1,
        Type:"GC",
        Capacidade:30000
    },
    {
        Nome:"Tanque 2",
        Modelo:"XXX-123",
        Tabela: Table1,
        Type:"ET",
        Capacidade:30000
    },
    {
        Nome:"Tanque 3",
        Modelo:"XXX-123",
        Tabela: Table2,
        Type:"ET",
        Capacidade:15000
    },
    {
        Nome:"Tanque 4",
        Modelo:"XXX-123",
        Tabela: Table2,
        Type:"GC",
        Capacidade:15000
    },
    {
        Nome:"Tanque 5",
        Modelo:"XXX-123",
        Tabela: Table3,
        Type:"DI",
        Capacidade:10000
    },
    {
        Nome:"Tanque 6",
        Modelo:"XXX-123",
        Tabela: Table4,
        Type:"GC",
        Capacidade:20000
    },
    {
        Nome:"Tanque 7",
        Modelo:"XXX-123",
        Tabela: Table5,
        Type:"ET",
        Capacidade:15000
    },
    {
        Nome:"Tanque 8",
        Modelo:"XXX-123",
        Tabela: Table5,
        Type:"ET",
        Capacidade:15000
    },
]

function Item(element,inputElement,TankId){
    const elementPreviewTemplate = document.getElementById("TankVizualMainFrame");
    const elementChildren = element.children;
    const elementDiv = document.getElementById("GraphicTankItemMainDiv");
    const paragrath1 = elementChildren[4];
    const input = paragrath1.children[1];
    const newElement = elementPreviewTemplate.cloneNode(true);
    const childElements = newElement.children;
    const output = childElements[2].children[0];
    const emptySpaceDiv = childElements[1].children[0];
    const tankData = Tanks[TankId];

    if(tankData["Type"] == "GC"){
            newElement.style = "background-color: #f99999;"
        }else if(tankData["Type"] == "ET"){
            newElement.style = "background-color: #63b159ff;"
        }else if(tankData["Type"] == "DI"){
            newElement.style = "background-color: #5d5d5dff;"
    }

    elementDiv.appendChild(newElement);
    
    childElements[0].innerText = Tanks[TankId].Nome;

    input.addEventListener('change', function() {
        const numberType = Tanks[TankId].Tabela;
        const N = this.value
        let Result = CalculatePattern(N,numberType,TankId);
        let Liters = Result[0];
        if(typeof(Result[0]) === "number"){
            let percent = Result[1];
            emptySpaceDiv.style = `height:${percent*100}%;`;
            output.innerText = String(Liters) + " LTs";
        }else{
            emptySpaceDiv.style = `height:0%;`;
            output.innerText = String(Liters);
        };
    });
};

function setupTanks(){
    const element = document.getElementById("TankItemMainDiv");
    const elementDiv = document.getElementById("TanksDivScrolling");
    const elementPreviewTemplate = document.getElementById("TankVizualMainFrame");
    let interation = 0;
    Tanks.forEach(tankData => {
        let newElement = element.cloneNode(true);
        elementDiv.appendChild(newElement);
        let childElements = newElement.children;
        const inputElement = childElements[4].children[1];
        console.log(tankData["Type"]);
        childElements[0].innerText = tankData["Nome"];
        if(tankData["Type"] == "GC"){
            newElement.style = "background-color: #f99999;"
        }else if(tankData["Type"] == "ET"){
            newElement.style = "background-color: #63b159ff;"
        }else if(tankData["Type"] == "DI"){
            newElement.style = "background-color: #5d5d5dff;"
        }

        childElements[2].innerText = tankData["Type"];
        childElements[3].innerText = "Capacidade: " + tankData["Capacidade"];
        Item(newElement,inputElement,interation);

        interation++;
    });

    elementPreviewTemplate.remove()
    element.remove()
}

setupTanks()

function updateScreen(){
    InputDiv.hidden = !isInput;
    OutputDiv.hidden = isInput;
};

ConfirmButton.addEventListener('click',function(ev){
    isInput = false;
    updateScreen()
});

BackButton.addEventListener('click',function(ev){
    isInput = true;
    updateScreen()
});

updateScreen()

function CalculatePattern(N,numberType,tableId) {
  let n = Math.floor(N);
  //return (3 * n * n + 15 * n - 6) / 2;
  let Table = {};
  if((typeof(numberType) === "string") || (typeof(numberType) === "number")){
    switch(numberType){
        case "1":
            Table = Table1;
            break;
        case "2":
            Table = Table2;
            break;
        case "3":
            Table = Table3;
            break;
        case "4":
            Table = Table4;
            break;
        case "5":
            Table = Table5;
            break;
    };
  }else{
    Table = numberType;
  };

  if(Table[n] == undefined){
    if(n<=-1){
        return ["Inválido",0]
    }else{
        if(Math.floor(n) === n){
            return ["CHEIO",0]
        }else{
            return ["Números decimais não são suportados",0]
        }
    }
  }else{
    let percent = 1-(Table[n]/Tanks[tableId].Capacidade);
    console.log(percent);
    return [Table[n],percent]
  }
};

//for (const element of myElements) {
   // console.log(element.id);
   //Item(element);
//};