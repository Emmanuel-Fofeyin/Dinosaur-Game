const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
let isJumping = false;
let gravity = 0.9;
let score = 0;
let obstaclesJumped = 0;  // Tracks how many obstacles were successfully jumped
const scoreDisplay = document.createElement("div");  // Create score display element

// Style the score display
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "10px";
scoreDisplay.style.right = "10px";
scoreDisplay.style.fontSize = "20px";
scoreDisplay.innerHTML = "Score: 0";
document.body.appendChild(scoreDisplay);  // Add score display to the body

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

// Function to increase score after every 10 obstacles
function updateScore() {
    obstaclesJumped += 1;
    if (obstaclesJumped % 10 === 0) {  // Every 10 obstacles jumped
        score += 100;
        scoreDisplay.innerHTML = "Score: " + score;  // Update score display
    }
}

// Collision detection and score update
setInterval(() => {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    if (obstacleLeft > 0 && obstacleLeft < 50 && dinoBottom <= 50) {
        alert("Game Over! Your final score is " + score);
        document.location.reload();
    } else if (obstacleLeft < 0) {
        // The obstacle passed the dino, so the player successfully jumped over it
        updateScore();
    }
}, 10);
