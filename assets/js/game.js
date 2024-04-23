//GLOBAL VARIABLES

let difficulty = 'easy';
let lvl = 0;
let playerMissedShots = 0;
let playerTargetShots = 0;
let enemyMissedShots = 0;
let enemyTargetShots = 0;
let victoryPlayerArray = [];
let victoryEnemyArray = [];
let playerMoves = [];
let enemyMoves = [];
let playerShipsArray = [];
let clickHandlers = [];
const destroyerBlockCellsHorizontal = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
const cruiserBlockCellsHorizontal = [
  ...destroyerBlockCellsHorizontal,
  8,
  18,
  28,
  38,
  48,
  58,
  68,
  78,
  88,
  98,
];
const warshipBlockCellsHorizontal = [
  ...cruiserBlockCellsHorizontal,
  7,
  17,
  27,
  37,
  47,
  57,
  67,
  77,
  87,
  97,
];
const aircraftBlockCellsHorizontal = [
  ...warshipBlockCellsHorizontal,
  6,
  16,
  26,
  36,
  46,
  56,
  66,
  76,
  86,
  96,
];
const destroyerBlockCellsVertical = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
const cruiserBlockCellsVertical = [
  ...destroyerBlockCellsVertical,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
];
const warshipBlockCellsVertical = [
  ...cruiserBlockCellsVertical,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
];
const aircraftBlockCellsVertical = [
  ...warshipBlockCellsVertical,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
];
const destroyerBlockCellsDiagonal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cruiserBlockCellsDiagonal = [
  ...destroyerBlockCellsDiagonal,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
];
const warshipBlockCellsDiagonal = [
  ...cruiserBlockCellsDiagonal,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
];
const aircraftBlockCellsDiagonal = [
  ...warshipBlockCellsDiagonal,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
];

let soundIsActive = true;

//GRIDS and HTML ELEMENTS

const shipArea = document.querySelectorAll('.ship-area');
const playerAreaAttack = document.querySelectorAll('.player-attack');
const playerPortArea = document.querySelectorAll('.port-area');
const sectionPlayerPortArea = document.querySelector('#player_port_of_war');
const playerMapBattle = document.querySelectorAll('.map-battle');

const playerShotsScreen = document.querySelector('#player-shots');
const playerTargetShotsScreen = document.querySelector('#player-target-shots');

const enemyShipArea = document.querySelectorAll('.ship-enemy-area');
const enemyPortArea = document.querySelectorAll('.enemy-port-area');
const enemyAreaAttack = document.querySelectorAll('.enemy-attack');
const sectionEnemyPortArea = document.querySelector('#enemy-port-of-war');

const enemyShotsScreen = document.querySelector('#enemy-shots');
const enemyTargetShotsScreen = document.querySelector('#enemy-target-shots');

const battleArena = document.querySelector('#battle-area');

//BUTTONS

const buttonPlay = document.querySelector('#play');
const buttonRules = document.querySelector('#rules');
const sectionDifficulty = document.querySelectorAll('#difficulty');
const soundConfig = document.querySelector('#sound-config');
const resetButton = document.querySelector('#reset');

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

// SOUNDS

let dragAndDropSound = new Audio();
let explosionSound = new Audio();
let pewPewSound = new Audio();
let music = new Audio();
music.loop = true;
music.volume = 0.03;

music.src = 'assets/sounds/music.mp3';
dragAndDropSound.src = 'assets/sounds/mine.mp3';
explosionSound.src = 'assets/sounds/explosion.mp3';
pewPewSound.src = 'assets/sounds/pew-pew.mp3';

// music.play();

soundConfig.addEventListener('click', handleSound);

function handleSound() {
  if (soundIsActive) {
    music.pause();
    soundConfig.innerText = 'SOUND: OFF';
  } else {
    music.play();
    soundConfig.innerText = 'SOUND: ON';
  }
  soundIsActive = !soundIsActive;
}

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

resetButton.addEventListener('click', resetGame);

//Adding and Removing Click Events
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

function removeClickEvent(el, index) {
  playerAreaAttack[index].removeEventListener('click', clickHandlers[index]);
}

//Choosing the Difficulty
sectionDifficulty[0].addEventListener('change', function (e) {
  difficulty = e.target.value;
});

//CREATED SHIP DRAG AND DROP - START

