//reference: https://editor.p5js.org/codingtrain/sketches/HkDVpSvDm

let ghost;

let candyCorn
let lemonCandy;
let lollipop

let ghostImage

let greenSkittles
let orangeSkittles
let purpleSkittles
let redSkittles
let yellowSkittles

//let eatenSkittles=false;

let greenGhost
let orangeGhost
let purpleGhost
let redGhost
let yellowGhost

let ghostCol

let skittles = 'rand'

let bitFont

let endGameScreen
let introScreen

let hints = '6'
let randAngle

let candy
let candy2
let candy3
let candy4

let w
let h

let startGame
let playAgain
let gameStarted = false


let jumpscare
let jumpscareVid
let chomp1

let textAnimate = 0
let addition = .05

let resolution = 10
let score = 0
let fps = 7

let death = false; //variable for checking if the ghost has had an orange candy

function preload() {
  lemonCandy = loadImage('candy_lemon.png', loaded);
  candyCorn = loadImage('candy_candycorn.png', loaded)
  lollipop = loadImage('candy_lollipop.png', loaded)
  ghostImage = loadImage('ghost2.png', loaded)
  greenSkittles = loadImage('green.png', loaded)
  orangeSkittles = loadImage('orange.png', loaded)
  purpleSkittles = loadImage('purple.png', loaded)
  redSkittles = loadImage('red.png', loaded)
  yellowSkittles = loadImage('yellow.png', loaded)

  greenGhost=loadImage('greenGhost.png',loaded)
  orangeGhost=loadImage('orangeGhost.png',loaded)
  purpleGhost=loadImage('purpleGhost.png',loaded)
  redGhost=loadImage('redGhost.png',loaded)
  yellowGhost=loadImage('yellowGhost.png',loaded)

  endGameScreen = loadImage('gameOver.png', loaded)
  introScreen = loadImage('ghost_intro.png', loaded)

  jumpscareVid = createVideo('scary_ghost.mp4')
  jumpscareVid.hide()

  bitFont = loadFont('Pixeboy-z8XGD.ttf', loaded)
}
function loaded() {
  print('image loaded');
}

function setup() {

  createCanvas(floor(700), floor(700));

  chomp1 = loadSound("chomp1.wav", soundLoaded)
  jumpscare = loadSound("jumpscare.mp3", jumpscareLoaded)

  w = floor(width / resolution)//so that scaling doesnt make it go off canvas
  h = floor(height / resolution)
  scale(resolution)

  startGame = createButton("Start!")
  startGame.position(width / 2 - 50, height / 2 + 75)
  //startGame.center()
  startGame.size(100, 50)
  startGame.mousePressed(startingGame)

  playAgain = createButton("Play Again?")
  playAgain.position(width / 2 - 40, height / 2 + 100)

  playAgain.mousePressed(playingAgain)
  playAgain.hide()

  ghost = new Ghost //takes from ghost.js?

  frameRate(fps)

  angleMode(DEGREES)

  candy1Location() //calls function when start
  candy2Location()
  candy3Location()
  candy4Location()

}
function jumpscareLoaded() {
  //console.log("soundloaded")
}
function soundLoaded() {
  //console.log("soundloaded")
}

function startingGame() {
  gameStarted = true
  startGame.hide()
}

function playingAgain() {
  gameStarted = true;
  death = false;
  skittles='rand'
  candy1Location()
  candy2Location()
  candy3Location()
  candy4Location()
  playAgain.hide()
  ghost.initialize()
  score = 0
  fps = 7
  loop()


}

