/* eslint-disable */

const logs = {
  start: [`Часы показывали <span class="battle-log__time">${new Date().toLocaleTimeString('ru-RU')}</span>, когда <span class="battle-log__name">[player1]</span> и <span class="battle-log__name">[player2]</span> бросили вызов друг другу.`,
],
  end: [
    'Результат удара <span class="battle-log__player-wins">[playerWins]</span>: <span class="battle-log__player-lose">[playerLose]</span> - труп',
    '<span class="battle-log__player-lose">[playerLose]</span> погиб от удара бойца <span class="battle-log__player-wins">[playerWins]</span>',
    'Результат боя: <span class="battle-log__player-lose">[playerLose]</span> - жертва, <span class="battle-log__player-wins">[playerWins]</span> - убийца',
  ],
  hit: [
    '<span class="battle-log__name-defence">[playerDefence]</span> пытался сконцентрироваться, но <span class="battle-log__name-kick">[playerKick]</span> разбежавшись раздробил копчиком левое ухо врага.',
    '<span class="battle-log__name-defence">[playerDefence]</span> расстроился, как вдруг, неожиданно <span class="battle-log__name-kick">[playerKick]</span> случайно раздробил грудью грудину противника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> зажмурился, а в это время <span class="battle-log__name-kick">[playerKick]</span>, прослезившись, раздробил кулаком пах оппонента.',
    '<span class="battle-log__name-defence">[playerDefence]</span> чесал <вырезано цензурой>, и внезапно неустрашимый <span class="battle-log__name-kick">[playerKick]</span> отчаянно размозжил грудью левый бицепс оппонента.',
    '<span class="battle-log__name-defence">[playerDefence]</span> задумался, но внезапно <span class="battle-log__name-kick">[playerKick]</span> случайно влепил грубый удар копчиком в пояс оппонента.',
    '<span class="battle-log__name-defence">[playerDefence]</span> ковырялся в зубах, но <span class="battle-log__name-kick">[playerKick]</span> проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '<span class="battle-log__name-defence">[playerDefence]</span> вспомнил что-то важное, но внезапно <span class="battle-log__name-kick">[playerKick]</span> зевнув, размозжил открытой ладонью челюсть противника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> осмотрелся, и в это время <span class="battle-log__name-kick">[playerKick]</span> мимоходом раздробил стопой аппендикс соперника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> кашлянул, но внезапно <span class="battle-log__name-kick">[playerKick]</span> показав палец, размозжил пальцем грудь соперника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> пытался что-то сказать, а жестокий <span class="battle-log__name-kick">[playerKick]</span> проснувшись размозжил копчиком левую ногу противника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> забылся, как внезапно безумный <span class="battle-log__name-kick">[playerKick]</span> со скуки, влепил удар коленом в левый бок соперника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> поперхнулся, а за это <span class="battle-log__name-kick">[playerKick]</span> мимоходом раздробил коленом висок врага.',
    '<span class="battle-log__name-defence">[playerDefence]</span> расстроился, а в это время наглый <span class="battle-log__name-kick">[playerKick]</span> пошатнувшись размозжил копчиком губы оппонента.',
    '<span class="battle-log__name-defence">[playerDefence]</span> осмотрелся, но внезапно <span class="battle-log__name-kick">[playerKick]</span> робко размозжил коленом левый глаз противника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> осмотрелся, а <span class="battle-log__name-kick">[playerKick]</span> вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '<span class="battle-log__name-defence">[playerDefence]</span> ковырялся в зубах, как вдруг, неожиданно <span class="battle-log__name-kick">[playerKick]</span> отчаянно размозжил плечом мышцы пресса оппонента.',
    '<span class="battle-log__name-defence">[playerDefence]</span> пришел в себя, и в это время <span class="battle-log__name-kick">[playerKick]</span> провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '<span class="battle-log__name-defence">[playerDefence]</span> пошатнулся, а в это время <span class="battle-log__name-kick">[playerKick]</span> хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '<span class="battle-log__name-kick">[playerKick]</span> потерял момент и храбрый <span class="battle-log__name-defence">[playerDefence]</span> отпрыгнул от удара открытой ладонью в ключицу.',
    '<span class="battle-log__name-kick">[playerKick]</span> не контролировал ситуацию, и потому <span class="battle-log__name-defence">[playerDefence]</span> поставил блок на удар пяткой в правую грудь.',
    '<span class="battle-log__name-kick">[playerKick]</span> потерял момент и <span class="battle-log__name-defence">[playerDefence]</span> поставил блок на удар коленом по селезенке.',
    '<span class="battle-log__name-kick">[playerKick]</span> поскользнулся и задумчивый <span class="battle-log__name-defence">[playerDefence]</span> поставил блок на тычок головой в бровь.',
    '<span class="battle-log__name-kick">[playerKick]</span> старался провести удар, но непобедимый <span class="battle-log__name-defence">[playerDefence]</span> ушел в сторону от удара копчиком прямо в пятку.',
    '<span class="battle-log__name-kick">[playerKick]</span> обманулся и жестокий <span class="battle-log__name-defence">[playerDefence]</span> блокировал удар стопой в солнечное сплетение.',
    '<span class="battle-log__name-kick">[playerKick]</span> не думал о бое, потому расстроенный <span class="battle-log__name-defence">[playerDefence]</span> отпрыгнул от удара кулаком куда обычно не бьют.',
    '<span class="battle-log__name-kick">[playerKick]</span> обманулся и жестокий <span class="battle-log__name-defence">[playerDefence]</span> блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

export default logs;