playerShips.forEach((ship) => {
  ship.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
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

//Generate random number range: (0-99)
function randomNumber() {
  return Math.floor(Math.random() * 100);
}

function randomDirection(difficulty) {
  if (difficulty === 'hard') {
    let number = Math.round(Math.random() * 2);
    let result =
      number === 2 ? 'diagonal' : number === 1 ? 'vertical' : 'horizontal';
    return result;
  }
  let number = Math.round(Math.random());
  let result = number === 1 ? 'vertical' : 'horizontal';
  return result;
}

//Functions to position enemy ships in the map.
function createEasyLevel() {
  let direction = randomDirection();
  try {
    if (direction === 'vertical') {
      setSub();
      setDestroyer('vertical');
      setCruiser('vertical');
      setWarShip('vertical');
      setAircraft('vertical');
    } else if (direction === 'horizontal') {
      setSub();
      setDestroyer('horizontal');
      setCruiser('horizontal');
      setWarShip('horizontal');
      setAircraft('horizontal');
    }
  } catch (error) {
    return createEasyLevel();
  }
}

function createMediumLevel() {
  try {
    setSub();
    setDestroyer(randomDirection());
    setCruiser(randomDirection());
    setWarShip(randomDirection());
    setAircraft(randomDirection());
  } catch (error) {
    return createMediumLevel();
  }
}

function createHardLevel() {
  try {
    setSub();
    setDestroyer(randomDirection('hard'));
    setCruiser(randomDirection('hard'));
    setWarShip(randomDirection('hard'));
    setAircraft(randomDirection('hard'));
  } catch (error) {
    return createHardLevel();
  }
}

function setSub() {
  let index = randomNumber();

  if (checkPositionIsEmpty(index, enemyShipArea)) {
    enemyShipArea[index].append(enemySub[0]);
    return true;
  }
  return setSub();
}

function setDestroyer(direction) {
  let index = randomNumber();
  if (direction === 'horizontal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 1, enemyShipArea) &&
      !destroyerBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyDestroyer1);
      enemyShipArea[index + 1].append(enemyDestroyer2);
      return true;
    }
    return setDestroyer('horizontal');
  }

  if (direction === 'vertical') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 10, enemyShipArea) &&
      !destroyerBlockCellsVertical.includes(index)
    ) {
      enemyShipArea[index].append(enemyDestroyer1);
      enemyShipArea[index + 10].append(enemyDestroyer2);
      return true;
    }
    return setDestroyer('vertical');
  }

  if (direction === 'diagonal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index - 9, enemyShipArea) &&
      !destroyerBlockCellsDiagonal.includes(index) &&
      !destroyerBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyDestroyer1);
      enemyShipArea[index - 9].append(enemyDestroyer2);
      return true;
    }
    return setDestroyer('diagonal');
  }
}

function setCruiser(direction) {
  let index = randomNumber();
  if (direction === 'horizontal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 1, enemyShipArea) &&
      checkPositionIsEmpty(index + 2, enemyShipArea) &&
      !cruiserBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyCruiser1);
      enemyShipArea[index + 1].append(enemyCruiser2);
      enemyShipArea[index + 2].append(enemyCruiser3);
      return true;
    }
    return setCruiser('horizontal');
  }
  if (direction === 'vertical') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 10, enemyShipArea) &&
      checkPositionIsEmpty(index + 20, enemyShipArea) &&
      !cruiserBlockCellsVertical.includes(index)
    ) {
      enemyShipArea[index].append(enemyCruiser1);
      enemyShipArea[index + 10].append(enemyCruiser2);
      enemyShipArea[index + 20].append(enemyCruiser3);
      return true;
    }
    return setCruiser('vertical');
  }
  if (direction === 'diagonal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index - 9, enemyShipArea) &&
      checkPositionIsEmpty(index - 18, enemyShipArea) &&
      !cruiserBlockCellsDiagonal.includes(index) &&
      !cruiserBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyCruiser1);
      enemyShipArea[index - 9].append(enemyCruiser2);
      enemyShipArea[index - 18].append(enemyCruiser3);
      victoryPlayerArray.push(index);
      victoryPlayerArray.push(index - 9);
      victoryPlayerArray.push(index - 18);
      return true;
    }
    return setCruiser('diagonal');
  }
}

