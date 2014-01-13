ig.module(
  'game.levels.test-controller'
)
.requires(
  'game.levels.test'
)
.defines(function(){

  LevelTest.Controller = ig.Class.extend({
    music: new ig.Sound( 'media/music/hydrogen.*' ),

    init: function() {
      ig.music.add( this.music, 'hydrogen' );
      ig.music.play( 'hydrogen' );
    }
  });

});
