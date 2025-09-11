const myElements = document.getElementsByClassName("TankItemMainDiv");

import { Table1 } from './Tables1.js'; // tanques 1 e 2
import { Table2 } from './Tables2.js'; // tanques 3 e 4
import { Table3 } from './Tables3.js'; // tanques 5
import { Table4 } from './Tables4.js'; // tanques 6
import { Table5 } from './Tables5.js'; // tanques 7 e 8

const Translations = {
    "gasoline":"Gasolina",
    "gasolina":"Gasolina",
    "etanol":"Etanol",
    "diesel":"Diesel",
}

let CurrentScreen = 0; // tela atual
const InputDiv = document.getElementById("InputMainDiv");
const OutputDiv = document.getElementById("OutputMainDiv");
const TruckDiv = document.getElementById("TruckMainDiv");
const AnaliseDiv = document.getElementById("AnaliseMainDiv");

const AudioAlarm = document.getElementById("AudioAlarm");

const ConfirmAnaliseButton = document.getElementById("ConfirmAnaliseButton");
const ConfirmButton = document.getElementById("ConfirmButton");
const BackButton = document.getElementById("BackButton");
const BackButton2 = document.getElementById("BackButton2");
const BackButton3 = document.getElementById("BackButton3");
const TruckButton = document.getElementById("ConfirmTruckButton");
const AnaliseButton = document.getElementById("GoToAnaliseButton");  

const TotalGasolinaTexto = document.getElementById("TotalGasolinaTexto");
const TotalEtanolTexto = document.getElementById("TotalEtanolTexto");
const TotalDiselTexto = document.getElementById("TotalDiselTexto");
const ConfirmTruckButton = document.getElementById("ConfirmTruckPackageButton");
const PackageFitsText = document.getElementById("PackageFitsText");
const TimerAreaDiv = document.getElementById("TimerAreaMainDiv");

const PackageInput = document.getElementById("InputQuantidade");
const PackageTypeInput = document.getElementById("ProductInput");

const TankVisual = document.getElementById("GraphicTankItemMainDiv");

const OverflowWarningImage = document.getElementById("DoesNotFitImg");

const gasolineColor = "rgb(205, 67, 67)";
const etanolColor = "rgb(44, 183, 102)";
const dieselColor = "rgb(83, 89, 109)"

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
            newElement.style = `background-color:${gasolineColor};` //"background-color: #f99999;"
        }else if(tankData["Type"] == "ET"){
            newElement.style = `background-color:${etanolColor};` //"background-color: #63b159ff;"
        }else if(tankData["Type"] == "DI"){
            newElement.style = `background-color:${dieselColor};` //"background-color: #5d5d5dff;"
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

let JaEstaAbastecendo = false;

function startTimer(valorDoTanque){
    TimerAreaDiv.hidden = false;
    const totalSeconds = valorDoTanque/800*60;
    let remaining = totalSeconds;
    let interval;
    const FULL_DASH_ARRAY = 339.292;
    const circle = document.querySelector(".progress-ring__circle");

    circle.setAttribute("stroke-dasharray", FULL_DASH_ARRAY);
    circle.setAttribute("stroke-dashoffset", FULL_DASH_ARRAY);

    const timeDisplay = document.getElementById("timeDisplay");

    function formatTime(seconds) {
        let mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        let secs = String(Math.floor(seconds) % 60).padStart(2, "0");
        
        mins = Clamp(mins,0,10000000);
        secs = Clamp(secs,0,10000000);
    
        return `${mins}:${secs}`;
    }

    function updateCircle() {
        const offset = FULL_DASH_ARRAY * (remaining / totalSeconds);
        circle.setAttribute("stroke-dashoffset", offset);
    }

    clearInterval(interval);
    interval = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      timeDisplay.textContent = formatTime(remaining);
      updateCircle();
    } else {
      const audio = new Audio('../Assets/ALARM1.wav')
      audio.load(); audio.play();
      JaEstaAbastecendo = false;
      clearInterval(interval);
    }
  }, 1000);
}

function calculateSpace(AmountOfGasoline,AmountOfEtanol,AmountOfDisel)
{
    TimerAreaDiv.hidden = true; 
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
    // PackageFitsText.innerText = PackageFitsText.innerText + "\nNão coube: " + String( Clamp(amountOfGasoline,0,Infinity) ) + "LTs de gasolina\n"
    // PackageFitsText.innerText = PackageFitsText.innerText + "Não coube: " + String( Clamp(amountOfDisel,0,Infinity) ) + "LTs de diesel\n"
    // PackageFitsText.innerText = PackageFitsText.innerText + "Não coube: " + String( Clamp(amountOfEtanol,0,Infinity) ) + "LTs de etanol\n"
    
    let naoCabe = false;

    if(amountOfGasoline > 0 || amountOfEtanol > 0 || amountOfDisel > 0){
        naoCabe = true;
    }

    UpdateAll()
    
    let displayDiv = document.getElementById("AreaTruckDisplay");

    const kids = displayDiv.children;

    Object.keys(kids).forEach(key => {
        kids[key].remove()
    })

    let newTankVisual = TankVisual.cloneNode(true);

    displayDiv.appendChild(newTankVisual);
    const tankAreaKids = newTankVisual.children;

    OverflowWarningImage.hidden = !naoCabe;
    displayDiv.hidden = naoCabe;
    PackageFitsText.hidden = naoCabe;
      
    Object.keys(tankAreaKids).forEach(key => {
        let tankObj = tankAreaKids[key];
        let tankData = Tanks[key];
        if(tankObj){
            let tankContent = tankObj.children;    
            let button = tankContent[4];
            button.hidden = false;
            tankObj.style["height"] = "160px";
            button.addEventListener('click',function(ev){
                if(JaEstaAbastecendo){return}
                JaEstaAbastecendo = true;
                //button.hidden = true;
                startTimer(AmountOfGasoline+AmountOfDisel+AmountOfEtanol);
            })

            if(AmountOfGasoline>0){
                console.log(tankObj.style["backgroundColor"],typeof(tankObj.style["backgroundColor"]));
                if(tankObj.style["backgroundColor"] != gasolineColor){
                    tankObj.style["display"] = "none";
                }
            }else if(AmountOfDisel>0){
                console.log(tankObj.style["backgroundColor"],typeof(tankObj.style["backgroundColor"]));
                if(tankObj.style["backgroundColor"] != dieselColor){
                    tankObj.style["display"] = "none";
                }
            }else if(AmountOfEtanol>0){
                console.log(tankObj.style["backgroundColor"],typeof(tankObj.style["backgroundColor"]));
                if(tankObj.style["backgroundColor"] != etanolColor){
                    tankObj.style["display"] = "none";
                }
            }
        }else{
            console.error(`Invalid tankObj -> ${key}`)
        }
    })
    
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
            newElement.style = `background-color: ${gasolineColor};`;//"background-color: #f99999;"
        }else if(tankData["Type"] == "ET"){
            newElement.style = `background-color: ${etanolColor};`;//"background-color: #63b159ff;"
        }else if(tankData["Type"] == "DI"){
            newElement.style = `background-color: ${dieselColor};`;//"background-color: #5d5d5dff;"
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
    AnaliseDiv.hidden = true;
    OutputDiv.hidden = true;
    TruckDiv.hidden = true;
    if(CurrentScreen == 0){
        InputDiv.hidden = false;
    }else if(CurrentScreen == 1){
        OutputDiv.hidden = false;
    }else if (CurrentScreen == 2){
        TruckDiv.hidden = false;
    }else {
        AnaliseDiv.hidden = false;
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
    updateScreen();
});

