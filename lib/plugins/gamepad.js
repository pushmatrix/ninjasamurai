/*
  gamepad.js by Nick Small
*/
ig.module(
  'plugins.gamepad'
)
.requires(
  'impact.input'
)
.defines(function() {
  ig.AXES = {
    LEFT_X: 0,
    LEFT_Y: 1,
    RIGHT_X: 2,
    RIGHT_Y: 3
  };

  ig.BUTTON = {
    FACE_0: 0,
    FACE_1: 1,
    FACE_2: 2,
    FACE_3: 3,

    SELECT: 8,
    START: 9
  }

  ig.GamepadInput = ig.Class.extend({
    onControllerAdded: function(callback) {

    },

    update: function() {
      this.controllers = navigator.webkitGetGamepads();
    },

    axis: function(pad, axes) {
      // this.controllers[pad]
    },

    pressed: function(pad, action) {

    }
  });

  ig.gamepadInput = new ig.GamepadInput();
});
