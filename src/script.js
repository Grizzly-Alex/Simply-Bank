'use strict';

// Test Data

const account1 = {
    userName: 'Cecil Ireland',
    transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
    interest: 1.5,
    pin: 1111,
    transactionsDates: [
      '2020-10-02T14:43:31.074Z',
      '2020-10-29T11:24:19.761Z',
      '2020-11-15T10:45:23.907Z',
      '2021-01-22T12:17:46.255Z',
      '2021-02-12T15:14:06.486Z',
      '2021-03-09T11:42:26.371Z',
      '2021-10-09T07:43:59.331Z',
      '2021-10-11T15:21:20.814Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  const account2 = {
    userName: 'Amani Salt',
    transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
    interest: 1.3,
    pin: 2222,
    transactionsDates: [
      '2020-10-02T14:43:31.074Z',
      '2020-10-29T11:24:19.761Z',
      '2020-11-15T10:45:23.907Z',
      '2021-01-22T12:17:46.255Z',
      '2021-02-12T15:14:06.486Z',
      '2021-03-09T11:42:26.371Z',
      '2021-05-21T07:43:59.331Z',
      '2021-06-22T15:21:20.814Z',
    ],
    currency: 'UAH',
    locale: 'uk-UA',
  };
  
  const account3 = {
    userName: 'Corey Martinez',
    transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
    interest: 0.8,
    pin: 3333,
    transactionsDates: [
      '2020-10-02T14:43:31.074Z',
      '2020-10-29T11:24:19.761Z',
      '2020-11-15T10:45:23.907Z',
      '2021-01-22T12:17:46.255Z',
      '2021-02-12T15:14:06.486Z',
      '2021-03-09T11:42:26.371Z',
      '2021-05-21T07:43:59.331Z',
      '2021-06-22T15:21:20.814Z',
    ],
    currency: 'RUB',
    locale: 'ru-RU',
  };
  
  const account4 = {
    userName: 'Kamile Searle',
    transactions: [530, 1300, 500, 40, 190],
    interest: 1,
    pin: 4444,
    transactionsDates: [
      '2020-10-02T14:43:31.074Z',
      '2020-10-29T11:24:19.761Z',
      '2020-11-15T10:45:23.907Z',
      '2021-01-22T12:17:46.255Z',
      '2021-02-12T15:14:06.486Z',
    ],
    currency: 'EUR',
    locale: 'fr-CA',
  };
  
  const account5 = {
    userName: 'Oliver Avila',
    transactions: [630, 800, 300, 50, 120],
    interest: 1.1,
    pin: 5555,
    transactionsDates: [
      '2020-10-02T14:43:31.074Z',
      '2020-10-29T11:24:19.761Z',
      '2020-11-15T10:45:23.907Z',
      '2021-01-22T12:17:46.255Z',
      '2021-02-12T15:14:06.486Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  const accounts = [account1, account2, account3, account4, account5];


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