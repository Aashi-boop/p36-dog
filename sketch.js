var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and available Food variable here

//add1
var feed, availableFood;

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

  //create feed the dog button here

 //add2
  feed= createButton("Feed Dog");
  feed.position(500,95)
  feed.mousePressed(feedDog)
  //
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  //add3
  database.ref("Food").on("value", function(data)
  {
    availableFood= data.val()
  }) 
 
  //write code to display text available Food time here
  fill(255,255,254);
  textSize(15);
  text("Available Food : "+ availableFood , 400,30);
  // 
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  //add4
  database.ref("/").update({
    Food: foodObj.deductFood(),
   
  })
  //
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
