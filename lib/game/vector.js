ig.module(
  'game.vector'
)
.requires(
  'impact.entity'
)
.defines(function(){ "use strict";

  ig.Vector = ({
    magnitude: function(vec) {
      return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }, 
    normalize: function(vec) {
      var magnitude = ig.Vector.magnitude(vec);
      vec.x /= magnitude;
      vec.y /= magnitude;
    },

    dotProduct: function(vec0, vec1) {
      return vec0.x * vec1.x + vec0.y * vec1.y;
    },

    angleBetween: function(vec0, vec1) {
      ig.Vector.normalize(vec0);
      ig.Vector.normalize(vec1);

      return Math.acos(ig.Vector.dotProduct(vec0, vec1)) * 180 / Math.PI;
    }
  });

});
