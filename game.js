const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerSize = 30;
const playerColor = '#fff';
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
const playerSpeed = 5;

// Пример стены
const wall = {
    x: canvas.width / 4,
    y: canvas.height / 4,
    width: 100,
    height: 100,
    color: '#666'
};

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка стены
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    // Отрисовка игрока
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);
}

function updatePlayer(x, y) {
    // Простое столкновение с стеной
    if (playerX + x * playerSpeed < wall.x + wall.width &&
        playerX + x * playerSpeed + playerSize > wall.x &&
        playerY + y * playerSpeed < wall.y + wall.height &&
        playerY + y * playerSpeed + playerSize > wall.y) {
        return;
    }

    playerX += x * playerSpeed;
    playerY += y * playerSpeed;

    // Ограничение движения игрока в пределах экрана
    playerX = Math.max(playerSize / 2, Math.min(canvas.width - playerSize / 2, playerX));
    playerY = Math.max(playerSize / 2, Math.min(canvas.height - playerSize / 2, playerY));
}

let touchStartX, touchStartY;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const deltaX = (touchEndX - touchStartX) / canvas.width;
    const deltaY = (touchEndY - touchStartY) / canvas.height;

    updatePlayer(deltaX, deltaY);

    touchStartX = touchEndX;
    touchStartY = touchEndY;

    e.preventDefault();
});

function gameLoop() {
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();
