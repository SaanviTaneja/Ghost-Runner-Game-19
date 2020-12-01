var climber, climberImage,climberGroup;
var door, doorImage ,doorGroup;
var tower, towerImage;
var ghost, ghostImage;
var invisibleBlock;
var gameState = "play";
var spookySound;


function preload(){
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  }

function setup(){
createCanvas(600,600);
  
tower = createSprite(300,300);
tower.addImage(towerImage);
tower.velocityY = 1;
  

ghost = createSprite(300,300,50,50);
ghost.addImage(ghostImage);
ghost.scale = 0.3;


  
doorGroup = new Group();
climberGroup = new Group();
invisibleGroup = new Group();
  
  
}
function draw(){
  background(0);
  //spookySound.loop();
  
  if(gameState === "play"){
    if(tower.y>400){
    
    tower.y = 300;
  }
    if(keyDown(LEFT_ARROW)){
  ghost.x = ghost.x-3;
  }
    
if(keyDown(RIGHT_ARROW)){
  ghost.x = ghost.x+3;
  }
  
if(keyDown("space")){
  ghost.velocityY = -3;
}
    ghost.velocityY = ghost.velocityY + 0.2
    spawnDoors();
    
    if(climberGroup.isTouching(ghost)){
      
      ghost.velocityY = 0;
      ghost.velocityX = 0;
    }
    
    if(ghost.isTouching(invisibleGroup)){
      ghost.destroy();
      gameState = "end";
  }
    drawSprites();
  }
 if(gameState === "end") {
   fill("yellow");
   text("GAME OVER",300,300);
   
   
   
 }
  
  

  
  
  
  
  
}

function spawnDoors(){
if(frameCount%240 === 0){
door = createSprite(200,-50);
door.addImage(doorImage);
door.x = Math.round(random(120,400));
door.velocityY = 1; doorGroup.add(door);
door.lifetime = 800;
  
climber = createSprite(200,10);
climber.addImage(climberImage);
climber.x = door.x;
climber.velocityY = 1;
climber.lifetime = 800;
climberGroup.add(climber);
  

invisibleBlock = createSprite(200,15);
invisibleBlock.velocityY = 1;
invisibleBlock.x = door.x;
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.debug = true;
invisibleBlock.lifetime = 800;
invisibleGroup.add(invisibleBlock);

  
ghost.depth = door.depth;
ghost.depth = ghost.depth+1;
}
  
  

  
}