function setWarShip(direction) {
  let index = randomNumber();
  if (direction === 'horizontal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 1, enemyShipArea) &&
      checkPositionIsEmpty(index + 2, enemyShipArea) &&
      checkPositionIsEmpty(index + 3, enemyShipArea) &&
      !warshipBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyWarship1);
      enemyShipArea[index + 1].append(enemyWarship2);
      enemyShipArea[index + 2].append(enemyWarship3);
      enemyShipArea[index + 3].append(enemyWarship4);
      return true;
    }
    return setWarShip('horizontal');
  }

  if (direction === 'vertical') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 10, enemyShipArea) &&
      checkPositionIsEmpty(index + 20, enemyShipArea) &&
      checkPositionIsEmpty(index + 30, enemyShipArea) &&
      !warshipBlockCellsVertical.includes(index)
    ) {
      enemyShipArea[index].append(enemyWarship1);
      enemyShipArea[index + 10].append(enemyWarship2);
      enemyShipArea[index + 20].append(enemyWarship3);
      enemyShipArea[index + 30].append(enemyWarship4);
      return true;
    }
    return setWarShip('vertical');
  }

  if (direction === 'diagonal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index - 9, enemyShipArea) &&
      checkPositionIsEmpty(index - 18, enemyShipArea) &&
      checkPositionIsEmpty(index - 27, enemyShipArea) &&
      !warshipBlockCellsDiagonal.includes(index) &&
      !warshipBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyWarship1);
      enemyShipArea[index - 9].append(enemyWarship2);
      enemyShipArea[index - 18].append(enemyWarship3);
      enemyShipArea[index - 27].append(enemyWarship4);
      return true;
    }
    return setWarShip('diagonal');
  }
}

function setAircraft(direction) {
  let index = randomNumber();
  if (direction === 'horizontal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 1, enemyShipArea) &&
      checkPositionIsEmpty(index + 2, enemyShipArea) &&
      checkPositionIsEmpty(index + 3, enemyShipArea) &&
      checkPositionIsEmpty(index + 4, enemyShipArea) &&
      !aircraftBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyAircraftCarrier1);
      enemyShipArea[index + 1].append(enemyAircraftCarrier2);
      enemyShipArea[index + 2].append(enemyAircraftCarrier3);
      enemyShipArea[index + 3].append(enemyAircraftCarrier4);
      enemyShipArea[index + 4].append(enemyAircraftCarrier5);
      return true;
    }
    return setAircraft('horizontal');
  }
  if (direction === 'vertical') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index + 10, enemyShipArea) &&
      checkPositionIsEmpty(index + 20, enemyShipArea) &&
      checkPositionIsEmpty(index + 30, enemyShipArea) &&
      checkPositionIsEmpty(index + 40, enemyShipArea) &&
      !aircraftBlockCellsVertical.includes(index)
    ) {
      enemyShipArea[index].append(enemyAircraftCarrier1);
      enemyShipArea[index + 10].append(enemyAircraftCarrier2);
      enemyShipArea[index + 20].append(enemyAircraftCarrier3);
      enemyShipArea[index + 30].append(enemyAircraftCarrier4);
      enemyShipArea[index + 40].append(enemyAircraftCarrier5);
      return true;
    }
    return setAircraft('vertical');
  }

  if (direction === 'diagonal') {
    if (
      checkPositionIsEmpty(index, enemyShipArea) &&
      checkPositionIsEmpty(index - 9, enemyShipArea) &&
      checkPositionIsEmpty(index - 18, enemyShipArea) &&
      checkPositionIsEmpty(index - 27, enemyShipArea) &&
      checkPositionIsEmpty(index - 36, enemyShipArea) &&
      !aircraftBlockCellsDiagonal.includes(index) &&
      !aircraftBlockCellsHorizontal.includes(index)
    ) {
      enemyShipArea[index].append(enemyAircraftCarrier1);
      enemyShipArea[index - 9].append(enemyAircraftCarrier2);
      enemyShipArea[index - 18].append(enemyAircraftCarrier3);
      enemyShipArea[index - 27].append(enemyAircraftCarrier4);
      enemyShipArea[index - 36].append(enemyAircraftCarrier5);
      return true;
    }
    return setAircraft('diagonal');
  }
}
////Support function for positioning the enemy's ships
function deployEnemyShips(difficulty) {
  enemyShipsArray.forEach((el) => (el.style.opacity = '0'));
  if (difficulty === 'easy') {
    createEasyLevel();
    setVictoryPlayerArray();
  }
  if (difficulty === 'medium') {
    createMediumLevel();
    setVictoryPlayerArray();
  }
  if (difficulty === 'hard') {
    createHardLevel();
    setVictoryPlayerArray();
  }
}

