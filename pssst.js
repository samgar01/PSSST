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

//Q.state.dec("insectos",1);
//Q.state.inc("insectos",1);
//Q.state.get("insectos");
/*enemiesPos es una variable que guarda en que pixeles se tiene que pintar los enemigos en las distintas estanterias, siendo 0 la mas bajita y 4 la más alta y l señala la izquierda y r la derecha */
	var enemiesPos = {
  l_0:   { x: 64.5,   y: 492.5},
  l_1:   { x: 64.5,   y: 390.5},
  l_2:   { x: 64.5,   y: 288.5},
  l_3:   { x: 64.5,   y: 186.5},
  l_4:   { x: 64.5,   y: 84.5},
  r_0:   { x: 479.5,   y: 492.5},
  r_1:   { x: 479.5,   y: 390.5},
  r_2:   { x: 479.5,   y: 288.5},
  r_3:   { x: 479.5,   y: 186.5},
  r_4:   { x: 479.5,   y: 84.5}
};

/*----------------------------------HUD------------------------------------------*/
	Q.scene("HUD",function(stage) {
		var level = stage.insert(new Q.Score());
	});

	Q.UI.Text.extend("Score",{
		init: function(p) {
			this._super({
				x:70,
				y: 5,
				currentLevel: 1,
				label: "Level 1",
				color: "white",
				family: "ROBO",
				shadow: 5,
				shadowColor: "#000000"
			});

		},
		step: function(dt) {
			this.p.currentLevel = Q.state.get("currentLevel");
			this.p.label = "Level " + this.p.currentLevel;
		}
	});

