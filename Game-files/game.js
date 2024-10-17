const dino = document.getElementById("dino");
let isJumping = false;
let gravity = 0.9;

function jump() {
    if (isJumping) return;
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 30;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        jump();
    }
});

const obstacle = document.getElementById("obstacle");
setInterval(() => {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    // Check for collision
    if (obstacleLeft > 0 && obstacleLeft < 50 && dinoBottom <= 50) {
        alert("Game Over");
        // Reset score or handle game over here
    } else if (obstacleLeft < 0) {
        // Increment score as the player successfully avoids the obstacle
        score++;
        scoreDisplay.textContent = score; // Update the displayed score
    }
}, 10);

// Optional: Increment score every second for continuous gameplay
setInterval(() => {
    score++;
    scoreDisplay.textContent = score; // Update the displayed score
}, 1000);
