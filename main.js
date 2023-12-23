document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const snakeElement = document.getElementById('snake');
    const foodElement = document.getElementById('food');

    const gridSize = 20;
    let snake = [{ x: 0, y: 0 }];
    let food = generateFoodPosition();

    let direction = 'right';

    function generateFoodPosition() {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        return { x, y };
    }

    function render() {
        // Render snake
        snake.forEach(segment => {
            const segmentElement = document.createElement('div');
            segmentElement.className = 'snake';
            segmentElement.style.left = segment.x * gridSize + 'px';
            segmentElement.style.top = segment.y * gridSize + 'px';
            gameContainer.appendChild(segmentElement);
        });

        // Render food
        foodElement.style.left = food.x * gridSize + 'px';
        foodElement.style.top = food.y * gridSize + 'px';
    }

    function update() {
        // Update snake position
        const head = Object.assign({}, snake[0]);
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            snake.unshift({ x: head.x, y: head.y });
            food = generateFoodPosition();
        } else {
            // Remove the last segment if no food is eaten
            snake.pop();
            snake.unshift({ x: head.x, y: head.y });
        }

        // Check for collision with walls
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            resetGame();
        }

        // Check for collision with self
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                resetGame();
            }
        }
    }

    function resetGame() {
        snake = [{ x: 0, y: 0 }];
        food = generateFoodPosition();
        direction = 'right';
        alert('Game over! Restarting...');
    }

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    function gameLoop() {
        update();
        render();
        setTimeout(gameLoop, 200); // Adjust the speed of the game here (lower value means faster)
    }

    gameLoop();
});
