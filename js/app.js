class Game {
  constructor() {
    this.gameState = false;
    this.counterTanks = 0;
    this.counterLife = 10;
    this.time = 0;
    this.gameInterval;

    this.tanksPosition = [
      {"x":50,"y":0},
      {"x":100,"y":0},
      {"x":150,"y":0},
    ];

    this.tanks = [];
  }

  startGame() {
    this.gameState = true;
    let gameState = this.gameState;
    $('.start').remove();

    let hill1 = $('<div class="hill1"><div>');
    let hill2 = $('<div class="hill2"><div>');
    let hill3 = $('<div class="hill3"><div>');
    
    $(".playground").append(hill1).append(hill2).append(hill3);
    
    let pause = $('<button class="pause" data-state="stop">Stop</div>');

    pause.on("click", function(){
      if($(this).data("state")=="stop"){
        gameState = false;
        $(this).text("resume");
        $(this).data("state","resume");
      }else{
        gameState = true;
        $(this).text("stop");
        $(this).data("state","stop");
      }
    });
    let counterTanks = $('<div class="counterTanks">Ilosc Czołgów'+this.counterTanks+'</div>');
    let counterLife = $('<div class="counterLife">Życie'+this.counterLife+'</div>');
    $(".menu").append(pause).append(counterTanks).append(counterLife);

   

 

    this.createTank();

    this.gameInterval = setInterval(()=>{
      
      if (gameState){
        this.createTank()
        
      }
    },1000);

console.log(this);


  }

  createTank() {
    let tanks = this.tanks;
    
    
    let tanksPosition = this.tanksPosition;
      
    //;
    //let randomTank = Math.floor((Math.random() * this.tanksPosition.length) +1 )-1;
    if(tanks.length<3){
      do {

         var randomTank = Math.floor((Math.random() * this.tanksPosition.length) +1 )-1;
      
      } while (checkTanks(randomTank));
    //checkTanks(randomTank);

    function checkTanks(id){
      let result = false;
      tanks.forEach(function(e,i){
        console.log('id',e.id);
        if(e.id == id){
          result = true;
          console.log('jest');
          //debugger;
        }
        
      });
      return result;
    }
      let tank = new Tank();
      tank.create(this.tanksPosition[randomTank].x,this.tanksPosition[randomTank].y,randomTank);
    

      tanks.push(tank);
      console.log(tanks);
    
      tank.element.on("click",function(e){
      this.remove();
      console.log($(e.target).data("id"));
      
          tanks.splice($(e.target).data("id"), 1);
      
      console.log(tanks);
      
    });
  }
    
  }
}

class Tank {
  constructor(){
    this.life = 1;
    this.position = {
      "x": 0,
      "y": 0
    };
    this.id;
    this.element;
  }

  create(x,y,id) {
    this.position.x=x;
    this.position.y=y;
    let playgroung = $(".playground");
    let tank = $('<div class="tank" data-id="'+id+'"></div>');
    tank.css('top', this.position.y).css('left', this.position.x);
    this.element = tank;
    playgroung.append(tank);
    this.id = id;

  }

}

let game = new Game();

console.log(game);

$("button").on("click", function(){
  game.startGame();
});
