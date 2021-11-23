/* eslint-disable */

function Player(playerAttr) {
  this.player = playerAttr.player;
  this.name = playerAttr.name;
  this.hp = playerAttr.hp;
  this.img = playerAttr.img;
  this.weapon = playerAttr.weapon;
  this.changeHP = function (num) {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  };
  this.elHP = function () {
    return document.querySelector(`.player${this.player} .life`);
  };
  this.renderHP = function () {
    this.elHP().style.width = `${this.hp}%`;
  };
  this.getDamage = function (damage) {
    this.changeHP(damage);
    this.renderHP();
  };
  this.attack = function () {
    console.log(`${this.name} fight...`);
  };
}

const player1 = new Player({
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fist', 'kick', 'grenade'],
});

const player2 = new Player({
  player: 2,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['hand', 'revolver', 'minigun'],
});

export { player1, player2 };
