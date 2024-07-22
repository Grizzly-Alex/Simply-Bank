'use strict';

// Test Data

const account1 = {
    userName: 'Dave Mustaine',
    interest: 1.5,
    pin: 1111,
    transactions: [
      {cash: 500, date: '2020-10-02T14:43:31.074Z'},
      {cash: 250, date: '2020-10-29T11:24:19.761Z'}, 
      {cash: -300, date: '2020-11-15T10:45:23.907Z'},
      {cash: 5000, date: '2021-01-22T12:17:46.255Z'},
      {cash: -850, date: '2021-02-12T15:14:06.486Z'},
      {cash: -110, date: '2021-03-09T11:42:26.371Z'},
      {cash: -170, date: '2021-10-09T07:43:59.331Z'},
      {cash: 1100, date: '2021-10-11T15:21:20.814Z'},
      ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  const account2 = {
    userName: 'Andrzej Sapkowski',
    interest: 0.8,
    pin: 2222,
    transactions: [
      {cash: 900, date: '2020-10-02T14:43:31.074Z'},
      {cash: -200, date: '2020-10-29T11:24:19.761Z'}, 
      {cash: 280, date: '2020-11-15T10:45:23.907Z'},
      {cash: 300, date: '2021-01-22T12:17:46.255Z'},
      {cash: -200, date: '2021-02-12T15:14:06.486Z'},
      {cash: 150, date: '2021-03-09T11:42:26.371Z'},
      {cash: 1400, date: '2021-10-09T07:43:59.331Z'},
      {cash: -400, date: '2021-10-11T15:21:20.814Z'},
      ],
    currency: 'PLN',
    locale: 'pl-PL',
  };

  const account3 = {
    userName: 'Till Lindemann',
    interest: 0.6,
    pin: 3333,
    transactions: [
      {cash: 900, date: '2020-10-02T14:43:31.074Z'},
      {cash: -200, date: '2020-10-29T11:24:19.761Z'}, 
      {cash: 280, date: '2020-11-15T10:45:23.907Z'},
      {cash: 300, date: '2021-01-22T12:17:46.255Z'},
      {cash: -200, date: '2021-02-12T15:14:06.486Z'},
      {cash: 150, date: '2021-03-09T11:42:26.371Z'},
      {cash: 1400, date: '2021-10-09T07:43:59.331Z'},
      {cash: -400, date: '2021-10-11T15:21:20.814Z'},
      ],
    currency: 'EUR',
    locale: 'de-DE',
  };
  
const accounts = [account1, account2, account3];


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const transactionsRow = document.querySelectorAll('.transactions__row');

//Functions
const createNicknames = function(accounts) {
    accounts.forEach(value => {
      value.nickName = value.userName
        .toLowerCase()
        .split(' ')
        .map(value => value[0])
        .join('');
    });
};

const showUserInterface = function(loggedUser){
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome ${loggedUser.userName.split(' ')[0]}!`;
    labelDate.textContent = Intl.DateTimeFormat(
        loggedUser.locale, 
        {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
        },).format(new Date());

    //clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
};

const formatCurrency = function(value, locale, currency){
    return new Intl.NumberFormat(
        locale, {
            style: 'currency',
            currency: currency,
        }).format(value);
};

const formatTransactionDate = function(date, local) {
    const getDaysPassed = () => 
      Math.round(Math.abs((Date.now() - date) / (1000 * 60 * 60 * 24)));

    const daysPassed = getDaysPassed();

    let result;
    switch(daysPassed){
        case 0: result = 'today'; break;
        case 1: result = 'yesterday'; break;
        case daysPassed <= 7: result = `${daysPassed} days ago`; break;
        default: result = new Intl.DateTimeFormat(local).format(date);
    }
    return result;
};

const displayBalance = function(account) {
  const balance = account.transactions.reduce((acc, value) => acc += value.cash, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(account.balance, account.locale, account.currency);
};

const displayTotal = function(account) {
  const dipositeTotal = account.transactions
    .filter(value => value.cash > 0)
    .reduce((acc, value) => acc + value.cash, 0);

    labelSumIn.textContent = formatCurrency(dipositeTotal, account.locale, account.currency);

    const withdrawalsTotal = account.transactions
    .filter(value => value.cash < 0)
    .reduce((acc, value) => acc + value.cash, 0);

    labelSumOut.textContent = formatCurrency(withdrawalsTotal, account.locale, account.currency);

    const interestTotal = account.transactions
      .filter(value => value.cash > 0)
      .map(value => (value.cash * account.interest) / 100)
      .filter((cash => cash >= 5))
      .reduce((acc, value) => acc + value, 0);

    labelSumInterest.textContent = formatCurrency(interestTotal, account.locale, account.currency);
};

const displayTransactions = function (account){
  containerTransactions.innerHTML = '';

  account.transactions.forEach((value, index) => {
      const transType =  value.cash > 0 ? 'deposit' : 'withdrawal';
      const formattedCurrency = formatCurrency(value.cash, account.locale,account.currency);
      const transDate = formatTransactionDate(new Date(value.date), account.local);
      
      const transactionRow = `
          <div class="transactions__row">
              <div class="transactions__type transactions__type--${transType}">
                  ${index + 1} ${transType}
              </div>
              <div class="transactions__date">${transDate}</div>
              <div class="transactions__value">${formattedCurrency}</div>
          </div>
          ` 
      containerTransactions.insertAdjacentHTML('afterbegin', transactionRow); 

      //grey or white rows
      [...document.querySelectorAll('.transactions__row')].forEach((row, index) => {
          if(index % 2 === 0){
              row.style.backgroundColor = 'gainsboro';
          }
      })
  });
};

const updateUi = function(account){
    displayTransactions(account);
    displayBalance(account);
    displayTotal(account);
};

const sortTransactions = function(transactions, sort = false){
  const sortingTransact = sort 
    ? transactions.slice().sort((first, second) => first.cash - second.cash)
    : transactions.slice().sort((first, second) => second.cash - first.cash)
  return sortingTransact;
};

const cashTransfer = function(currentAccount, recipientAccount, transferAmount){
  currentAccount.transactions.push({cash: -transferAmount, date: new Date()});
  recipientAccount.transactions.push({cash: -transferAmount, date: new Date()}); 
};


//Calling Functions
createNicknames(accounts);


//Globals Variables
let currentAccount;
let sortState = false;

//Control
btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    currentAccount = accounts.find(value => value.nickName === inputLoginUsername.value);

    if (currentAccount?.pin === Number(inputLoginPin.value)){
        showUserInterface(currentAccount);
    }

    updateUi(currentAccount);
});


btnSort.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount.transactions = sortTransactions(currentAccount.transactions, !sortState);
  displayTransactions(currentAccount);
  
  sortState = !sortState;
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  //data from form
  const transferAmount = Number(inputTransferAmount.value);
  const recipientNickName = inputTransferTo.value;
  //clear form
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  //checking
  let success; 

  const recipientAccount = accounts.map(value => value.nickName).includes(recipientNickName);
  console.log(recipientAccount);



  cashTransfer(currentAccount, recipientAccount, transferAmount);

  updateUi(currentAccount);
  
});
