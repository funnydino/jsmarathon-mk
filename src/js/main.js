/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
/* eslint max-len: ["error", { "code": 120 }] */

import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';

import '../style.css';

import '../index.html';

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.random-button');

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

const playerLose = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerText = `${name} wins!`;

  return $loseTitle;
};

const changeHP = (player) => {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  const damage = Math.ceil(Math.random() * 20);

  player.hp -= damage;
  $playerLife.style.width = `${player.hp}%`;

  console.log(`${player.name} получает ${damage} урона!`);

  if (player.hp < 0) {
    $playerLife.style.width = '0%';

    player === player1 ? $arenas.appendChild(playerLose(player2.name)) : $arenas.appendChild(playerLose(player1.name));

    $randomButton.disabled = true;
  }
};

$randomButton.addEventListener('click', () => {
  changeHP(player1);

  if (player1.hp > 0) {
    changeHP(player2);
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
