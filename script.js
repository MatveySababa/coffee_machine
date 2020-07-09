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
 






























































