const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerSize = 30;
const playerColor = '#fff';
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
const playerSpeed = 5;

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);
}

function updatePlayer(x, y) {
    playerX += x * playerSpeed;
    playerY += y * playerSpeed;
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
