var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisBlock, invisGroup;
var gameState = "play";
//var spookySound;
function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  ghostImage = loadImage("ghost-standing.png");
  climberImage = loadImage("climber.png");
  //spookySound = loadSound("spooky.wav");
}



function setup(){
  createCanvas(480,480);
  //sound is irritating
  //spookySound.loop();
  //towers
  tower = createSprite(240,240);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  tower.scale = 0.9;
  //ghost
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisGroup = new Group();
  
}




function draw(){
  background(0);
  if (gameState === "play"){
    if (tower.y > 400){
    tower.y = 300;
  }
  if (keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 3;
  }
  if (keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  spawnDoors();
  drawSprites();
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if (invisGroup.isTouching(ghost)||ghost.y > 480){
    ghost.destroy();
    gameState = "end";
  }           
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!",150,140);
  }
  
  
  
  
  
}
function spawnDoors(){
  if (frameCount % 240 === 0){
  door = createSprite(200,-50);
  door.addImage(doorImage);
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  door.lifetime = 800;
  doorGroup.add(door);
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
  climber = createSprite(200,10);
  climber.addImage(climberImage);
  climber.x = door.x;
  climber.velocityY = 1;
  climber.lifetime = 800;
  climberGroup.add(climber);
  climber.depth = door.depth;
  invisBlock = createSprite(200,15, 100, 2);
  invisBlock.x = door.x
  invisBlock.velocityY = 1;
  invisBlock.visible = false;
  invisGroup.add(invisBlock);   
  }
}
