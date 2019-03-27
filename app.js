

var scores, roundScore, activePlayer, diceDOM, gamePlaying;
diceDOM = document.querySelector('.dice');


init();

function currentDOM () {
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function swapActive () {
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function resetCurrent () {
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
}

function nextPlayer () {
  roundScore = 0;
  swapActive();
  resetCurrent();
  diceDOM.style.display = 'none';
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function init () {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'player-1';
  document.getElementById('name-1').textContent = 'player-2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.dice').style.display = 'none';

                             /////// BUTTONS ////////
// Roll button.

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    if (dice !== 1) {
      roundScore = roundScore + dice;
      currentDOM();
    } else {
      nextPlayer();
    }
  }
});

// Hold button

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
      diceDOM.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// New button

document.querySelector('.btn-new').addEventListener('click', init);
