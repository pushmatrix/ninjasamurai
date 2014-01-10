ig.module(
  'game.entities.enemy'
)
.requires(
  'impact.entity'
)
.defines(function(){
  
EntityEnemy = ig.Entity.extend({
  size: {x: 70, y: 70},
  offset: {x: 0, y: 0},
  maxVel: {x: 100, y: 100},
  friction: {x: 150, y: 0},
  
  type: ig.Entity.TYPE.B, // Evil enemy group
  checkAgainst: ig.Entity.TYPE.A, // Check against friendly
  collides: ig.Entity.COLLIDES.PASSIVE,
  
  health: 1,
  
  
  speed: 100,
  flip: false,
  
  animSheet: new ig.AnimationSheet( 'media/enemy.png', 64, 118 ),
  sfxDie: new ig.Sound( 'media/sounds/blob-die.*' ),
  
  
  init: function( x, y, settings ) {
    this.parent( x, y, settings );
    
    this.addAnim( 'crawl', 0.2, [0,0] );
    this.addAnim( 'dead', 1, [2] );
  },
  
  
  update: function() {
    this.getPath(ig.game.player.pos.x, ig.game.player.pos.y, false);
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
    other.receiveDamage( 1, this );
  }
});

});