ig.module(
  'game.entities.enemy'
)
.requires(
  'impact.entity'
)
.defines(function(){

EntityEnemy = ig.Entity.extend({
  size: {x: 50, y: 50},
  offset: {x: 0, y: 24},
  maxVel: {x: 100000, y: 100000},
  friction: {x: 0, y: 0},

  type: ig.Entity.TYPE.B, // Evil enemy group
  checkAgainst: ig.Entity.TYPE.A, // Check against friendly
  collides: ig.Entity.COLLIDES.PASSIVE,

  health: 1,
  fovAngle: 90,
  angle: 0,

  target: null,

  legs: true,

  speed: 400,
  flip: false,

  animSheet: new ig.AnimationSheet( 'media/enemy.png', 64, 118 ),
  deathSheet: new ig.AnimationSheet( 'media/enemy-death.png', 220, 112),

  init: function( x, y, settings ) {
    this.parent( x, y, settings );

    this.addAnim( 'idle', 1, [0] );
    this.addAnim( 'dead', 1, [2] );
  },


  update: function() {
    if( this.isDead ) return;

    if (this.canSee(ig.player.players[0], this.fovAngle)) {
      this.target = ig.player.players[0];
    }
    if (this.target) {
      this.getPath(this.target.pos.x, this.target.pos.y, true);
    }
    this.followPath(this.speed);
    this.parent();
  },

  checkAttack: function( player ) {
    if( !this.isDead && player.canSee( this, 90, player.offset.x ) ) {
      this.angle = player.angle;
      this.die();
    }
  },

  die: function() {
    this.isDead = true;
    this.currentAnim = new ig.Animation(this.deathSheet, 1, [0]);
  },

  handleMovementTrace: function( res ) {
    // This is how you ignore collision detection
    // lol wut
    this.pos.x += this.vel.x * ig.system.tick;
    this.pos.y += this.vel.y * ig.system.tick;
  }
});

});
