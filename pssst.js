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

	Q.scene("level1",function(stage) {
		Q.stageTMX("level.tmx",stage);//DESCOMENTAR
		var manolo = stage.insert(new Q.Manolo());

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
				frame: 0,
				x: 160,
				y: 240,
		   		stepDistance: 2, // should be tile size
   				stepDelay: 0.000001
			});

			this.p.gravity = 0;

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
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			this.on("GusanoAzulD", "dead");

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
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			this.on("GusanoVerdeD", "dead");

		},

		step: function(p) {

		}
	});

	Q.animations('GusanoVerde', {
		//move: { frames: [1,0], rate: 1/2},
		//dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});


	Q.Sprite.extend("SprayGusanos", {
		init: function(p) {
			this._super(p, {
				sheet: "SprayGusanosU",
				sprite: "SprayGusanos",
				frame: 0,
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			this.on("gusanoverdeD", "dead");

		},

		step: function(p) {

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

	Q.load(["manolo.png","GusanoAzul.png","GusanoVerde.png","manolo.json","maintitle.png"], function() {
		// Finally, call stageScene to run the game
		Q.compileSheets("manolo.png","manolo.json");
		Q.compileSheets("GusanoAzul.png","GusanoAzul.json");
		Q.compileSheets("GusanoVerde.png","GusanoVerde.json");
		Q.sheet("mainTitle","maintitle.png");
	});


};