var ball;
var balldatabase,posref,pos;

function preload(){
backgroundImg = loadImage("cityImage.png");
ballonImg = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
}

function setup(){
    createCanvas(900,500);
    balldatabase = firebase.database();
 //   console.log(balldatabase);
    ball = createSprite(250,250,30,30);
    ball.shapeColor = "red";
    ball.addAnimation("ballonImg",ballonImg)
    ball.scale=0.3;
    posref =  balldatabase.ref('Ball/Position');
    posref.on("value", readPosition,showError);
}

function draw(){
    background(backgroundImg);
    if(pos!== undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
}

function changePosition(x,y){
    balldatabase.ref('Ball/Position').set(
        {x: pos.x+ x,y:pos.y+ y})
    
}

function readPosition(data)
{
    pos = data.val();
    console.log(pos);
    ball.x = pos.x;
    ball.y = pos.y;
}
function showError(){
    console.log("Error reading the database ");
}