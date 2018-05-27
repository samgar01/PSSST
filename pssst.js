var game = function() {
// Set up an instance of the Quintus engine and include
// the Sprites, Scenes, Input and 2D module. The 2D module
// includes the `TileLayer` class as well as the `2d` componet.
var Q = window.Q = Quintus()
	.include("Audio, Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D")
	.setup({width: 544, // Set the default width to 320 pixels
			height: 544, // Set the default height to 480 pixels
			})
	// And turn on default input controls and touch input (for UI)
	.controls(true).touch();

/*----------------------------------LEVEL1---------------------------------------*/
	Q.scene("level1",function(stage) {
		Q.stageTMX("level.tmx",stage);
		var manolo = stage.insert(new Q.Manolo());
		var GusanoAzul = stage.insert(new Q.GusanoAzul({x:50,y:50}));
		var GusanoVerde = stage.insert(new Q.GusanoVerde({x:494,y:50}));
		var Josefino = stage.insert(new Q.JosefinoRamiro({x:494, y:193}));
		var Ramiro = stage.insert(new Q.JosefinoRamiro({x:494, y:296, sheet:"RamiroRight"}));
		var avispaVerde = stage.insert(new Q.AvispaBertoldo({x:494, y:399}))
		var avispaAzul = stage.insert(new Q.AvispaBertoldo({x:494, y:502, sheet:"AvispaMoradaRight"}))
		var planta = stage.insert(new Q.Planta({scale:0.3,sheet:"Plant"}));
		var regadera = stage.insert(new Q.Regadera({x:53 ,y:185}));
		var sprayGusanos = stage.insert(new Q.Spray({x:53, y:293}));
		var sprayJR = stage.insert(new Q.Spray({x:53, y:396,sheet:"SprayJosefinoRamiro"}));
		var sprayAvispa = stage.insert(new Q.Spray({x:53, y:499,sheet:"SprayAvispa"}));


		stage.add("viewport");
	});

	Q.scene('mainTitle',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
	  }));

	  var button = box.insert(new Q.UI.Button({ x: -1, y: 0, asset: "maintitle.png", scale: 1.25 }));

	  Q.input.keyboardControls({
			ENTER: "start"
		});

	  Q.input.on("start",this, function(){
	    Q.clearStages();
	    Q.stageScene("level1");
	  });

	  button.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('level1');
	  });
	  box.fit(20);
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
   				gravity: 0
			});


			// Add in pre-made components to get up and running quickly
			// The `2d` component adds in default 2d collision detection
			// and kinetics (velocity, gravity)
			// The `platformerControls` makes the player controllable by the
			// default input actions (left, right to move, up or action to jump)
			// It also checks to make sure the player is on a horizontal surface before
			// letting them jump.
			this.add('2d, stepControls, animation');
			// Write event handlers to respond hook into behaviors.
			// hit.sprite is called everytime the player collides with a sprite

			this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {

			});
		},
		step: function(dt) {
			//console.log("VX: "+this.p.speed);
			if(Q.inputs['left'] || Q.inputs['right'] || Q.inputs['up'] || Q.inputs['down']) {
				this.play("walk");
			} else {
				this.play("still");
			}
		}

	});
	Q.animations("manolo", {
		walk: { frames: [0,1], rate: 1/16, flip: false, loop: true },
		still: { frames: [0,1], rate: 2, flip: false, loop: true },
	});

 /* ---------------------------- GusanoAzul --------------------------------- */

	Q.Sprite.extend("GusanoAzul", {
		init: function(p) {
			this._super(p, {
				sheet: "GusanoAzulRight",
				sprite: "GusanoAzul",
				frame: 0,
				gravity: 0
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("GusanoAzulD", "dead");

		},

		step: function(p) {

		}
	});

	Q.animations('GusanoAzul', {
		//move: { frames: [1,0], rate: 1/2},
		//dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});


 /* ---------------------------- GusanoVerde --------------------------------- */

	Q.Sprite.extend("GusanoVerde", {
		init: function(p) {
			this._super(p, {
				sheet: "GusanoVerdeRight",
				sprite: "GusanoVerde",
				frame: 0,
				gravity: 0
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("GusanoVerdeD", "dead");

		},

		step: function(p) {

		}
	});

	Q.animations('GusanoVerde', {
		//move: { frames: [1,0], rate: 1/2},
		//dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});


 /* ---------------------------- Sprays --------------------------------- */
	Q.Sprite.extend("Spray", {
		init: function(p) {
			this._super(p, {
				sheet: "SprayGusanos",//SprayGusanos|SprayJosefinoRamiro|SprayAvispa
				sprite: "Sprays",
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
				sheet: "AvispaVerdeRight",
				sprite: "AvispaBertoldo",
				frame: 0,
				gravity: 0
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("AvispaD", "dead");

		},

		step: function(p) {

		}
	});

	Q.animations('AvispaBertoldo', {
		//move: { frames: [1,0], rate: 1/2},
		//dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});

 /* ---------------------------- JosefinoRamiro --------------------------------- */

	Q.Sprite.extend("JosefinoRamiro", {
		init: function(p) {
			this._super(p, {
				sheet: "JosefinoRight",
				sprite: "Josefino",//Josefino|Ramiro
				frame: 0,
				gravity: 0
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("JosefinoRamiroD", "dead");

		},

		step: function(p) {

		}
	});

	Q.animations('JosefinoRamiro', {
		//move: { frames: [1,0], rate: 1/2},
		//dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});


 /* ---------------------------- Balas --------------------------------- */

	Q.Sprite.extend("Balas", {
		init: function(p) {
			this._super(p, {
				sheet: "JosefinoRight",
				sprite: "BalaBertoldo",//BalaBertoldo|BalaGusano|BalaJosefino
				frame: 0,
				gravity: 0
			});

			this.add('2d');

		},

		step: function(p) {

		}
	});

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
				y: 475 // be overridden on object creation
			});

			this.add('');
		}
	});

	/*---------------------------------FIN DEL JUEGO-----------------------------------*/
	Q.scene('endGame',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
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
	    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
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

	Q.load(["manolo.png","GusanoAzul.png","GusanoVerde.png","Avispa-Bertoldo.png","balaBertoldo.PNG","balaGusano.PNG","balaJosefino.png","Josefino.png","Ramiro.png","Sprays.png","AvispaBertoldo.json","BalaBertoldo.json","BalaGusano.json","BalaJosefino.json","GusanoAzul.json","GusanoVerde.json","Josefino.json","Ramiro.json","Sprays.json","manolo.json","Regadera.png","Plant.png","PlantFlower.png","menu.png","maintitle.png"], function() {
		Q.compileSheets("manolo.png","manolo.json");
		Q.compileSheets("GusanoAzul.png","GusanoAzul.json");
		Q.compileSheets("GusanoVerde.png","GusanoVerde.json");
		Q.compileSheets("Avispa-Bertoldo.png","AvispaBertoldo.json");
		Q.compileSheets("balaBertoldo.PNG","BalaBertoldo.json");
		Q.compileSheets("balaGusano.PNG","BalaGusano.json");
		Q.compileSheets("balaJosefino.png","BalaJosefino.json");
		Q.compileSheets("Josefino.png","Josefino.json");
		Q.compileSheets("Ramiro.png","Ramiro.json");
		Q.compileSheets("Sprays.png","Sprays.json");
		Q.sheet("Regadera","Regadera.png", { tilew: 39, tileh: 44});
		Q.sheet("Plant","Plant.png", { tilew: 119, tileh: 261});
		Q.sheet("PlantFlower","PlantFlower.png", { tilew: 172, tileh: 287});
		Q.sheet("mainTitle","maintitle.png");
	});


};