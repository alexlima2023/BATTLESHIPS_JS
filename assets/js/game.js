//VARIABLES 
let difficulty = "";
let lvl = 0;

//GRIDS
const shipArea = document.querySelectorAll(".ship-area");
const enemyShipArea = document.querySelectorAll(".ship-enemy-area");

//PLAYER SHIPS
const playerShips = document.querySelectorAll(".ship");

//ENEMY SHIPS
const enemySub = Array.from(document.querySelectorAll("#enemy_sub"));
const [enemyDestroyer1, enemyDestroyer2] = Array.from(
  document.querySelectorAll(".enemy-destroyer")
);
const [enemyCruiser1, enemyCruiser2, enemyCruiser3] = Array.from(
  document.querySelectorAll(".enemy_cruiser")
);
const [enemyWarship1, enemyWarship2, enemyWarship3, enemyWarship4] = Array.from(
  document.querySelectorAll(".enemy_warship")
);
const [
  enemyAircraftCarrier1,
  enemyAircraftCarrier2,
  enemyAircraftCarrier3,
  enemyAircraftCarrier4,
  enemyAircraftCarrier5,
] = Array.from(document.querySelectorAll(".enemy_aircraft_carrier"));

const enemyShipsArray = [
  ...enemySub,
  enemyDestroyer1,
  enemyDestroyer2,
  enemyCruiser1,
  enemyCruiser2,
  enemyCruiser3,
  enemyWarship1,
  enemyWarship2,
  enemyWarship3,
  enemyWarship4,
  enemyAircraftCarrier1,
  enemyAircraftCarrier2,
  enemyAircraftCarrier3,
  enemyAircraftCarrier4,
  enemyAircraftCarrier5,
];

const levels = {
  easy: {
    _01: [0, 15, 25, 41, 51, 61, 57, 67, 77, 87, 9, 19, 29, 39, 49],
    _02: [17, 78, 88, 10, 20, 30, 2, 12, 22, 32, 50, 60, 70, 80, 90],
    _03: [99, 76, 86, 11, 21, 31, 5, 15, 25, 35, 44, 54, 64, 74, 84],
    _04: [3, 32, 33, 91, 92, 93, 6, 7, 8, 9, 50, 51, 52, 53, 54],
    _05: [76, 48, 49, 20, 21, 22, 14, 15, 16, 17, 80, 81, 82, 83, 84],
    _06: [99, 1, 2, 66, 67, 68, 6, 7, 8, 9, 90, 91, 92, 93, 94],
  },
  medium: {
    _01: [11, 23, 33, 50, 60, 70, 16, 17, 18, 19, 83, 84, 85, 86, 87],
    _02: [55, 0, 1, 77, 87, 97, 41, 51, 61, 71, 28, 38, 48, 58, 68],
    _03: [19, 85, 86, 11, 12, 13, 32, 42, 52, 62, 6, 16, 26, 36, 46],
    _04: [],
    _05: [],
  },
  hard: {
    _01: [],
    _02: [],
    _03: [],
    _04: [],
    _05: [],
  },
};

//CREATED SHIP DRAG AND DROP - START
{
  playerShips.forEach((ship) => {
    ship.addEventListener("dragstart", dragStart);
  });

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  }

  shipArea.forEach((area) => {
    area.addEventListener("dragenter", dragEnter);
    area.addEventListener("dragover", dragOver);
    area.addEventListener("dragleave", dragLeave);
    area.addEventListener("drop", drop);
  });

  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }

  function dragOver(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }

  function dragLeave(e) {
    e.target.classList.remove("drag-over");
  }

  function drop(e) {
    e.target.classList.remove("drag-over");
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove("hide");
  }
}
//CREATED SHIP DRAG AND DROP - END

//Function to check if the position is empty!

function checkPositionIsEmpty(pos) {
  if (!enemyShipArea[pos].textContent.trim()) {
    return true;
  }
}

//Function to generate a random number into 0 - 99.
function randomCellPosition() {
  return Math.floor(Math.random() * 100);
}

function deployEnemyShips(difficulty) {
  if (difficulty === "easy") {
    let lvl = 0;
    //Function to get Levels.
    // const arr = Object.values(Object.entries(levels)[0][1])[0];
    //Function to created the ships in the table.
    // arr.forEach((el, index) => enemyShipArea[el].append(enemyShipsArray[index]));
  }
  if (difficulty === "medium") {
    Object.entries(levels)[1]
  }

  if (difficulty === "hard") {
    Object.entries(levels)[2]
  }
}

deployEnemyShips("easy");