ig.module(
  'plugins.line-of-sight'
)
.requires(
  'impact.collision-map'
)
.defines(function() {

ig.CollisionMap.inject({

  // When a map is loaded, create the pixel based collision map
  init: function(tilesize, data, tiledef) {
    this.parent(tilesize, data, tiledef);
  },


  // Returns the column & row of the tile of intersection.
  // Returns null if no intersection is found.
  findIntersection: function(x0, y0, x1, y1) {
      var dx, dy, error, n, x, xInc, y, yInc;

      // Convert to tiles instead of pixels
      var x0 = Math.floor(x0 / this.tilesize);
      var y0 = Math.floor(y0 / this.tilesize);
      var x1 = Math.floor(x1 / this.tilesize);
      var y1 = Math.floor(y1 / this.tilesize);

      dx = Math.abs(x1 - x0);
      dy = Math.abs(y1 - y0);
      x = Math.floor(x0);
      y = Math.floor(y0);
      n = 1;
      error = xInc = yInc = 0;
      if (dx === 0) {
        xInc = 0;
        error = Infinity;
      } else if (x1 > x0) {
        xInc = 1;
        n += Math.floor(x1) - x;
        error = (Math.floor(x0) + 1 - x0) * dy;
      } else {
        xInc = -1;
        n += x - Math.floor(x1);
        error = (x0 - Math.floor(x0)) * dy;
      }
      if (dy === 0) {
        yInc = 0;
        error -= Infinity;
      } else if (y1 > y0) {
        yInc = 1;
        n += Math.floor(y1) - y;
        error -= (Math.floor(y0) + 1 - y0) * dx;
      } else {
        yInc = -1;
        n += y - Math.floor(y1);
        error -= (y0 - Math.floor(y0)) * dx;
      }
      while (n > 0) {
        --n;
        if (this.getTile(x * this.tilesize, y * this.tilesize)) {
          return ({ col: x, row: y });
        }
        if (error > 0) {
          y += yInc;
          error -= dx;
        } else {
          x += xInc;
          error += dy;
        }
      }
      return null;
    }
});

});


