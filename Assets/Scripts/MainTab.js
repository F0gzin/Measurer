const myElements = document.getElementsByClassName("TankItemMainDiv");

import { Table1 } from './Tables1.js'; // tanques 1 e 2
import { Table2 } from './Tables2.js'; // tanques 3 e 4
import { Table3 } from './Tables3.js'; // tanques 5
import { Table4 } from './Tables4.js'; // tanques 6
import { Table5 } from './Tables5.js'; // tanques 7 e 8

let CurrentScreen = 0; // tela atual
const InputDiv = document.getElementById("InputMainDiv");
const OutputDiv = document.getElementById("OutputMainDiv");
const TruckDiv = document.getElementById("TruckMainDiv");

const ConfirmButton = document.getElementById("ConfirmButton");
const BackButton = document.getElementById("BackButton");
const TruckButton = document.getElementById("ConfirmTruckButton");

const TotalGasolinaTexto = document.getElementById("TotalGasolinaTexto");
const TotalEtanolTexto = document.getElementById("TotalEtanolTexto");
const TotalDiselTexto = document.getElementById("TotalDiselTexto");

let totalGasolina = 0;
let totalEtanol = 0;
let totalDisel = 0;

let Tanks = [
    {
        Nome:"Tanque 1",
        Modelo:"XXX-123",
        Tabela: Table1,
        Type:"GC",
        CurrentValue:0,
        Capacidade:30000
    },
    {
        Nome:"Tanque 2",
        Modelo:"XXX-123",
        Tabela: Table1,
        Type:"ET",
        CurrentValue:0,
        Capacidade:30000
    },
    {
        Nome:"Tanque 3",
        Modelo:"XXX-123",
        Tabela: Table2,
        Type:"ET",
        CurrentValue:0,
        Capacidade:15000
    },
    {
        Nome:"Tanque 4",
        Modelo:"XXX-123",
        Tabela: Table2,
        Type:"GC",
        CurrentValue:0,
        Capacidade:15000
    },
    {
        Nome:"Tanque 5",
        Modelo:"XXX-123",
        Tabela: Table3,
        Type:"DI",
        CurrentValue:0,
        Capacidade:10000
    },
    {
        Nome:"Tanque 6",
        Modelo:"XXX-123",
        Tabela: Table4,
        Type:"GC",
        CurrentValue:0,
        Capacidade:20000
    },
    {
        Nome:"Tanque 7",
        Modelo:"XXX-123",
        Tabela: Table5,
        Type:"ET",
        CurrentValue:0,
        Capacidade:15000
    },
    {
        Nome:"Tanque 8",
        Modelo:"XXX-123",
        Tabela: Table5,
        Type:"ET",
        CurrentValue:0,
        Capacidade:15000
    },
]

function GetMax(TankId){
    let Tank = Tanks[TankId];
    return Tank["Capacidade"];
};

function CalculateTotal(){
    totalGasolina = 0;
    totalEtanol = 0;
    totalDisel = 0;
    Tanks.forEach(tankData => {
        if(tankData.Type == "GC"){
            totalGasolina = totalGasolina + Number(tankData.CurrentValue);
        }else if(tankData.Type == "ET"){
            totalEtanol = totalEtanol + Number(tankData.CurrentValue);
            console.log(tankData.CurrentValue);
        }else if(tankData.Type == "DI"){
            totalDisel = totalDisel + Number(tankData.CurrentValue);
        };
    });

    TotalDiselTexto.innerText = "Total Disel: " + String(totalDisel);
    TotalEtanolTexto.innerText = "Total Etanol: " + String(totalEtanol);
    TotalGasolinaTexto.innerText = "Total Gasolina:" + String(totalGasolina);
    
};

function Item(element,inputElement,TankId){
    const elementPreviewTemplate = document.getElementById("TankVizualMainFrame");
    const elementChildren = element.children;
    const elementDiv = document.getElementById("GraphicTankItemMainDiv");
    const paragrath1 = elementChildren[4];
    const input = paragrath1.children[1];
    const newElement = elementPreviewTemplate.cloneNode(true);
    const childElements = newElement.children;
    const output = childElements[2].children[0];
    const outputRemainingSpace = childElements[3];
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
        let percent = Result[1];
        let RawNumber = Result[2];

        Tanks[TankId]["CurrentValue"] = RawNumber;

        if(typeof(Result[0]) === "number"){
            emptySpaceDiv.style = `height:${percent*100}%;`;
            output.innerText = String(Liters) + " LTs";
            outputRemainingSpace.innerText = "Livre:" + String( GetMax(TankId) - Liters) + " LTs";
            
        }else{
            emptySpaceDiv.style = `height:0%;`;
            output.innerText = String(Liters);
            outputRemainingSpace.innerText = "" //"..."
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
    InputDiv.hidden = true;
    OutputDiv.hidden = true;
    if(CurrentScreen == 0){
        InputDiv.hidden = false;
    }else if(CurrentScreen == 1){
        OutputDiv.hidden = false;
    }else{
        TruckDiv.hidden = false;
    };   
};

ConfirmButton.addEventListener('click',function(ev){
    console.log(CurrentScreen);
    if(CurrentScreen == 0){
        CurrentScreen = 1;
    }else{
        CurrentScreen = 0;
    };
    totalDisel = 0;
    totalEtanol = 0;
    totalGasolina = 0;
    CalculateTotal();
    updateScreen();
});

BackButton.addEventListener('click',function(ev){
    CurrentScreen = 0;
    updateScreen()
});

TruckButton.addEventListener('click',function(ev){
    CurrentScreen = 3;
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

  let Size = Object.keys(Table).length;
  let RawNumber = Table[N];
  
  if(RawNumber == undefined || isNaN(RawNumber || typeof(RawNumber) == "string")){
    console.log(Table[Size]);
    RawNumber = Table[Size];
  }else{console.log(RawNumber)};

  if(Table[n] == undefined){
    if(n<=-1){
        return ["Inválido",0,RawNumber]
    }else{
        if(Math.floor(n) === n){
            return ["CHEIO",0,RawNumber]
        }else{
            return ["Números decimais não são suportados",0,RawNumber]
        }
    }
  }else{
    let percent = 1-(Table[n]/Tanks[tableId].Capacidade);
    if(isNaN(percent)||percent==undefined){
        percent = 0;
    };
    return [Table[n],percent,RawNumber]
  }
};