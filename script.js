const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const score1Display = document.getElementById("score1");
const score2Display = document.getElementById("score2");

let score1 = 0;
let score2 = 0;

// barras
const paddleWidth = 15, paddleHeight = 100;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 7;

// bola
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSize = 12;
let ballSpeedX = 5;
let ballSpeedY = 5;

// teclas
let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // linha central
  ctx.strokeStyle = "#00ffcc";
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // barras
  ctx.fillStyle = "#ff0066";
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);

  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  // bola
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();
}

function update() {
  // mover barras
  if (keys["w"] && paddle1Y > 0) paddle1Y -= paddleSpeed;
  if (keys["s"] && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;
  if (keys["ArrowUp"] && paddle2Y > 0) paddle2Y -= paddleSpeed;
  if (keys["ArrowDown"] && paddle2Y < canvas.height - paddleHeight) paddle2Y += paddleSpeed;

  // mover bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // colisão com topo/baixo
  if (ballY <= ballSize || ballY >= canvas.height - ballSize) {
    ballSpeedY *= -1;
  }

  // colisão com barras
  if (ballX - ballSize <= paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX *= -1;
    ballSpeedX *= 1.05; // aumenta velocidade
  }
  if (ballX + ballSize >= canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX *= -1;
    ballSpeedX *= 1.05;
  }

  // ponto
  if (ballX < 0) {
    score2++;
    score2Display.textContent = score2;
    resetBall();
  }
  if (ballX > canvas.width) {
    score1++;
    score1Display.textContent = score1;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