/*----------------------------------LEVEL1---------------------------------------*/
	Q.scene("level1",function(stage) {
		Q.audio.stop();
		Q.audio.play('fondo.mp3',{ loop: true });
		Q.stageTMX("level.tmx",stage);
		var manolo = stage.insert(new Q.Manolo({stage:stage}));
		var planta = stage.insert(new Q.Planta({scale:0.3,sheet:"Plant"}));
		var sprayGusanos = stage.insert(new Q.Spray({x:53, y:275.5}));
		var sprayJR = stage.insert(new Q.Spray({x:53, y:377.5,sheet:"Josefino"}));
		var sprayAvispa = stage.insert(new Q.Spray({x:53, y:479.5,sheet:"Avispa"}));
		var spawner0 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Regadera", frec:15, estanteria: enemiesPos.l_4}));
		var spawner1 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Gusano", frec:2, estanteria: enemiesPos.l_4}));
		var spawner2 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 6, estanteria: enemiesPos.l_3}));
		var spawner3 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 26, estanteria: enemiesPos.l_2}));
		var spawner4 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 18, estanteria: enemiesPos.l_1}));
		var spawner5 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 10, estanteria: enemiesPos.r_4}));
		var spawner6 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Gusano", frec: 3, estanteria: enemiesPos.r_3}));
		var spawner7 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Gusano", frec: 2, estanteria: enemiesPos.r_2}));
		var spawner8 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 7, estanteria: enemiesPos.r_1}));

		//var GusanoAzul = stage.insert(new Q.Gusano({x:50,y:50}));
		//var GusanoVerde = stage.insert(new Q.Gusano({x:494,y:50,sprite:"GusanoVerde",sheet:"GusanoVerdeRight"}));
		//var Josefino = stage.insert(new Q.JosefinoRamiro({x:494, y:193}));
	  //var Ramiro = stage.insert(new Q.JosefinoRamiro({x:494, y:296, sheet:"RamiroRight"}));
		//var avispaAmarilla = stage.insert(new Q.AvispaBertoldo({x:100, y:77}))
		//var avispa = stage.insert(new Q.AvispaBertoldo({x:150, y:77, sprite:"Avispa-Bertoldo", sheet:"AvispaMoradaLeft"}))

		Q.state.set("end",0);

		Q.state.set("currentLevel",1);

		Q.state.set("insectos",0);

		Q.state.set("regaderaCogida",0);

		stage.add("viewport");
	});

	Q.scene("level2",function(stage) {
		Q.audio.stop();
		Q.audio.play('fondo.mp3',{ loop: true });
		Q.stageTMX("level.tmx",stage);
		var manolo = stage.insert(new Q.Manolo({stage:stage}));
		var spawner0 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Regadera", frec:15, estanteria: enemiesPos.l_4}));
		var spawner1 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec:25, estanteria: enemiesPos.l_4}));
		var spawner2 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 10, estanteria: enemiesPos.l_3}));
		var spawner3 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 26, estanteria: enemiesPos.l_2}));
		var spawner4 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 18, estanteria: enemiesPos.l_1}));
		var spawner5 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 10, estanteria: enemiesPos.r_4}));
		var spawner6 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Gusano", frec: 3, estanteria: enemiesPos.r_3}));
		var spawner7 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "JosefinoRamiro", frec: 2, estanteria: enemiesPos.r_2}));
		var spawner8 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "Gusano", frec: 7, estanteria: enemiesPos.r_1}));
		var planta = stage.insert(new Q.Planta({scale:0.3,sheet:"Plant"}));
		var sprayGusanos = stage.insert(new Q.Spray({x:53, y:275.5}));
		var sprayJR = stage.insert(new Q.Spray({x:53, y:377.5,sheet:"Josefino"}));
		var sprayAvispa = stage.insert(new Q.Spray({x:53, y:479.5,sheet:"Avispa"}));

		//var GusanoAzul = stage.insert(new Q.Gusano({x:50,y:50}));
		//var GusanoVerde = stage.insert(new Q.Gusano({x:494,y:50,sprite:"GusanoVerde",sheet:"GusanoVerdeRight"}));
		//var Josefino = stage.insert(new Q.JosefinoRamiro({x:494, y:193}));
	  //var Ramiro = stage.insert(new Q.JosefinoRamiro({x:494, y:296, sheet:"RamiroRight"}));
		//var avispaAmarilla = stage.insert(new Q.AvispaBertoldo({x:100, y:77}))
		//var avispa = stage.insert(new Q.AvispaBertoldo({x:150, y:77, sprite:"Avispa-Bertoldo", sheet:"AvispaMoradaLeft"}))

		Q.state.set("end",0);

		Q.state.set("insectos",0);

		Q.state.set("regaderaCogida",0);

		stage.add("viewport");
	});

	Q.scene("level3",function(stage) {
		Q.audio.stop();
		Q.audio.play('fondo.mp3',{ loop: true });
		Q.stageTMX("level.tmx",stage);
		var manolo = stage.insert(new Q.Manolo({stage:stage}));
		var spawner0 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Regadera", frec:15, estanteria: enemiesPos.l_4}));
		var spawner1 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec:25, estanteria: enemiesPos.l_4}));
		var spawner2 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 10, estanteria: enemiesPos.l_3}));
		var spawner3 = stage.insert(new Q.Spawner({stage:stage, numMax: 5, tipoEnemigo: "JosefinoRamiro", frec: 26, estanteria: enemiesPos.l_2}));
		var spawner4 = stage.insert(new Q.Spawner({stage:stage, numMax: 3, tipoEnemigo: "JosefinoRamiro", frec: 18, estanteria: enemiesPos.l_1}));
		var spawner5 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 10, estanteria: enemiesPos.r_4}));
		var spawner6 = stage.insert(new Q.Spawner({stage:stage, numMax: 3, tipoEnemigo: "JosefinoRamiro", frec: 3, estanteria: enemiesPos.r_3}));
		var spawner7 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "JosefinoRamiro", frec: 2, estanteria: enemiesPos.r_2}));
		var spawner8 = stage.insert(new Q.Spawner({stage:stage, numMax: 4, tipoEnemigo: "JosefinoRamiro", frec: 7, estanteria: enemiesPos.r_1}));
		var planta = stage.insert(new Q.Planta({scale:0.3,sheet:"Plant"}));
		var sprayGusanos = stage.insert(new Q.Spray({x:53, y:275.5}));
		var sprayJR = stage.insert(new Q.Spray({x:53, y:377.5,sheet:"Josefino"}));
		var sprayAvispa = stage.insert(new Q.Spray({x:53, y:479.5,sheet:"Avispa"}));

		//var GusanoAzul = stage.insert(new Q.Gusano({x:50,y:50}));
		//var GusanoVerde = stage.insert(new Q.Gusano({x:494,y:50,sprite:"GusanoVerde",sheet:"GusanoVerdeRight"}));
		//var Josefino = stage.insert(new Q.JosefinoRamiro({x:494, y:193}));
	  //var Ramiro = stage.insert(new Q.JosefinoRamiro({x:494, y:296, sheet:"RamiroRight"}));
		//var avispaAmarilla = stage.insert(new Q.AvispaBertoldo({x:100, y:77}))
		//var avispa = stage.insert(new Q.AvispaBertoldo({x:150, y:77, sprite:"Avispa-Bertoldo", sheet:"AvispaMoradaLeft"}))

		Q.state.set("end",0);

		Q.state.set("insectos",0);

		Q.state.set("regaderaCogida",0);

		stage.add("viewport");
	});

	Q.scene("level4",function(stage) {
		Q.audio.stop();
		Q.audio.play('fondo.mp3',{ loop: true });
		Q.stageTMX("level.tmx",stage);
		var manolo = stage.insert(new Q.Manolo({stage:stage}));
		var planta = stage.insert(new Q.Planta({scale:0.3,sheet:"Plant"}));
		var sprayGusanos = stage.insert(new Q.Spray({x:53, y:275.5}));
		var sprayJR = stage.insert(new Q.Spray({x:53, y:377.5,sheet:"Josefino"}));
		var sprayAvispa = stage.insert(new Q.Spray({x:53, y:479.5,sheet:"Avispa"}));
		/*var spawner0 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "Regadera", frec:15, estanteria: enemiesPos.l_4}));
		var spawner1 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "JosefinoRamiro", frec:2, estanteria: enemiesPos.l_4}));
		var spawner2 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "AvispaBertoldo", frec: 15, estanteria: enemiesPos.l_3}));
		var spawner3 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 26, estanteria: enemiesPos.l_2}));
		var spawner4 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "AvispaBertoldo", frec: 18, estanteria: enemiesPos.l_1}));
		var spawner5 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 10, estanteria: enemiesPos.r_4}));
		var spawner6 = stage.insert(new Q.Spawner({stage:stage, numMax: 5, tipoEnemigo: "AvispaBertoldo", frec: 20, estanteria: enemiesPos.r_3}));
		var spawner7 = stage.insert(new Q.Spawner({stage:stage, numMax: 1, tipoEnemigo: "JosefinoRamiro", frec: 2, estanteria: enemiesPos.r_2}));
		var spawner8 = stage.insert(new Q.Spawner({stage:stage, numMax: 2, tipoEnemigo: "JosefinoRamiro", frec: 7, estanteria: enemiesPos.r_1}));*/

		//var GusanoAzul = stage.insert(new Q.Gusano({x:50,y:50}));
		//var GusanoVerde = stage.insert(new Q.Gusano({x:494,y:50,sprite:"GusanoVerde",sheet:"GusanoVerdeRight"}));
		//var Josefino = stage.insert(new Q.JosefinoRamiro({x:494, y:193}));
	  //var Ramiro = stage.insert(new Q.JosefinoRamiro({x:494, y:296, sheet:"RamiroRight"}));
		//var avispaAmarilla = stage.insert(new Q.AvispaBertoldo({x:100, y:77}))
		//var avispa = stage.insert(new Q.AvispaBertoldo({x:150, y:77, sprite:"Avispa-Bertoldo", sheet:"AvispaMoradaLeft"}))

		Q.state.set("end",0);

		Q.state.set("insectos",0);

		Q.state.set("regaderaCogida",0);

		stage.add("viewport");
	});

	Q.scene('mainTitle',function(stage) {
	  var seleccionado = "play";
      Q.audio.stop();
	  Q.audio.play('intro.mp3',{ loop: true });

	  stage.insert(new Q.Repeater({ asset: "maintitle.png", speedX:0, speedY:0, repeatX: false, repeatY: false, x:0, y: 38, type: 0, scale: 1.24 }));

	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
	  }));

	  var buttonPlay = box.insert(new Q.UI.Button({ label: "Jugar", font:"400 24px robo", h:50, w:100, x: 10, y: 10, scale: 1.5, fill: "#C97FE5", border: 1, shadow: 10, shadowColor: "#000000" }));

		var buttonCredit = box.insert(new Q.UI.Button({ label: "Creditos",font:"400 24px robo", h:50, w:140, x: 10, y: 100, scale: 1.5, fill: "#7F03AD", border: 1, shadow: 0, shadowColor: "#000000" }));

	  Q.input.keyboardControls({
			ENTER: "start"
		});

	  Q.input.on("start",this, function(){
	  	if(seleccionado == "play"){
	  		seleccionado = null;
		    Q.clearStages();
		    Q.stageScene('HUD',1);
		    Q.stageScene("level4");
	  	}
	  	else if(seleccionado == "creditos"){
	  		seleccionado = null;
	  		Q.clearStages();
	  		Q.stageScene("credits");
	  	}
	  });

	  Q.input.on("up",this, function(){
	  	//console.log(seleccionado);
	  	if (seleccionado != null) {
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
	  	seleccionado = null;
	    Q.clearStages();
	    Q.stageScene('HUD',1);
	    Q.stageScene('level1');
	  });

	  buttonCredit.on("click",function() {
	    seleccionado = null;
	    Q.clearStages();
	    Q.stageScene('credits');
	  });
	});


	Q.scene('credits',function(stage) {
	  stage.insert(new Q.Repeater({ asset: "backgroundCredits.png", speedX:0, speedY:0, repeatX: false, repeatY: false, x:0, y: 38, type: 0, scale: 1.24 }));

	  var boxTitle = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height-Q.height+17, fill: "rgba(0,0,0,0.5)"
	  }));

	  var boxText = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: (Q.height/2)-100, fill: "rgba(0,0,0,0.5)"
	  }));

	  var boxBack = stage.insert(new Q.UI.Container({
	    x: 50, y: Q.height-50, fill: "rgba(0,0,0,0.5)"
	  }));

	  var title = boxTitle.insert(new Q.UI.Text({ label: "Creditos", x: 0, y: 0, color: "white", family:"robo", size: 42}));

	  var text = boxText.insert(new Q.UI.Text({ label: "Este videojuego ha sido desarrollado por \n Daniel Fernández Carnero, \nMarco González Pérez y \nSamuel Javier García Moreno.", x:0, y:0,color:"white", size:18}))

	  var buttonBack = boxBack.insert(new Q.UI.Button({ label: "Volver", font:"400 18px robo", h:30, w:80, x: 10, y: 10, scale: 1, fill: "#C97FE5", border: 1, shadow: 2, shadowColor: "#ffffff" }));


	  buttonBack.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('mainTitle');
	  });

	});



	Q.Sprite.extend("Spawner", {
		init: function(p) {
			this._super(p, {
				sheet: "",
				sprite: "",
				estanteria: enemiesPos.l_4,
				currentTime: 0,
				generado:0
			});


			this.add('2d');



		},

		step: function(dt) {
			this.p.currentTime +=dt;
			if(this.p.currentTime > this.p.frec && this.p.generado < this.p.numMax){
				this.p.generado++;
				this.p.currentTime = 0;
				if (this.p.tipoEnemigo == "Gusano")
					this.p.stage.insert(new Q.Gusano({x:this.p.estanteria.x,y:this.p.estanteria.y}));
				else if(this.p.tipoEnemigo == "JosefinoRamiro")
					this.p.stage.insert(new Q.JosefinoRamiro({x:this.p.estanteria.x,y:this.p.estanteria.y}));
				else if(this.p.tipoEnemigo == "AvispaBertoldo")
					this.p.stage.insert(new Q.AvispaBertoldo({x:this.p.estanteria.x,y:this.p.estanteria.y}));
				else if(this.p.tipoEnemigo == "Regadera")
					this.p.stage.insert(new Q.Regadera({x:this.p.estanteria.x,y:this.p.estanteria.y-13}));
			}

			//console.log(enemiesPos.l_4);
		},


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

			this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {

				if(collision.obj.isA("Spray") && !this.p.disparo){
					if(collision.obj.p.sheet =="Gusano"){
						this.p.disparo = "Gusano";
						this.play("GusanoL");
						collision.obj.destroy();
					}
					else if(collision.obj.p.sheet =="Josefino"){
						this.p.disparo = "Josefino";
						this.play("JosefinoL");
						collision.obj.destroy();
					}
					else if(collision.obj.p.sheet =="Avispa"){
						this.p.disparo = "Avispa";
						this.play("AvispaL");
						collision.obj.destroy();
					}
				}
				else if(collision.obj.isA("Regadera")){
						Q.state.inc("regaderaCogida",1);
						collision.obj.destroy();
				}
			});
		},
		reset: function() {
			this.destroy();
			Q.stageScene("endGame",1, { label: "You Died" });
		},
		step: function(dt) {
			this.p.fire-=dt;
			//console.log("x: " + this.p.x + " y: " + this.p.y);
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
				/*---Llegar a huecos de los lados---*/
				/*	  l_0:   { x: 64.5,   y: 492.5},
					  l_1:   { x: 64.5,   y: 390.5},
					  l_2:   { x: 64.5,   y: 288.5},
					  l_3:   { x: 64.5,   y: 186.5},
					  l_4:   { x: 64.5,   y: 84.5},
					  r_0:   { x: 479.5,   y: 492.5},
					  r_1:   { x: 479.5,   y: 390.5},
					  r_2:   { x: 479.5,   y: 288.5},
					  r_3:   { x: 479.5,   y: 186.5},
					  r_4:   { x: 479.5,   y: 84.5}
				y: 71.5,173.5,275.5,377.5,481.5
				x: 53, Q.width-53*/
				if (this.p.disparo && this.p.x < 89.5) {
					this.p.x = 115.5;
					if (this.p.y < 121.5) {
						this.p.stage.insert(new Q.Spray({x:53, y:71.5,sheet:this.p.disparo}));
					} else if (this.p.y < 223.5) {
						this.p.stage.insert(new Q.Spray({x:53, y:173.5,sheet:this.p.disparo}));
					} else if (this.p.y < 325.5) {
						this.p.stage.insert(new Q.Spray({x:53, y:275.5,sheet:this.p.disparo}));
					} else if (this.p.y < 427.5) {
						this.p.stage.insert(new Q.Spray({x:53, y:377.5,sheet:this.p.disparo}));
					} else if (this.p.y < 531.5) {
						this.p.stage.insert(new Q.Spray({x:53, y:481.5,sheet:this.p.disparo}));
					}
					this.p.disparo = false;
				} else if (this.p.disparo && this.p.x > 454.5) {
					this.p.x = Q.width-115.5;
					if (this.p.y < 121.5) {
						this.p.stage.insert(new Q.Spray({x:Q.width-53, y:71.5,sheet:this.p.disparo}));
					} else if (this.p.y < 223.5) {
						this.p.stage.insert(new Q.Spray({x:Q.width-53, y:173.5,sheet:this.p.disparo}));
					} else if (this.p.y < 325.5) {
						this.p.stage.insert(new Q.Spray({x:Q.width-53, y:275.5,sheet:this.p.disparo}));
					} else if (this.p.y < 427.5) {
						this.p.stage.insert(new Q.Spray({x:Q.width-53, y:377.5,sheet:this.p.disparo}));
					} else if (this.p.y < 531.5) {
						this.p.stage.insert(new Q.Spray({x:Q.width-53, y:481.5,sheet:this.p.disparo}));
					}
					this.p.disparo = false;
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
				type: Q.SPRITE_ENEMY,
				comePlanta: false
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("GusanoAzulD", "dead");



		},

		step: function(p) {
			//console.log("vx: " + this.p.vx + " vy: " + this.p.vy);
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
				sheet: "AvispaAmarillaLeft",
				sprite: "AvispaBertoldoAmarilla",
				frame: 0,
				gravity: 0,
				vx: 100,
				vy: 0,
				tipo: "Avispa",
				planta: null,
				type: Q.SPRITE_ENEMY,
				comePlanta: false/*,
				xDest: 222.5,
				yDest: 490.5*/
			});
			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("AvispaD", "dead");
			//this.animate({ x:this.p.xDest, y:this.p.yDest }, 10, Q.Easing.Quadratic.InOut);
			//console.log(this.p.xDest);
		},

		step: function(p) {

			if(this.p.x >= 272){
				this.p.vy = 60
			}
			if(this.p.vx > 0)
				this.play("moveR");
			else if (this.p.vx < 0)
				this.play("moveL");
			if(this.p.y > 494 && !this.p.comePlanta)
				this.p.vy= -60;

			if(this.p.y < 50 && !this.p.comePlanta)
				this.p.vy= 60;

		}

	});

	Q.animations('AvispaBertoldoAmarilla', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:false},
		moveR: { frames: [2,3], rate: 1/4, loop: true, flip:false}
	});


	Q.animations('AvispaBertoldoMorada', {
		moveL: { frames: [0,1], rate: 1/4, loop: true, flip:"x"},
		moveR: { frames: [2,3], rate: 1/4, loop: true, flip:"x"}
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
				timeBeforeDown: 1,
				currentTime: 0,
				tipo: "Josefino",
				planta: null,
				type: Q.SPRITE_ENEMY,
				comePlanta: false
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			//this.on("GusanoVerdeD", "dead");

		},

		step: function(dt) {
			this.p.currentTime += dt;
			if(this.p.currentTime >= this.p.timeBeforeDown && !this.p.comePlanta){
				this.p.vy = 30;
			}
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
				//console.log("tipo enemigo:" + collision.obj.p.tipo + "tipo sprite: " + this.p.tipo);
				if(collision.obj.p.tipo==this.p.tipo){
					//console.log(Q.state.get("insectos"));
					Q.audio.play('muerte_bicho.mp3',{ loop: false });
					if (collision.obj.p.comePlanta) {
						Q.state.dec("insectos",1);
					}
					collision.obj.destroy();
					this.destroy();
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
			if (Q.state.get("end") == 0 && Q.state.get("insectos") == 0 && this.p.time < 0 && !Q.state.get("regaderaCogida")) {
				this.p.vida++;
				this.p.scale += 0.002;
				this.p.y -= 0.26;
				this.p.time = this.p.timeT;
			}

			else if (Q.state.get("end") == 0 && Q.state.get("insectos") == 0 && this.p.time < 0 && Q.state.get("regaderaCogida")) {
				this.p.vida += 2;
				this.p.scale += 0.004;
				this.p.y -= 0.52;
				this.p.time = this.p.timeT;
			}

			else if (Q.state.get("end") == 0 &&  Q.state.get("insectos") > 0 && this.p.time < 0) {
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
				if(Q.state.get("currentLevel")< 4){// El 4 es el último nivel implementado, tras el se gana el juego
					console.log(Q.state.get("currentLevel"));
					Q.stageScene('nextLevel',1, { label: "Next level!" });
				}
				else
					Q.stageScene("winGame",1, { label: "You win!" });

			} else if (this.p.vida < 0) {
				Q.audio.stop();
  				Q.audio.play('muerte_manolo.mp3',{ loop: false });
				Q.state.set("end",1);
				Q.stageScene("endGame",1, { label: "You Died" });
				this.p.vida = 0;
			}
		}
	});

	/*---------------------------------FIN DEL JUEGO-----------------------------------*/
	Q.scene('endGame',function(stage) {
		var seleccionado = "play";
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(255,255,255,0.5)"
	  }));

	  var buttonPlay = box.insert(new Q.UI.Button({label: "Play Again", font:"400 24px robo", h:50, w:200, x: 10, y: 10, scale: 1.5, fill: "#C97FE5", border: 1, shadow: 10, shadowColor: "#000000" }));
	  var buttonMenu = box.insert(new Q.UI.Button({label: "Menu",font:"400 24px robo", h:50, w:140, x: 10, y: 100, scale: 1.5, fill: "#7F03AD", border: 1, shadow: 0, shadowColor: "#000000" }));
	  var label = box.insert(new Q.UI.Text({x:10, y: -10 - buttonPlay.p.h,  label: stage.options.label }));

	  buttonPlay.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('level1');
	  });
	  buttonMenu.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('mainTitle');
	  });

	  Q.input.keyboardControls({
			ENTER: "start"
		});

	  Q.input.on("start",this, function(){
	    if(seleccionado == "play"){
	  		seleccionado = null;
		    Q.clearStages();
		    Q.stageScene('HUD',1);
		    Q.stageScene("level1");
	  	}
	  	else if(seleccionado == "menu"){
	  		seleccionado = null;
	  		Q.clearStages();
	  		Q.stageScene('mainTitle');
	  	}
 		});
		Q.input.on("up",this, function(){
  	//console.log(seleccionado);
	  	if (seleccionado != null) {
	  		if(seleccionado == "play"){
		  		buttonPlay.p.shadow = 0;
		  		buttonPlay.p.fill = "#7F03AD";

		  		buttonMenu.p.shadow = 10;
		  		buttonMenu.p.fill = "#C97FE5";

		  		seleccionado = "menu";
		  	}
		  	else if(seleccionado == "menu"){
		  		buttonMenu.p.shadow = 0;
		  		buttonMenu.p.fill = "#7F03AD";

		  		buttonPlay.p.shadow = 10;
		  		buttonPlay.p.fill = "#C97FE5";

		  		seleccionado = "play"
		  	}
			}
	  });

  	Q.input.on("down",this, function(){
	    if(seleccionado == "play"){
	  		buttonPlay.p.shadow = 0;
	  		buttonPlay.p.fill = "#7F03AD";

	  		buttonMenu.p.shadow = 10;
	  		buttonMenu.p.fill = "#C97FE5";

	  		seleccionado = "menu";
	  	}
	  	else if(seleccionado == "menu"){
	  		buttonMenu.p.shadow = 0;
	  		buttonMenu.p.fill = "#7F03AD";

	  		buttonPlay.p.shadow = 10;
	  		buttonPlay.p.fill = "#C97FE5";

	  		seleccionado = "play"
	  	}
	  });
	  box.fit(60);
	});

