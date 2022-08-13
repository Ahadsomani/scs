var boy,boyimg,boyimg1;
var path,pathimg;
var obj1,obj2,obj3;
var virus,virus1,virusimg1,virusimg2;
var sani,saniimg;
var spray;
var flag=0;
var hit,happy,horn,lost,scream; 

var kills=5;
var lives=3;

var vaccine,vaccineimg;
var gameover,gameoverimg;
var ambulance,ambulanceimg;
var ground, groundimg;
var brick1Img , brick1
var brick2Img , brick2
var brick3Img , brick3
var brickGroup
var ambCount=0;

var PLAY=1;
var END=0;
var WON = 2;
var gameState=PLAY;
var level=1

var goal

function preload(){
boyimg = loadAnimation( "man1.png", "man2.png", "man3.png", "man4.png", "man5.png", "man6.png", "man7.png", "man8.png");                   
boyimg1 = loadAnimation( "mandied.png");
boyimg2 = loadAnimation( "man1.png");


pathimg=loadImage( "road.png");

virusimg1=loadImage( "virus1.png");
virusimg2=loadImage( "virus2.png");
brick1Img = loadImage("brick 1.png")
brick2Img = loadImage("brick 2.png")
brick3Img = loadImage("brick 3.png")
obstacleImg=loadImage("Obstacle.png");
groundimg=loadImage("")

saniimg=loadImage( "sanitizer.png");
vaccineimg=loadImage( "vaccine.png");
ambulanceimg=loadImage( "ambulance.png");

spray=loadSound( "sprayS.mp3");
hit=loadSound( "hitS.wav");
happy=loadSound( "happyS.wav");
horn=loadSound( "sirenS.wav");
lost=loadSound( "lostS.mp3");
scream=loadSound( "screamS.wav");

gameoverimg=loadImage( "gameover.png");
}

function setup() {
  createCanvas(1880,945);

  //creating the ground
  path=createSprite(1400,400);
  path.addImage("pathimg",pathimg);
  path.scale=1.2;
  path.velocityX=-(5+kills/10);
  
  //creating the player
  boy=createSprite(500, 500, 300, 50);
  boy.addAnimation("boyimg",boyimg);
  boy.debug=false;
  boy.setCollider("rectangle",10,0,30,120);
  boy.scale=1.5

  //creating the sanitizer
  sani=createSprite(90, 300, 50, 50);
  sani.x=boy.x+60;
  sani.y=boy.y;
  sani.addImage("saniimg",saniimg);
  sani.scale=0.1;

  //Creating the ambulance
  ambulance=createSprite(2000,50);
  ambulance.addImage("ambulanceimg",ambulanceimg);
  ambulance.y=boy.y;
  ambulance.debug=false;
  ambulance.scale=0.25;

  //creating the edges for the player
  obj1=createSprite(600,450,1200,5);
  obj1.visible=false;
  obj2=createSprite(600,920,1200,5);
  obj2.visible=false;

  //Creating the gameover icon
  gameover=createSprite(935,500,50,200);
  gameover.addImage("gameoverimg",gameoverimg);
  gameover.visible=false;
  gameover.scale=0.25

  //setting up groups
  virusGroup=new Group();
  vaccineGroup=new Group();
  amb=new Group();

}

function draw() {
  background(0)
  console.log("gameState:",gameState)
  console.log(level)
  if(kills>0 && kills<40 && gameState===PLAY){
    level1();
  }
  if( kills>=20 && gameState===PLAY){
    level=2
    level2();
  }
  
  if(kills===100&& gameState===PLAY){
   gameState===WON
  }

  if(lives<=0){
    gameState=END
  }

  if(gameState===END){
    end()
  }

 
  if(gameState===WON){
    won()
  }

  drawSprites();

  if(gameState===PLAY){
    fill("black");
    textSize(30);
    text("Covid Kills: "+kills,980,60);

    fill("black");
    textSize(30);
    text("Lives: "+lives,100,60);

    fill("black");
    textSize(30);
    text("Press SPACE to use Sanitizer",400,60);
  }
}