function candy1Location() {
  let x = floor(random(w - 5)) //x coordinate from random w in canvas, integer
  let y = floor(random(h - 5))
  candy = createVector(x, y)
}
function candy2Location() {
  let x = floor(random(w - 5))
  let y = floor(random(h - 5))
  candy2 = createVector(x, y)
}
function candy3Location() {//skittles
  let x = floor(random(w - 5))
  let y = floor(random(h - 5))
  candy3 = createVector(x, y)
  let skittlesArray = ['green', 'red', 'yellow', 'purple', 'orange']
  
  if(skittles=='green'){
    ghostCol=greenGhost
}else if (skittles=='red'){
  ghostCol=redGhost
}else if (skittles=='yellow'){
  ghostCol=yellowGhost
}else if (skittles=='purple'){
  ghostCol=purpleGhost
}else if (skittles=='orange'){
  ghostCol=orangeGhost
}
else{
  ghostCol=ghostImage
}
skittles = random(skittlesArray)
}
function candy4Location() {
  let x = floor(random(w - 5))
  let y = floor(random(h - 5))
  candy4 = createVector(x, y)
}

function mousePressed() {
  let hintsArray = [1, 2, 3, 4, 5]
  hints = random(hintsArray)
  console.log(hints)
  randAngle = random(3, 6)
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ghost.setDir(-1, 0) //function from ghost class
    //this.rotation
  } else if (keyCode === RIGHT_ARROW) {
    ghost.setDir(1, 0)
    //this.rotation
  } else if (keyCode === UP_ARROW) {
    ghost.setDir(0, -1)
    //this.rotation
  } else if (keyCode === DOWN_ARROW) {
    ghost.setDir(0, 1)
    //this.rotation
  }
}

function vidDone() {

  jumpscareVid.hide()
  textFont(bitFont)

  fill(255)
  textAlign(CENTER)
  stroke(0)
  strokeWeight(.6)
  image(endGameScreen, 0, 0, w, h)
  textSize(15)
  text("Game Over", w / 2, h / 2 + textAnimate)
  textSize(5)
  strokeWeight(.4)
  text("Score: " + score, w / 2 - 2, h / 2 + 18 + textAnimate)
  playAgain.show()
  playAgain.position(width / 2 - 70, height / 2 + 200 + textAnimate * 15)


  noLoop()
}

