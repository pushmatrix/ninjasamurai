/*
  gamepad.js by Nick Small
*/
ig.module(
  'plugins.gamepad-debug'
)
.requires(
  'impact.debug.debug'
)
.defines(function() {
  GamepadDebugPanel = ig.DebugPanel.extend({
    init: function(name, label) {
      this.parent(name, label);

      this.controllers = [];

      for (var i = 0; i <= 3; i++) {
        var controller = {};
        this.controllers[i] = controller;

        var div = document.createElement('div');
        div.style.display = 'none';
        controller.container = div;

        var header = document.createElement('h3');
        header.innerHTML = "Controller " + (i + 1);
        controller.header = header;
        div.appendChild(header);

        var stats = document.createElement('p');
        controller.stats = stats;
        div.appendChild(stats);

        this.container.appendChild(div);
      }
    },

    afterRun: function() {
      var gamepads = ig.gamepadInput.controllers, gamepad, html;

      for (var i = 0; i <= 3; i++) {
        gamepad = gamepads[i];
        this.controllers[i].container.style.display = gamepad ? 'block' : 'none';

        if (gamepad) {
          html = [
            "Left X:", gamepad.axes[0].round(2), "<br />",
            "Left Y:", gamepad.axes[1].round(2), "<br />",
            "Right X:", gamepad.axes[2].round(2), "<br />",
            "Right Y:", gamepad.axes[3].round(2), "<br />",

            "Face 0:", gamepad.buttons[0].round(2), "<br />",
            "Face 1:", gamepad.buttons[1].round(2), "<br />",
            "Face 2:", gamepad.buttons[2].round(2), "<br />",
            "Face 3:", gamepad.buttons[3].round(2), "<br />",
            "Select:", gamepad.buttons[8].round(2), "<br />",
            "Start:", gamepad.buttons[9].round(2), "<br />",
          ];

          this.controllers[i].stats.innerHTML = html.join(' ');
        }
      }
    }
  });

  ig.debug.addPanel({
    type: GamepadDebugPanel,
    name: 'gamepad-debug',
    label: 'Gamepads'
  });
});
