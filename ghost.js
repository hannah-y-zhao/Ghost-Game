class Ghost {

    constructor() {

        this.initialize()

    }

    initialize() {
        this.body = [] //empty array
        this.body[0] = createVector(floor(w / 2), floor(h / 2))
        this.xdirection = 0 //variables?
        this.ydirection = 0
    }

    setDir(x, y) {
        this.xdirection = x
        this.ydirection = y
    }

    update() {
        let head = this.body[this.body.length - 1].copy()
        this.body.shift()
        head.x += this.xdirection //moves across the screen
        head.y += this.ydirection
        this.body.push(head)

    }

    grow() {
        let head = this.body[this.body.length - 1].copy()

        this.body.push(head)

    }

    gameOver() {
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i]
            if (part.x == x && part.y == y) { //if body intersects w/ self

                return true
            }
        }
        if (x > w - 1 || x < 0 || y > h - 1 || y < 0) { //if goes past the edge (accounts for scaling)

            return true
        }

        else {
            return false
        }
    }

    eat1(pos) { //pos is replaced by position of candy, grow snake
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        if (x + 2.5 >= pos.x && x + .5 <= pos.x + 5 && y + 2.5 >= pos.y && y -1 <= pos.y + 5) {
            this.grow()

            return true

        } else {
            return false
        }
    }

    eat2(pos) { //speed up 
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        if (x + 2.5 >= pos.x && x + .5 <= pos.x + 5 && y + 2.5 >= pos.y && y -1 <= pos.y + 5) {
            console.log('lemon')
            return true

        } else {
            return false
        }
    }

    rotation() {
        if (this.xdirection > 0) {
          // ->
          rotate(0);
        } else if (this.ydirection > 0) {
          // V
          rotate(90);
        } else if (this.xdirection < 0) {
          // <-
          rotate(180);
        } else {
          // ^
          rotate(270)
        }
    }



    show() {
   
        for (let i = 0; i < this.body.length; i++) {
            push()
            translate(this.body[i].x,this.body[i].y)
            this.rotation()
            imageMode(CENTER)
            image(ghostCol, 0,0, 4.5, 4.5)

            pop()

        }
    }


}