class InputManager
  constructor: ->
    @player = []

  update: ->
    gamepads = navigator.webkitGetGamepads()

    for i in [0..4]
      @player[i] = gamepads[i]

  stickMoved: (controllerNumber, stick) ->
    @player[controllerNumber].axes[stick]

Playstation4Map = {
  LEFT_X: 0
  LEFT_Y: 1
  RIGHT_X: 2
  RIGHT_Y: 5

  FACE_1: 1
  FACE_2: 2
  FACE_3: 0
  FACE_4: 3
}
