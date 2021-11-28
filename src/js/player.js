/* eslint-disable */

import { createElement } from './utils';

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }

  changeHP(num) {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

  renderHP() {
    this.elHP().style.width = `${this.hp}%`;
  }

  getDamage(damage) {
    this.changeHP(damage);
    this.renderHP();
  }

  createPlayer() {
    const $player = createElement('div', `player${this.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character-main');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $name.innerText = this.name;
    $life.style.width = `${this.hp}%`;
    $img.setAttribute('src', this.img);

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
  }

  attack() {
    console.log(`${this.name} fight...`);
  }
}

export default Player;
