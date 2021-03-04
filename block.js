class Block {
    constructor(blockShape) {

        this.blockShape = blockShape

        this.blockDimensions = [
            Math.floor(canvas.width / blockSize),
            Math.floor(canvas.height / blockSize)
        ]
    }
    
    draw(coord) {
        this.blockShape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    context.fillRect(
                        coord[0] + x / this.blockShape.length,
                        coord[1] + y / this.blockShape.length,
                        1 / this.blockShape.length,
                        1 / this.blockShape.length)
                }
            })
        })
    }
}
