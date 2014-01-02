class Enemy
  constructor: (x, y)->
    @position  = { x: x || 400, y: y || 460 }
    @speed     = 4
    @angle     = 0
    @rotation  = 0
    @target    = null
    @waypoints = []
    @size = 24
    @color = "#ff99ee"

  update: ->
    if game.level.findIntersection(@position.x, @position.y, game.player.position.x, game.player.position.y)
      @color = "#0099ff"
    else
      @color = "#ff99ee"

    #row = Math.floor(@position.y / Tile.size)
    #col = Math.floor(@position.x / Tile.size) 
  #
    #@playerRow = Math.floor(game.player.position.y / Tile.size)
    #@playerCol = Math.floor(game.player.position.x / Tile.size)
#
    #if @playerRow != @oldPlayerRow || @playerCol != @oldPlayerCol
    #  @oldPlayerCol = @playerCol
    #  @oldPlayerRow = @playerRow
    #  path = new Pathfinder(col, row, @playerCol, @playerRow)
    #  @waypoints = path.path
    #  if waypoint = @waypoints.pop()
    #    @target = { x: waypoint[0] * Tile.size + Tile.size * 0.5, y: waypoint[1] * Tile.size + Tile.size * 0.5 }
#
    #if @target
    #  dx = @target.x - @position.x
    #  dy = @target.y - @position.y
  #
    #  if (Math.abs(dx) < 5) && (Math.abs(dy) < 5)
    #    @position.x = @target.x
    #    @position.y = @target.y
    #    if waypoint = @waypoints.pop()
    #      @target = { x: waypoint[0] * Tile.size + Tile.size * 0.5, y: waypoint[1] * Tile.size + Tile.size * 0.5 }
    #  else
    #    @angle = Math.atan2(dy, dx)
    #    moveX  = @speed * Math.cos(@angle)
    #    moveY  = @speed * Math.sin(@angle)
    #    @position.x += moveX
    #    @position.y += moveY
    #
    #@rotation += (@angle - @rotation) / 6

    


  render: ->
    game.context.beginPath()
    game.context.fillStyle = @color
    game.context.translate(@size * 0.5, @size * 0.5)
    game.context.rotate(-@rotation)
    game.context.translate(-@position.x, -@position.y)
    game.context.rect(0, 0, @size, @size)
    game.context.resetTransform()
    game.context.fill()

window.Enemy = Enemy