

# MEMORIA PSSST

 ![enter image description here](https://viva-games.ru/wp-content/uploads/zx-spectrum/games-maps/p/Pssst.png)

  

## I. Diseño del juego

    

PSSST es un juego desarrollado para Spectrum por los hermanos Stamper con la compañía Ultimate Play The Game

1.  #### Objetivo del juego
    ![enter image description here](http://retrovideogamesystems.com/wp-content/uploads/2013/09/pssst-header.png)

El protagonista Robbie (o Manolo, como nosotros lo hemos apodado) debe impedir que los insectos se coman la última planta de su jardín a la vez que evita ser tocado por estos para conseguir que la planta florezca tras crecer lo suficiente. Para ello tiene unos sprays repartidos por las celdas del mapa, con ellos es capaz de destruir a estos insectos, aunque sólo un spray mata a un tipo de insecto.

2.  #### Principales mecánicas
    

Robbie debe acercarse hasta un spray para cogerlo y así poder usarlo. Para cambiar de spray deberá dejar el que tiene armado en un hueco libre e ir a por el otro. Los insectos generados están hechos de tal forma que cuando consiguen tocar la planta, se quedan comiéndola para intentar acabar con ella.

Se puede usar un spray de un tipo contra los insectos de otro tipo para evadirles (rebotan contra su bala, pero no mueren).

3.  #### Personajes
    

Robbie (Manolo): robot protagonista.
![alt text](https://github.com/danfer09/PSSST/blob/master/images/manolo.png)

Gusanos: insectos con esta apariencia de color verde y azul.

![alt text](https://github.com/danfer09/PSSST/blob/master/images/GusanoAzul.png)

![alt text](https://github.com/danfer09/PSSST/blob/master/images/GusanoVerde.png)

Parásitos: de color azul.

![alt text](https://github.com/danfer09/PSSST/blob/master/images/Josefino.png)

Avispas: insectos con esta apariencia de color amarillo y morado.
![alt text](https://github.com/danfer09/PSSST/blob/master/images/Avispa-Bertoldo.png)


## II. Diseño de la implementación

    


Para desarrollar este juego hemos hecho uso de todos los conocimientos adquiridos durante el curso de la asignatura, sobre todo de las prácticas 2 y 3. Nuestra hoja de ruta ha sido seguir un flujo similar al que se describe en los enunciados de estas, y hemos acudido al código de las prácticas en numerosas ocasiones para ayudarnos. Hemos utilizado el motor Quintus que permite que el juego se desarrolle por completo dentro de un canvas. Por cada personaje, hemos creado una clase que extiende de Q.Sprite, que tiene, como mínimo, la función init para inicializar propiedades y step para movimientos y eventos durante el juego.

  

Las paredes se han construido con un .tmx, el cual es cargado al comienzo. Al igual que todos los sprites y spritesheets para poder manejarlos dentro del juego. Se han incluido componentes como Input, para recibir las pulsaciones de teclas, Touch, para poder manejar el juego en pantallas táctiles y Anim para las animaciones, muy importantes en nuestro juego.

  

Todos los insectos añaden en su función init el componente 2d y aiBounce, que les permite moverse en direcciones definidas y rebotar infinitamente (como los Goomba del Mario Bros).

Además todos incluyen el componente defaultEnemy a modo de herencia, para compartir el evento de chocar contra Manolo, nuestro robot. Este, a diferencia de los insectos y de Mario en la práctica 3, incluye el componente stepControls, de modo que no usa el platformerControls. Este componente se diferencia del platformerControls en que el movimiento se realiza en 4 ejes como si de un plano se tratara.

Por último tenemos las pantallas de muerte y victoria, que son escenas invocadas por el objeto Q con el mensaje correspondiente.

  
  

  

## III. Equipo de trabajo y reparto de tareas

    

  

En este proyecto hemos podido trabajar muy bien ya que todos los integrantes hemos hecho las tareas que nos correspondía de manera responsable y eficaz. Durante el desarrollo del proyecto realizamos varias conferencias vía Skype para analizar cómo íbamos con el proyecto, asignarnos tareas y trabajar en equipo resolviendo dudas entre todos. En lo que se refiere el desarollo del código, ha sido un proceso muy colaborativo entre los miembros del grupo y todos hemos participado un poco en cada parte del código. A continuación describiremos las tareas realizadas por cada miembro del grupo:

  

Samuel: Edición de sprites, desarrollo de código, elaboración de presentación, memoria

Marco: Edición de sprites, desarrollo de código, elaboración de presentación, memoria

Daniel: Búsqueda de material para sacar los sprites y los sonidos del juego, desarrollo de código, elaboración de presentación

  

Aunque consideramos que todos los miembros del grupo han trabajado, queremos reconocer que nuestro compañero Daniel realizó un esfuerzo mayor en los últimos días del proyecto. Los porcentajes quedarían así:

  

Marco: 30%

Samuel:30%

Daniel:40%

  

 

## IV. Fuentes y referencias

    

Imagen principal:

https://upload.wikimedia.org/wikipedia/en/2/25/Pssst-intro.png
  

Sprites del juego:

 
Capturas del video: [https://www.youtube.com/watch?v=SdBhzG7FQ8Q](https://www.youtube.com/watch?v=SdBhzG7FQ8Q)

  
  
  

Sonidos:

  

[https://freesound.org/people/Sunsai/sounds/415804/](https://freesound.org/people/Sunsai/sounds/415804/)

  

[https://freesound.org/people/Daleonfire/sounds/406113/](https://freesound.org/people/Daleonfire/sounds/406113/)

  

[https://freesound.org/people/JeffNevington/sounds/414746/](https://freesound.org/people/JeffNevington/sounds/414746/)