/*---------------------------------SIGUIENTE NIVEL-----------------------------------*/
	Q.scene('nextLevel',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(255,255,255,0.5)"
	  }));

	  var button = box.insert(new Q.UI.Button({ x: 0, y: 0, label: "Next level",  font:"400 24px robo", fill: "#C97FE5"}));
	  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
	                                        label: stage.options.label }));
	  button.on("click",function() {
	    Q.clearStages();
	    Q.state.inc("currentLevel",1);
			var nextLevel = "level" + Q.state.get("currentLevel");
			console.log(nextLevel);
			Q.stageScene('HUD',1);
	    Q.stageScene(nextLevel);
	  });

	  Q.input.keyboardControls({
			ENTER: "start"
		});

	  Q.input.on("start",this, function(){
	    Q.clearStages();
	    Q.state.inc("currentLevel",1);
			var nextLevel = "level" + Q.state.get("currentLevel");
			console.log(nextLevel);
			Q.stageScene('HUD',1);
	    Q.stageScene(nextLevel);
 		});
	  box.fit(20);
	});

	/*---------------------------------YOU WIN-----------------------------------*/
	Q.scene('winGame',function(stage) {
	  var box = stage.insert(new Q.UI.Container({
	    x: Q.width/2, y: Q.height/2, fill: "rgba(255,255,255,0.5)"
	  }));

	  var button = box.insert(new Q.UI.Button({ x: 0, y: 0, label: "Menu",  font:"400 24px robo", fill: "#C97FE5" }));
	  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
	                                        label: stage.options.label }));
	  button.on("click",function() {
	    Q.clearStages();
	    Q.stageScene('mainTitle');
	  });
	  Q.input.keyboardControls({
			ENTER: "start"
		});
		Q.input.on("start",this, function(){
			Q.clearStages();
	    Q.stageScene('mainTitle');
		});
	  box.fit(20);
	});

	/*---------------------------------CARGA DEL NIVEL Y DE RECURSOS-----------------------------------*/
	Q.loadTMX("level.tmx", function() {
		Q.stageScene("mainTitle");
	});

	Q.load(["manolo.png","GusanoAzul.png","GusanoVerde.png","AvispaBertoldo.png","balaBertoldo.PNG","balaGusano.PNG","balaJosefino.png","Josefino.png","Ramiro.png","Sprays.png","AvispaBertoldo.json","BalaBertoldo.json","BalaGusano.json","BalaJosefino.json","GusanoAzul.json","GusanoVerde.json","Josefino.json","Ramiro.json","Sprays.json","manolo.json","Regadera.png","Plant.png","PlantFlower.png","menu.png","maintitle.png","backgroundCredits.png","balas.png", "Balas.json", "muerte_manolo.mp3","intro.mp3", "fondo.mp3", "muerte_bicho.mp3", "spray.mp3"], function() {
		Q.compileSheets("manolo.png","manolo.json");
		Q.compileSheets("GusanoAzul.png","GusanoAzul.json");
		Q.compileSheets("GusanoVerde.png","GusanoVerde.json");
		Q.compileSheets("AvispaBertoldo.png","AvispaBertoldo.json");
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
		Q.sheet("backgroundCredits","backgroundCredits.png");
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
			if(collision.obj.isA("Manolo") && Q.state.get("end")==0) {
				collision.obj.trigger("destroyManolo");
			}

			else if(collision.obj.isA("Planta")) {
				if (Q.state.get("end") == 0){
					this.p.planta = collision.obj;
					this.p.vy = 0;
					this.p.vx = 0;
					this.p.comePlanta = true;
					this.del('aiBounce');
					Q.state.inc("insectos",1);
				}
			}
			/*else if(collision.obj.p.tipo == "Gusano") {
					console.log(this.p.vy);
					this.p.vy = this.p.vy;
					this.p.vx = this.p.vx;
			}*/


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