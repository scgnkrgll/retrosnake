class Food {
    constructor(blockDimensions) {
        this.blockDimensions = blockDimensions
        
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
            Math.floor(Math.random() * this.blockDimensions[0]),
            Math.floor(Math.random() * this.blockDimensions[1])
        ]
    }
}
