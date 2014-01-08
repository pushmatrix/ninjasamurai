class Player
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

    if Math.abs(rightX) > 0.5 || Math.abs(rightY) > 0.5
      @angle = Math.atan2(rightY, rightX)

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
    #if (row != Math.floor(oldPosition.y / Tile.size)) || (col != Math.floor(oldPosition.x / Tile.size))
    #  path = new Pathfinder(col, row, 5, 5)
#

    @direction.x =  rightX
    @direction.y =  rightY
    # if KeyHandler.mousePressed
    #   for enemy in game.enemies
    #     distance = enemy.toPlayer.magnitude()
    #     if distance < Tile.size + 20
    #       toEnemy = new Vector(enemy.position.x - @position.x, enemy.position.y - @position.y)
    #       if @direction.angleBetween(toEnemy) < 30
    #         enemy.alive = false






  render: ->
    game.context.beginPath()
    game.context.fillStyle = "#333"
    game.context.translate(@size * 0.5, @size * 0.5)
    game.context.rotate(-@angle)
    game.context.translate(-@position.x, -@position.y)
    game.context.rect(0, 0, @size, @size)
    # if KeyHandler.mousePressed
    #   game.context.rect(@size, 18, 28, 4)
    # else
    game.context.rect(@size, 18, 15, 4)
    game.context.resetTransform()
    game.context.fill()
window.Player = Player
