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


	maxVel: {x: 400, y: 800},
	friction: {x: 800, y: 0},

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/playersprite.png', 64, 118 ),
	animSheet: new ig.AnimationSheet( 'media/player.png', 300, 300 ),
	sfxHurt: new ig.Sound( 'media/sounds/hurt.*' ),
	sfxJump: new ig.Sound( 'media/sounds/jump.*' ),


	health: 3,

	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 800,
	accelAir: 600,
	jump: 500,
	maxHealth: 3,

	coins: 0,


	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'sword', 0.04, [0, 1, 2, 3, 4], true );
		//this.addAnim( 'run', 0.07, [4,5,11,0,1,2,7,8,9,3] );
		//this.addAnim( 'jump', 1, [13] );
		//this.addAnim( 'fall', 0.4, [13,12], true ); // stop at the last frame
		//this.addAnim( 'pain', 0.3, [6], true );

		// Set a reference to the player on the game instance
		// ig.game.player = this;
	},


	update: function() {
    var leftX = ig.gamepadInput.axis(this.controllerNumber, ig.AXES.LEFT_X);
    var leftY = ig.gamepadInput.axis(this.controllerNumber, ig.AXES.LEFT_Y);
    var rightX = ig.gamepadInput.axis(this.controllerNumber, ig.AXES.RIGHT_X);
    var rightY = ig.gamepadInput.axis(this.controllerNumber, ig.AXES.RIGHT_Y);
    var rotX = rightX || 0, rotY = rightY || 0;

		// Handle user input; move left or right
		if( ig.input.state('left') && this.mainPlayer ) {
			this.vel.x = -this.accelGround;
			rotX = -1;
		} else if( ig.input.state('right') && this.mainPlayer ) {
			this.vel.x = this.accelGround;
			rotX = 1;
		} else if( Math.abs(leftX) > 0.2 ) {
			this.vel.x = this.accelGround * leftX;
		} else {
			this.vel.x = 0;
		}

		if( ig.input.state('up') && this.mainPlayer ) {
			this.vel.y = -this.accelGround;
			rotY = -1;
		} else if( ig.input.state('down') && this.mainPlayer ) {
			this.vel.y = this.accelGround;
			rotY = 1;
		} else if( Math.abs(leftY) > 0.2 ) {
			this.vel.y = this.accelGround * leftY;
		} else {
			this.vel.y = 0;
		}

		if (Math.abs(rotX) > 0.5 || Math.abs(rotY) > 0.5)
      this.angle = Math.atan2(rotX, -rotY);

		// TODO: Decouple the animation from the angle.
		// You shouldn't have to transfer the angle over when you change anim
		// Also, make it so you need to wait for the animation to complete

		if (((ig.input.pressed('attack') && this.mainPlayer) || ig.gamepadInput.pressed(this.controllerNumber, ig.BUTTON.RIGHT_BUTTON) && !this.isAttacking)) {

			this.isAttacking = true;

			var flip = this.currentAnim.flip;
			var angle = this.currentAnim.angle;
			this.currentAnim = this.anims.sword.rewind();
			this.currentAnim.angle = angle;
			this.currentAnim.flip = flip;
			var _this = this;
			setTimeout(function() {
				_this.isAttacking = false;
				angle = _this.currentAnim.angle;
				flip = _this.currentAnim.flip.x;
				_this.currentAnim = _this.anims.idle.rewind();
				_this.currentAnim.angle = angle;
				_this.currentAnim.flip.x = !flip;
			}, 40 * 5);
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
		this.currentAnim.angle = this.angle;

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
