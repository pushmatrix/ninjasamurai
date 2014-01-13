ig.module(
  'game.player-manager'
)
.requires(
  'game.entities.player',
  'plugins.gamepad'
)
.defines(function(){

ig.PlayerManager = ig.Class.extend({
  useKeyboard: true,

  moveThreshold: 0.2,
  rotateThreshold: 0.4,

  init: function() {
    this.players = [];

    if( this.useKeyboard )
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
    ig.gamepadInput.onControllerAdded( this.addPlayer.bind( this ) );
  },

  addPlayer: function( pad ) {
    var player = ig.game.spawnEntity( EntityPlayer, 200 + pad * 200, 750 );
    this.players.push( player );
  },

  spawn: function() {
    var spawnPoint = ig.game.getEntitiesByType( EntitySpawnPoint )[0];
    if( !spawnPoint ) return;

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

    this.updateMovement();
    this.updateActions();

    // Camera follows the player
    if( this.players[0] && ig.game.camera )
      ig.game.camera.follow( this.players[0] );

    // Instead of using the camera plugin, we could also just center
    // the screen on the player directly, like this:
    // this.screen.x = this.player.pos.x - ig.system.width/2;
    // this.screen.y = this.player.pos.y - ig.system.height/2;
  },

  updateMovement: function() {
    var i = this.players.length, player,
        leftX, leftY, rightX, rightY,
        xVel, yVel, xRot, yRot, speed,
        moveThreshold = this.moveThreshold,
        rotateThreshold = this.rotateThreshold;

    while( i-- ) {
      player = this.players[i];
      if( !player ) continue;

      leftX = ig.gamepadInput.axis(i, ig.AXES.LEFT_X);
      leftY = ig.gamepadInput.axis(i, ig.AXES.LEFT_Y);
      rightX = ig.gamepadInput.axis(i, ig.AXES.RIGHT_X);
      rightY = ig.gamepadInput.axis(i, ig.AXES.RIGHT_Y);
      speed = player.maxVel.x;
      xVel = yVel = xRot = yRot = 0;

      if( Math.abs( leftX ) > moveThreshold )
        xVel = speed * leftX;

      if( Math.abs( leftY ) > moveThreshold )
        yVel = speed * leftY;

      player.move(xVel, yVel);

      if( Math.abs( rightX ) > rotateThreshold || Math.abs( rightY ) > rotateThreshold )
        player.rotate(rightX, rightY);
    }

    player = this.players[0];

    if( this.useKeyboard && player ) {
      speed = player.maxVel.x;

      if( ig.input.state( 'left' ) ) {
        xVel = -speed;
        xRot = -1;
      } else if( ig.input.state( 'right' ) ) {
        xVel = speed;
        xRot = 1;
      }

      if( ig.input.state( 'up' ) ) {
        yVel = -speed;
        yRot = -1;
      } else if( ig.input.state( 'down' ) ) {
        yVel = speed;
        yRot = 1;
      }

      player.move(xVel, yVel);

      if( xRot !== 0 || yRot !== 0 )
        player.rotate(xRot, yRot);
    }
  },

  updateActions: function() {
    var i = this.players.length, player,
        shouldAttack, shouldInteract;

    while( i-- ) {
      player = this.players[i];
      if( !player ) continue;

      // handle attacking
      shouldAttack = false;
      if( ig.gamepadInput.pressed( i, ig.BUTTON.RIGHT_BUTTON ) ) shouldAttack = true;
      if( this.useKeyboard && ig.input.pressed( 'attack' ) ) shouldAttack = true;

      if( shouldAttack && !player.isAttacking )
        player.attack();

      // handle shooting
      shouldShoot = false;
      if( ig.gamepadInput.pressed( i, ig.BUTTON.LEFT_BUTTON ) ) shouldShoot = true;
      if( this.useKeyboard && ig.input.pressed( 'shoot' ) ) shouldShoot = true;

      if( shouldShoot && !player.isShooting )
        player.shoot();

      // handle interacting
      shouldInteract = false;
      if( ig.gamepadInput.pressed( i, ig.BUTTON.FACE_0 ) ) shouldInteract = true;
      if( this.useKeyboard && ig.input.pressed( 'interact' ) ) shouldInteract = true;

      if( shouldInteract && !player.isInteracting )
        player.interact();
    }
  }
});

});
