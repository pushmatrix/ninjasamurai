// Generated by CoffeeScript 1.6.1
(function() {
  var Player;

  Player = (function() {

    function Player() {
      this.position = {
        x: 548,
        y: 570
      };
      this.tile = {
        row: 0,
        col: 0
      };
      this.speed = 7;
      this.angle = 0;
      this.size = 24;
    }

    Player.prototype.update = function() {
      var col, dx, dy, nextPosition, oldPosition, row;
      nextPosition = {
        x: this.position.x,
        y: this.position.y
      };
      if (KeyHandler.isDown('w')) {
        nextPosition.y -= this.speed;
      }
      if (KeyHandler.isDown('s')) {
        nextPosition.y += this.speed;
      }
      if (KeyHandler.isDown('a')) {
        nextPosition.x -= this.speed;
      }
      if (KeyHandler.isDown('d')) {
        nextPosition.x += this.speed;
      }
      dx = KeyHandler.mouse.x - this.position.x;
      dy = KeyHandler.mouse.y - this.position.y;
      this.angle = Math.atan2(dy, dx);
      oldPosition = {
        x: this.position.x,
        y: this.position.y
      };
      row = Math.floor(nextPosition.y / Tile.size);
      col = Math.floor(this.position.x / Tile.size);
      if (game.level.tiles[row][col].type === ".") {
        this.position.y = nextPosition.y;
      }
      row = Math.floor(this.position.y / Tile.size);
      col = Math.floor(nextPosition.x / Tile.size);
      if (game.level.tiles[row][col].type === ".") {
        this.position.x = nextPosition.x;
      }
      row = Math.floor(this.position.y / Tile.size);
      return col = Math.floor(this.position.x / Tile.size);
    };

    Player.prototype.render = function() {
      game.context.beginPath();
      game.context.fillStyle = "#ff9900";
      game.context.translate(this.size * 0.5, this.size * 0.5);
      game.context.rotate(-this.angle);
      game.context.translate(-this.position.x, -this.position.y);
      game.context.rect(0, 0, this.size, this.size);
      game.context.resetTransform();
      return game.context.fill();
    };

    return Player;

  })();

  window.Player = Player;

}).call(this);