const gameboard = document.querySelector(".gameboard");
const reset = document.querySelector(".reset");
const gameover = document.querySelector(".gameover");
const restart = document.querySelector(".restart");
const quit = document.querySelector(".quit");
const score = document.querySelector(".score");
const sound = document.querySelector(".sound");
let x = 0;

const snakyy = document.querySelector("#s");
snakyy.addEventListener("click", () => {
  window.location.href = "snake.html";
});

const eggeatmusic = new Audio('/asset/beam-fire-282361.mp3');
const gameovermusic = new Audio('/asset/game-over-deep-male-voice-clip-352695.mp3');
const backgroundmusic = new Audio('/asset/up-beat-335518.mp3');

quit.addEventListener("click", () => {
  window.location.href = "thanks.html";
});

restart.addEventListener("click", () => {
  window.location.reload();
});

reset.addEventListener("click", () => {
  gameboard.innerHTML = "";
  window.location.reload();
});

sound.addEventListener("click", () => {
  if (backgroundmusic.paused) {
    backgroundmusic.currentTime = 0;
    backgroundmusic.play();
    sound.innerHTML = "";
    sound.innerHTML = `<img src="/asset/sound(1).png" style="width:100%; height:100%;">`;
  } else {
    sound.innerHTML = "";
    backgroundmusic.pause();
    sound.innerHTML = `<img src="/asset/volume-off.png" style="width:100%; height:100%;">`;
  }
});

let direction = { x: 0, y: 0 };
let snakebody = [{ x: 5, y: 5 }];
let headPos = snakebody[0];

// Navigation buttons
const up = document.getElementById("u");
const down = document.getElementById("d");
const left = document.getElementById("l");
const right = document.getElementById("r");

up.addEventListener("click", () => {
  direction.x = 0;
  direction.y = -1;
});
down.addEventListener("click", () => {
  direction.x = 0;
  direction.y = 1;
});
left.addEventListener("click", () => {
  direction.x = -1;
  direction.y = 0;
});
right.addEventListener("click", () => {
  direction.x = 1;
  direction.y = 0;
});

// Keyboard controls
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    direction.x = 0;
    direction.y = -1;
  } else if (e.key === "ArrowDown") {
    direction.x = 0;
    direction.y = 1;
  } else if (e.key === "ArrowLeft") {
    direction.x = -1;
    direction.y = 0;
  } else if (e.key === "ArrowRight") {
    direction.x = 1;
    direction.y = 0;
  }
});

let food_position = {
  x: 18,
  y: 9
};

function move() {
  gameboard.innerHTML = "";

  headPos.x += direction.x;
  headPos.y += direction.y;

  let newhead = {
    x: headPos.x,
    y: headPos.y
  };

  snakebody.unshift(newhead);

  const collision = () => {
    for (let i = 2; i < snakebody.length; i++) {
      if (snakebody[i].x === headPos.x && snakebody[i].y === headPos.y) {
        backgroundmusic.pause();
        backgroundmusic.currentTime = 0;
        gameovermusic.play();

        gameboard.innerHTML = "";
        gameover.style.display = "flex";
        snakebody = [{ x: 5, y: 5 }];
        direction = { x: 0, y: 0 };
        headPos = snakebody[0];
        clearInterval(Interval);
      }
    }
  };

  collision();

  if (headPos.x === food_position.x && headPos.y === food_position.y) {
    snakebody.push({ x: headPos.x, y: headPos.y });
    food_position = {
      x: Math.floor(Math.random() * 18) + 1,
      y: Math.floor(Math.random() * 18) + 1
    };
    x += 1;
    score.innerHTML = x;

    eggeatmusic.currentTime = 0;
    eggeatmusic.play();
  } else {
    snakebody.pop();
  }

  if (headPos.x > 28) headPos.x = 1;
  if (headPos.x < 1) headPos.x = 28;
  if (headPos.y > 28) headPos.y = 1;
  if (headPos.y < 1) headPos.y = 28;

  snakebody.forEach((e, index) => {
    let part = document.createElement("div");
    part.classList.add("snake");
    if (index === 0) {
      part.classList.add("head");
    }
    part.style.gridColumnStart = e.x;
    part.style.gridRowStart = e.y;
    gameboard.appendChild(part);
  });

  let food = document.createElement("div");
  food.classList.add("food");
  food.style.gridColumnStart = food_position.x;
  food.style.gridRowStart = food_position.y;
  gameboard.appendChild(food);
}

let Interval = setInterval(move, 100);
