var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var  feed;
var  lastfeed;
var fedtime
//crea aquí las variables feed y lastFed 


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;



 feed=createButton("alimenta al perro");
  feed.position(300,95);
  feed.mousePressed(feedDog);
  //crea aquí el boton Alimentar al perro


  addFood=createButton("Agregar Alimento");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  
 fedtime=database.ref('FeedTime');
 fedtime.on("value",function(data){
   lastfeed=data.val();
 })
  //escribe el código para mostrar el texto lastFed time aquí
fill(255,255,254);
textSize(15);
if (lastfeed>=12){
  text("Última hora en que se alimentó : "+ lastfeed%12 + " PM", 350,30);

} else if(lastfeed==0){
  text("Última hora en que se alimentó : 12 Am", 350,30);
}else {
  text("Última hora en que se alimentó : "+ lastfeed + " AM", 350,30);
}
 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  if (foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);

  } else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
