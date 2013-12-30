class Player
  constructor: ->
    @position = { x: 0, y: 0 }
    @tile     = { row: 0, col: 0 }
    @speed = 5
    @angle = 0
    @size = 32
  update: ->
    if KeyHandler.isDown 'w'
      @position.y -= @speed
    if KeyHandler.isDown 's'
      @position.y += @speed
    if KeyHandler.isDown 'a'
      @position.x -= @speed
    if KeyHandler.isDown 'd'
      @position.x += @speed


    dx = KeyHandler.mouse.x - @position.x
    dy = KeyHandler.mouse.y - @position.y
    @angle = Math.atan2(dy, dx)

    @tile.row = Math.floor(@position.y / Tile.size)
    @tile.col = Math.floor(@position.x / Tile.size)


  render: ->
    game.context.beginPath()
    game.context.fillStyle = "#ff9900"
    game.context.translate(@size * 0.5, @size * 0.5)
    game.context.rotate(-@angle)
    game.context.translate(-@position.x, -@position.y)
    game.context.rect(0, 0, @size, @size)
    game.context.resetTransform()
    game.context.fill()
window.Player = Player