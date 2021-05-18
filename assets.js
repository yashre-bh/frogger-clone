
const canvas = document.getElementById('canvas1');
const c1 = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 600;


const canvas2 = document.getElementById('canvas2');
const c2 = canvas2.getContext('2d');
canvas2.height = 600;
canvas2.width = 600;


const canvas3 = document.getElementById('canvas3');
const c3 = canvas3.getContext('2d');
canvas3.height = 600;
canvas3.width = 600;


const canvas4 = document.getElementById('canvas4');
const c4 = canvas4.getContext('2d');
canvas4.height = 600;
canvas4.width = 600;


const canvas5 = document.getElementById('canvas5');
const c5 = canvas5.getContext('2d');
canvas5.height = 600;
canvas5.width = 600;


const grid = 80;
let gameOver = false;
let keys = []; //keys pressed
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;
let isAlive = false;
let isPaused = false;
let high_value = localStorage.getItem('high');
let highScore = high_value;

// let hs = JSON.stringify(highScore);
// localStorage.setItem("high", highScore);
//localStorage.setItem('high', score);
//let highScore = JSON.parse(window.localStorage.getItem('high'));


const carsArray = [];
const logsArray = [];

const collisions = new Image();
collisions.src = 'images/collisions.png';

const turtle = new Image();
turtle.src = 'images/turtles.png';

const log_image = new Image();
log_image.src = 'images/log.png';


const road = new Image();
road.src = 'images/road.png';


const water = new Image();
water.src = 'images/water.png';

const car3 = new Image();
car3.src = 'images/car3.png';

const car4 = new Image();
car4.src = 'images/car4.png';

const frog = new Image();
frog.src = 'images/frog.png';

const jump_sound = new Audio ('sounds/jump.mp3');

const sink_sound = new Audio ('sounds/sink.mp3');

const score_sound = new Audio ('sounds/score.mp3');

const crash_sound = new Audio ('sounds/woosh.mp3');