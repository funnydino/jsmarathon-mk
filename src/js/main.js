import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';

import '../style.css';

import '../index.html';

const $arenas = document.querySelector('.arenas');

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fist', 'kick', 'grenade'],
  attack() {
    console.log(`${this.name} fight...`);
  },
};

const player2 = {
  player: 2,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['hand', 'revolver', 'minigun'],
  attack() {
    console.log(`${this.name} fight...`);
  },
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

const createPlayer = (playerObj) => {
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
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

console.log('Fight');
