const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;
const HORIZONTAL_CELL_AMOUNT = 10;
const VERTICAL_CELL_AMOUNT = 10;
const OVERALL_LENGTH = HORIZONTAL_CELL_AMOUNT * VERTICAL_CELL_AMOUNT;

const ctx = game.getContext("2d");

const cells = [...Array(HORIZONTAL_CELL_AMOUNT).keys()].flatMap((x) =>
  [...Array(VERTICAL_CELL_AMOUNT).keys()].map((y) => [
    x,
    y,
    Math.random() < 0.5,
  ])
);

var cellsA = [...Array(OVERALL_LENGTH)].map((x) => Math.random() < 0.5);

const drawRectangle = (x, y, isAlive) => {
  isAlive
    ? ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_WIDTH)
    : ctx.rect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_WIDTH);
};

const drawRectangleA = (i, isAlive) => {
  const { x, y } = getPosition(i);
  ctx.fillStyle = isAlive ? '#000000' : '#ffffff';
  ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_WIDTH);
  
    // : ctx.rect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_WIDTH);
};

const getPosition = (index) => {
  return {
    x: Math.floor(index / HORIZONTAL_CELL_AMOUNT),
    y: index % VERTICAL_CELL_AMOUNT,
  };
};

const shouldBeAlive = (i, isAlive) => {
  const aliveNeighbours = [
    i + 1,
    i + HORIZONTAL_CELL_AMOUNT - 1,
    i + HORIZONTAL_CELL_AMOUNT,
    i + HORIZONTAL_CELL_AMOUNT + 1,
    i + OVERALL_LENGTH - 1,
    i + OVERALL_LENGTH - HORIZONTAL_CELL_AMOUNT - 1,
    i + OVERALL_LENGTH - HORIZONTAL_CELL_AMOUNT,
    i + OVERALL_LENGTH - HORIZONTAL_CELL_AMOUNT + 1,
  ].reduce((acc, j) => (acc += cellsA[j % OVERALL_LENGTH]), 0);
  return aliveNeighbours === 3 || (isAlive && aliveNeighbours === 2);
};

cellsA.forEach((x, i) => {
  drawRectangleA(i, x);
});

  setInterval(() => {
    cellsA = cellsA.map((v, i) => shouldBeAlive(i, v));
    cellsA.forEach((x, i) => drawRectangleA(i, x));
    ctx.stroke();
  }, 1000);

// cells.forEach(([x, y, isAlive]) => {
//   drawRectangle(x, y, isAlive);
// });
