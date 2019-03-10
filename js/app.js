class Game {
  constructor() {
    this.gameState = false;
    this.s = 0;
    this.m = 0;
    this.time = 0;
    this.gameInterval;
    this.interval = 1000;
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
    
    $(".playground").removeClass("hide").append(hill1).append(hill2).append(hill3);
    
    // let pause = $('<button class="pause" data-state="stop">Stop</div>');

    // pause.on("click", function(){
    //   if($(this).data("state")=="stop"){
    //     gameState = false;
    //     $(this).text("resume");
    //     $(this).data("state","resume");
    //   }else{
    //     gameState = true;
    //     $(this).text("stop");
    //     $(this).data("state","stop");
    //   }
    // });
    
    let timerDiv = $('<div class="timerDiv">czas:'+this.m+':0'+this.s+'</div>');
    let counterTanksDiv = $('<div class="counterTanks">Ilość Czołgów:'+this.counterTanks.length+'</div>');
    let counterLifeDiv = $('<div class="counterLife">Życie:'+this.counterLife+'</div>');
    let levelDiv = $('<div class="level">LEVEL 1</div>');
    $(".menu").append(counterTanksDiv).append(counterLifeDiv).append(timerDiv);
    $(".playground").append(levelDiv);

    // INTERWAŁY
    
    this.timeInterval = setInterval(()=>{
      if (gameState){
        this.timer();
        
      }
    },1000);
    this.createTank();
    this.gameInterval = setInterval(()=>{
      if (gameState){
        this.createTank();
      }
    }, 4000);
  
    this.medInterval = setInterval(()=>{
      this.createMed();
    this.medTimeout = setTimeout(()=>{$(".med").remove()},5000)
    },15000)   
  }

  
  timer() {
    this.time++;
    this.s++;
    
    if (this.s==60){
      this.s = 0;
      this.m++;
    }
    if (this.s < 10 ) { 
      $(".timerDiv").html('czas:'+this.m+':0'+this.s); }else{
      $(".timerDiv").html('czas:'+this.m+':'+this.s); 
    }

    if (this.time == 10 ) {
      clearInterval(game.gameInterval)
      game.gameInterval = setInterval(()=>{
          this.createTank();
          $(".level").html("LEVEL 2");
      }, 2000);
    }else if (this.time == 20 ) {
      clearInterval(game.gameInterval)
      game.gameInterval = setInterval(()=>{
          this.createTank();
          $(".level").html("LEVEL 3 ( your last )");
      }, 1000);
    }else if (this.time == 30 ) {
      clearInterval(game.gameInterval)
      game.gameInterval = setInterval(()=>{
          this.createTank();
          $(".level").html("LEVEL 4 ( sorry this is the last )");
      }, 100);
    }
  }

  createTank() {
    let tanks = this.tanks;
    
    if(tanks.length < game.tanksPosition.length){
      do {
         var randomTank = Math.floor((Math.random() * this.tanksPosition.length) +1 )-1;
      } while (checkTanks(randomTank));


    function checkTanks(id){
      let result = false;
      tanks.forEach(function(e,i){
        if(e.id == id){
          result = true;
        }
      });
      return result;
    }

      let tank = new Tank();
      
      tank.create(this.tanksPosition[randomTank].x,this.tanksPosition[randomTank].y,this.tanksPosition[randomTank].z,randomTank);
      let helpThis = this;
      tanks.push(tank);
     
      tank.element.on("click",function(e){
        clearInterval(tank.interval);
        this.remove();
        tanks.splice(helpThis, 1);
      
        helpThis.counterTanks.push('0');
        $('.counterTanks').html('Ilość Czołgów:'+ helpThis.counterTanks.length);
      });
    }
    
  }
  createMed() {
      let helpThis = this;
      let randomMed = Math.floor((Math.random() * this.tanksPosition.length) +1 )-1;
      let med = new Med();     
      med.create(this.tanksPosition[randomMed].x,this.tanksPosition[randomMed].y,this.tanksPosition[randomMed].z,randomMed);    
      
      med.element.on("click",function(){
        helpThis.counterLife += 2;
        $('.counterLife').html("Życie:"+game.counterLife);
        this.remove();
      }); 
    }

  endGame() {
    if ( game.counterLife < 1){
      let gameOver = $('<div class="over">You Loose</div>');
      let startAgain = $('<button class="startGame"><a href="index.html">One More Time</a></button>')
      $(".playground").remove();
      $(".counterLife").remove();
      // $(".pause").remove();
      $(".box").append(gameOver).append(startAgain);
      
      game.tanks.forEach((element)=>{
        clearInterval(element.interval);
      });
      game.tanks = [];

      clearInterval(game.gameInterval);
      clearInterval(game.timeInterval);
    } 
  }
}

class Tank {
  constructor(){
    this.position = {};
    this.id;
    this.element;
    this.interval = setInterval(function(){
      game.counterLife--;
      $('.counterLife').html("Życie:"+game.counterLife);
       game.endGame();
       },4000);
  }

  create(x,y,z,id) {
    this.position.x=x;
    this.position.y=y;
    this.position.z=z;
    let tank = $('<div class="tank" data-id="'+id+'"><circle class="tower" /></div>');
    tank.css('top', this.position.y).css('left', this.position.x).css('z-index', this.position.z);
    this.element = tank;
    $(".playground").append(tank);
    this.id = id;
  }
}
class Med {
  constructor(){
    this.position = {};
    this.id;
    this.element;
  }
  create(x,y,z,id) {
    this.position.x=x;
    this.position.y=y;
    this.position.z=z;
    let med = $('<div class="med"></div>');
    med.css('top', this.position.y).css('left', this.position.x).css('z-index', this.position.z);
    this.element = med;
    $(".playground").append(med);
    this.id = id;
  }
}

let game = new Game();

console.log(game);

$("button").on("click", function(){
  game.startGame();
});