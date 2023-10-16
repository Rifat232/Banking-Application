'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [ 200, 450, -400, 3000, -650, -130, 70, 1300 ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [ 5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [ 200, -200, 340, -300, -20, 50, 400, -460 ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [ 430, 1000, 700, 50, 90 ],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Mohiuddin Rifat',
  movements: [ 1000, 1300, -310, 442, 150, -270 ],
  interestRate: 1.3,
  pin: 5555,
};

const accounts = [ account1, account2, account3, account4, account5 ];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

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

///////////////////////////////////////////////

const displayMovements = function ( movement101 , sort = false)
{
  containerMovements.innerHTML = '';

  const movs = sort ? movement101.slice().sort( ( a, b ) => a - b)  : movement101;
  movs.forEach( function ( mov, i )
  {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html101 = `
        <div class="movements__row">
          <div class="movements__type movements__type--${ type }">${ i+1 } ${ type } </div>
          <div class="movements__value">${ mov }</div>
        </div>`;
    containerMovements.insertAdjacentHTML( 'afterbegin', html101 );
  } );
};

const calcDisplayBalance = function ( acc )
{
  acc.balance = acc.movements.reduce( ( acc, cur ) => acc + cur, 0 );
  labelBalance.textContent = `${ acc.balance } EUR`;
};

// calcDisplaySummary()

const calcDisplaySummary = function ( acc )
{
  const incomes = acc.movements.filter( mov => mov > 0 ).reduce( ( acc, mov ) => acc + mov, 0 );
  labelSumIn.textContent = `${ incomes }`;

  const out = acc.movements.filter( mov => mov < 0 ).reduce( ( acc, mov ) => acc + mov, 0 );
  labelSumOut.textContent = `${ out }`;

  const interest = acc.movements.filter( mov => mov > 0 ).map( mov => ( mov * acc.interestRate ) / 100 ).filter( mov => mov >= 1 ).reduce( ( acc, mov ) => acc + mov, 0 );
  labelSumInterest.textContent = `${ interest }`;

};

const createUserName = function ( accs )
{
  accs.forEach( function ( acc )
  {
    acc.UserName = acc.owner.toLowerCase().split( ' ' ).map( mov => mov[ 0 ] ).join( '' );
  } );
};
createUserName( accounts );

// event Listener

const updateUi = function ( acc )
{
    displayMovements( acc.movements );
    calcDisplayBalance( acc );
    calcDisplaySummary( acc);
}

let currentAccount;

btnLogin.addEventListener( 'click', function ( e )
{
  e.preventDefault();
  currentAccount = accounts.find( acc => acc.UserName === inputLoginUsername.value );
  console.log( currentAccount );

  if ( currentAccount?.pin === Number( inputLoginPin.value ) )
  {
    labelWelcome.textContent = ` Welcome Back.. !!.. Mr. ${ currentAccount.owner.split( ' ' )[ 0 ] }`;
    containerApp.style.opacity = 100;
    
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    updateUi( currentAccount );

  }
} );

// transfer Money from one user to another

btnTransfer.addEventListener( 'click', function ( e )
{
  e.preventDefault();

  const amount = Number( inputTransferAmount.value );
  const receiverAcc = accounts.find( acc => acc.UserName === inputTransferTo.value );
  console.log( amount, receiverAcc );

  inputTransferAmount.value = inputTransferTo.value = '';

  if ( amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.UserName !== currentAccount.UserName )
  {
    currentAccount.movements.push( -amount );
    receiverAcc.movements.push( amount );

    updateUi( currentAccount );
  
  }
} );

btnClose.addEventListener( 'click', function ( e )
{
  e.preventDefault();
  if ( inputCloseUsername.value === currentAccount.UserName && Number(inputClosePin.value) === currentAccount.pin )
  {
    const index = accounts.findIndex( acc => acc.UserName = currentAccount.UserName );
    // console.log( index );
    accounts.splice( index, 1 );
    containerApp.style.opacity = 0;
  };
 
  inputCloseUsername.value = inputClosePin.value = '';

} );

let sorted = false;
btnSort.addEventListener( 'click', function ( e )
{
  e.preventDefault();
  displayMovements( currentAccount.movements, !sorted );
  sorted = !sorted;
} );

const randX = Array.from( { length: 1000 }, ( _, i ) => Math.ceil(i * Math.random()) );
console.log( randX );