BackButton2.addEventListener('click',function(ev){
    CurrentScreen = 1;
    updateScreen();
    window.location.reload();
});

BackButton3.addEventListener('click',function(ev){
    CurrentScreen = 1;
    updateScreen();
    window.location.reload();
});

TruckButton.addEventListener('click',function(ev){
    CurrentScreen = 2;
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

AnaliseButton.addEventListener('click',function(ev){
    console.log("3");
    CurrentScreen = 3;
    updateScreen();
});

ConfirmAnaliseButton.addEventListener('click',function(ev){
    // ANP density tables
    const densRef = {
        gasolina:{15:{min:0.7241,max:0.7638},15.5:{min:0.7237,max:0.7635},16:{min:0.7233,max:0.7631},16.5:{min:0.7229,max:0.7627},17:{min:0.7225,max:0.7623},17.5:{min:0.7221,max:0.7619},18:{min:0.7217,max:0.7615},18.5:{min:0.7212,max:0.7612},19:{min:0.7208,max:0.7608},19.5:{min:0.7204,max:0.7604},20:{min:0.7200,max:0.7600},20.5:{min:0.7196,max:0.7596},21:{min:0.7192,max:0.7592},21.5:{min:0.7188,max:0.7589},22:{min:0.7183,max:0.7585},22.5:{min:0.7179,max:0.7581},23:{min:0.7175,max:0.7577},23.5:{min:0.7171,max:0.7573},24:{min:0.7167,max:0.7569},24.5:{min:0.7163,max:0.7565},25:{min:0.7159,max:0.7562},25.5:{min:0.7154,max:0.7558},26:{min:0.7150,max:0.7554},26.5:{min:0.7146,max:0.7550},27:{min:0.7142,max:0.7546},27.5:{min:0.7138,max:0.7543},28:{min:0.7134,max:0.7539},28.5:{min:0.7130,max:0.7535},29:{min:0.7125,max:0.7527},29.5:{min:0.7121,max:0.7523},30:{min:0.7117,max:0.7523},30.5:{min:0.7113,max:0.7519},31:{min:0.7109,max:0.7516},31.5:{min:0.7105,max:0.7512},32:{min:0.7100,max:0.7508},32.5:{min:0.7096,max:0.7504},33:{min:0.7092,max:0.7500},33.5:{min:0.7088,max:0.7497},34:{min:0.7084,max:0.7493},34.5:{min:0.7080,max:0.7489},35:{min:0.7075,max:0.7480},35.5:{min:0.7071,max:0.7477},36:{min:0.7067,max:0.7473},36.5:{min:0.7063,max:0.7468},37:{min:0.7059,max:0.7464},37.5:{min:0.7055,max:0.7460},38:{min:0.7051,max:0.7458},38.5:{min:0.7046,max:0.7455},39:{min:0.7042,max:0.7450},39.5:{min:0.7038,max:0.7446},40:{min:0.7034,max:0.7446}},
        etanol:  {15:{min:0.8117,max:0.8150},15.5:{min:0.8113,max:0.8147},16:{min:0.8110,max:0.8143},16.5:{min:0.8105,max:0.8138},17:{min:0.8100,max:0.8135},17.5:{min:0.8095,max:0.8130},18:{min:0.8092,max:0.8125},18.5:{min:0.8088,max:0.8122},19:{min:0.8085,max:0.8118},19.5:{min:0.8080,max:0.8113},20:{min:0.8075,max:0.8110},20.5:{min:0.8070,max:0.8105},21:{min:0.8067,max:0.8100},21.5:{min:0.8062,max:0.8097},22:{min:0.8058,max:0.8092},22.5:{min:0.8055,max:0.8087},23:{min:0.8050,max:0.8083},23.5:{min:0.8045,max:0.8080},24:{min:0.8042,max:0.8075},24.5:{min:0.8038,max:0.8070},25:{min:0.8033,max:0.8067},25.5:{min:0.8030,max:0.8063},26:{min:0.8025,max:0.8058},26.5:{min:0.8020,max:0.8055},27:{min:0.8015,max:0.8050},27.5:{min:0.8012,max:0.8045},28:{min:0.8007,max:0.8040},28.5:{min:0.8005,max:0.8037},29:{min:0.8000,max:0.8033},29.5:{min:0.7995,max:0.8028},30:{min:0.7990,max:0.8023},30.5:{min:0.7987,max:0.8020},31:{min:0.7982,max:0.8015},31.5:{min:0.7977,max:0.8010},32:{min:0.7972,max:0.8007},32.5:{min:0.7968,max:0.8003},33:{min:0.7965,max:0.7998},33.5:{min:0.7960,max:0.7993},34:{min:0.7955,max:0.7988},34.5:{min:0.7952,max:0.7985},35:{min:0.7947,max:0.7980},35.5:{min:0.7943,max:0.7975},36:{min:0.7940,max:0.7973},36.5:{min:0.7935,max:0.7968},37:{min:0.7930,max:0.7963},37.5:{min:0.7925,max:0.7958},38:{min:0.7920,max:0.7950},38.5:{min:0.7917,max:0.7945},39:{min:0.7913,max:0.7940},39.5:{min:0.7908,max:0.7937},40:{min:0.7905,max:0.7937}},
        diesel:  {15:{min:0.8234,max:0.8832},15.5:{min:0.8231,max:0.8827},16:{min:0.8227,max:0.8826},16.5:{min:0.8224,max:0.8823},17:{min:0.8221,max:0.8819},17.5:{min:0.8217,max:0.8813},18:{min:0.8214,max:0.8810},18.5:{min:0.8210,max:0.8807},19:{min:0.8207,max:0.8804},19.5:{min:0.8204,max:0.8800},20:{min:0.8200,max:0.8797},20.5:{min:0.8197,max:0.8794},21:{min:0.8193,max:0.8790},21.5:{min:0.8188,max:0.8785},22:{min:0.8183,max:0.8781},22.5:{min:0.8176,max:0.8778},23:{min:0.8173,max:0.8775},23.5:{min:0.8169,max:0.8771},24:{min:0.8166,max:0.8768},24.5:{min:0.8163,max:0.8765},25:{min:0.8160,max:0.8762},25.5:{min:0.8157,max:0.8759},26:{min:0.8153,max:0.8756},26.5:{min:0.8149,max:0.8753},27:{min:0.8145,max:0.8749},27.5:{min:0.8141,max:0.8746},28:{min:0.8138,max:0.8743},28.5:{min:0.8134,max:0.8739},29:{min:0.8130,max:0.8736},29.5:{min:0.8127,max:0.8733},30:{min:0.8123,max:0.8730},30.5:{min:0.8119,max:0.8727},31:{min:0.8116,max:0.8724},31.5:{min:0.8112,max:0.8721},32:{min:0.8108,max:0.8718},32.5:{min:0.8105,max:0.8715},33:{min:0.8101,max:0.8712},33.5:{min:0.8097,max:0.8709},34:{min:0.8093,max:0.8706},34.5:{min:0.8090,max:0.8703},35:{min:0.8086,max:0.8699},35.5:{min:0.8082,max:0.8696},36:{min:0.8078,max:0.8693},36.5:{min:0.8075,max:0.8690},37:{min:0.8071,max:0.8687},37.5:{min:0.8067,max:0.8684},38:{min:0.8064,max:0.8681},38.5:{min:0.8060,max:0.8678},39:{min:0.8056,max:0.8675},39.5:{min:0.8053,max:0.8672},40:{min:0.8049,max:0.8669}}
    };

    // Cálculo
    const textOutputAnalise = document.getElementById("AnaliseOutputText");
    const ph = document.getElementById("AnalisePHInput").value;
    const type=document.getElementById('AnaliseProductInput').value;
    const temp=parseFloat(document.getElementById('AnaliseTemperatureInput').value);
    const dens=parseFloat(document.getElementById('AnaliseDensityInput').value);
    if(! (isNaN(temp)||isNaN(dens))){
        let teor = '...';
        const ref=densRef[type][temp];
        console.log(type);
        let TipoTraduzido = Translations[type];
        if(!TipoTraduzido){TipoTraduzido="?[COMBUSTÍVEL]?"}
        if(ref==undefined){
            //window.alert(`⚠️Referencias para a temperatura ${temp}°C não foram encontradas⚠️`);
            teor = `<span style="color:#E53E3E";>✖ Fora da medida</span>`;
            textOutputAnalise.innerHTML = teor; 
            return
        }
        let ok = (dens >= ref.min && dens <= ref.max);

        let etanolOrPhText = "pH";

        if (type == 'etanol') {
            if(isNaN(ph)){
                window.alert("⚠️Por favor, insira um valor válido de pH⚠️");
                return
            }
            const densStr = dens.toFixed(4);
            const tempStr = temp.toFixed(1);

            const etanolTable = {
            "15.0": {
                "0.8160": "92.30",
                "0.8155": "92.50",
                "0.8150": "92.70",
                "0.8145": "92.80",
                "0.8140": "93.00",
                "0.8135": "93.20",
                "0.8130": "93.40",
                "0.8125": "93.55",
                "0.8120": "93.75",
                "0.8115": "93.90",
                "0.8110": "94.10",
                "0.8105": "94.30",
                "0.8100": "94.45",
                "0.8095": "94.65",
                "0.8090": "94.80",
                "0.8085": "95.00"
            },
            "15.5": {
                "0.8160": "92.15",
                "0.8155": "92.30",
                "0.8150": "92.50",
                "0.8145": "92.70",
                "0.8140": "92.85",
                "0.8135": "93.05",
                "0.8130": "93.20",
                "0.8125": "93.40",
                "0.8120": "93.60",
                "0.8115": "93.75",
                "0.8110": "93.95",
                "0.8105": "94.10",
                "0.8100": "94.30",
                "0.8095": "94.50",
                "0.8090": "94.65",
                "0.8085": "94.85",
                "0.8080": "95.00"
            },
            "16.0": {
                "0.8160": "92.00",
                "0.8155": "92.15",
                "0.8150": "92.35",
                "0.8145": "92.55",
                "0.8140": "92.70",
                "0.8135": "92.90",
                "0.8130": "93.05",
                "0.8125": "93.25",
                "0.8120": "93.45",
                "0.8115": "93.60",
                "0.8110": "93.80",
                "0.8105": "93.95",
                "0.8100": "94.15",
                "0.8095": "94.30",
                "0.8090": "94.50",
                "0.8085": "94.70",
                "0.8080": "94.85",
                "0.8075": "95.00"
            },
            "16.5": {
                "0.8155": "92.00",
                "0.8150": "92.20",
                "0.8145": "92.35",
                "0.8140": "92.55",
                "0.8135": "92.75",
                "0.8130": "92.90",
                "0.8125": "93.10",
                "0.8120": "93.30",
                "0.8115": "93.45",
                "0.8110": "93.65",
                "0.8105": "93.80",
                "0.8100": "94.00",
                "0.8095": "94.20",
                "0.8090": "94.35",
                "0.8085": "94.55",
                "0.8080": "94.70",
                "0.8075": "94.90",
                "0.8070": "95.00"
            },
            "17.0": {
                "0.8150": "92.00",
                "0.8145": "92.20",
                "0.8140": "92.40",
                "0.8135": "92.75",
                "0.8130": "92.95",
                "0.8120": "93.10",
                "0.8115": "93.30",
                "0.8110": "93.50",
                "0.8105": "93.65",
                "0.8100": "93.85",
                "0.8095": "94.00",
                "0.8090": "94.20",
                "0.8085": "94.40",
                "0.8080": "94.55",
                "0.8075": "94.70",
                "0.8070": "94.90"
            },
            "17.5": {
                "0.8145": "92.05",
                "0.8140": "92.25",
                "0.8135": "92.40",
                "0.8130": "92.60",
                "0.8125": "92.80",
                "0.8120": "92.95",
                "0.8115": "93.15",
                "0.8110": "93.30",
                "0.8105": "93.50",
                "0.8100": "93.70",
                "0.8095": "93.85",
                "0.8090": "94.05",
                "0.8085": "94.20",
                "0.8080": "94.40",
                "0.8075": "94.60",
                "0.8070": "94.75",
                "0.8065": "94.95"
            },
            "18.0": {
                "0.8140": "92.10",
                "0.8135": "92.25",
                "0.8130": "92.45",
                "0.8125": "92.65",
                "0.8120": "92.80",
                "0.8115": "93.00",
                "0.8110": "93.15",
                "0.8105": "93.35",
                "0.8100": "93.55",
                "0.8095": "93.70",
                "0.8090": "93.90",
                "0.8085": "94.05",
                "0.8080": "94.25",
                "0.8075": "94.40",
                "0.8070": "94.60",
                "0.8065": "94.80",
                "8.8060": "94.95"
            },
            "18.5": {
                "0.8135": "92.10",
                "0.8130": "92.30",
                "0.8125": "92.45",
                "0.8120": "92.65",
                "0.8115": "92.85",
                "0.8110": "93.00",
                "0.8105": "93.15",
                "0.8100": "93.40",
                "0.8095": "93.55",
                "0.8090": "93.75",
                "0.8085": "93.90",
                "0.8080": "94.10",
                "0.8075": "94.25",
                "0.8070": "94.45",
                "0.8065": "94.60",
                "0.8060": "94.80",
                "0.8055": "95.00"
            },
            "19.0": {
                "0.8130": "92.15",
                "0.8125": "92.30",
                "0.8120": "92.50",
                "0.8115": "92.70",
                "0.8110": "92.85",
                "0.8105": "93.05",
                "0.8100": "93.20",
                "0.8095": "93.40",
                "0.8090": "93.60",
                "0.8085": "93.75",
                "0.8080": "93.95",
                "0.8075": "94.10",
                "0.8070": "94.30",
                "0.8065": "94.45",
                "0.8060": "94.65",
                "0.8055": "94.80",
                "0.8050": "95.00"
            },
            "19.5": {
                "0.8130": "92.00",
                "0.8125": "92.15",
                "0.8120": "92.35",
                "0.8115": "92.50",
                "0.8110": "92.70",
                "0.8105": "92.90",
                "0.8100": "93.05",
                "0.8095": "93.25",
                "0.8090": "93.40",
                "0.8085": "93.60",
                "0.8080": "93.80",
                "0.8075": "93.95",
                "0.8070": "94.15",
                "0.8065": "94.30",
                "0.8060": "94.50",
                "0.8055": "94.65",
                "0.8050": "94.85",
                "0.8045": "95.00"
            },
            "20.0": {
                "0.8125": "92.00",
                "0.8120": "92.20",
                "0.8115": "92.35",
                "0.8110": "92.55",
                "0.8105": "92.75",
                "0.8100": "92.90",
                "0.8095": "93.10",
                "0.8090": "93.25",
                "0.8085": "93.45",
                "0.8080": "93.65",
                "0.8075": "93.80",
                "0.8070": "94.00",
                "0.8065": "94.15",
                "0.8060": "94.35",
                "0.8055": "94.50",
                "0.8050": "94.70",
                "0.8045": "94.85",
                "0.8040": "95.00"
            },
            "20.5": {
                "0.8120": "92.00",
                "0.8115": "92.20",
                "0.8110": "92.40",
                "0.8105": "92.55",
                "0.8100": "92.75",
                "0.8095": "92.95",
                "0.8090": "93.10",
                "0.8085": "93.30",
                "0.8080": "93.50",
                "0.8075": "93.65",
                "0.8070": "93.85",
                "0.8065": "94.00",
                "0.8060": "94.20",
                "0.8055": "94.35",
                "0.8050": "94.55",
                "0.8045": "94.70",
                "0.8040": "94.90"
            },
            "21.0": {
                "0.8115": "92.05",
                "0.8110": "92.25",
                "0.8105": "92.40",
                "0.8100": "92.60",
                "0.8095": "92.80",
                "0.8090": "92.95",
                "0.8085": "93.15",
                "0.8080": "93.30",
                "0.8075": "93.50",
                "0.8070": "93.70",
                "0.8065": "93.85",
                "0.8060": "94.05",
                "0.8055": "94.20",
                "0.8050": "94.40",
                "0.8045": "94.55",
                "0.8040": "94.75",
                "0.8035": "94.90"
            },
            "21.5": {
                "0.8110": "92.05",
                "0.8105": "92.25",
                "0.8100": "92.45",
                "0.8095": "92.60",
                "0.8090": "92.80",
                "0.8085": "93.00",
                "0.8080": "93.15",
                "0.8075": "93.35",
                "0.8070": "93.50",
                "0.8065": "93.70",
                "0.8060": "93.90",
                "0.8055": "94.05",
                "0.8050": "94.25",
                "0.8045": "94.40",
                "0.8040": "94.60",
                "0.8035": "94.75",
                "0.8030": "94.95"
            },
            "22.0": {
                "0.8105": "92.10",
                "0.8100": "92.30",
                "0.8095": "92.45",
                "0.8090": "92.65",
                "0.8085": "92.80",
                "0.8080": "93.00",
                "0.8075": "93.20",
                "0.8070": "93.35",
                "0.8065": "93.55",
                "0.8060": "93.70",
                "0.8055": "93.90",
                "0.8050": "94.10",
                "0.8045": "94.25",
                "0.8040": "94.45",
                "0.8035": "94.60",
                "0.8030": "94.80",
                "0.8025": "94.95"
            },
            "22.5": {
                "0.8100": "92.10",
                "0.8095": "92.30",
                "0.8090": "92.50",
                "0.8085": "92.65",
                "0.8080": "92.85",
                "0.8075": "93.00",
                "0.8070": "93.20",
                "0.8065": "93.40",
                "0.8060": "93.55",
                "0.8055": "93.75",
                "0.8050": "93.95",
                "0.8045": "94.10",
                "0.8040": "94.30",
                "0.8035": "94.45",
                "0.8030": "94.65",
                "0.8025": "94.80",
                "0.8020": "95.00"
            },
            "23.0": {
                "0.8095": "92.15",
                "0.8090": "92.30",
                "0.8085": "92.50",
                "0.8080": "92.70",
                "0.8075": "92.85",
                "0.8070": "93.05",
                "0.8065": "93.25",
                "0.8060": "93.40",
                "0.8055": "93.60",
                "0.8050": "93.75",
                "0.8045": "93.95",
                "0.8040": "94.15",
                "0.8035": "94.30",
                "0.8030": "94.50",
                "0.8025": "94.65",
                "0.8020": "94.85",
                "0.8015": "95.00"
            },
            "23.5": {
                "0.8095": "92.00",
                "0.8090": "92.15",
                "0.8085": "92.35",
                "0.8080": "92.55",
                "0.8075": "92.70",
                "0.8070": "92.90",
                "0.8065": "93.10",
                "0.8060": "93.25",
                "0.8055": "93.45",
                "0.8050": "93.60",
                "0.8045": "93.80",
                "0.8040": "93.95",
                "0.8035": "94.15",
                "0.8030": "94.35",
                "0.8025": "94.50",
                "0.8020": "94.70",
                "0.8015": "94.85",
                "0.8010": "95.00"
            },
            "24.0": {
                "0.8090": "92.00",
                "0.8085": "92.20",
                "0.8080": "92.35",
                "0.8075": "92.55",
                "0.8070": "92.75",
                "0.8065": "92.90",
                "0.8060": "93.10",
                "0.8055": "93.30",
                "0.8050": "93.45",
                "0.8045": "93.65",
                "0.8040": "93.80",
                "0.8035": "94.00",
                "0.8030": "94.20",
                "0.8025": "94.35",
                "0.8020": "94.55",
                "0.8015": "94.70",
                "0.8010": "94.90"
            },
            "24.5": {
                "0.8085": "92.05",
                "0.8080": "92.20",
                "0.8075": "92.40",
                "0.8070": "92.55",
                "0.8065": "92.75",
                "0.8060": "92.95",
                "0.8055": "93.10",
                "0.8050": "93.30",
                "0.8045": "93.50",
                "0.8040": "93.65",
                "0.8035": "93.85",
                "0.8030": "94.00",
                "0.8025": "94.20",
                "0.8020": "94.40",
                "0.8015": "94.55",
                "0.8010": "94.70",
                "0.8005": "94.90"
            },
            "25.0": {
                "0.8080": "92.05",
                "0.8075": "92.25",
                "0.8070": "92.40",
                "0.8065": "92.60",
                "0.8060": "92.80",
                "0.8055": "93.00",
                "0.8050": "93.15",
                "0.8045": "93.30",
                "0.8040": "93.50",
                "0.8035": "93.70",
                "0.8030": "93.85",
                "0.8025": "94.05",
                "0.8020": "94.20",
                "0.8015": "94.40",
                "0.8010": "94.60",
                "0.8005": "94.75",
                "0.8000": "94.90"
            },
            "25.5": {
                "0.8075": "92.05",
                "0.8070": "92.25",
                "0.8065": "92.45",
                "0.8060": "92.60",
                "0.8055": "92.80",
                "0.8050": "93.00",
                "0.8045": "93.15",
                "0.8040": "93.35",
                "0.8035": "93.55",
                "0.8030": "93.70",
                "0.8025": "93.90",
                "0.8020": "94.05",
                "0.8015": "94.25",
                "0.8010": "94.40",
                "0.8005": "94.60",
                "0.8000": "94.80",
                "0.7995": "94.95"
            },
            "26.0": {
                "0.8070": "92.10",
                "0.8065": "92.30",
                "0.8060": "92.45",
                "0.8055": "92.65",
                "0.8050": "92.85",
                "0.8045": "93.00",
                "0.8040": "93.20",
                "0.8035": "93.35",
                "0.8030": "93.55",
                "0.8025": "93.75",
                "0.8020": "93.90",
                "0.8015": "94.10",
                "0.8010": "94.25",
                "0.8005": "94.45",
                "0.8000": "94.60",
                "0.7995": "94.80",
                "0.7990": "95.00"
            },
            "26.5": {
                "0.8065": "92.10",
                "0.8060": "92.30",
                "0.8055": "92.50",
                "0.8050": "92.65",
                "0.8045": "92.85",
                "0.8040": "93.05",
                "0.8035": "93.20",
                "0.8030": "93.40",
                "0.8025": "93.60",
                "0.8020": "93.73"
            },
            "27.0": {
                "0.8050": "92.50",
                "0.8045": "92.70",
                "0.8040": "92.90",
                "0.8035": "93.05",
                "0.8030": "93.25",
                "0.8025": "93.40",
                "0.8020": "93.60",
                "0.8015": "93.80",
                "0.8010": "93.95",
                "0.8005": "94.15",
                "0.8000": "94.30",
                "0.7995": "94.50",
                "0.7990": "94.65",
                "0.7985": "94.85",
                "0.7980": "95.00"
            },
            "27.5": {
                "0.8060": "92.00",
                "0.8055": "92.15",
                "0.8050": "92.35",
                "0.8045": "92.55",
                "0.8040": "92.70",
                "0.8035": "92.90",
                "0.8030": "93.10",
                "0.8025": "93.25",
                "0.8020": "93.45",
                "0.8015": "93.60",
                "0.8010": "93.80",
                "0.8005": "94.00",
                "0.8000": "94.15",
                "0.7995": "94.35",
                "0.7990": "94.50",
                "0.7985": "94.70",
                "0.7980": "94.85"
            },
            "28.0": {
                "0.8055": "92.00",
                "0.8050": "92.20",
                "0.8045": "92.40",
                "0.8040": "92.55",
                "0.8035": "92.75",
                "0.8030": "92.90",
                "0.8025": "93.10",
                "0.8020": "93.25",
                "0.8015": "93.45",
                "0.8010": "93.65",
                "0.8005": "93.80",
                "0.8000": "94.00",
                "0.7995": "94.20",
                "0.7990": "94.35",
                "0.7985": "94.55",
                "0.7980": "94.70",
                "0.7975": "94.90"
            },
            "28.5": {
                "0.8050": "92.00",
                "0.8045": "92.20",
                "0.8040": "92.40",
                "0.8035": "92.60",
                "0.8030": "92.75",
                "0.8025": "92.95",
                "0.8020": "93.10",
                "0.8015": "93.30",
                "0.8010": "93.50",
                "0.8005": "93.65",
                "0.8000": "93.85",
                "0.7995": "94.05",
                "0.7990": "94.20",
                "0.7985": "94.40",
                "0.7980": "94.55",
                "0.7975": "94.75",
                "0.7970": "94.90"
            },
            "29.0": {
                "0.8045": "92.05",
                "0.8040": "92.25",
                "0.8035": "92.40",
                "0.8030": "92.60",
                "0.8025": "92.80",
                "0.8020": "92.95",
                "0.8015": "93.15",
                "0.8010": "93.35",
                "0.8005": "93.50",
                "0.8000": "93.70",
                "0.7995": "93.85",
                "0.7990": "94.05",
                "0.7985": "94.20",
                "0.7980": "94.40",
                "0.7975": "94.60",
                "0.7970": "94.75",
                "0.7965": "94.95"
            },
            "29.5": {
                "0.8040": "92.05",
                "0.8035": "92.25",
                "0.8030": "92.45",
                "0.8025": "92.60",
                "0.8020": "92.80",
                "0.8015": "93.00",
                "0.8010": "93.20",
                "0.8005": "93.35",
                "0.8000": "93.50",
                "0.7995": "93.70",
                "0.7990": "93.90",
                "0.7985": "94.05",
                "0.7980": "94.25",
                "0.7975": "94.40",
                "0.7970": "94.60",
                "0.7965": "94.80",
                "0.7960": "94.95"
            },
            "30.0": {
                "0.8035": "92.10",
                "0.8030": "92.30",
                "0.8025": "92.45",
                "0.8020": "92.65",
                "0.8015": "92.85",
                "0.8010": "93.00",
                "0.8005": "93.20",
                "0.8000": "93.35",
                "0.7995": "93.55",
                "0.7990": "93.75",
                "0.7985": "93.90",
                "0.7980": "94.10",
                "0.7975": "94.30",
                "0.7970": "94.45",
                "0.7965": "94.65",
                "0.7960": "94.80",
                "0.7955": "95.00"
            },
            "30.5": {
                "0.8030": "92.10",
                "0.8025": "92.30",
                "0.8020": "92.50",
                "0.8015": "92.65",
                "0.8010": "92.85",
                "0.8005": "93.05",
                "0.8000": "93.20",
                "0.7995": "93.40",
                "0.7990": "93.55",
                "0.7985": "93.75",
                "0.7980": "93.95",
                "0.7975": "94.10",
                "0.7970": "94.30",
                "0.7965": "94.50",
                "0.7960": "94.65",
                "0.7955": "94.85",
                "0.7950": "95.00"
            },
            "31.0": {
                "0.8025": "92.15",
                "0.8020": "92.30",
                "0.8015": "92.50",
                "0.8010": "92.70",
                "0.8005": "92.90",
                "0.8000": "93.05",
                "0.7995": "93.25",
                "0.7990": "93.40",
                "0.7985": "93.60",
                "0.7980": "93.80",
                "0.7975": "93.95",
                "0.7970": "94.15",
                "0.7965": "94.30",
                "0.7960": "94.50",
                "0.7955": "94.70",
                "0.7950": "94.85",
                "0.7945": "95.00"
            },
            "31.5": {
                "0.8025": "92.00",
                "0.8020": "92.15",
                "0.8015": "92.35",
                "0.8010": "92.50",
                "0.8005": "92.70",
                "0.8000": "92.90",
                "0.7995": "93.10",
                "0.7990": "93.25",
                "0.7985": "93.45",
                "0.7980": "93.60",
                "0.7975": "93.80",
                "0.7970": "94.00",
                "0.7965": "94.15",
                "0.7960": "94.35",
                "0.7955": "94.50",
                "0.7950": "94.70",
                "0.7945": "94.90"
            },
            "32.0": {
                "0.8020": "92.00",
                "0.8015": "92.20",
                "0.8010": "92.40",
                "0.8005": "92.55",
                "0.8000": "92.75",
                "0.7995": "92.90",
                "0.7990": "93.10",
                "0.7985": "93.30",
                "0.7980": "93.45",
                "0.7975": "93.65",
                "0.7970": "93.80",
                "0.7965": "94.00",
                "0.7960": "94.20",
                "0.7955": "94.35",
                "0.7950": "94.55",
                "0.7945": "94.70",
                "0.7940": "94.90"
            },
            "32.5": {
                "0.8015": "92.00",
                "0.8010": "92.20",
                "0.8005": "92.40",
                "0.8000": "92.60",
                "0.7995": "92.75",
                "0.7990": "92.95",
                "0.7985": "93.10",
                "0.7980": "93.30",
                "0.7975": "93.50",
                "0.7970": "93.65",
                "0.7965": "93.85",
                "0.7960": "94.00",
                "0.7955": "94.20",
                "0.7950": "94.40",
                "0.7945": "94.55",
                "0.7940": "94.75",
                "0.7935": "94.90"
            },
            "33.0": {
                "0.8010": "92.05",
                "0.8005": "92.20",
                "0.8000": "92.40",
                "0.7995": "92.60",
                "0.7990": "92.75",
                "0.7985": "92.95",
                "0.7980": "93.15",
                "0.7975": "93.35",
                "0.7970": "93.50",
                "0.7965": "93.70",
                "0.7960": "93.85",
                "0.7955": "94.05",
                "0.7950": "94.20",
                "0.7945": "94.40",
                "0.7940": "94.60",
                "0.7935": "94.75",
                "0.7930": "94.95"
            },
            "33.5": {
                "0.8005": "92.05",
                "0.8000": "92.25",
                "0.7995": "92.45",
                "0.7990": "92.60",
                "0.7985": "92.80",
                "0.7980": "93.00",
                "0.7975": "93.15",
                "0.7970": "93.35",
                "0.7965": "93.55",
                "0.7960": "93.70",
                "0.7955": "93.90",
                "0.7950": "94.05",
                "0.7945": "94.25",
                "0.7940": "94.45",
                "0.7935": "94.60",
                "0.7930": "94.80",
                "0.7925": "94.95"
            },
            "34.0": {
                "0.8000": "92.10",
                "0.7995": "92.30",
                "0.7990": "92.45",
                "0.7985": "92.65",
                "0.7980": "92.80",
                "0.7975": "93.00",
                "0.7970": "93.20",
                "0.7965": "93.35",
                "0.7960": "93.55",
                "0.7955": "93.75",
                "0.7950": "93.90",
                "0.7945": "94.10",
                "0.7940": "94.30",
                "0.7935": "94.45",
                "0.7930": "94.65",
                "0.7925": "94.80",
                "0.7920": "95.00"
            },
            "34.5": {
                "0.7995": "92.10",
                "0.7990": "92.30",
                "0.7985": "92.50",
                "0.7980": "92.65",
                "0.7975": "92.85",
                "0.7970": "93.00",
                "0.7965": "93.20",
                "0.7960": "93.40",
                "0.7955": "93.60",
                "0.7950": "93.75",
                "0.7945": "93.95",
                "0.7940": "94.10",
                "0.7935": "94.30",
                "0.7930": "94.45",
                "0.7925": "94.65",
                "0.7920": "94.85",
                "0.7915": "95.00"
            },
            "35.0": {
                "0.7990": "92.10",
                "0.7985": "92.30",
                "0.7980": "92.50",
                "0.7975": "92.70",
                "0.7970": "92.85",
                "0.7965": "93.05",
                "0.7960": "93.20",
                "0.7955": "93.40",
                "0.7950": "93.60",
                "0.7945": "93.80",
                "0.7940": "93.95",
                "0.7935": "94.15",
                "0.7930": "94.30",
                "0.7925": "94.50",
                "0.7920": "94.70",
                "0.7915": "94.85",
                "0.7910": "95.00"
            },
            "35.5": {
                "0.7990": "92.00",
                "0.7985": "92.15",
                "0.7980": "92.35",
                "0.7975": "92.50",
                "0.7970": "92.70",
                "0.7965": "92.90",
                "0.7960": "93.05",
                "0.7955": "93.25",
                "0.7950": "93.45",
                "0.7945": "93.60",
                "0.7940": "93.80",
                "0.7935": "94.00",
                "0.7930": "94.15",
                "0.7925": "94.35",
                "0.7920": "94.50",
                "0.7915": "94.70",
                "0.7910": "94.90"
            },
            "36.0": {
                "0.7985": "92.00",
                "0.7980": "92.15",
                "0.7975": "92.35",
                "0.7970": "92.55",
                "0.7965": "92.75",
                "0.7960": "92.90",
                "0.7955": "93.10",
                "0.7950": "93.30",
                "0.7945": "93.45",
                "0.7940": "93.65",
                "0.7935": "93.80",
                "0.7930": "94.00",
                "0.7925": "94.20",
                "0.7920": "94.35",
                "0.7915": "94.55",
                "0.7910": "94.70",
                "0.7905": "94.90"
            },
            "36.5": {
                "0.7980": "92.00",
                "0.7975": "92.20",
                "0.7970": "92.40",
                "0.7965": "92.55",
                "0.7960": "92.75",
                "0.7955": "92.95",
                "0.7950": "93.10",
                "0.7945": "93.30",
                "0.7940": "93.50",
                "0.7935": "93.65",
                "0.7930": "93.85",
                "0.7925": "94.05",
                "0.7920": "94.20",
                "0.7915": "94.40",
                "0.7910": "94.55",
                "0.7905": "94.75",
                "0.7900": "94.90"
            },
            "37.0": {
                "0.7975": "92.05",
                "0.7970": "92.20",
                "0.7965": "92.40",
                "0.7960": "92.60",
                "0.7955": "92.75",
                "0.7950": "92.95",
                "0.7945": "93.15",
                "0.7940": "93.30",
                "0.7935": "93.50",
                "0.7930": "93.70",
                "0.7925": "93.85",
                "0.7920": "94.05",
                "0.7915": "94.25",
                "0.7910": "94.40",
                "0.7905": "94.60",
                "0.7900": "94.75",
                "0.7895": "94.95"
            },
            "37.5": {
                "0.7970": "92.05",
                "0.7965": "92.25",
                "0.7960": "92.40",
                "0.7955": "92.60",
                "0.7950": "92.80",
                "0.7945": "92.95",
                "0.7940": "93.15",
                "0.7935": "93.35",
                "0.7930": "93.50",
                "0.7925": "93.70",
                "0.7920": "93.90",
                "0.7915": "94.05",
                "0.7910": "94.25",
                "0.7905": "94.45",
                "0.7900": "94.60",
                "0.7895": "94.80",
                "0.7890": "94.95"
            },
            "38.0": {
                "0.7965": "92.05",
                "0.7960": "92.25",
                "0.7955": "92.45",
                "0.7950": "92.60",
                "0.7945": "92.80",
                "0.7940": "93.00",
                "0.7935": "93.20",
                "0.7930": "93.35",
                "0.7925": "93.55",
                "0.7920": "93.70",
                "0.7915": "93.90",
                "0.7910": "94.10",
                "0.7905": "94.30",
                "0.7900": "94.45",
                "0.7895": "94.65",
                "0.7890": "94.80",
                "0.7885": "95.00"
            },
            "38.5": {
                "0.7960": "92.10",
                "0.7955": "92.30",
                "0.7950": "92.45",
                "0.7945": "92.65",
                "0.7940": "92.85",
                "0.7935": "93.00",
                "0.7930": "93.20",
                "0.7925": "93.40",
                "0.7920": "93.55",
                "0.7915": "93.75",
                "0.7910": "93.90",
                "0.7905": "94.10",
                "0.7900": "94.30",
                "0.7895": "94.45",
                "0.7890": "94.65",
                "0.7885": "94.85",
                "0.7880": "95.00"
            },
            "39.0": {
                "0.7955": "92.10",
                "0.7950": "92.30",
                "0.7945": "92.50",
                "0.7940": "92.65",
                "0.7935": "92.85",
                "0.7930": "93.05",
                "0.7925": "93.20",
                "0.7920": "93.40",
                "0.7915": "93.60",
                "0.7910": "93.75",
                "0.7905": "93.95",
                "0.7900": "94.10",
                "0.7895": "94.30",
                "0.7890": "94.50",
                "0.7885": "94.70",
                "0.7880": "94.85",
                "0.7875": "95.00"
            },
            "39.5": {
                "0.7950": "92.15",
                "0.7945": "92.30",
                "0.7940": "92.50",
                "0.7935": "92.70",
                "0.7930": "92.85",
                "0.7925": "93.05",
                "0.7920": "93.25",
                "0.7915": "93.40",
                "0.7910": "93.60",
                "0.7905": "93.80",
                "0.7900": "93.95",
                "0.7895": "94.15",
                "0.7890": "94.35",
                "0.7885": "94.50",
                "0.7880": "94.70",
                "0.7875": "94.90"
            },
                "40.0": {
                "0.7945": "92.15",
                "0.7940": "92.35",
                "0.7935": "92.50",
                "0.7930": "92.70",
                "0.7925": "92.90",
                "0.7920": "93.05",
                "0.7915": "93.25",
                "0.7910": "93.45",
                "0.7905": "93.60",
                "0.7900": "93.80",
                "0.7895": "94.00",
                "0.7890": "94.15",
                "0.7885": "94.35",
                "0.7880": "94.55",
                "0.7875": "94.70",
                "0.7870": "94.90"
            }
            };
            
            const teorValue = etanolTable[tempStr]?.[densStr];

            if (teorValue) {
                const teorNum = parseFloat(teorValue);
                const minTeor = 92.70;
                const maxTeor = 95.00;
                const valid = teorNum >= minTeor && teorNum <= maxTeor;

                teor = `${teorValue} % °INPM <span style="color:${valid ? '#269f16ff' : '#E53E3E'};">(${valid ? '✔ Conforme!' : '✖ Fora da medida'})</span>`;
                ok = ok && valid;
            } else {
                //window.alert(`⚠️Não foram encontrados dados para a temperatura ${tempStr}°C e densidade ${densStr}(g/cm³)⚠️`);
                teor = `<span style="color:#E53E3E";>✖ Fora da medida</span>`;
                ok = false;
            }

            textOutputAnalise.innerHTML = teor;
        }else{
            if(type == 'gasolina'){
                etanolOrPhText = "Etanol";
                if(ph>31 || ph<29){
                    ok = false;
                }
            }
            teor = `<span style="color:${ok ? '#269f16ff' : '#E53E3E'};">(${ok ? '✔ Conforme!' : '✖ Fora da medida'})</span>`;
        }
        teor = teor + `<h4>Dados Informados:</h4>
        <p>Tipo: ${TipoTraduzido}</p>
        <p>Temperatura: ${temp}°C</p>
        <p>Densidade: ${dens}g/cm³</p>    
        `

        if(type!="etanol"){
            teor = teor + `<p>%${etanolOrPhText}: ${ph}%</p>`
        }

        teor = teor + `<br><h4>Referência ANP:</h4>
        <p>Temp Referencia: ${temp}°C</p>
        <p>Densidade Min: ${ref.min}</p>
        <p>Densidade Max: ${ref.max}</p>`

        if(type=="gasolina"){
            teor = teor + `<p>%Etanol: 29-31%</p>`
        }
        textOutputAnalise.innerHTML = teor
    }else{
        window.alert("⚠️Por favor, insira valores válidos.⚠️");
    }
});

updateScreen();

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