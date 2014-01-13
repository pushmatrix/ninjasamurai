ig.module(
  'game.levels.title-controller'
)
.requires(
  'game.levels.title'
)
.defines(function(){

  LevelTitle.Controller = ig.Class.extend({
    image: new ig.Image( 'media/title.png' ),
    sound: new ig.Sound( 'media/sounds/title.*', false ),
    music: new ig.Sound( 'media/music/HorseSteppin.*' ),

    init: function() {
      this.sound.play();

      ig.music.add( this.music, 'title' );

      setTimeout( function() {
        ig.music.play( 'title' );
      }, 3500 );
    },

    start: function() {
      ig.game.loadLevel( LevelTest );

      ig.music.stop();
      this.sound.stop();
    },

    update: function() {
      if( ig.input.pressed( 'shoot' ) || ig.input.pressed( 'jump' ) ) {
        if( !ig.player.players.length )
          ig.player.addPlayer( 0 );

        return this.start();
      }

      if( ig.gamepadInput.pressed(-1, ig.BUTTON.START) )
        return this.start();
    },

    draw: function() {
      var cx = ig.system.width / 2;
      this.image.draw( cx - this.image.width / 2, 60 );

      var startText = 'Press X to join and Start to play!';
      ig.game.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER );
    }
  });

});
