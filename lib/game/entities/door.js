ig.module(
  'game.entities.door'
)
.requires(
  'impact.entity'
)
.defines(function(){

EntityDoor = ig.Entity.extend({
  size: {x: 210, y: 23},
  offset: {x: 0, y: 0},

  image: new ig.Image( 'media/door.png', 70, 23 ),

  collides: ig.Entity.COLLIDES.FIXED,
  isInteractable: true,

  _wmScalable: true,

  interact: function() {
    this.pos.x -= this.size.x;
  },

  draw: function() {
    var xDraws = Math.floor(this.size.x / this.image.width),
        yDraws = Math.floor(this.size.y / this.image.height),
        x, y, i, j;

    for (i = 0; i < xDraws; i++) {
      for (j = 0; j < yDraws; j++) {
        x = this.pos.x + i * this.image.width - ig.game._rscreen.x;
        y = this.pos.y + j * this.image.height - ig.game._rscreen.y;

        this.image.draw(x, y);
      }
    }

  }
});

});
