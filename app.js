const canvas = document.getElementById("snake")
const context = canvas.getContext("2d")

let fps = 5
const blockSize = 10;

const blockDimensions = [
    Math.floor(canvas.width / blockSize),
    Math.floor(canvas.height / blockSize)
]

context.scale(blockSize, blockSize)

const apple = new Food(blockDimensions)
const snake = new Snake(blockDimensions)

function drawGame(time) {
    // console.log(time)
    context.clearRect(0, 0, canvas.width, canvas.height)

    snake.draw()
    snake.update()
    apple.draw()
    setTimeout(() => {
        requestAnimationFrame(drawGame)
    }, 1000 / fps)
}

document.body.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 38: //up
            snake.changeDir(0, -1)
            break;
        case 40: //down
            snake.changeDir(0, 1)
            break;
        case 37: //left
            snake.changeDir(-1, 0)
            break;
        case 39: //right
            snake.changeDir(1, 0)
            break;
    }
})

drawGame()
