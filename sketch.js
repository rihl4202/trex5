//Indentation - adding a tab space in the beginning of the line

var gamestate = 1
var score = 0

//load animation, images and sound
function preload(){
  trexAni = loadAnimation("trex1.png", "trex3.png","trex4.png")
  groundimg = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")

}

function setup(){
  createCanvas(600,200)
  trex = createSprite(50,180,15,10)
  trex.addAnimation("running",trexAni)
  trex.scale = 0.5

  ground = createSprite(300,190,600,20)
  ground.addImage(groundimg)

  ground2 = createSprite(300,200,600,20)
  ground2.visible = false 

 cloudgroup = createGroup()
 objgroup = createGroup()
}

function draw(){
  background(180)
  
  if(gamestate === 1){
    
    score = score+ Math.round(frameCount/60)
  ground.velocityX = -3
  if(ground.x < 0){
    ground.x = 600
  }
  
  if(keyDown("space") && trex.y>166){
    trex.velocityY = -7
  }
  trex.velocityY = trex.velocityY +0.3

  clouds()
  objects()

  if(trex.isTouching(objgroup)){
    gamestate = 0
  }
  }

  if(gamestate === 0){
    ground.velocityX = 0
    cloudgroup.setVelocityXEach(0)
    objgroup.setVelocityXEach(0)
  }
  
  trex.collide(ground2)
  text("Score: "+score,500,20)
  drawSprites()
}

function clouds(){
  if(frameCount%40===0){
  cloud = createSprite(600,random(30,100),20,20)
  cloud.velocityX = -5
  cloud.addImage(cloudimg)
  cloud.scale = 0.6
  trex.depth = cloud.depth+2
  cloud.lifetime = 130
  cloudgroup.add(cloud)
}
}

function objects(){
  if(frameCount%60===0){
    cactus = createSprite(600,175,10,20)
    cactus.velocityX = -6
    cactus.scale = 0.5
    switch(Math.round(random(1,6))){
      case 1:cactus.addImage(ob1)
      break
      case 2:cactus.addImage(ob2)
      break
      case 3:cactus.addImage(ob3)
      break
      case 4:cactus.addImage(ob4)
      break
      case 5:cactus.addImage(ob5)
      break
      case 6:cactus.addImage(ob6)
      break   
    }
    cactus.lifetime = 100
    objgroup.add(cactus)
  }
}
