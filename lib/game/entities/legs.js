ig.module(
  'game.entities.legs'
)
.requires(
  'impact.entity'
)
.defines(function(){

EntityLegs = ig.Entity.extend({

  _wmIgnore: true, // This entity will not be available in Weltmeister

  size: {x: 24, y: 24},
  offset: {x: 64, y: 59},

  torso: null,
  
  type: ig.Entity.TYPE.NONE,
  checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
  collides: ig.Entity.COLLIDES.PASSIVE,
    
  animSheet: new ig.AnimationSheet( 'media/player_legs.png', 128, 118 ),
    
  
  init: function(x, y, settings) {
    this.parent( x, y, settings );
    this.torso = settings.torso;
    this.addAnim('idle', 0.5, [0]);
    this.addAnim('walking', 0.2, [1, 2]);
  },
  

  update: function() {
    if (this.torso.vel.x != 0 || this.torso.vel.y != 0) {
      if (this.currentAnim != this.anims.walking) {
        this.currentAnim = this.anims.walking.rewind();
      }
    } else {
      this.currentAnim = this.anims.idle.rewind();
    }
    this.pos.x = this.torso.pos.x + this.size.x * 0.5;
    this.pos.y = this.torso.pos.y + this.size.y * 0.5;
    this.angle = this.torso.angle;
    this.parent();
  }
  });
});