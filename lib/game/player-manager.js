ig.module(
  'game.player-manager'
)
.requires(
  'game.entities.player',
  'plugins.gamepad'
)
.defines(function(){

ig.PlayerManager = ig.Class.extend({
  init: function() {
    this.players = [];

    this.initKeyboard();
    this.initGamepads();
  },

  initKeyboard: function() {
    // Bind keys
    ig.input.bind( ig.KEY.A, 'left' );
    ig.input.bind( ig.KEY.D, 'right' );
    ig.input.bind( ig.KEY.W, 'up' );
    ig.input.bind( ig.KEY.S, 'down' );
    ig.input.bind( ig.KEY.X, 'jump' );
    ig.input.bind( ig.KEY.C, 'shoot' );
    ig.input.bind( ig.KEY.M, 'mute' );
    ig.input.bind( ig.KEY.SPACE, 'interact' );

    // Bind mouse
    ig.input.bind( ig.KEY.MOUSE1, 'attack' );
  },

  initGamepads: function() {
    ig.gamepadInput.onControllerAdded(this.addPlayer);
  },

  addPlayer: function(pad) {
    var player = ig.game.spawnEntity( EntityPlayer, 200 + pad * 200, 750, {controllerNumber: pad} );
    this.players.push( player );
  },

  spawn: function() {
    var spawnPoint = ig.game.getEntitiesByType( EntitySpawnPoint )[0];

    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var offsetX = i % 2 ? 200 : 0;
      var offsetY = i > 1 ? 200 : 0;
      player.pos.x = spawnPoint.pos.x + offsetX;
      player.pos.y = spawnPoint.pos.y + offsetY;
      player.angle = spawnPoint.angle;

      ig.game.entities.push(player);
    }
  },

  update: function() {
    ig.gamepadInput.update();

    if( !this.players.length && (ig.input.pressed('jump') || ig.input.pressed('shoot')) )
      this.addPlayer( 0 );

    // Camera follows the player
    if( this.players[0] && ig.game.camera )
      ig.game.camera.follow( this.players[0] );

    // Instead of using the camera plugin, we could also just center
    // the screen on the player directly, like this:
    // this.screen.x = this.player.pos.x - ig.system.width/2;
    // this.screen.y = this.player.pos.y - ig.system.height/2;
  }
});

});
