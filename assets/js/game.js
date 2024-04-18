//VARIABLES
let difficulty = '';
let lvl = 0;
let victoryPlayerArray = [];
let victoryEnemyArray = [];
let playerMoves = [];
let enemyMoves = [];

//GRIDS
const shipArea = document.querySelectorAll('.ship-area');
const enemyShipArea = document.querySelectorAll('.ship-enemy-area');
const playerAreaAttack = document.querySelectorAll('.player-attack');
const enemyAreaAttack = document.querySelectorAll('.enemy-attack');

//PLAYER SHIPS
const playerShips = document.querySelectorAll('.ship');

//ENEMY SHIPS
const enemySub = Array.from(document.querySelectorAll('#enemy_sub'));
const [enemyDestroyer1, enemyDestroyer2] = Array.from(
  document.querySelectorAll('.enemy-destroyer'),
);
const [enemyCruiser1, enemyCruiser2, enemyCruiser3] = Array.from(
  document.querySelectorAll('.enemy_cruiser'),
);
const [enemyWarship1, enemyWarship2, enemyWarship3, enemyWarship4] = Array.from(
  document.querySelectorAll('.enemy_warship'),
);
const [
  enemyAircraftCarrier1,
  enemyAircraftCarrier2,
  enemyAircraftCarrier3,
  enemyAircraftCarrier4,
  enemyAircraftCarrier5,
] = Array.from(document.querySelectorAll('.enemy_aircraft_carrier'));

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
    ship.addEventListener('dragstart', dragStart);
  });

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  }

  shipArea.forEach((area) => {
    area.addEventListener('dragenter', dragEnter);
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
  });

  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  function dragLeave(e) {
    e.target.classList.remove('drag-over');
  }

  function drop(e) {
    e.target.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
  }
}
//CREATED SHIP DRAG AND DROP - END

//Function to check if the position is empty!

function checkPositionIsEmpty(pos, arr) {
  if (!arr[pos].textContent.trim()) {
    return true;
  }
  return false;
}

function deployEnemyShips(difficulty) {
  if (difficulty === 'easy') {
    //Pick up level from the object.
    const arr = Object.values(Object.entries(levels)[0][1])[`${lvl}`];
    victoryPlayerArray = arr;
    //Function to created the ships in the table.
    arr.forEach((el, index) => {
      enemyShipsArray[index].style.opacity = '1';
      // enemyShipsArray[index].style.width = '10px';
      // enemyShipsArray[index].style.height = '10px';
      // enemyShipsArray[index].style.position = 'relative';
      enemyShipArea[el].append(enemyShipsArray[index]);
    });
  }
  if (difficulty === 'medium') {
    const arr = Object.values(Object.entries(levels)[1][1])[`${lvl}`];
    victoryPlayerArray = arr;
    arr.forEach((el, index) =>
      enemyShipArea[el].append(enemyShipsArray[index]),
    );
  }

  if (difficulty === 'hard') {
    const arr = Object.values(Object.entries(levels)[2][1])[`${lvl}`];
    victoryPlayerArray = arr;
    arr.forEach((el, index) =>
      enemyShipArea[el].append(enemyShipsArray[index]),
    );
  }
}

playerAreaAttack.forEach((el, index) =>
  el.addEventListener('click', () => {
    playerAttackEnemyShip(index);
    enemyAttackPlayerShip();
  }),
);

//Function mark "X" when it hits a target and mark "O" when it hits the water.
function playerAttackEnemyShip(position) {
  playerMoves.push(position);
  if (conditionVictory(playerMoves, victoryPlayerArray)) {
    alert('Player Wins');
  }
  playerAreaAttack[position].style.backgroundColor = 'tomato';
  // alert(`You attacked the position: ${position}.`);
  if (checkPositionIsEmpty(position, enemyShipArea)) {
    // enemyShipArea[position].style.backgroundColor = 'yellow';
    return enemyShipArea[position].append('O');
  }
  // enemyShipArea[position].style.backgroundColor = 'tomato';
  return enemyShipArea[position].append('X');
}

let clickEvent = new Event('click');

function enemyAttackPlayerShip() {
  let position = randomNumber();
  enemyMoves.push(position);
  if (conditionVictory(enemyMoves, victoryEnemyArray)) {
    alert('Enemy Wins');
  }
  enemyAreaAttack[position].style.backgroundColor = 'tomato';
  // alert(`Enemy attacked the position: ${position}.`);
  if (checkPositionIsEmpty(position, shipArea)) {
    return shipArea[position].append('O');
  }
  return shipArea[position].append('X');
}

function randomNumber() {
  return Math.floor(Math.random() * 100);
}

deployEnemyShips('medium');

//Victory function: verifies that all elements of the ships' array are included within the motion array.
function conditionVictory(arrMoves, arrCondition) {
  return arrCondition.every(function (element) {
    return arrMoves.includes(element);
  });
}
