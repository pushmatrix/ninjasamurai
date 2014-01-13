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
  'plugins.line-of-sight',
  'plugins.gamepad',

  'impact.debug.debug',
  'plugins.astar-for-entities-debug',
  'plugins.gamepad-debug',

  'game.animation-extended',
  'game.entity-extended',
  'game.player-manager',

  'game.levels.title-controller',
  'game.levels.test-controller'
)
.defines(function(){


// Our Main Game class. This will load levels, host all entities and
// run the game.

Ninja = ig.Game.extend({
  clearColor: "#000",
  gravity: 0, // All entities are affected by this

  font: new ig.Font( 'media/fredoka-one.font.png' ),

  init: function() {
    ig.player = new ig.PlayerManager;

    ig.music.loop = true;

    // We want the font's chars to slightly touch each other,
    // so set the letter spacing to -2px.
    this.font.letterSpacing = -2;

    this.loadLevel( LevelTitle );
  },

  loadLevel: function( level ) {
    // Remember the currently loaded level, so we can reload when
    // the player dies.
    this.currentLevel = level;

    // Call the parent implemenation; this creates the background
    // maps and entities.
    this.parent( level );

    ig.player.spawn();

    if( level.Controller ) {
      if( !level.controller )
        level.controller = new level.Controller;

      if( level.controller.ready )
        level.controller.ready();
    }

    this.setupCamera();
  },

  reloadLevel: function() {
    this.loadLevelDeferred( this.currentLevel );
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

    if( ig.player.players[0] )
      this.camera.set( ig.player.players[0] );
  },

  update: function() {
    // Update all entities and BackgroundMaps
    this.parent();

    if( this.currentLevel && this.currentLevel.controller && this.currentLevel.controller.update )
      this.currentLevel.controller.update();

    ig.player.update();
  },

  draw: function() {
    this.parent();

    if( this.currentLevel && this.currentLevel.controller && this.currentLevel.controller.draw )
      this.currentLevel.controller.draw();
  }
});


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
}, false);


// Finally, start the game into MyTitle and use the ImpactSplashLoader plugin
// as our loading screen
var width = window.innerWidth * scale,
  height = window.innerHeight * scale;

ig.main( '#canvas', Ninja, 60, width, height, 1, ig.ImpactSplashLoader );

});