//writing the function to spawn the virus and vaccine 
function spawnvirus(){
  if(frameCount%220===0){
   virus=createSprite(1300,50);
   virus.addImage("virusimg1",virusimg1);
   virus.y=Math.round(random(700,850));
   virus.scale=0.13;
   virus.velocityX=-(5+kills/10);
   virus.lifetime=1250;
   virusGroup.add(virus);
   boy.depth=virus.depth+1;
  }
}

function spawnvaccine(){
    if(frameCount%1000===0){
    vaccine=createSprite(1300,50);
    vaccine.addImage("vaccineimg",vaccineimg);
    vaccine.y=Math.round(random(700,850));
    vaccine.scale=0.3;
    vaccine.velocityX=-(5+kills/10);
    vaccine.lifetime=1250;
    vaccineGroup.add(vaccine);
    boy.depth=vaccine.depth+1;
  }
}

function reset(){
  gameState=PLAY;

  boy.addAnimation("boyimg",boyimg);
  boy.changeAnimation("boyimg");
  boy.setCollider("rectangle",10,0,30,120);

  path.velocityX=-(5+kills/10);

  gameover.visible=false;
  ambulance.visible=false;

  kills=0;
  lives=3;
  flag=0;
  ambCount=0;
  level=1
}
function end(){
  path.velocityX=0;
  gameover.visible=true;

  //changing the animation when the player died
  boy.setCollider("rectangle",0,45,150,35);
  boy.addAnimation("boyimg1",boyimg1);
  boy.changeAnimation("boyimg1");

  //destroying the objects
  sani.destroy();

  virusGroup.setVelocityXEach(0);
  vaccineGroup.setVelocityXEach(0);

  vaccineGroup.setLifetimeEach(-1);
  virusGroup.setLifetimeEach(-1);

  vaccineGroup.destroyEach();
  virusGroup.destroyEach();

  if((keyDown("a")||mousePressedOver(gameover))&& ambCount==0){
    ambulance=createSprite(1300,740);
    ambulance.addImage("ambulanceimg",ambulanceimg);
    ambulance.y=boy.y+10;
    horn.play();
    ambulance.debug=false;
    ambulance.scale=1.7;
    ambulance.velocityX=-(7);
    boy.depth=ambulance.depth+1;
    amb.add(ambulance);
    ambCount=1;
  }

  if(amb.isTouching(boy)){
    ambulance.velocityX=0;
    ambulance.lifetime=1;
    horn.pause();
    happy.play();
    reset();
  }
}


