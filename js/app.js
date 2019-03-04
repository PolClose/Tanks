class Game {
  constructor() {
    this.gameState = false;
    this.time = 0;
    this.gameInterval;
    this.tanksPosition = [
      {"x":50,"y":105,"z":9},
      {"x":150,"y":100,"z":9},
      {"x":250,"y":100,"z":9},
      {"x":350,"y":115,"z":9},
      {"x":500,"y":165,"z":19},
      {"x":400,"y":180,"z":19},
      {"x":300,"y":195,"z":19},
      {"x":200,"y":215,"z":19},
      {"x":100,"y":290,"z":29},
      {"x":200,"y":295,"z":29},
      {"x":300,"y":300,"z":29},
      {"x":400,"y":305,"z":29},
    ];

    this.tanks = [];
    this.counterTanks = [];
    this.counterLife = 10;
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
    
    let timerdiv = $('<div class="timerdiv">czas:'+this.time+'</div>');
    let counterTanks = $('<div class="counterTanks">Ilosc Czołgów'+this.counterTanks+'</div>');
    let counterLife = $('<div class="counterLife">Życie'+this.counterLife+'</div>');
    $(".menu").append(pause).append(counterTanks).append(counterLife).append(timerdiv);

    // this.createTank();

    this.gameInterval = setInterval(()=>{
      let time = this.time;
      if (gameState){
        this.createTank()
        
      }
    },1000);

  }
  
  createTank() {
    let tanks = this.tanks;
    
    let tanksPosition = this.tanksPosition;
      
    //let randomTank = Math.floor((Math.random() * this.tanksPosition.length) +1 )-1;
    if(tanks.length<12){
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
      tank.create(this.tanksPosition[randomTank].x,this.tanksPosition[randomTank].y,this.tanksPosition[randomTank].z,randomTank);
    
      tanks.push(tank);
      
      tank.element.on("click",function(e){
      this.remove();
      console.log($(e.target).data("id"));
      tanks.splice($(e.target).data("id"), 1);
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

  create(x,y,z,id) {
    this.position.x=x;
    this.position.y=y;
    this.position.z=z;
    let playgroung = $(".playground");
    let tank = $('<div class="tank" data-id="'+id+'"><circle class="tower" /></div>');
    tank.css('top', this.position.y).css('left', this.position.x).css('z-index', this.position.z);
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