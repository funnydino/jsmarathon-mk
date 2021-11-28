/* eslint-disable */

const getRandom = (num) => Math.ceil(Math.random() * num);

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

export { getRandom, createElement };
