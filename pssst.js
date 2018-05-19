var game = function() {
// Set up an instance of the Quintus engine and include
// the Sprites, Scenes, Input and 2D module. The 2D module
// includes the `TileLayer` class as well as the `2d` componet.
var Q = window.Q = Quintus()
	.include("Audio, Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D")
	.setup({width: 320, // Set the default width to 320 pixels
			height: 480, // Set the default height to 480 pixels
			})
	// And turn on default input controls and touch input (for UI)
	.controls().touch();

	Q.scene("level1",function(stage) {
		Q.stageTMX("level.tmx",stage);

		stage.add("viewport");
	});

	Q.scene('mainTitle',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
	  }));

	  var button = box.insert(new Q.UI.Button({ x: -1, y: 0, asset: "maintitle.png", scale: 0.73 }));

	  Q.input.keyboardControls({
			ENTER: "start"
		});

	  Q.input.on("start",this, function(){
	    Q.clearStages();
	    Q.stageScene('level1');
	  });

	  button.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('level1');
	  });
	  box.fit(20);
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

	Q.load("", function() {
		// Finally, call stageScene to run the game
		Q.stageScene("mainTitle");
	});


};