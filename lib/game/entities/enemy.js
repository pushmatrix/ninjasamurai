ig.module(
  'game.entities.enemy'
)
.requires(
  'impact.entity'
)
.defines(function(){
  
EntityEnemy = ig.Entity.extend({
  size: {x: 118, y: 64},
  offset: {x: 0, y: 0},
  maxVel: {x: 100000, y: 100000},
  friction: {x: 0, y: 0},
  
  type: ig.Entity.TYPE.B, // Evil enemy group
  checkAgainst: ig.Entity.TYPE.A, // Check against friendly
  collides: ig.Entity.COLLIDES.PASSIVE,
  
  health: 1,
  
  
  speed: 600,
  flip: false,
  
  animSheet: new ig.AnimationSheet( 'media/enemy.png', 118, 64 ),
  sfxDie: new ig.Sound( 'media/sounds/blob-die.*' ),
  
  
  init: function( x, y, settings ) {
    this.parent( x, y, settings );
    
    this.addAnim( 'crawl', 0.2, [0,0] );
    this.addAnim( 'dead', 1, [2] );
  },
  
  
  update: function() {
    this.getPath(ig.game.player.pos.x, ig.game.player.pos.y, true);
    this.followPath(this.speed);

    this.parent();
  },
  
  kill: function() {
    this.sfxDie.play();
    this.parent();
    
  },
  
  handleMovementTrace: function( res ) {
    // This is how you ignore collision detection
    // lol wut
    this.pos.x += this.vel.x * ig.system.tick;
    this.pos.y += this.vel.y * ig.system.tick;
  },
  
  check: function( other ) {
    //other.receiveDamage( 1, this );
  }
});

});