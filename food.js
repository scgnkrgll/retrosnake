class Food {
    constructor() {
        this.update()
        this.block = new Block([
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0]
        ])
    }
    draw() {
        this.block.draw(this.coord)
    }
    update() {
        this.coord = [
            Math.floor(Math.random() * blockDimensions[0]),
            Math.floor(Math.random() * blockDimensions[1])
        ]
    }
}