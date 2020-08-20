var trex, ground, invisibleGround, trexRunning, trexCollided, groundImage, obstacleGroup, cloudGroup, o1, o2, o3, o4, o5, o6, cloudImg, x, score, gameState, PLAY, END, gameOver, restart, restartimg, gameOverimg, highScore;

// Preload function
function preload() {
 trexRunning = loadAnimation ("trex1.png","trex3.png","trex4.png");
 trexCollided = loadImage ("trex_collided.png")
  groundImage = loadImage ("ground2.png")
  o1 = loadImage ("obstacle1.png")
  o2 = loadImage ("obstacle2.png")
  o3 = loadImage ("obstacle3.png")
  o4 = loadImage ("obstacle4.png")
  o5 = loadImage ("obstacle5.png")
  o6 = loadImage ("obstacle6.png")
  cloudImg = loadImage ("cloud.png")
  restartimg = loadImage ("restart.png");
  gameOverimg = loadImage ("gameOver.png");
}

// Setup function
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("trexRunning", trexRunning)
  trex.addImage("trexCollided", trexCollided)
  trex.scale = 0.5
  ground = createSprite (200,180,400,20);
  ground.addImage("ground" , groundImage)
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  ground.x = ground.width/2
  obstacleGroup = new Group();
  cloudGroup = new Group();
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver", gameOverimg);
  gameOver.visible = false
  gameOver.scale = 0.5
  restart = createSprite(300,140);
  restart.addImage("restart", restartimg);
  restart.visible = false
  restart.scale = 0.5
  score = 0
  x = 50
  PLAY = 0
  END = 1
  gameState = PLAY
  highScore = 0
}

// Draw function
function draw() {
  background(255,255,255);
  text("Score: "+ Math.round(score), 400, 50);
  if (highScore != 0) {
    text("Hi Score: " + Math.round(highScore), 300, 50);
  }
  
  // This all happens if the gameState is PLAY
  if (gameState == PLAY) {
  score = score + 0.25
  trex.collide(invisibleGround)
  trex.velocityY = trex.velocityY + 0.8
  if (keyDown("space") && trex.isTouching(ground)) {
      trex.velocityY = -10
      }
  ground.velocityX = -(6 + 3*score/100)
  if (ground.x < 0){
  ground.x = ground.width/2
      }
  spawnClouds();
  spawnObstacles();
    if (obstacleGroup.isTouching(trex))  {
        gameState = END
        }
}
else if(gameState == END) {
  obstacleGroup.setVelocityEach(0,0);
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setVelocityEach(0,0);
  cloudGroup.setLifetimeEach(-1);
  ground.velocityX = 0;
  trex.velocityY = 0;
  restart.visible = true
  gameOver.visible = true
  trex.changeImage ("trexCollided", trexCollided);
  if (score > highScore) {
      highScore = score
      }
  if (mousePressedOver(restart)) {
    reset();
      }
        }
  
  drawSprites();
}

function spawnClouds(){
   if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud", cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
     gameOver.depth = cloud.depth + 2
     restart.depth = cloud.depth + 2
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }

}

function spawnObstacles() {
 if(score === x) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage("obstacle", o1)
      break;
      case 2: obstacle.addImage("obstacle", o2)
        break;
        case 3: obstacle.addImage("obstacle", o3)
        break;
        case 4: obstacle.addImage("obstacle", o4)
      break;
      case 5: obstacle.addImage("obstacle", o5)
        break;
        case 6: obstacle.addImage("obstacle", o6)
        break;
        default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
    x = x + Math.round(random(20, 30));
}
}

function reset() {
   gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("trexRunning", trexRunning);
  
  score = 0; 
}