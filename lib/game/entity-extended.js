ig.module(
  'game.entity-extended'
)
.requires(
  'impact.entity',
  'game.vector'
)
.defines(function(){ "use strict";

ig.Entity.inject({
  draw: function() {
    if (this.currentAnim && typeof this.angle !== 'undefined')
      this.currentAnim.angle = this.angle;

    this.parent();
  },

  update: function() {
    delete this._forwardVector;
    this.parent();
  },

  getForwardVector: function() {
    if (this._forwardVector == null) {
      if (typeof this.angle !== 'undefined') {
        this._forwardVector = {
          x: Math.cos(this.angle),
          y: Math.sin(this.angle)
        }
      }
    }
    return this._forwardVector;
  },


  // Returns whether the other entity is within the field of view.
  // target  : The entity you want to see if you're looking at.
  // fovAngle: Tthe full angle of the fov, meaning that 60 degrees
  //           covers 30 degrees on EACH side of the entity.
  // maxDistance: How far this entity can see ahead of itself.
  //              Leave blank if you want infinite distance.
  canSee: function(target, fovAngle, maxDistance) {
    var toTargetVec = { 
      x: target.pos.x - this.pos.x,
      y: target.pos.y - this.pos.y
    }
    if (typeof maxDistance != 'undefined' && maxDistance != null && ig.Vector.magnitude(toTargetVec) > maxDistance) {
      return false;
    }
    var angle = ig.Vector.angleBetween(this.getForwardVector(), toTargetVec);
    if (angle < fovAngle * 0.5) {
      if (!ig.game.collisionMap.findIntersection(this.pos.x + this.size.x * 0.5, this.pos.y + this.size.y * 0.5, target.pos.x + target.size.x * 0.5, target.pos.y + target.size.y * 0.5)) {
        return true;
      }
    }
    return false;
  }
});

});
