ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'impact.font',

  'plugins.camera',
  'plugins.touch-button',
  'plugins.impact-splash-loader',
  'plugins.astar-for-entities',
  'plugins.gamepad',

  'impact.debug.debug',
  'plugins.astar-for-entities-debug',
  'plugins.gamepad-debug',

  'game.entities.player',

  'game.levels.title',
  'game.levels.test'
)
.defines(function(){


// Our Main Game class. This will load levels, host all entities and
// run the game.

MyGame = ig.Game.extend({

  clearColor: "#d0f4f7",
  gravity: 0, // All entities are affected by this

  // Load a font
  font: new ig.Font( 'media/fredoka-one.font.png' ),

  music: new ig.Sound( 'media/music/hydrogen.*' ),

  init: function() {
    // We want the font's chars to slightly touch each other,
    // so set the letter spacing to -2px.
    this.font.letterSpacing = -2;
    ig.music.add(this.music, 'hydrogen');

    // Load the LevelGrasslands as required above ('game.level.grassland')
    this.loadLevel( LevelTest );

  },

  loadLevel: function( data ) {
    // Remember the currently loaded level, so we can reload when
    // the player dies.
    this.currentLevel = data;

    // Call the parent implemenation; this creates the background
    // maps and entities.
    this.parent( data );

    var spawnPoint = this.getEntitiesByType(EntitySpawnPoint)[0];

    for (var i = 0; i < ig.players.length; i++) {
      var player = ig.players[i];
      var offsetX = i % 2 ? 200 : 0;
      var offsetY = i > 1 ? 200 : 0;
      player.pos.x = spawnPoint.pos.x + offsetX;
      player.pos.y = spawnPoint.pos.y + offsetY;
      player.angle = spawnPoint.angle;

      this.entities.push(player);
    }

    this.setupCamera();

    ig.music.play('hydrogen');
  },

  setupCamera: function() {
    // Set up the camera. The camera's center is at a third of the screen
    // size, i.e. somewhat shift left and up. Damping is set to 3px.
    this.camera = new ig.Camera( ig.system.width/2, ig.system.height/2, 5 );

    // The camera's trap (the deadzone in which the player can move with the
    // camera staying fixed) is set to according to the screen size as well.
      this.camera.trap.size.x = ig.system.width/10;
      this.camera.trap.size.y = ig.system.height/3;

    // The lookahead always shifts the camera in walking position; you can
    // set it to 0 to disable.
      this.camera.lookAhead.x = ig.system.width/6;

    // Set camera's screen bounds and reposition the trap on the player
      this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
      this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
      this.camera.set( ig.players[0] );
  },

  reloadLevel: function() {
    this.loadLevelDeferred( this.currentLevel );
  },

  update: function() {
    ig.gamepadInput.update();

    // Update all entities and BackgroundMaps
    this.parent();

    // Camera follows the player
    this.camera.follow( ig.players[0] );

    // Instead of using the camera plugin, we could also just center
    // the screen on the player directly, like this:
    // this.screen.x = this.player.pos.x - ig.system.width/2;
    // this.screen.y = this.player.pos.y - ig.system.height/2;
  },

  draw: function() {
    // Call the parent implementation to draw all Entities and BackgroundMaps
    this.parent();

    // Draw touch buttons, if we have any
    if( window.myTouchButtons ) {
      window.myTouchButtons.draw();
    }
  }
});



// The title screen is simply a Game Class itself; it loads the LevelTitle
// runs it and draws the title image on top.

MyTitle = ig.Game.extend({
  clearColor: "#000",
  gravity: 0,

  // The title image
  title: new ig.Image( 'media/title.png' ),

  // Load a font
  font: new ig.Font( 'media/fredoka-one.font.png' ),

  titleSound: new ig.Sound( 'media/sounds/title.*', false ),
  titleMusic: new ig.Sound( 'media/music/HorseSteppin.*', false ),

  init: function() {
    // Bind keys
    ig.input.bind( ig.KEY.A, 'left' );
    ig.input.bind( ig.KEY.D, 'right' );
    ig.input.bind( ig.KEY.W, 'up' );
    ig.input.bind( ig.KEY.S, 'down' );
    ig.input.bind( ig.KEY.X, 'jump' );
    ig.input.bind( ig.KEY.C, 'shoot' );
    ig.input.bind( ig.KEY.M, 'mute' );

    // Bind mouse
    ig.input.bind( ig.KEY.MOUSE1, 'attack' );


    // Align touch buttons to the screen size, if we have any
    if( window.myTouchButtons ) {
      window.myTouchButtons.align();
    }

    // We want the font's chars to slightly touch each other,
    // so set the letter spacing to -2px.
    this.font.letterSpacing = -2;

    this.loadLevel( LevelTitle );
    this.maxY = this.backgroundMaps[0].pxHeight - ig.system.height;

    this.titleSound.play();
    ig.music.add(this.titleMusic, 'title');
    ig.music.loop = true;

    setTimeout(function() {
      ig.music.play('title');
    }, 3500);

    ig.gamepadInput.onControllerAdded(this.addPlayer);
  },

  addPlayer: function(pad) {
    var settings = {controllerNumber: pad};

    if (!ig.players) {
      ig.players = [];
      settings.mainPlayer = true;
    }

    var player = ig.game.spawnEntity( EntityPlayer, 200 + pad * 200, 750, settings );
    ig.players.push(player);
  },

  update: function() {
    ig.gamepadInput.update();

    // Check for buttons; start the game if pressed
    if( ig.input.pressed('mute') ) {
      ig.music.stop();
    }

    if( ig.input.pressed('jump') || ig.input.pressed('shoot') || ig.gamepadInput.pressed(-1, ig.BUTTON.START) ) {
      if( !ig.players )
        this.addPlayer(0);

     ig.system.setGame( MyGame );
      return;
    }


    this.parent();

    // Scroll the screen down; apply some damping.
    var move = this.maxY - this.screen.y;
    if( move > 5 ) {
      this.screen.y += move * ig.system.tick;
      this.titleAlpha = this.screen.y / this.maxY;
    }
    this.screen.x = (this.backgroundMaps[0].pxWidth - ig.system.width)/2;
  },

  draw: function() {
    this.parent();

    var cx = ig.system.width/2;
    this.title.draw( cx - this.title.width/2, 60 );

    var startText = ig.ua.mobile
      ? 'Press Button to Play!'
      : 'Press X to join and Start to play!';

    this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);

    // Draw touch buttons, if we have any
    if( window.myTouchButtons ) {
      window.myTouchButtons.draw();
    }
  }
});


if( ig.ua.mobile ) {
  // If we're running on a mobile device and not within Ejecta, disable
  // sound completely :(
  if( !window.ejecta ) {
    ig.Sound.enabled = false;
  }

  // Use the TouchButton Plugin to create a TouchButtonCollection that we
  // can draw in our game classes.

  // Touch buttons are anchored to either the left or right and top or bottom
  // screen edge.
  var buttonImage = new ig.Image( 'media/touch-buttons.png' );
  myTouchButtons = new ig.TouchButtonCollection([
    new ig.TouchButton( 'left', {left: 0, bottom: 0}, 128, 128, buttonImage, 0 ),
    new ig.TouchButton( 'right', {left: 128, bottom: 0}, 128, 128, buttonImage, 1 ),
    new ig.TouchButton( 'shoot', {right: 128, bottom: 0}, 128, 128, buttonImage, 2 ),
    new ig.TouchButton( 'jump', {right: 0, bottom: 96}, 128, 128, buttonImage, 3 )
  ]);
}

// If our screen is smaller than 640px in width (that's CSS pixels), we scale the
// internal resolution of the canvas by 2. This gives us a larger viewport and
// also essentially enables retina resolution on the iPhone and other devices
// with small screens.
var scale = (window.innerWidth < 640) ? 2 : 1;


// We want to run the game in "fullscreen", so let's use the window's size
// directly as the canvas' style size.
var canvas = document.getElementById('canvas');
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';


// Listen to the window's 'resize' event and set the canvas' size each time
// it changes.
window.addEventListener('resize', function(){
  // If the game hasn't started yet, there's nothing to do here
  if( !ig.system ) { return; }

  // Resize the canvas style and tell Impact to resize the canvas itself;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );

  // Re-center the camera - it's dependend on the screen size.
  if( ig.game && ig.game.setupCamera ) {
    ig.game.setupCamera();
  }

  // Also repositon the touch buttons, if we have any
  if( window.myTouchButtons ) {
    window.myTouchButtons.align();
  }
}, false);


// Finally, start the game into MyTitle and use the ImpactSplashLoader plugin
// as our loading screen
var width = window.innerWidth * scale,
  height = window.innerHeight * scale;
ig.main( '#canvas', MyTitle, 60, width, height, 1, ig.ImpactSplashLoader );

});
