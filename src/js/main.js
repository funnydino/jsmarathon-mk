import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';

import '../style.css';

import '../index.html';

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.random-button');

function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

function attack() {
  console.log(`${this.name} fight...`);
}

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fist', 'kick', 'grenade'],
  changeHP,
  elHP,
  renderHP,
  attack,
};

const player2 = {
  player: 2,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['hand', 'revolver', 'minigun'],
  changeHP,
  elHP,
  renderHP,
  attack,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement('div', `player${playerObj.player}`);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $name.innerText = playerObj.name;
  $life.style.width = `${playerObj.hp}%`;
  $img.setAttribute('src', playerObj.img);

  $progressbar.appendChild($name);
  $progressbar.appendChild($life);

  $character.appendChild($img);

  $player.appendChild($progressbar);
  $player.appendChild($character);

  return $player;
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.innerText = 'Restart';

  $reloadWrap.appendChild($reloadButton);

  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });

  return $reloadWrap;
}

function showFightResult(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  if (name) {
    $loseTitle.innerText = `${name} wins!`;
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

$randomButton.addEventListener('click', () => {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    $arenas.appendChild(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showFightResult(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showFightResult(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showFightResult());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
