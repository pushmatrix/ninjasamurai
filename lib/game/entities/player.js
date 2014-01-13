ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.fireball'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 40, y: 50},
	offset: {x: 150, y: 150},

	maxVel: {x: 800, y: 800},

	flip: false,
	angle: 0,

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/player.png', 300, 300 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'sword', 0.04, [0, 1, 2, 3, 4], true );
	},

	move: function( xVel, yVel ) {
		this.vel.x = xVel;
		this.vel.y = yVel;
	},

	rotate: function( xRot, yRot ) {
    this.angle = Math.atan2( yRot, xRot );
	},

	attack: function() {
		this.isAttacking = true;

		var flip = this.currentAnim.flip;
    this.currentAnim = this.anims.sword.rewind();
    this.currentAnim.flip = flip;

    this.currentAnim.onComplete = function() {
      this.isAttacking = false;
      var flip = this.currentAnim.flip.y;

      this.currentAnim = this.anims.idle.rewind();
      this.currentAnim.flip.y = !flip;
    }.bind( this );
	},

	interact: function() {
		this.isInteracting = true;

		var maxDistance = this.size.x + this.offset.x;
		var entities = ig.game.entities, i = entities.length, entity;
		while( i-- ) {
			entity = entities[i];
			if( !entity.isInteractable ) continue;

			if( this.distanceTo(entity) < maxDistance ) {
				entity.interact(this);
			}
		}

		// FIXMEFIXMEFIXME
		setTimeout(function() {
			this.isInteracting = false;
		}.bind( this ), 500);
	},

	update: function() {
		// shoot
		if( ((ig.input.pressed('shoot') && this.mainPlayer) || ig.gamepadInput.pressed(this.controllerNumber, ig.BUTTON.LEFT_BUTTON) && !this.isShooting) ) {
			this.isShooting = true;
			ig.game.spawnEntity( EntityFireball, this.pos.x, this.pos.y+40, {flip:this.flip} );

			// FIXMEFIXMEFIXME
			setTimeout(function() {
				this.isShooting = false;
			}.bind(this), 1000)
		}

		// Move!
		this.parent();
	},

	kill: function() {
		this.parent();

		// Reload this level
		ig.game.reloadLevel();
	}
});


});
