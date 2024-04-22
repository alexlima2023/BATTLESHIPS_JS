//GLOBAL VARIABLES

let difficulty = 'easy';
let lvl = 0;
let victoryPlayerArray = [];
let victoryEnemyArray = [];
let playerMoves = [];
let enemyMoves = [];
let playerShipsArray = [];
let playerMissedShots = 0;
let playerTargetShots = 0;
let enemyMissedShots = 0;
let enemyTargetShots = 0;

//GRIDS and HTML ELEMENTS

const shipArea = document.querySelectorAll('.ship-area');
const playerAreaAttack = document.querySelectorAll('.player-attack');
const playerPortArea = document.querySelectorAll('.port-area');
const sectionPlayerPortArea = document.querySelector('#player_port_of_war');
const playerMapBattle = document.querySelectorAll('.map-battle');
const enemyShipArea = document.querySelectorAll('.ship-enemy-area');
const enemyAreaAttack = document.querySelectorAll('.enemy-attack');
const sectionEnemyPortArea = document.querySelector('#enemy-port-of-war');
const battleArena = document.querySelector('#battle-area');
const playerShotsScreen = document.querySelector('#player-shots');
const playerTargetShotsScreen = document.querySelector('#player-target-shots');
const enemyShotsScreen = document.querySelector('#enemy-shots');
const enemyTargetShotsScreen = document.querySelector('#enemy-target-shots');

//BUTTONS

const buttonPlay = document.querySelector('#play');
const buttonRules = document.querySelector('#rules');
const sectionDifficulty = document.querySelectorAll('#difficulty');

//PLAYER SHIPS
const playerShips = Array.from(document.querySelectorAll('.ship'));

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

// SOUNDS

let dragAndDropSound = new Audio();
let explosionSound = new Audio();
let pewPewSound = new Audio();
dragAndDropSound.src = 'assets/sounds/mine.mp3';
explosionSound.src = 'assets/sounds/explosion.mp3';
pewPewSound.src = 'assets/sounds/pew-pew.mp3';

// GAME

buttonPlay.addEventListener('click', startGame);
buttonRules.addEventListener('click', () =>
  alert(
    `Objective: The objective of Battleship is to sink all of your opponent's ships before they sink yours.
    1. Setup: Each player has a game board with two grids: one for placing their own ships and one for recording their 
    opponent's shots. Players must place their ships on the grid without the opponent seeing where they are located.
    2. Ships: Each player has a fleet of ships, typically consisting of the following:
    Aircraft Carrier (5 squares)
    Battleship (4 squares)
    Cruiser (3 squares)
    Destroyer (2 squares)
    Submarine (1 squares)
    3. Taking Turns: Players take turns calling out coordinates to attempt to "hit" their opponent's ships. Coordinates 
    are specified by a letter (indicating the row) and a number (indicating the column).
    4. Hit or Miss: If a player calls out a coordinate that contains a part of an opponent's ship, it's a "hit." If the 
    coordinate does not contain any part of a ship, it's a "miss." Players mark their opponent's grid accordingly.
    5. Sinking Ships: When all of the squares of a ship have been hit, the ship is considered "sunk." The player must 
    announce which ship has been sunk.
    6. Winning the Game: The game continues until one player has successfully sunk all of their opponent's ships. That 
    player is declared the winner.
    `,
  ),
);

const clickHandlers = [];

playerAreaAttack.forEach((el, index) => {
  const clickHandler = addClickEvent.bind(null, el, index);
  el.addEventListener('click', clickHandler);
  clickHandlers.push(clickHandler);
});

function addClickEvent(el, index) {
  playerAttackEnemyShip(index);
  enemyAttackPlayerShip();
  removeClickEvent(el, index);
}

// Para remover os eventos
function removeClickEvent(el, index) {
  playerAreaAttack[index].removeEventListener('click', clickHandlers[index]);
}

//criar função nomeada, se clicou autoremove

sectionDifficulty[0].addEventListener('change', function (e) {
  difficulty = e.target.value;
});

//CREATED SHIP DRAG AND DROP - START