function won(){
  path.velocityX=0;
 
    fill("black");
    textSize(30);
    text("Congratzz..!! You survived",980,200);
    //changing the animation when the player died
    boy.setCollider("rectangle",0,45,150,35);
    boy.addAnimation("boyimg2",boyimg2);
    boy.changeAnimation("boyimg2");

    //destroying the objects
    sani.destroy();

    virusGroup.setVelocityXEach(0);
    vaccineGroup.setVelocityXEach(0);

    vaccineGroup.setLifetimeEach(-1);
    virusGroup.setLifetimeEach(-1);

    vaccineGroup.destroyEach();
    virusGroup.destroyEach();
}
function level1(){
  background("sinbad"); 

  sani.destroy();

  path.velocityX=-(5+kills/10);

  obj1.depth=path.depth+1;
  obj2.depth=path.depth+1;

  if(gameState===PLAY){

    sani.destroy();

    //Spawning the items
    spawnvirus(); 
    spawnvaccine();

    //giving infinite path
    if(path.x<0.1){
      path.x=1200
    }

    //giving the lifelines
    if(virusGroup.isTouching(boy)){   
      virusGroup.destroyEach();
      hit.play();
      lives-=1;
    }

    //giving the lifelines
    if(vaccineGroup.isTouching(boy) && lives<3){
      vaccineGroup.destroyEach();
      happy.play();
      lives+=1;  
    }

    //changing the gamestate when there are no lifelines
    if(lives<=0){
      gameState=END;
      //lost.play();
      flag+=1;
    }

    if(flag>0 && flag<=2){
      lost.play();
    }

    //Making the player not to exceed the road
    if(boy.isTouching(obj1)||boy.isTouching(obj2)||ambulance.isTouching(obj2)){
      boy.bounceOff(obj1);
      boy.bounceOff(obj2);
      ambulance.bounceOff(obj2);
    }
  }

    //giving movements to the player 
    if(keyDown(UP_ARROW) && gameState===PLAY){
      boy.y+=-5;
    }

    if(keyDown(DOWN_ARROW) && gameState===PLAY){
      boy.y+=5;
    }
   
    //Showing the sanitizer whwn space is pressed 
    if(keyDown('SPACE') && gameState===PLAY){
      sani=createSprite(90, 300, 50, 50);
      sani.x=boy.x+31;
      sani.y=boy.y;
      sani.addImage("saniimg",saniimg);
      sani.scale=0.12;
      sani.lifetime=0;
      sani.debug=false;
      sani.setCollider("rectangle",80,50,400,200);
      sani.depth=boy.depth+4;
      spray.play();
    }

    //giving the kills
    if(virusGroup.isTouching(sani)){
      virus.destroy();
      virus1=createSprite(0,0);
      virus1.x=virus.x-20;
      virus1.y=virus.y;
      virus1.addImage("virusimg1",virusimg1);
      virus1.scale=0.25;
      virus1.velocityX=-(5+kills/10);
      virus1.lifetime=5;
      scream.play();
    
      kills+=5;    
    }
}

function level2(){
  function setup() {
    createCanvas(960, 540);
    
    brickGroup= new Group();
    virusGroup = new Group();
    
    ground=createSprite(490,100,20,20);
    ground.addImage("ground",groundImg);
    //ground.scale=0.8;
    //ground.velocityX=-1;
    
    
    element=createSprite(450,100,30,30);
    element.addImage("element",elementImg);
    element.scale=0.4;
    element.velocityX=-3;
    
    boy=createSprite(80,360,30,30);
    boy.addImage("boy",boyImg);
    boy.scale=0.4;
    
    
    invisibleGround=createSprite(100,400,20,10);
    invisibleGround.visible=false;
    
    //gameOver=createSprite(300,100,);
    //gameOver.addImage(gameOverImg);
    //gameOver.scale=3;
    
    
  }
  
  function draw() {
    background(0);
   
    if(gameState==="play"){
      
      ground.velocityX=-3;
       //infinite ground 
    if(ground.x<0){
      ground.x=ground.width/2;   
    }
      if(element.x<0){
        element.x=element.width/2
      }
      if(keyDown("space")){
        boy.velocityY=-5;
      }
      boy.velocityY=boy.velocityY+0.5
      
      if(brickGroup.isTouching(boy)){
        boy.velocityY=0;
      }
    if(virusGroup.isTouching(boy)){
      boy.destroy();
      gameState="end";
    }
      boy.collide(invisibleGround);
      //gameOver.visible=false;
      spawnBricks();
      spawnviruss();
      drawSprites();
  
      
    }
  else if(gameState==="end"){
    //gameOver.visible=true;
      stroke("black");
      fill("yellow");
      textSize(50);
      text("OMG YOU HAVE LOST :)",250,300);
    
  }
   //  drawSprites();
  } 
    
  
  function spawnBricks(){
   if(frameCount%100===0){
    brick=createSprite(600,165,10,40);
    brick.velocityX=-6;
    brick.scale=0.5;
     
   
    brick.x=Math.round(random(900,500));
    var rand=Math.round(random(1,3));
      switch(rand){
        case 1:brick.addImage(brick1Img);
        break;
        case 2:brick.addImage(brick2Img);
        break;
        case 3:brick.addImage(brick3Img);
        break;
        default:break;   
      }
      brickGroup.add(brick);
    
    brick.lifetime=300;
   }
  }}
  
