class Player
  useRightStickControls: true

  constructor: (@controllerNumber, @controllerMap) ->
    @position = new Vector(548, 570)
    @direction = new Vector()

    @speed = 7
    @angle = Math.PI * 1.5
    @size = 24

  update: ->
    nextPosition = @position.clone()
    oldPosition = @position.clone()

    leftX = game.input.stickMoved(@controllerNumber, @controllerMap.LEFT_X)
    leftY = game.input.stickMoved(@controllerNumber, @controllerMap.LEFT_Y)
    rightX = game.input.stickMoved(@controllerNumber, @controllerMap.RIGHT_X)
    rightY = game.input.stickMoved(@controllerNumber, @controllerMap.RIGHT_Y)

    if Math.abs(leftX) > 0.5
      nextPosition.x += @speed * leftX
    if Math.abs(leftY) > 0.5
      nextPosition.y += @speed * leftY

    if @useRightStickControls
      rotX = rightX
      rotY = rightY
    else
      rotX = leftX
      rotY = leftY

    if Math.abs(rotX) > 0.5 || Math.abs(rotY) > 0.5
      @angle = Math.atan2(rotY, rotX)

    # Major refactor needed
    row = Math.floor(nextPosition.y / Tile.size)
    col = Math.floor(@position.x / Tile.size)

    if game.level.tiles[row][col].type == "."
      @position.y = nextPosition.y

    row = Math.floor(@position.y / Tile.size)
    col = Math.floor(nextPosition.x / Tile.size)

    if game.level.tiles[row][col].type == "."
      @position.x = nextPosition.x

    # got into a new tile
    row = Math.floor(@position.y / Tile.size)
    col = Math.floor(@position.x / Tile.size)

    # attacking
    @isAttacking = game.input.buttonPressed(@controllerNumber, @controllerMap.RIGHT_TRIGGER)
    if @isAttacking
      @direction.x = Math.cos(@angle)
      @direction.y = Math.sin(@angle)
      for enemy in game.enemies
        distance = enemy.toPlayer.magnitude()
        if distance < Tile.size + 20
          toEnemy = new Vector(enemy.position.x - @position.x, enemy.position.y - @position.y)
          if @direction.angleBetween(toEnemy) < 30
            enemy.alive = false

  render: ->
    game.context.beginPath()
    game.context.fillStyle = "#333"
    game.context.translate(@size * 0.5, @size * 0.5)
    game.context.rotate(-@angle)
    game.context.translate(-@position.x, -@position.y)
    game.context.rect(0, 0, @size, @size)

    # sword
    game.context.rect(@size, 18, (if @isAttacking then 28 else 15), 4)

    game.context.resetTransform()
    game.context.fill()

window.Player = Player