function draw() {

  if (gameStarted == false) {
    scale(resolution)
    image(introScreen, 0, 0, w, h)
    textFont(bitFont)
    textSize(10)
    textAlign(CENTER)
    fill(255)
    stroke(0)
    strokeWeight(.5)
    text('Ghost Game', w / 2, h / 2 + 2 + textAnimate)
    textSize(5)
    strokeWeight(.4)
    text('Eat Candy!', w / 2, h / 2 + 8 + textAnimate)
    textAnimate += addition
    startGame.position(width / 2 - 50, height / 2 + 100 + textAnimate * 15)

    if (hints == 1) {
      noStroke()
      push()

      rotate(6)
      textSize(3)
      fill(0)
      text('watch out...', w / 2 + 20, h / 2 - 10 + textAnimate)
      pop()

    } else if (hints == 2) {
      strokeWeight(.2)
      push()
      rotate(6)
      textSize(3)
      text('trick or treat!', w / 2 + 20, h / 2 - 10 + textAnimate)
      pop()
    } else if (hints == 3) {
      strokeWeight(.2)
      push()
      rotate(6)
      textSize(3)
      text('favorite candy?', w / 2 + 20, h / 2 - 10 + textAnimate)
      pop()
    } else if (hints == 4) {
      strokeWeight(.2)
      push()
      rotate(6)
      textSize(3)
      text('boo!', w / 2 + 20, h / 2 - 10 + textAnimate)
      pop()
    } else if (hints == 5) {
      strokeWeight(.2)
      push()
      rotate(6)
      textSize(3)
      text('black cats!', w / 2 + 20, h / 2 - 10 + textAnimate)
      pop()
    }else if (hints == 6) {
      strokeWeight(.2)
      push()
      rotate(6)
      textSize(3.5)
      text('click me!', w / 2 + 20, h / 2 - 10 + textAnimate)
      pop()
    }


    if (textAnimate >= .5 || textAnimate <= 0) {
      addition *= -1
    }
  } else if (gameStarted == true) {
    background(220);


    scale(resolution)
    jumpscareVid.hide()
    //https://editor.p5js.org/mimi/sketches/rkVRo46OX
    for (let col = 0; col <= 20; col++) {
      for (let row = 0; row <= 20; row++) {
        if (col % 2 == 0 & row % 2 == 1 || col % 2 == 1 & row % 2 == 0) {
          fill('#ae83e2')
          //fill('#FE8810')
        } else {
          fill('#8863b6')
          //fill('#FEA700')
        }
        noStroke()
        rect(col * w / 20, row * h / 20, w / 20, h / 20)
      }
    }

    if (ghost.eat2(candy)) { //if eat function is true
      candy1Location() //get new position
      score++
      fps++
      chomp1.play()
      // console.log(score)
    }
    if (ghost.eat1(candy2)) {
      candy2Location()
      score++
      chomp1.play()
      // console.log(score)
    }
    if (ghost.eat1(candy3)) {
      
      candy3Location()
      score++
      chomp1.play()
      // console.log(score)
    }
    if (ghost.eat1(candy4)) { //orange
      candy4Location()

      // jumpscare.play()
      // jumpscareVid.show()
      // jumpscareVid.play()
      death = true;
      // console.log(score)
    }
    ghost.update()
    ghost.show()

    frameRate(fps)

    fill(255)
    textSize(5)
    textAlign(LEFT)
    text("Score: " + score, 0.3, 4)



    noStroke()
    //fill(0,0,255)
    //rect(candy.x,candy.y,1,1) //draws blue candy
    image(lemonCandy, candy.x, candy.y + textAnimate, 4, 5);

    // fill('#800000')
    // rect(candy2.x,candy2.y,1,1) //draws red candy
    image(candyCorn, candy2.x, candy2.y + textAnimate, 3, 5)
    // fill(0,255,0)
    // rect(candy3.x,candy3.y,1,1) //green
    if (skittles == 'green') {
      image(greenSkittles, candy3.x, candy3.y + textAnimate, 3, 3)
    } else if (skittles == 'red') {
      image(redSkittles, candy3.x, candy3.y + textAnimate, 3, 3)
    } else if (skittles == 'yellow') {
      image(yellowSkittles, candy3.x, candy3.y + textAnimate, 3, 3)
    } else if (skittles == 'purple') {
      image(purpleSkittles, candy3.x, candy3.y + textAnimate, 3, 3)
    } else if (skittles == 'orange') {
      image(orangeSkittles, candy3.x, candy3.y + textAnimate, 3, 3)
    }
    // fill('#ED500A')
    // rect(candy4.x,candy4.y,1,1) //orange
    image(lollipop, candy4.x, candy4.y + textAnimate, 5, 5)
    textAnimate += addition
    if (textAnimate >= .5 || textAnimate <= 0) {
      addition *= -1
    }
    if (death) {
      // background(0)
      // textFont(bitFont)
      // textSize(5)
      // fill('orange')
      // textAlign(CENTER)
      // text("Game Over", w/2,h/2)
      // textSize(2)
      // text("Score: " + score,w/2,h/2+2.5)
      jumpscare.play()
      jumpscareVid.show()
      image(jumpscareVid, 0, 0, w, h)
      jumpscareVid.play()
      console.log(jumpscare.currentTime())
      jumpscareVid.onended(vidDone)
      

      noLoop()
    }

    if (ghost.gameOver()) {
      // background(0)
      textFont(bitFont)

      fill(255)
      textAlign(CENTER)
      stroke(0)
      strokeWeight(.6)
      image(endGameScreen, 0, 0, w, h)
      textSize(15)
      text("Game Over", w / 2, h / 2 + textAnimate)
      textSize(5)
      strokeWeight(.4)
      text("Score: " + score, w / 2 - 2, h / 2 + 18 + textAnimate)
      playAgain.show()
      playAgain.position(width / 2 - 70, height / 2 + 200 + textAnimate * 15)


      noLoop()
    }
  }
}