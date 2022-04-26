"use strict";
const account1 = {
  owner: "Su",
  movements: {
    "salary deposited": 3000,
    "Lidl Spending": -100,
    "Dr Julia": -50,
    "Burger King": -123,
    "H&M": -550,
    "Kids income": 650,
    "Brasil Restaurant": -340,
    "Lidl Spending": -123,
    "Kaufland Spending": -223,
    "Turkish Restaurant": -120,
    "Brilant Computer": -770,
    "Kids income": 650,
    "Brasil Restaurant": -340,
    "Lidl Spending": -123,
    "Kaufland Spending": -223,
    "Turkish Restaurant": -120,
    "Brilant Computer": -770,
  },
  request: {},
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Ah",
  movements: {
    "salary deposited": 3500,
    "Lidl Spending": -200,
    "Money Transfer": -2500,
    "Real Market": -300,
    Amazon: -750,
    "Kids income": 650,
    "Turkish Kebap": -100,
    "Lidl Spending": -75,
    Amazon: -950,
    "E-Bay": -120,
    "Money income": 500,
  },
  request: {},
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Lace Hila",
  movements: {
    "salary deposited": 3000,
    "Lidl Spending": -250,
    "Albenian Restaurant": -150,
    "Burger King": -80,
    "H&M": -200,
    "Kids income": 900,
    "Money Transfer": -640,
    Amazon: -150,
    Amazon: -350,
    "Lidl Spending": -123,
  },
  request: {},
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Es",
  movements: {
    "Lidl Spending": -250,
    "Korean Restaurant": -500,
    "Burger King": -80,
    "E-Bay": -200,
    "Kids income": 900,
    "salary deposited": 3000,
    "Money Transfer": -300,
    Amazon: -150,
    Amazon: -350,
    "Lidl Spending": -123,
    DCI: -1000,
  },
  request: {},
  interestRate: 1,
  pin: 4444,
};

const customers = [account1, account2, account3, account4];

const userName = document.getElementById("userName");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const container = document.querySelector(".container");
const moneyMovements = document.querySelector(".money-movements");
const welcome = document.querySelector(".welcome-box");
const balancMoney = document.querySelector(".balance-money");
const transferTo = document.getElementById("transferTo");
const transferAmount = document.getElementById("transfer-amount");
const transferBtn = document.getElementById("transfer-btn");
const requestFrom = document.getElementById("requestFrom");
const requestAmount = document.getElementById("request-amount");
const requestBtn = document.getElementById("request-btn");

const overlay = document.querySelector(".overlay ");
const warningMessage = document.querySelector(".warning-message");
const confirmbtn = document.getElementById("confirmbtn");

let currentCustomer;
function createUserName(accs) {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((mov) => {
        return mov[0];
      })
      .join("");
  });
}
createUserName(customers);
console.log(customers);

function displayScreen(movs) {
  moneyMovements.innerHTML = "";
  for (let key in movs) {
    let type = movs[key] > 0 ? "deposit" : "withdraw";
    const html = ` <div class="money-box">
  <p class="movement-pm movement-${type}">${key}</p>
  <div class="money-amount-${type}">${movs[key]} </div>
</div>`;
    moneyMovements.insertAdjacentHTML("afterbegin", html);
  }
}

function findeCurrentCustomer() {
  return customers.find((costomer) => costomer.userName === userName.value);
}
function calcBalance(movs) {
  let total = 0;
  for (let key in movs) {
    total += movs[key];
  }
  return total;
}
/// Event

loginBtn.addEventListener("click", () => {
  currentCustomer = findeCurrentCustomer();
  console.log(currentCustomer);
  if (currentCustomer.pin === Number(password.value)) {
    container.classList.remove("hidden");

    if (Object.keys(currentCustomer.request).length > 0) {
      for (let k in currentCustomer.request) {
        let request = customers.find((customer) => customer.userName === k);
        let amount = currentCustomer.request[k];
        overlay.classList.remove("hidden");
        warningMessage.innerText = `${request.owner} requested from you ${amount}  if you confirm pleas click confirm button`;

        confirmbtn.addEventListener("click", () => {
          currentCustomer.movements[
            `You transferred ${amount} EuR to ${request.owner} `
          ] = -amount;
          request.movements[
            `You reciever  ${amount} ERO from ${currentCustomer.owner} `
          ] = amount;
          overlay.classList.add("hidden");
          displayScreen(currentCustomer.movements);
          let totalBalance = calcBalance(currentCustomer.movements);
        });
      }
    }
    displayScreen(currentCustomer.movements);
    welcome.innerText = `Welcome Back ${currentCustomer.owner}`;
    userName.value = password.value = "";
    let TotalBalance = calcBalance(currentCustomer.movements);
    balancMoney.innerHTML = TotalBalance;
  }
});

transferBtn.addEventListener("click", () => {
  let reciever = customers.find(
    (customer) => customer.userName === transferTo.value
  );
  console.log(reciever);
  let amount = Number(transferAmount.value);
  let totalBalance = calcBalance(currentCustomer.movements);

  if (
    amount > 0 &&
    amount < totalBalance &&
    currentCustomer.userName !== reciever.userName
  ) {
    currentCustomer.movements[
      `You transferred ${amount} EuR to ${reciever.owner} `
    ] = -amount;
    reciever.movements[
      `You reciever  ${amount} ERO from ${currentCustomer.owner} `
    ] = amount;
    displayScreen(currentCustomer.movements);
    totalBalance = calcBalance(currentCustomer.movements);
    balancMoney.innerText = totalBalance;
    transferTo.value = transferAmount.value = "";
  }
});

requestBtn.addEventListener("click", () => {
  const sender = customers.find(
    (customer) => customer.userName === requestFrom.value
  );
  console.log(sender);

  const amount = Number(requestAmount.value);
  sender.request[currentCustomer.userName] = amount;

  requestFrom.value = "";
  requestAmount.value = "";
});

console.log(customers);
moneyMovements.addEventListener("mouseover", () => {
  moneyMovements.classList.add("scroll_event");
});

moneyMovements.addEventListener("mouseleave", () => {
  moneyMovements.classList.remove("scroll_event");
});
