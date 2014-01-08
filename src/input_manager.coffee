class InputManager
  axesThreshold: 0.5
  buttonThreshold: 0.5

  update: ->
    @controllers = navigator.webkitGetGamepads()

  buttonPressed: (controllerNumber, button) ->
    return !!@controllers[controllerNumber]?.buttons[button]

  stickMoved: (controllerNumber, stick) ->
    return @controllers[controllerNumber]?.axes[stick]

Playstation4Map = {
  LEFT_X: 0
  LEFT_Y: 1
  RIGHT_X: 2
  RIGHT_Y: 5

  FACE_1: 1
  FACE_2: 2
  FACE_3: 0
  FACE_4: 3

  LEFT_BUTTON: 4
  LEFT_TRIGGER: 6
  LEFT_STICK: 10
  RIGHT_BUTTON: 5
  RIGHT_TRIGGER: 7
  RIGHT_STICK: 11
}