//Function mark "X" when it hits a target and mark "O" when it hits the water.
function playerAttackEnemyShip(position) {
  playerMoves.push(position);
  if (conditionVictory(playerMoves, victoryPlayerArray)) {
    alert('Player Wins');
  }
  playerAreaAttack[position].classList.add('tomato');
  const X = document.createElement('div');
  X.innerText = 'X';
  X.classList.add('absolute');

  const O = document.createElement('div');
  O.innerText = 'O';
  O.classList.add('absolute');

  if (checkPositionIsEmpty(position, enemyShipArea)) {
    countShots('playerMissedShot');
    enemyShipArea[position].classList.add('blue');
    pewPewSound.play();
    return enemyShipArea[position].append(O);
  }
  countShots('playerTargetShot');
  enemyShipArea[position].classList.add('tomato');
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

  enemyAreaAttack[position].classList.add('tomato');
  if (checkPositionIsEmpty(position, shipArea)) {
    countShots('enemyMissedShot');
    shipArea[position].classList.add('blue');
    return shipArea[position].append(O);
  }
  countShots('enemyTargetShot');

  shipArea[position].classList.add('tomato');
  return shipArea[position].append(X);
}
//Function to generate a victoryPlayerArray
function setVictoryPlayerArray() {
  enemyShipArea.forEach((el, index) => {
    if (!checkPositionIsEmpty(index, enemyShipArea)) {
      victoryPlayerArray.push(index);
    }
  });
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
    playerShips.forEach((el) => {
      el.draggable = false;
      el.style.opacity = '0.5';
      el.style.cursor = 'not-allowed';
    });
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

function resetPortOfWar() {
  const index = [0, 10, 11, 20, 21, 22, 30, 31, 32, 33, 40, 41, 42, 43, 44];
  for (let i = 0; i < index.length; i++) {
    playerPortArea[index[i]].append(playerShips[i]);
    enemyPortArea[index[i]].append(enemyShipsArray[i]);
    playerShips[i].style.opacity = '1';
    playerShips[i].draggable = true;
    playerShips[i].style.cursor = 'pointer';
    enemyShipsArray[i].style.opacity = '1';
  }
}

function resetStyleFromShipArea() {
  enemyShipArea.forEach((el) => {
    el.textContent = '';
    el.classList.remove('blue');
    el.classList.remove('tomato');
  });
  shipArea.forEach((el) => {
    el.textContent = '';
    el.classList.remove('blue');
    el.classList.remove('tomato');
  });
}

function resetShots() {
  playerMissedShots = 0;
  playerTargetShots = 0;
  enemyMissedShots = 0;
  enemyTargetShots = 0;
  playerShotsScreen.textContent = 0;
  playerTargetShotsScreen.textContent = 0;
  enemyShotsScreen.textContent = 0;
  enemyTargetShotsScreen.textContent = 0;
}

function resetGrids() {
  battleArena.classList.add('hidden');
  sectionPlayerPortArea.classList.remove('hidden');
  sectionEnemyPortArea.classList.remove('hidden');
}

function resetAreaAttack() {
  enemyAreaAttack.forEach((el) => {
    el.classList.remove('tomato');
  });
  playerAreaAttack.forEach((el) => {
    el.classList.remove('tomato');
  });
  playerAreaAttack.forEach((el, index) => {
    removeClickEvent(el, index);
  });
  playerAreaAttack.forEach((el, index) => {
    const clickHandler = addClickEvent.bind(null, el, index);
    el.addEventListener('click', clickHandler);
    clickHandlers.push(clickHandler);
  });
}

function resetVariableArrays() {
  victoryPlayerArray = [];
  victoryEnemyArray = [];
  playerMoves = [];
  enemyMoves = [];
}

function resetGame() {
  resetGrids();
  resetShots();
  resetVariableArrays();
  resetAreaAttack();
  resetStyleFromShipArea();
  resetPortOfWar();
}

resetPortOfWar();

//EXTRA
//Atomic Bomb, destroy all player's ships.
function enemyAtomicBombAttack() {
  for (let i = 0; i < 100; i++) {
    enemyMoves.push(i);
    enemyAreaAttack[i].classList.add('tomato');
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
