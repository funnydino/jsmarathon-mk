const ATTACK = ['head', 'body', 'foot'];

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const getRandom = (num) => Math.ceil(Math.random() * num);

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const playerAttack = () => {
  const $formFight = document.querySelector('.control');
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
};

export { getRandom, enemyAttack, playerAttack };
