import '../../node_modules/focus-visible/dist/focus-visible';

import logs from './logs';

import '../scss/main.scss';

import '../style.css';

import '../index.html';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const $randomButton = document.querySelector('.fight-button');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

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

function getDamage(damage) {
  this.changeHP(damage);
  this.renderHP();
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
  getDamage,
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
  getDamage,
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
  $arenas.appendChild($reloadWrap);

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

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
  const attackPlayer = {};

  for (const item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attackPlayer.value = getRandom(HIT[item.value]);
      attackPlayer.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attackPlayer.defence = item.value;
    }

    item.checked = false;
  }

  return attackPlayer;
}

function generateLogs(type, playerOne, playerTwo, damage) {
  const currentTime = `[${new Date().toLocaleTimeString('ru-RU')}]`;
  let text = logs[type][getRandom(logs[type].length - 1)];
  switch (type) {
    case 'start':
      text = text
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);
      break;
    case 'end':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text
        .replace('[playerWins]', playerOne.name)
        .replace('[playerLose]', playerTwo.name)}`;
      break;
    case 'hit':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text
        .replace('[playerDefence]', playerTwo.name)
        .replace('[playerKick]', playerOne.name)}
        <span class="battle-log__damage">[-${damage}]</span>
        <span class="battle-log__player-hp">[${playerTwo.hp}/100]</span>`;
      break;
    case 'defence':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text
        .replace('[playerDefence]', playerTwo.name)
        .replace('[playerKick]', playerOne.name)}`;
      break;
    default:
      console.log('Не удалось распознать команду :(');
  }
  const el = `<p class="battle-log">${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
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
}

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.getDamage(enemy.value);
    generateLogs('hit', player2, player1, enemy.value);
  } else if (player.defence === enemy.hit) {
    generateLogs('defence', player2, player1);
  }

  if (enemy.defence !== player.hit) {
    player2.getDamage(player.value);
    generateLogs('hit', player1, player2, player.value);
  } else if (enemy.defence === player.hit) {
    generateLogs('defence', player1, player2);
  }

  showResult();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1.name, player2.name);
