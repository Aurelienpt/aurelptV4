const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const replayButton = document.getElementById('replayButton');
const gameMessage = document.getElementById('gameMessage');

// Objets du jeu
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 2.5,
    speedY: 2.5
};

const paddle = {
    width: 10,
    height: 80,
    x: 0,
    y: canvas.height / 2 - 40,
    speed: 8
};

const paddle2 = {
    width: 10,
    height: 80,
    x: canvas.width - 10,
    y: canvas.height / 2 - 40,
    speed: 8
};

let gameRunning = false;
let animationFrameId;
const speedIncrease = 1.1; 


canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    paddle.y = mouseY - paddle.height / 2;
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y > canvas.height - paddle.height) paddle.y = canvas.height - paddle.height;
});

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 2.5; 
    ball.speedY = 2.5;
    paddle.y = canvas.height / 2 - 40;
    paddle2.y = canvas.height / 2 - 40;
    gameMessage.textContent = '';
    replayButton.style.display = 'none';
}

function endGame(winner) {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    gameMessage.textContent = winner === 'player' ? 'Gagné !' : 'Perdu !';
    replayButton.style.display = 'block';
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x < 0) {
        endGame('computer');
        return;
    }
    if (ball.x > canvas.width) {
        endGame('player');
        return;
    }

    if (ball.x - ball.radius < paddle.x + paddle.width && 
        ball.y > paddle.y && 
        ball.y < paddle.y + paddle.height) {
        ball.speedX = -ball.speedX * speedIncrease; 
        ball.speedY *= speedIncrease; 
    }
    if (ball.x + ball.radius > paddle2.x && 
        ball.y > paddle2.y && 
        ball.y < paddle2.y + paddle2.height) {
        ball.speedX = -ball.speedX * speedIncrease; 
        ball.speedY *= speedIncrease; 
    }

    if (paddle2.y + paddle2.height / 2 < ball.y && 
        paddle2.y < canvas.height - paddle2.height) {
        paddle2.y += paddle2.speed;
    }
    if (paddle2.y + paddle2.height / 2 > ball.y && paddle2.y > 0) {
        paddle2.y -= paddle2.speed;
    }

    animationFrameId = requestAnimationFrame(draw);
}

startButton.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        startButton.style.display = 'none';
        resetGame();
        draw();
    }
});

replayButton.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        resetGame();
        draw();
    }
});