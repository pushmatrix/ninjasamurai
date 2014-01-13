ig.module(
  'game.animation-extended'
)
.requires(
  'impact.animation'
)
.defines(function(){ "use strict";

ig.Animation.inject({
  update: function() {
    var loopCount = this.loopCount;
    this.parent();

    if (this.loopCount > loopCount && this.onComplete) {
      this.onComplete();
    }
  }
});

});
