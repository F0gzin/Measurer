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
const BackButton2 = document.getElementById("BackButton2");
const TruckButton = document.getElementById("ConfirmTruckButton");

const TotalGasolinaTexto = document.getElementById("TotalGasolinaTexto");
const TotalEtanolTexto = document.getElementById("TotalEtanolTexto");
const TotalDiselTexto = document.getElementById("TotalDiselTexto");
const ConfirmTruckButton = document.getElementById("ConfirmTruckPackageButton");
const PackageFitsText = document.getElementById("PackageFitsText");

const PackageInput = document.getElementById("InputQuantidade");
const PackageTypeInput = document.getElementById("ProductInput");

const TankVisual = document.getElementById("GraphicTankItemMainDiv");

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
        }else if(tankData.Type == "DI"){
            totalDisel = totalDisel + Number(tankData.CurrentValue);
        };
    });

    TotalDiselTexto.innerText = "Total Diesel: " + String(totalDisel);
    TotalEtanolTexto.innerText = "Total Etanol: " + String(totalEtanol);
    TotalGasolinaTexto.innerText = "Total Gasolina:" + String(totalGasolina);
    
};

function UpdateCm(element,TankId,N){
    const childElements = element.children;
    const output = childElements[2].children[0];
    const outputRemainingSpace = childElements[3];
    const emptySpaceDiv = childElements[1].children[0];

   const numberType = Tanks[TankId].Tabela;
        
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
}

function Update(element,TankId,N){
    const childElements = element.children;
    const output = childElements[2].children[0];
    const outputRemainingSpace = childElements[3];
    const emptySpaceDiv = childElements[1].children[0];

   const numberType = Tanks[TankId].Tabela;
        
    let Result = N;
    let Liters = N;
    let percent = 1-(N/Tanks[TankId].Capacidade);
;
    if(percent < 0){
        percent = 1;
    }
    let RawNumber = N||0;

    Tanks[TankId]["CurrentValue"] = RawNumber;

    if(typeof(Result) === "number"){
        emptySpaceDiv.style = `height:${percent*100}%;`;
        output.innerText = String(Liters) + " LTs";
        outputRemainingSpace.innerText = "Livre:" + String( GetMax(TankId) - Liters) + " LTs";
            
    }else{
        emptySpaceDiv.style = `height:0%;`;
        output.innerText = String(Liters);
        outputRemainingSpace.innerText = "" //"..."
    };
}

function UpdateAll(){
    const elementDiv = document.getElementById("GraphicTankItemMainDiv");
    const kids = elementDiv.children;
    
    Object.keys(kids).forEach(key => {
        Update(kids[key],key,Tanks[key]["CurrentValue"]);
    });
}
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

        UpdateCm(newElement,TankId,this.value);
        //Tanks[TankId].Capacidade = this.value;
    
    });
};

function Clamp(number,min,max){
    let clampedNumber = number;
    if(number<min){clampedNumber = min};
    if(number>max){clampedNumber = max};
    
    return clampedNumber;
}

