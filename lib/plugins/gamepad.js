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
      this.addedCallbacks = [callback, callback, callback, callback];
      this.update();
    },

    update: function() {
      this.controllers = navigator.webkitGetGamepads();

      for (var i = 0; i <= 3; i++) {
        if (this.addedCallbacks && this.addedCallbacks[i] && this.controllers[i]) {
          this.addedCallbacks[i](i);
          this.addedCallbacks[i] = null;
        }
      }
    },

    axis: function(pad, axis) {
      var controller = this.controllers[pad];
      if (controller)
        return controller.axes[axis];
    },

    pressed: function(pad, button) {
      if (pad === -1) {
        for (var i = 0; i <= 3; i++) {
          var controller = this.controllers[i];
          if (controller && controller.buttons[button])
            return controller.buttons[button];
        }
      } else {
        var controller = this.controllers[pad];
        if (controller)
          return controller.buttons[button];
      }
    }
  });

  ig.gamepadInput = new ig.GamepadInput();
});
