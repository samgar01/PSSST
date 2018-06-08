var game = function() {
// Set up an instance of the Quintus engine and include
// the Sprites, Scenes, Input and 2D module. The 2D module
// includes the `TileLayer` class as well as the `2d` componet.
var Q = window.Q = Quintus({ audioSupported: ['mp3','ogg'] })
	.include("Audio, Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D")
	.setup({width: 544, // Set the default width to 320 pixels
			height: 544, // Set the default height to 480 pixels
			})
	// And turn on default input controls and touch input (for UI)
	.controls(true).touch().enableSound();

/*----------------------------------LEVEL1---------------------------------------*/
	Q.scene("level1",function(stage) {
		Q.audio.stop();
		Q.audio.play('fondo.mp3',{ loop: true });
		Q.stageTMX("level.tmx",stage);
		var manolo = stage.insert(new Q.Manolo({stage:stage}));
		var GusanoAzul = stage.insert(new Q.Gusano({x:50,y:50}));
		var GusanoVerde = stage.insert(new Q.Gusano({x:494,y:50,sprite:"GusanoVerde",sheet:"GusanoVerdeRight"}));
		var Josefino = stage.insert(new Q.JosefinoRamiro({x:494, y:193}));
	    var Ramiro = stage.insert(new Q.JosefinoRamiro({x:494, y:296, sheet:"RamiroRight"}));
		var avispaAmarilla = stage.insert(new Q.AvispaBertoldo({x:100, y:77}))
		var avispa = stage.insert(new Q.AvispaBertoldo({x:150, y:77, sprite:"Avispa-Bertoldo", sheet:"AvispaMoradaLeft"}))
		var planta = stage.insert(new Q.Planta({scale:0.3,sheet:"Plant"}));
		var regadera = stage.insert(new Q.Regadera({x:53 ,y:185}));
		var sprayGusanos = stage.insert(new Q.Spray({x:53, y:293}));
		var sprayJR = stage.insert(new Q.Spray({x:53, y:396,sheet:"Josefino"}));
		var sprayAvispa = stage.insert(new Q.Spray({x:53, y:499,sheet:"Avispa"}));

		Q.state.set("end",0);

		Q.state.set("insectos",0);

		stage.add("viewport");
	});

	Q.scene('mainTitle',function(stage) {
		var seleccionado = "play";
	  Q.audio.stop();
		Q.audio.play('intro.mp3',{ loop: true });
	  stage.insert(new Q.Repeater({ asset: "maintitle.png", speedX: 0, speedY: 0, type: 0 }));

	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
	  }));

	  var buttonPlay = box.insert(new Q.UI.Button({ label: "Jugar", x: 10, y: 10, scale: 1.5, fill: "#C97FE5", border: 1, shadow: 10, shadowColor: "#000000" }));

		var buttonCredit = box.insert(new Q.UI.Button({ label: "Créditos", x: 10, y: 100, scale: 1.5, fill: "#7F03AD", border: 1, shadow: 0, shadowColor: "#000000" }));

	  Q.input.keyboardControls({
			ENTER: "start"
		});

	  Q.input.on("start",this, function(){
	  	if(seleccionado == "play"){
	  		seleccionado = null;
		    Q.clearStages();
		    Q.stageScene("level1");
	  	}
	  	else if(seleccionado == "creditos"){
	  	}
	  });

	  Q.input.on("up",this, function(){
	  	//console.log(seleccionado);
	  	if(seleccionado == "play"){
	  		buttonPlay.p.shadow = 0;
	  		buttonPlay.p.fill = "#7F03AD";

	  		buttonCredit.p.shadow = 10;
	  		buttonCredit.p.fill = "#C97FE5";

	  		seleccionado = "creditos";
	  	}
	  	else if(seleccionado == "creditos"){
	  		buttonCredit.p.shadow = 0;
	  		buttonCredit.p.fill = "#7F03AD";

	  		buttonPlay.p.shadow = 10;
	  		buttonPlay.p.fill = "#C97FE5";

	  		seleccionado = "play"
	  	}
	  });

	  Q.input.on("down",this, function(){
	    if(seleccionado == "play"){
	  		buttonPlay.p.shadow = 0;
	  		buttonPlay.p.fill = "#7F03AD";

	  		buttonCredit.p.shadow = 10;
	  		buttonCredit.p.fill = "#C97FE5";

	  		seleccionado = "creditos";
	  	}
	  	else if(seleccionado == "creditos"){
	  		buttonCredit.p.shadow = 0;
	  		buttonCredit.p.fill = "#7F03AD";

	  		buttonPlay.p.shadow = 10;
	  		buttonPlay.p.fill = "#C97FE5";

	  		seleccionado = "play"
	  	}
	  });


	  buttonPlay.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('level1');
	  });

	});


	/*--------------------------------- MANOLO -----------------------------------------*/

	Q.Sprite.extend("Manolo",{
		// the init constructor is called on creation
		init: function(p) {
			// You can call the parent's constructor with this._super(..)
			this._super(p, {
				sheet: "manoloU",
				sprite: "manolo",
				x: 272,
				y: 350,
		   		stepDistance: 3.5, // should be tile size
   				stepDelay: 0.000001,
   				gravity: 0,
   				dead: false,
   				disparo: false,
   				direccion: "R",
   				stage: false,
   				timeFire: 0.3,
   				fire: 0.3

			});
			this.add('2d, stepControls, animation');

			this.on("destroyManolo", function() {
				Q.audio.stop();
				Q.audio.play('muerte_manolo.mp3',{ loop: false });
				this.del("stepControls");
				this.p.dead = true;
				this.p.vx = 0;
				Q.state.set("end",1);
				this.reset();
			});


			// Add in pre-made components to get up and running quickly
			// The `2d` component adds in default 2d collision detection
			// and kinetics (velocity, gravity)
			// The `platformerControls` makes the player controllable by the
			// default input actions (left, right to move, up or action to jump)
			// It also checks to make sure the player is on a horizontal surface before
			// letting them jump.

			// Write event handlers to respond hook into behaviors.
			// hit.sprite is called everytime the player collides with a sprite

			this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {

				if(collision.obj.isA("Spray")){
					if(collision.obj.p.sheet =="Gusano"){
						this.p.disparo = "Gusano";
						this.play("GusanoL");
					}
					else if(collision.obj.p.sheet =="Josefino"){
						this.p.disparo = "Josefino";
						this.play("JosefinoL");
					}
					else if(collision.obj.p.sheet =="Avispa"){
						this.p.disparo = "Avispa";
						this.play("AvispaL");
					}
				}
			});
		},
		reset: function() {
			this.destroy();
			Q.stageScene("endGame",1, { label: "You Died" });
		},
		step: function(dt) {
			this.p.fire-=dt;
			if (Q.state.get("end") == 0) {
				// console.log(this.p.disparo + this.p.direccion);
				if((Q.inputs['left'] || Q.inputs['right'] || Q.inputs['up'] || Q.inputs['down']) && !this.p.disparo) {
					this.play("walk");
				}
				else if((Q.inputs['left'] || Q.inputs['right'] || Q.inputs['up'] || Q.inputs['down']) && this.p.disparo){
					this.play(this.p.disparo + this.p.direccion);
				}
				else if(!(Q.inputs['left'] || Q.inputs['right'] || Q.inputs['up'] || Q.inputs['down']) && !this.p.disparo) {
					this.play("still");
				}
				else if(!(Q.inputs['left'] || Q.inputs['right'] || Q.inputs['up'] || Q.inputs['down']) && this.p.disparo) {
					this.play(this.p.disparo + this.p.direccion + "Still");
				}

				if(Q.inputs['left'])
					this.p.direccion = "L";
				if(Q.inputs['right'])
					this.p.direccion = "R";
				//console.log("disparo: " + this.p.disparo + " direccion: " + this.p.direccion + " disparo y direccion: " + this.p.disparo + this.p.direccion);
				if(this.p.disparo && Q.inputs['fire'] && this.p.direccion == "R" && this.p.fire < 0){
					this.p.stage.insert(new Q.Balas({x:this.p.x + 66, y:this.p.y, sheet:this.p.disparo + this.p.direccion, direccion:this.p.direccion, tipo: this.p.disparo}));
					this.p.fire= this.p.timeFire;
				  Q.audio.play('spray.mp3',{ loop: false });
				}
				else if(this.p.disparo && Q.inputs['fire'] && this.p.direccion == "L" && this.p.fire < 0){
					this.p.stage.insert(new Q.Balas({x:this.p.x - 66, y:this.p.y, sheet:this.p.disparo + this.p.direccion, direccion:this.p.direccion, tipo : this.p.disparo}));
					this.p.fire= this.p.timeFire;
				  Q.audio.play('spray.mp3',{ loop: false });
				}
			} else {
				this.del("stepControls");
				this.del("animation");
			}

			//console.log(this.p.y);
		}

	});
	Q.animations("manolo", {
		walk: { frames: [0,1], rate: 1/16, flip: false, loop: true },
		still: { frames: [0,1], rate: 2, flip: false, loop: true },
		GusanoL: { frames: [2,3], rate: 1/16, flip: false, loop: true },
		GusanoLStill: { frames: [2,3], rate: 2, flip: false, loop: true },
		GusanoR: { frames: [4,5], rate: 1/16, flip: false, loop: true },
	    GusanoRStill: { frames: [4,5], rate: 2, flip: false, loop: true },
		JosefinoL: { frames: [6,7], rate: 1/16, flip: false, loop: true },
		JosefinoLStill: { frames: [6,7], rate: 2, flip: false, loop: true },
		JosefinoR: { frames: [8,9], rate: 1/16, flip: false, loop: true },
		JosefinoRStill: { frames: [8,9], rate: 2, flip: false, loop: true },
		AvispaL: { frames: [10,11], rate: 1/16, flip: false, loop: true },
		AvispaLStill: { frames: [10,11], rate: 2, flip: false, loop: true },
		AvispaR: { frames: [12,13], rate: 1/16, flip: false, loop: true },
		AvispaRStill: { frames: [12,13], rate: 2, flip: false, loop: true }
	});

 /* ---------------------------- Gusano --------------------------------- */

	Q.Sprite.extend("Gusano", {
		init: function(p) {
			this._super(p, {
				sheet: "GusanoAzulRight",
				sprite: "GusanoAzul",
				frame: 0,
				gravity: 0,
				vx: 100,
				vy: -20,
				tipo: "Gusano",
				planta: null,
				comePlanta: false
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("GusanoAzulD", "dead");



		},

		step: function(p) {
			if(this.p.vx > 0){
				this.play("moveL");
			}
			else if(this.p.vx < 0){
				this.play("moveR");
			}
			if(this.p.y > 494 && !this.p.comePlanta)
				this.p.vy= -20;

			if(this.p.y < 50  && !this.p.comePlanta)
				this.p.vy= 20;

			if(this.p.vy == 0 && !this.p.comePlanta)
				this.p.vy= 20;
			//console.log(this.p.vx);

		},


	});

	Q.animations('GusanoAzul', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:false},
		moveR: { frames: [0,1], rate: 1/4, flip: "x"}
	});

	Q.animations('GusanoVerde', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:false},
		moveR: { frames: [0,1], rate: 1/4, flip: "x"}
	});


 /* ---------------------------- Sprays --------------------------------- */
	Q.Sprite.extend("Spray", {
		init: function(p) {
			this._super(p, {
				sheet: "Gusano",//Gusanos|Josefino|Avispa
				//sprite: "Sprays",
				gravity: 0
			});


		},

		step: function(p) {

		}
	});

 /* ---------------------------- AvispaBertoldo --------------------------------- */

	Q.Sprite.extend("AvispaBertoldo", {
		init: function(p) {
			this._super(p, {
				sheet: "AvispaAmarillaRight",
				sprite: "Avispa-Bertoldo",
				frame: 0,
				gravity: 0,
				//vx: 100,
				//vy: -20,
				tipo: "Avispa",
				planta: null,
				comePlanta: false
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("AvispaD", "dead");

		},

		step: function(p) {
			if(this.p.vx > 0){
				this.play("moveL");
			}
			else if(this.p.vx < 0){
				this.play("moveR");
			}
			if(this.p.y > 494 && !this.p.comePlanta)
				this.p.vy= -20;

			if(this.p.y < 50 && !this.p.comePlanta)
				this.p.vy= 20;

			if(this.p.vy == 0 && !this.p.comePlanta)
				this.p.vy= 20;
			//console.log(this.p.vx);

		}

	});

	Q.animations('AvispaBertoldo', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:false},
		moveR: { frames: [0,1], rate: 1/4, flip: "x"}
	});


	Q.animations('AvispaBertoldo', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:false},
		moveR: { frames: [0,1], rate: 1/4, flip: "x"}
	});


	/* ---------------------------- Josefino --------------------------------- */

	Q.Sprite.extend("JosefinoRamiro", {
		init: function(p) {
			this._super(p, {
				sheet: "JosefinoRight",
				sprite: "Josefino",
				frame: 0,
				gravity: 0,
				vx: 100,
				vy: -20,
				tipo: "Josefino",
				planta: null,
				comePlanta: false
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("GusanoVerdeD", "dead");

		},

		step: function(p) {
			if(this.p.vx > 0 )
				this.play("moveL");

			else if(this.p.vx < 0)
				this.play("moveR");

			if(this.p.y > 494 && !this.p.comePlanta)
				this.p.vy= -20;

			if(this.p.y < 50 && !this.p.comePlanta)
				this.p.vy= 20;

			if(this.p.vy == 0 && !this.p.comePlanta)
				this.p.vy= 20;


		}
	});

	Q.animations('Josefino', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:false},
		moveR: { frames: [0,1], rate: 1/4, flip: "x"}
	});


 /* ---------------------------- Balas --------------------------------- */

	Q.Sprite.extend("Balas", {
		init: function(p) {
			this._super(p, {
				sheet: "GusanoR",
				sprite: "balas",
				direccion: "R",
				frame: 0,
				gravity: 0,
				timeLife: 0.5,
				tipo: false
			});

			this.add('2d, animation');

			this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {
				console.log("tipo enemigo:" + collision.obj.p.tipo + "tipo sprite: " + this.p.tipo);
				if(collision.obj.p.tipo==this.p.tipo){
					console.log(Q.state.get("insectos"));
					Q.audio.play('muerte_bicho.mp3',{ loop: false });
					if (collision.obj.p.comePlanta) {
						Q.state.dec("insectos",1);
					}
					collision.obj.destroy();
				}
				else
					this.destroy();
			});

		},

		step: function(dt) {
			//console.log("SHEET:"+this.p.sheet);
			this.p.timeLife-=dt;
			if(this.p.timeLife < 0)
				this.destroy();
			if(this.p.direccion == "R")
				this.p.vx = 300;
			else
				this.p.vx = -300;

		}
	});

	/*Q.animations("balas", {
		JosefinoRamiro: {frames: [4], rate: 1/5, flip: false, loop: true }
	});*/

	/*---------------------------------Regadera-----------------------------------*/
	Q.Sprite.extend("Regadera",{
		init: function(p) {
			this._super(p, {
				sheet: "Regadera", // Setting a sprite sheet sets sprite width and height
				gravity: 0
			});

			this.add();
		}
	});

	/*---------------------------------Planta-----------------------------------*/
	Q.Sprite.extend("Planta",{
		init: function(p) {
			this._super(p, {
				sheet: "Plant", // Setting a sprite sheet sets sprite width and height
				x: 272, // You can also set additional properties that can
				y: 475, // be overridden on object creation
				vidaFin: 350,
				vida: 100,
				timeT: 0.2,
				time: 0.2,
				end: 0
			});


		//var plantaWin = stage.insert(new Q.Planta({scale:0.95, x: 272, y: 380,sheet:"PlantFlower"}));

		},

		step: function(dt) {
			//console.log("VIDA:   "+this.p.vida);
			this.p.time-=dt;
			if (Q.state.get("end") == 0 && Q.state.get("insectos") == 0 && this.p.time < 0 ) {
				this.p.vida++;
				this.p.scale += 0.002;
				this.p.y -= 0.26;
				this.p.time = this.p.timeT;
			}

			if (Q.state.get("end") == 0 &&  Q.state.get("insectos") > 0 && this.p.time < 0) {
				this.p.vida -=  Q.state.get("insectos")/2;
				this.p.scale -= 0.0005* Q.state.get("insectos");
				this.p.y += 0.062* Q.state.get("insectos");
				this.p.time = this.p.timeT;
			}

			if (this.p.vida >= this.p.vidaFin) {
				this.p.sheet = "PlantFlower";
				this.p.y -= 20;
				this.p.x -= 22;
				Q.state.set("end",1);
				this.p.vida = 50;
				Q.stageScene("winGame",1, { label: "You win!" });
			} else if (this.p.vida < 0) {
				Q.state.set("end",1);
				Q.stageScene("endGame",1, { label: "You Died" });
				this.p.vida = 0;
			}
		}
	});

	/*---------------------------------FIN DEL JUEGO-----------------------------------*/
	Q.scene('endGame',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(255,255,255,0.5)"
	  }));

	  var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
	                                           label: "Play Again" }));
	  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
	                                        label: stage.options.label }));
	  button.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('mainTitle');
	  });
	  box.fit(20);
	});


	/*---------------------------------YOU WIN-----------------------------------*/
	Q.scene('winGame',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(255,255,255,0.5)"
	  }));

	  var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
	                                           label: "Play again" }));
	  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
	                                        label: stage.options.label }));
	  button.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('mainTitle');
	  });
	  box.fit(20);
	});

	/*---------------------------------CARGA DEL NIVEL Y DE RECURSOS-----------------------------------*/
	Q.loadTMX("level.tmx", function() {
		Q.stageScene("mainTitle");
	});

	Q.load(["manolo.png","GusanoAzul.png","GusanoVerde.png","Avispa-Bertoldo.png","balaBertoldo.PNG","balaGusano.PNG","balaJosefino.png","Josefino.png","Ramiro.png","Sprays.png","Avispa-Bertoldo.json","BalaBertoldo.json","BalaGusano.json","BalaJosefino.json","GusanoAzul.json","GusanoVerde.json","Josefino.json","Ramiro.json","Sprays.json","manolo.json","Regadera.png","Plant.png","PlantFlower.png","menu.png","maintitle.png","balas.png", "Balas.json", "muerte_manolo.mp3","intro.mp3", "fondo.mp3", "muerte_bicho.mp3", "spray.mp3"], function() {
		Q.compileSheets("manolo.png","manolo.json");
		Q.compileSheets("GusanoAzul.png","GusanoAzul.json");
		Q.compileSheets("GusanoVerde.png","GusanoVerde.json");
		Q.compileSheets("Avispa-Bertoldo.png","Avispa-Bertoldo.json");
		Q.compileSheets("balaBertoldo.PNG","BalaBertoldo.json");
		Q.compileSheets("balaGusano.PNG","BalaGusano.json");
		Q.compileSheets("balaJosefino.png","BalaJosefino.json");
		Q.compileSheets("Josefino.png","Josefino.json");
		Q.compileSheets("Ramiro.png","Ramiro.json");
		Q.compileSheets("Sprays.png","Sprays.json");
		Q.compileSheets("balas.png","Balas.json");

		Q.sheet("Regadera","Regadera.png", { tilew: 39, tileh: 44});
		Q.sheet("Plant","Plant.png", { tilew: 119, tileh: 261});
		Q.sheet("PlantFlower","PlantFlower.png", { tilew: 172, tileh: 287});
		Q.sheet("mainTitle","maintitle.png");
	});

