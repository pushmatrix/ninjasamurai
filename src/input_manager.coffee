class InputManager
  axesThreshold: 0.5
  buttonThreshold: 0.5
  useRightStickControls: true

  update: ->
    @controllers = navigator.webkitGetGamepads()

    for i in [0..3]
      continue if game.players[i]
      if @buttonPressed(i, DefaultMap.START)
        if @controllers[i].id == "Wireless Controller (Vendor: 054c Product: 05c4)"
          map = Playstation4Map
        else
          map = DefaultMap

        game.players[i] = new Player(i, map)

  buttonPressed: (controllerNumber, button) ->
    return !!@controllers[controllerNumber]?.buttons[button]

  stickMoved: (controllerNumber, stick) ->
    return @controllers[controllerNumber]?.axes[stick]

DefaultMap = {
  LEFT_X: 0
  LEFT_Y: 1
  RIGHT_X: 2
  RIGHT_Y: 3

  FACE_1: 0
  FACE_2: 1
  FACE_3: 2
  FACE_4: 3

  LEFT_BUTTON: 4
  LEFT_TRIGGER: 6
  LEFT_STICK: 10
  RIGHT_BUTTON: 5
  RIGHT_TRIGGER: 7
  RIGHT_STICK: 11

  SELECT: 8
  START: 9
}

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

  SELECT: 8
  START: 9
}
