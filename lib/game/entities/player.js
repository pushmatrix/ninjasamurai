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

	update: function() {
		if( ((ig.input.pressed('attack') && this.mainPlayer) || ig.gamepadInput.pressed(this.controllerNumber, ig.BUTTON.RIGHT_BUTTON) && !this.isAttacking) ) {

			this.isAttacking = true;

			var flip = this.currentAnim.flip;
			this.currentAnim = this.anims.sword.rewind();
			this.currentAnim.flip = flip;

			this.currentAnim.onComplete = function() {
				this.isAttacking = false;
				var flip = this.currentAnim.flip.y;

				this.currentAnim = this.anims.idle.rewind();
				this.currentAnim.flip.y = !flip;
			}.bind(this);
		}


		// shoot
		if( ((ig.input.pressed('shoot') && this.mainPlayer) || ig.gamepadInput.pressed(this.controllerNumber, ig.BUTTON.LEFT_BUTTON) && !this.isShooting) ) {
			this.isShooting = true;
			ig.game.spawnEntity( EntityFireball, this.pos.x, this.pos.y+40, {flip:this.flip} );

			// FIXMEFIXMEFIXME
			setTimeout(function() {
				this.isShooting = false;
			}.bind(this), 1000)
		}

		// interact
		if( ((ig.input.pressed('interact') && this.mainPlayer) || ig.gamepadInput.pressed(this.controllerNumber, ig.BUTTON.FACE_0) && !this.isInteracting) ) {
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
			}.bind(this), 500);
		}

		// Stay in the pain animation, until it has looped through.
		// If not in pain, set the current animation, based on the
		// player's speed
		if(
			this.currentAnim == this.anims.pain &&
			this.currentAnim.loopCount < 1
		) {
			// If we're dead, fade out
			if( this.health <= 0 ) {
				// The pain animation is 0.3 seconds long, so in order to
				// completely fade out in this time, we have to reduce alpha
				// by 3.3 per second === 1 in 0.3 seconds
				var dec = (1/this.currentAnim.frameTime) * ig.system.tick;
				this.currentAnim.alpha = (this.currentAnim.alpha - dec).limit(0,1);
			}
		}
		else if( this.health <= 0 ) {
			// We're actually dead and the death (pain) animation is
			// finished. Remove ourself from the game world.
			this.kill();
		}
		else if( this.vel.y < 0 ) {
		//	this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			if( this.currentAnim != this.anims.fall ) {
		//		this.currentAnim = this.anims.fall.rewind();
			}
		}
		else if( this.vel.x != 0 ) {
			//this.currentAnim = this.anims.run;
		}
		else {
			//this.currentAnim = this.anims.idle;
		}

		//this.currentAnim.flip.x = this.flip;

		// Move!
		this.parent();
	},

	kill: function() {
		this.parent();

		// Reload this level
		ig.game.reloadLevel();
	},

	giveCoins: function( amount ) {
		// Custom function, called from the EntityCoin
		this.coins += amount;
	},

	receiveDamage: function( amount, from ) {
		if( this.currentAnim == this.anims.pain ) {
			// Already in pain? Do nothing.
			return;
		}

		// We don't call the parent implementation here, because it
		// would call this.kill() as soon as the health is zero.
		// We want to play our death (pain) animation first.
		this.health -= amount;
		this.currentAnim = this.anims.pain.rewind();

		// Knockback
		this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
		this.vel.y = -300;

		// Sound
		this.sfxHurt.play();
	}
});


});
