// Generated by CoffeeScript 1.6.1
(function() {
  var Game, map,
    _this = this;

  Game = (function() {

    function Game(canvas) {
      var _this = this;
      this.canvas = canvas;
      this.render = function() {
        return Game.prototype.render.apply(_this, arguments);
      };
      this.loadLevel = function(map) {
        return Game.prototype.loadLevel.apply(_this, arguments);
      };
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player();
      KeyHandler.listen();
    }

    Game.prototype.loadLevel = function(map) {
      return this.level = new Level(map);
    };

    Game.prototype.render = function() {
      this.player.update();
      this.level.render();
      this.player.render();
      return requestAnimationFrame(this.render, this.canvas);
    };

    return Game;

  })();

  window.game = new Game(document.getElementById('game'));

  map = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];

  game.loadLevel(map);

  game.render();

}).call(this);