playerShips.forEach((ship) => {
  ship.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.style.opacity = '0.5';
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
  // console.log(e.target);
  dragAndDropSound.play();
  e.target.classList.remove('drag-over');
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  // add it to the drop target
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove('hide');
}

//CREATED SHIP DRAG AND DROP - END

//Function to check if the position is empty!

function checkPositionIsEmpty(pos, arr) {
  if (!arr[pos].textContent.trim()) {
    return true;
  }
  return false;
}

//Support function for positioning the player's ships
function deployPlayerShips() {
  playerShips.forEach((el, index) => {
    const arr = Object.values(Object.entries(levels)[0][1])[`${lvl}`];
    arr.forEach((el, index) => {
      playerShips[index].style.opacity = '0.5';
      shipArea[el].append(playerShips[index]);
    });
  });
}

////Support function for positioning the enemy's ships
function deployEnemyShips(difficulty) {
  if (difficulty === 'easy') {
    //Pick up level from the object.
    const arr = Object.values(Object.entries(levels)[0][1])[`${lvl}`];
    victoryPlayerArray = arr;
    //Function to created the ships in the table.
    arr.forEach((el, index) => {
      enemyShipsArray[index].style.opacity = '0';
      enemyShipArea[el].append(enemyShipsArray[index]);
    });
  }
  if (difficulty === 'medium') {
    const arr = Object.values(Object.entries(levels)[1][1])[`${lvl}`];
    victoryPlayerArray = arr;
    arr.forEach((el, index) => {
      enemyShipsArray[index].style.opacity = '0';
      enemyShipArea[el].append(enemyShipsArray[index]);
    });
  }

  if (difficulty === 'hard') {
    const arr = Object.values(Object.entries(levels)[2][1])[`${lvl}`];
    victoryPlayerArray = arr;
    arr.forEach((el, index) => {
      enemyShipsArray[index].style.opacity = '0';
      enemyShipArea[el].append(enemyShipsArray[index]);
    });
  }
}

//Function mark "X" when it hits a target and mark "O" when it hits the water.
function playerAttackEnemyShip(position) {
  playerMoves.push(position);
  if (conditionVictory(playerMoves, victoryPlayerArray)) {
    alert('Player Wins');
  }
  playerAreaAttack[position].style.backgroundColor = 'tomato';
  const X = document.createElement('div');
  X.innerText = 'X';
  X.classList.add('absolute');

  const O = document.createElement('div');
  O.innerText = 'O';
  O.classList.add('absolute');

  if (checkPositionIsEmpty(position, enemyShipArea)) {
    countShots('playerMissedShot');
    enemyShipArea[position].style.backgroundColor = 'blue';
    pewPewSound.play();
    return enemyShipArea[position].append(O);
  }
  countShots('playerTargetShot');
  enemyShipArea[position].style.backgroundColor = 'tomato';
  explosionSound.play();
  return enemyShipArea[position].append(X);
}

function enemyAttackPlayerShip() {
  let position = randomNumber();
  // Make sure the computer doesn't attack the same position
  while (enemyMoves.includes(position)) {
    return enemyAttackPlayerShip();
  }
  enemyMoves.push(position);
  if (conditionVictory(enemyMoves, victoryEnemyArray)) {
    alert('Enemy Wins');
  }
  const O = document.createElement('div');
  O.innerText = 'O';
  O.classList.add('absolute');

  const X = document.createElement('div');
  X.innerText = 'X';
  X.classList.add('absolute');

  enemyAreaAttack[position].style.backgroundColor = 'tomato';
  if (checkPositionIsEmpty(position, shipArea)) {
    countShots('enemyMissedShot');
    shipArea[position].style.backgroundColor = 'blue';
    return shipArea[position].append(O);
  }
  countShots('enemyTargetShot');

  shipArea[position].style.backgroundColor = 'tomato';
  return shipArea[position].append(X);
}

function randomNumber() {
  return Math.floor(Math.random() * 100);
}

//Victory function: verifies that all elements of the ships' array are included within the motion array.
function conditionVictory(arrMoves, arrCondition) {
  return arrCondition.every(function (element) {
    return arrMoves.includes(element);
  });
}

//Function to validate that all ships are ready to battle
function startGame() {
  let count = 0;
  // deployPlayerShips();
  playerMapBattle.forEach((el, index) => {
    if (!checkPositionIsEmpty(index, playerMapBattle)) {
      count++;
      victoryEnemyArray.push(index);
    }
  });

  if (count === 15) {
    alert('Ready to game!');
    battleArena.classList.remove('hidden');
    sectionPlayerPortArea.classList.add('hidden');
    sectionEnemyPortArea.classList.add('hidden');
    deployEnemyShips(difficulty);
  } else {
    alert('Correctly position your ships! If you need read the rules.');
    count = 0;
    victoryEnemyArray = [];
  }
}

//Function to count shots and missed shots.
function countShots(target) {
  if (target === 'playerMissedShot') {
    playerMissedShots++;
    playerShotsScreen.textContent = playerMissedShots;
  }
  if (target === 'playerTargetShot') {
    playerTargetShots++;
    playerTargetShotsScreen.textContent = playerTargetShots;
  }
  if (target === 'enemyMissedShot') {
    enemyMissedShots++;
    enemyShotsScreen.textContent = enemyMissedShots;
  }
  if (target === 'enemyTargetShot') {
    enemyTargetShots++;
    enemyTargetShotsScreen.textContent = enemyTargetShots;
  }
}

//EXTRA
//Atomic Bomb, destroy all player's ships.
function enemyAtomicBombAttack() {
  for (let i = 0; i < 100; i++) {
    enemyMoves.push(i);
    enemyAreaAttack[i].style.backgroundColor = 'tomato';
    if (checkPositionIsEmpty(i, shipArea)) {
      shipArea[i].append('O');
    } else {
      shipArea[i].append('X');
    }
  }
  if (conditionVictory(enemyMoves, victoryEnemyArray)) {
    alert('Enemy Wins');
  }
}
