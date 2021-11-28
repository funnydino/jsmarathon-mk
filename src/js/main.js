/* eslint-disable */

import '../../node_modules/focus-visible/dist/focus-visible';

import { getRandom, createElement } from './utils';

import Player from './player';

import LOGS from './constants';

import '../scss/main.scss';

import '../style.css';

import '../index.html';

import '../arenas.html';

import '../js/menu.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

let player1;
let player2;

class Game {
  async getRandomPlayer() {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose', {
      method: 'GET',
    }).then((res) => res.json());

    return body;
  }

  async start() {
    // const p1 = JSON.parse(localStorage.getItem('player1'));
    const p1 = await this.getRandomPlayer();
    const p2 = await this.getRandomPlayer();

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });

    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });

    $arenas.appendChild(player1.createPlayer());
    $arenas.appendChild(player2.createPlayer());

    generateLogs('start', player1.name, player2.name);
  }
}

const playerAttack = () => {
  const $formFight = document.querySelector('.control');
  const attackPlayer = {};

  for (const item of $formFight) {
    const { checked, name, value } = item;
    if (checked && name === 'hit') {
      attackPlayer.hit = value;
    }

    if (checked && name === 'defence') {
      attackPlayer.defence = value;
    }

    item.checked = false;
  }

  return attackPlayer;
};

const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.innerText = 'Menu';

  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);

  $reloadButton.addEventListener('click', () => {
    setTimeout(() => {
      window.location.pathname = './index.html';
    }, 1000);
  });

  return $reloadWrap;
};

const showFightResult = (name) => {
  const $resultTitle = createElement('div', 'resultTitle');
  if (name) {
    $resultTitle.innerText = `${name} wins!`;
  } else {
    $resultTitle.innerText = 'draw';
  }

  return $resultTitle;
};

const showResult = () => {
  const $fightButton = document.querySelector('.fight-button');

  if (player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showFightResult(player2.name));
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showFightResult(player1.name));
    generateLogs('end', player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showFightResult());
    generateLogs('draw');
  }
};

const generateLogs = (type, { name } = {}, { name: playerTwoName, hp } = {}, damage) => {
  const currentTime = `[${new Date().toLocaleTimeString('ru-RU')}]`;
  let text = LOGS[type][getRandom(LOGS[type].length - 1)];
  switch (type) {
    case 'start':
      text = text.replace('[player1]', player1.name).replace('[player2]', player2.name);
      break;
    case 'end':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text
        .replace('[playerWins]', name)
        .replace('[playerLose]', playerTwoName)}`;
      break;
    case 'hit':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text
        .replace('[playerDefence]', playerTwoName)
        .replace('[playerKick]', name)}
        <span class="battle-log__damage">[-${damage}]</span>
        <span class="battle-log__player-hp">[${hp}/100]</span>`;
      break;
    case 'defence':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text
        .replace('[playerDefence]', playerTwoName)
        .replace('[playerKick]', name)}`;
      break;
    case 'draw':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text}`;
      break;
    default:
      console.log('Не удалось распознать команду :(');
  }
  const el = `<p class="battle-log">${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
};

const getFight = async (hit, defence) => {
  const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify({
      hit,
      defence,
    }),
  }).then((res) => res.json());

  return body;
};

$formFight.addEventListener('submit', async (e) => {
  e.preventDefault();

  const { hit, defence } = playerAttack();
  const { player1: player, player2: enemy } = await getFight(hit, defence);

  const { hit: playerHit, defence: playerDefence, value: playerValue } = player;
  const { hit: enemyHit, defence: enemyDefence, value: enemyValue } = enemy;

  if (playerDefence !== enemyHit) {
    player1.getDamage(enemyValue);
    generateLogs('hit', player2, player1, enemyValue);
  } else if (playerDefence === enemyHit) {
    generateLogs('defence', player2, player1);
  }

  if (enemyDefence !== playerHit) {
    player2.getDamage(playerValue);
    generateLogs('hit', player1, player2, playerValue);
  } else if (enemyDefence === playerHit) {
    generateLogs('defence', player1, player2);
  }

  showResult();
});

const game = new Game();
game.start();
