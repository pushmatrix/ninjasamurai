class Player
  constructor: ->
    @position = { x: 548, y: 570 }
    @tile     = { row: 0, col: 0 }
    @speed = 7
    @angle = 0
    @size = 24
    @direction = new Vector()
  update: ->

    nextPosition = { x: @position.x, y: @position.y }
    if KeyHandler.isDown 'w'
      nextPosition.y -= @speed
    if KeyHandler.isDown 's'
      nextPosition.y += @speed
    if KeyHandler.isDown 'a'
      nextPosition.x -= @speed
    if KeyHandler.isDown 'd'
      nextPosition.x += @speed


    #dx = KeyHandler.mouse.x - Tile.size * game.level.cols * 0.5
    #dy = KeyHandler.mouse.y - Tile.size * game.level.rows * 0.5
    
    dx = KeyHandler.mouse.x - @position.x
    dy = KeyHandler.mouse.y - @position.y
    @angle = Math.atan2(dy, dx)

    oldPosition = { x: @position.x, y: @position.y }

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

    @direction.x =  Math.cos(@angle)
    @direction.y =  Math.sin(@angle)
    if KeyHandler.mousePressed
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
    if KeyHandler.mousePressed
      game.context.rect(@size, 18, 28, 4)
    else
      game.context.rect(@size, 18, 15, 4)
    game.context.resetTransform()
    game.context.fill()
window.Player = Player