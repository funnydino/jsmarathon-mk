import '../../node_modules/focus-visible/dist/focus-visible';

import logs from './logs';

import { player1, player2 } from './player';

import { getRandom, enemyAttack, playerAttack } from './attack';

import '../scss/main.scss';

import '../style.css';

import '../index.html';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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

const generateLogs = (type, playerOne, playerTwo, damage) => {
  const currentTime = `[${new Date().toLocaleTimeString('ru-RU')}]`;
  let text = logs[type][getRandom(logs[type].length - 1)];
  switch (type) {
    case 'start':
      text = text.replace('[player1]', player1.name).replace('[player2]', player2.name);
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
    case 'draw':
      text = `<span class="battle-log__time">${currentTime}</span>. ${text}`;
      break;
    default:
      console.log('Не удалось распознать команду :(');
  }
  const el = `<p class="battle-log">${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
};

const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.innerText = 'Restart';

  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);

  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });

  return $reloadWrap;
};

const showFightResult = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  if (name) {
    $loseTitle.innerText = `${name} wins!`;
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
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
