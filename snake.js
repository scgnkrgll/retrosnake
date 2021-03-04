class Snake {
    constructor(blockDimensions) {
        this.blockDimensions = blockDimensions

        this.body = [
            [4, 2], // head
            [3, 2],
            [2, 2],
            [1, 2],
            [0, 2], // snaking
            [0, 1],
            [0, 0]  // tail
        ]

        this.block = new Block([
            [0, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 0]
        ])

        this.direction = [1, 0]

        this.temp1
        this.temp2
    }

    checkWall() {
        if (this.body[0][0] >= this.blockDimensions[0]) {
            this.body[0][0] = 0
        } else if (this.body[0][0] < 0) {
            this.body[0][0] = this.blockDimensions[0]
        } else if (this.body[0][1] < 0) {
            this.body[0][1] = this.blockDimensions[1]
        } else if (this.body[0][1] >= this.blockDimensions[1]) {
            this.body[0][1] = 0
        }
    }

    checkSnaking() {
        for (let i = 1; i < this.body.length - 1; i++) {
            this.temp2 = [
                this.body[i + 1][0] - this.body[i - 1][0],
                this.body[i + 1][1] - this.body[i - 1][1]
            ]

            let a = [
                this.body[i + 1][0] - this.body[i][0],
                this.body[i + 1][1] - this.body[i][1]
            ]
            let b = [
                this.body[i][0] - this.body[i - 1][0],
                this.body[i][1] - this.body[i - 1][1]
            ]

            if (this.temp2[0] === 1 && this.temp2[1] === 1) {
                console.log(`kıvrım noktası ${this.body[i]}, ${a}, ${b}, ${this.temp2}`)
            } else if (this.temp2[0] === 1 && this.temp2[1] === -1) {
                console.log(`kıvrım noktası ${this.body[i]}, ${a}, ${b}, ${this.temp2}`)
            } else if (this.temp2[0] === -1 && this.temp2[1] === 1) {
                console.log(`kıvrım noktası ${this.body[i]}, ${a}, ${b}, ${this.temp2}`)
            } else if (this.temp2[0] === -1 && this.temp2[1] === -1) {
                console.log(`kıvrım noktası ${this.body[i]}, ${a}, ${b}, ${this.temp2}`)
            }
        }
    }

    update() {
        this.move()
        this.checkWall()
        this.checkSelfIntersection()
        this.checkSnaking()

        if (apple.coord[0] == this.body[0][0] &&
            apple.coord[1] == this.body[0][1]) {
            this.eat()
        }
    }

    move() {
        this.body.pop()
        this.body.unshift([
            this.body[0][0] + this.direction[0],
            this.body[0][1] + this.direction[1]
        ])
    }

    draw() {
        this.body.forEach(coord => {
            this.block.draw(coord)
        })
    }


    eat() {
        this.body.unshift([
            this.body[0][0],
            this.body[0][1]
        ])
        apple.update()
        fps += 0.5
    }

    changeDir(x, y) {
        if (this.body[0][0] + x === this.body[1][0] && this.body[0][1] + y === this.body[1][1]) {
            return
        }
        if (this.direction[0] === x && this.direction[1] === y) {
            fps++
        }
        this.direction = [x, y]
    }

    checkSelfIntersection() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0][0] === this.body[i][0] && this.body[0][1] === this.body[i][1]) {
                console.log("Kendini yedin!")
                this.reset()
            }
        }
    }

    reset() {
        apple.update()
        this.body = [
            [1, 5], // head
            [1, 4],
            [1, 3],
            [1, 2],
            [0, 2],
            [0, 1]  // tail
        ]
        fps = 5
    }
}
// cw yukarı - ccw sağa
// cw sağa   - ccw aşağı
// cw aşağı  - ccw sola
// cw sola   - ccw yukarı
/*
-1*
         ccw           cw
yukarı:  1, 0   1,-1 |-1, 0  -1,-1
sağa  :  0, 1   1, 1 | 0,-1   1,-1
aşağı : -1, 0  -1, 1 | 1, 0   1, 1
sola  :  0,-1  -1,-1 | 0, 1  -1, 1

saat yönü tersinde
yukarı: kıvrım noktası 13,9     1, 0   1,-1
sola  : kıvrım noktası 13,3     0,-1  -1,-1
aşağı : kıvrım noktası 8,3     -1, 0  -1, 1
sağa  : kıvrım noktası 8,8      0, 1   1, 1

saat yönünde
yukarı: kıvrım noktası 10,11   -1, 0  -1,-1
sağa  : kıvrım noktası 10,5     0,-1   1,-1
aşağı : kıvrım noktası 17,5     1, 0   1, 1
sola  : kıvrım noktası 17,12    0, 1  -1, 1

*/


/*

    checkWall() {
        if (this.body[0][0] >= this.blockDimensions[0]) {
            this.body[0][0] = 0
        } else if (this.body[0][0] < 0) {
            this.body[0][0] = this.blockDimensions[0]
        } else if (this.body[0][1] < 0) {
            this.body[0][1] = this.blockDimensions[1]
        } else if (this.body[0][1] >= this.blockDimensions[1]) {
            this.body[0][1] = 0
        }
    }

    checkSnaking() {
        for (let i = 1; i < this.body.length - 1; i++) {
            this.temp2 = [
                this.body[i - 1][0] - this.body[i + 1][0] % this.blockDimensions[0],
                this.body[i - 1][1] - this.body[i + 1][1] % this.blockDimensions[1]
            ]

            let a = this.body[i][0] - this.body[i + 1][0]

            if (this.temp2[0] === 1 && this.temp2[1] === 1) {
                // console.log(`kıvrım noktası ${this.body[i]}, ${a}, ${this.temp2}`)
                if (a === 0) {
                    console.log("saat yönü tersinde sağa")
                }
                else
                    console.log("saat yönünde aşağı")
            } else if (this.temp2[0] === -1 && this.temp2[1] === -1) {
                if (a === 0)
                    console.log("saat yönü tersinde sola")
                else
                    console.log("saat yönünde yukarı")
            } else if (this.temp2[0] === -1 && this.temp2[1] === 1) {
                if (a === 0)
                    console.log("saat yönünde sola")
                else
                    console.log("saat yönü tersinde aşağı")
            } else if (this.temp2[0] === 1 && this.temp2[1] === -1) {
                if (a === 0)
                    console.log("saat yönünde sağa")
                else
                    console.log("saat yönü tersinde yukarı")
            }
        }
    }

*/

/*
yön      cw     ccw
yukarı:  1, 1  -1, 1
sağa  : -1, 1  -1,-1
aşağı : -1,-1   1,-1
sola  :  1,-1   1, 1

*/