'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


const init = function(){
// Starting conditions
 scores = [0, 0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent=0;
current1El.textContent = 0;
diceEl.classList.add('hidden');
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.remove('player--active');
player1El.classList.remove('player--active');

player0El.classList.add('player--active');

};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle metodu, sınıf varsa kaldırmak yoksa o sınıfı eklemek için kullanılır.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if(playing){
  // Zar atıldığında rastgele bir sayı
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Gösterilen zar
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`; 

  // Zar 1 değilse
  if (dice !== 1) {
    // Bir sonraki adımda ne olacak
    currentScore = currentScore + dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // 1 geldiğinde yapılacak işlemler
    switchPlayer();
  }
}
});

btnHold.addEventListener('click', function () {
  if(playing){
  // mevcut aktif oyuncunun skoru
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // kontrol: skor >= 100, durum sağlanırsa oyunu bitir
  if (scores[activePlayer] >= 100) {
    playing= false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  } else {
    // sağlanmazsa diğer oyuncuya geç
    switchPlayer();
  }
}
});

btnNew.addEventListener('click',init);
