class KeyHandler
  @KEY_MAP = KEY_MAP = {
    'up': 38
    'down': 40
    'left': 37
    'right': 39
    'space': 32
    'enter': 13
    'escape': 27
    'e': 69
    'w': 87
    'a': 65
    'd': 68
    's': 83
  }

  @listen: ->
    return if @downListener
    @pressed = {}
    @mouse   = {}
    @downListener = window.addEventListener 'keydown', (e) => @pressed[e.keyCode] = true; e.stopPropagation()
    @upListener = window.addEventListener 'keyup', (e) => @pressed[e.keyCode] = false; e.stopPropagation()
    window.addEventListener 'mousemove', (e) => @mouse.x = e.x; @mouse.y = e.y; e.stopPropagation()

  @isDown: (keyName) ->
    @pressed[KEY_MAP[keyName]]

window.KeyHandler = KeyHandler