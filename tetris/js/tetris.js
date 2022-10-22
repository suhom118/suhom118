//Dom
const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//variables
let score = 0;
let duration = 500; //블럭이 떨어지는시간
let downInterval;
let tempMovingItem;
const BLOCKS = {
  tree: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [],
    [],
    [],
  ],
};
//블럭의 변수들
const movingItem = {
  type: "tree",
  direction: 0,
  top: 0,
  left: 0,
};

init();
//functions
function init() {
  tempMovingItem = { ...movingItem };

  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  renderBlocks();
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}
function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const moveBlock = document.querySelectorAll("moving");
  moveBlock.forEach((moving) => {});
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0] + left;
    const y = block[1] + top;

    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    target.classList.add(type, "moving");
  });
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks;
}
//event handling
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
    default:
      break;
  }
});