function calculateSpace(AmountOfGasoline,AmountOfEtanol,AmountOfDisel)
{
    let amountOfGasoline = AmountOfGasoline;
    let amountOfEtanol = AmountOfEtanol;
    let amountOfDisel = AmountOfDisel;

    PackageFitsText.innerText = ""
    let i = 1;

    let TanksBeforeCount = [0];

    Tanks.forEach(tank => {
        TanksBeforeCount.push(tank.CurrentValue)
        i++;
    });

    i = 1;
    let tanquesUsados = [];
    let sobra = 0;
    Tanks.forEach(tank => {
        if(tank.Type == "GC" && amountOfGasoline > 0){
            let freeSpace = tank.Capacidade - tank.CurrentValue;
            let fits = amountOfGasoline - freeSpace;
            tank.CurrentValue += Clamp(amountOfGasoline,0,freeSpace);
            PackageFitsText.innerText = PackageFitsText.innerText + "Cabe(m) " + String( Clamp(amountOfGasoline,0,freeSpace) ) + " no Tanque " + String(i) + "\n"
            amountOfGasoline -= freeSpace;
            sobra = fits;

            tanquesUsados.push(i);

        }else if(tank.Type == "ET" && amountOfEtanol > 0){
            let freeSpace = tank.Capacidade - tank.CurrentValue;
            let fits = amountOfEtanol - freeSpace;
            tank.CurrentValue += Clamp(amountOfEtanol,0,freeSpace);
            PackageFitsText.innerText = PackageFitsText.innerText + "Cabe(m) " + String( Clamp(amountOfEtanol,0,freeSpace) ) + " no Tanque " + String(i) + "\n"
            amountOfEtanol -= freeSpace;
            sobra = fits;

            tanquesUsados.push(i);
         
        }else if(tank.Type == "DI" && amountOfDisel > 0){
            let freeSpace = tank.Capacidade - tank.CurrentValue;
            let fits = amountOfDisel - freeSpace;
            tank.CurrentValue += Clamp(amountOfDisel,0,freeSpace);
            PackageFitsText.innerText = PackageFitsText.innerText + "Cabe(m) " + String( Clamp(amountOfDisel,0,freeSpace) ) + " no Tanque " + String(i) + "\n"
            amountOfDisel -= freeSpace;
            sobra = fits;
           
            tanquesUsados.push(i);
        };
        
        i++;
    });
    PackageFitsText.innerText = PackageFitsText.innerText + "\nNão coube: " + String( Clamp(amountOfGasoline,0,Infinity) ) + "LTs de gasolina\n"
    PackageFitsText.innerText = PackageFitsText.innerText + "Não coube: " + String( Clamp(amountOfDisel,0,Infinity) ) + "LTs de diesel\n"
    PackageFitsText.innerText = PackageFitsText.innerText + "Não coube: " + String( Clamp(amountOfEtanol,0,Infinity) ) + "LTs de etanol\n"
    
    UpdateAll()
    
    let displayDiv = document.getElementById("AreaTruckDisplay");

    const kids = displayDiv.children;

    Object.keys(kids).forEach(key => {
        kids[key].remove() // 0x03 0x3F 0xFF 0x00 0x36 
    })

    let newTankVisual = TankVisual.cloneNode(true);

    displayDiv.appendChild(newTankVisual);
    const tankAreaKids = newTankVisual.children;
    /*  
    Object.keys(tankAreaKids).forEach(key => {
        tanquesUsados.forEach(index =>{
        //    console.log(index,tanquesUsados[index],key);
        
            if(index != key){
                console.log(tankAreaKids[key-1]);
                if(tankAreaKids[key-1]){
                    tankAreaKids[key-1].remove()
                }
            }else{
                console.log(index,key)
            }
         }) 
    })
         */
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
        tankData["CurrentValue"] = 0;
        
        interation++;
    });

    elementPreviewTemplate.remove()
    element.remove()
};

setupTanks();

function updateScreen(){
    InputDiv.hidden = true;
    OutputDiv.hidden = true;
    TruckDiv.hidden = true;
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

BackButton2.addEventListener('click',function(ev){
    CurrentScreen = 1;
    updateScreen()
});

TruckButton.addEventListener('click',function(ev){
    CurrentScreen = 3;
    updateScreen()
});

ConfirmTruckButton.addEventListener('click',function(ev){
    let numeroFinal = 0;

    if(PackageTypeInput.value == "diesel"){
        calculateSpace(0,0,Number(PackageInput.value));
    }else if(PackageTypeInput.value == "gasolina"){
        calculateSpace(Number(PackageInput.value),0,0);
    }else{
        calculateSpace(0,Number(PackageInput.value),0);
    }

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
  
  if(RawNumber == undefined || RawNumber == null || isNaN(RawNumber || typeof(RawNumber) == "string")){
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
    let percent = 1-(RawNumber/Tanks[tableId].Capacidade);
    if(isNaN(percent)||percent==undefined){
        percent = 0;
    };
    return [Table[n],percent,RawNumber]
  }
};