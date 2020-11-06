var dog, happyDog;
var foodS, foodStock;
var database;

function preload() {
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  textFont("Georgia");
  textSize(20);
  textAlign(CENTER);
  fill("white");
  text("Food Stock: " + foodS, 400, 30);

  textFont("Georgia");
  textSize(20);
  textAlign(CENTER);
  fill("white");
  text("Press the UP arrow key to feed Silu milk!", 190, 480);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}