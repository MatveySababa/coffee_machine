"use script"

let state = "waiting" // "cooking" "ready"
let balance = document.querySelector(".balance");
let cup = document.querySelector(".cup img");

function cookCoffee(name, price, elem) {
  if (state != "waiting") {
     return;
  }
  if (balance.value >= price) {
    state = "cooking";
    balance.style.backgroundColor = "";
    balance.value -= price;  // balance.value = balance.value - price
    changeDisplayText(`Ваш ${name} готовится`); // вместо alert подставляем функцию changeDisplayText
    
    let coffeeImg = elem.querySelector("img");
    let coffeeSrc = coffeeImg.getAttribute("src");

    startCooking(name, coffeeSrc);
  } else {
    changeDisplayText("Недостаточно средств");
    balance.style.backgroundColor = "#FF7400";
  }
}

function startCooking(name, src) {
  // let progressBar = document.querySelector(".progress-bar"); заменили на changeProgressPercent
  // let cup = document.querySelector(".cup img"); вынесли в глобальную переменную
  cup.setAttribute("src", src);
  cup.style.display = "inline";
  let t = 0;
  let cookingInterval = setInterval(() => {
    t++;
    cup.style.opacity = t + "%";
    // progressBar.style.width = t + "%"; заменили на changeProgressPercent
    changeProgressPercent(t);
    console.log(t);
    if (t == 100) {
      state = "ready";
      clearInterval(cookingInterval);
      changeDisplayText(`Ваш ${name} готов !`);
      cup.style.cursor = "pointer";
      cup.onclick = function() {
        takeCoffee();
      }
    }
  }, 50);
}

function takeCoffee() {
  if (state!= "ready") {
    return;
  }
  state = "waiting";
  changeProgressPercent(0);
  cup.style.opacity = 0;
  cup.style.display = "";
  changeDisplayText("Выберите напиток");
  cup.onclick = null;
}

function changeProgressPercent(percent) {
  let progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = percent + "%";
}

function changeDisplayText(text) {
  if (text.length > 50) {
    text = text.slice(0, 23) + "...";
  }
  let displayText = document.querySelector(".display span");
  displayText.innerHTML = text;
}
 
// Drag-n-Drop

let money = document.querySelectorAll(".money img");

/*
for (let i = 0; i < money.length; i++) { // первый вариант функции
  money[i].onmousedown = takemoney;
}       */

for (let bill of money) {        // второй вариант функции
  bill.onmousedown = takemoney;
}

// в функцию, которая присвоена соботию, первым параметром передаётся объект события (event)

function takemoney() {
  event.preventDefault(); // прерывает объект события (event)
  let bill = this;
  let billCoords = bill.getBoundingClientRect(); // получение объекта, который описывает положение элемента на стр.
  let billHeight = billCoords.height;
  let billWidth = billCoords.width;
  bill.style.position = "absolute";
  if (!bill.style.transform) {
    bill.style.top = (event.clientY - billHeight/2) + "px";
    bill.style.left = (event.clientX - billWidth/2) + "px";
    bill.style.transform = "rotate(90deg)";
  } else {
    bill.style.top = (event.clientY - billWidth/2) + "px";
    bill.style.left = (event.clientX - billHeight/2) + "px";
  }
  bill.style.transition = "transform .3s";
  
  window.onmousemove = function(event) {
    let billCoords = bill.getBoundingClientRect();
    let billHeight = billCoords.height;
    let billWidth = billCoords.width;
    bill.style.top = (event.clientY - billWidth/2) + "px";
    bill.style.left = (event.clientX - billHeight/2) + "px";
  }
  
  bill.onmouseup = function() {
    window.onmousemove = null;
    if ( inAtm(bill) ) {
      balance.value = +balance.value + +bill.dataset.cost;  // приводим значения к числам и складываем
      bill.remove();    // удаляет HTML-элемент со страницы
    } 
  }
}  
/*console.log(this);
  console.log(event);
  console.log([event.target, event.clientX, event.clientY]); */

function inAtm(bill) {
  let atm = document.querySelector(".atm img");
  
  let atmCoords = atm.getBoundingClientRect();
  let atmLeftX = atmCoords.x;
  let atmRighX = atmCoords.x + atmCoords.width;
  let atmTopY = atmCoords.y;
  let atmBottomY = atmCoords.y + atmCoords.height/3;
  
  let billCoords = bill.getBoundingClientRect();
  let billLeftX = billCoords.x;
  let billRighX = billCoords.x + billCoords.width;
  let billY = billCoords.y;
  if(
        billLeftX > atmLeftX
    &&  billRighX < atmRighX
    &&  billY > atmTopY
    &&  billY < atmBottomY
    ) {
    return true;
  } else {
    return false;
  }
}
























