/*---------------------------------COMPONENTE DEFAULTENEMY-----------------------------------*/
Q.component("defaultEnemy",{
	added: function() {
		this.entity.on("bump.left,bump.right,bump.bottom,bump.top","collision");

		// If the enemy gets hit on the top, destroy it
		// and give the user a "hop"
		//this.entity.on("bump.top","deadEnemy");

		//this.entity.on("dead","animationDeadEnemy" );

		//this.entity.on("destroy", "destroyEnemy");
	},

	extend:{
		collision: function(collision) {
			if(collision.obj.isA("Manolo")) {
				collision.obj.trigger("destroyManolo");
			}

			else if(collision.obj.isA("Planta")) {
				if (Q.state.get("end") == 0){
					this.p.planta = collision.obj;
					this.p.vy = 4;
					this.p.vx = 0;
					this.p.comePlanta = true;
					this.del('aiBounce');
					Q.state.inc("insectos",1);
				}
			}


		},

		/*deadEnemy: function(collision) {
			if(collision.obj.isA("Mario")) {
				Q.audio.play('mario_touch_enemy.mp3',{ loop: false });
				this.trigger("dead");
				collision.obj.p.vy = -300;
			}
		},
		animationDeadEnemy: function() {
			this.p.vx = 0;
			this.play("dead", 1);
		},
		destroyEnemy: function() {
			this.destroy();
		}*/
	}

});

};