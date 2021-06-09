var monkey, monkey_running
var banana, bananaImage, obstacles, obstacleImage
var bannanGroup, obstacleGroup
var score
const PLAY = 1
const END = 0
var score = 0
var jump_s, die_s, checkpoint_s
localStorage["HighestScore"] = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  // die_s=loadSound("die.mp3")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500)
  gameState = PLAY
  monkey = createSprite(50, 350, 20, 20)
  ground = createSprite(250, 380, 500, 20)
  ground.velocityX = -3
  monkey.addAnimation("running", monkey_running)
  monkey.scale = .1
  obstacleGroup = createGroup()
  bannanGroup = createGroup()
}


function draw() {
  background("green")
  if (gameState == PLAY) {
    if (ground.x < 250) {
      ground.x = ground.width / 2;
    }
    bannanas()
    obstacle()
    if (keyDown("space") && monkey.y >= 329) {
      monkey.velocityY = -12

    }
    monkey.velocityY = monkey.velocityY + 0.5
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END
    }
  } else if (gameState == END) {
    monkey.velocityY = 0
    ground.velocityX=0
    bannanGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    bannanGroup.setLifetimeEach(-10)
    // restart.visible = true
    // gameover.visible = true
  }
  monkey.collide(ground)
  drawSprites()
  console.log(monkey.y)
}

function bannanas() {
  if (frameCount % 80 === 0) {

    banana = createSprite(500, random(120, 200), 20, 20)
    banana.addImage(bananaImage)
    banana.velocityX = -3
    banana.scale = .1
    banana.lifetime = 500 / 3
    bannanGroup.add(banana)
  }

}


function obstacle() {
  if (frameCount % 100 === 0) {

    obstacles = createSprite(500, 350, 20, 20)
    obstacles.addImage("abc", obstacleImage)
    obstacles.velocityX = -3
    obstacles.scale = .1
    obstacles.lifetime = 500 / 3
    obstacleGroup.add(obstacles)

  }

}

function reset() {
  score = 0
  restart.visible = false
  gameover.visible = false
  ground.velocityX = -4
  gameState = PLAY
  obstaclegroup.destroyEach();
  bannanaGroup.destroyEach()
}