class Level
  constructor: (@map) ->
    @rows = 20
    @cols = 20
    @tiles = []
    @buildTiles()

  buildTiles: ->
    for row in [0..@rows - 1]
      @tiles[row] = []
      for col in [0..@cols - 1]
        index = row * @rows + col
        @tiles[row][col] = new Tile(type: @map[index], row: row, col: col)

  render: ->
    for row in [0..@rows - 1]
      for col in [0..@cols - 1]
        @tiles[row][col].render()

  getTile: (row, col) ->
    @tiles[row][col]


  visit: (x, y) ->
    row = Math.floor(y / Tile.size)
    col = Math.floor(x / Tile.size)
    game.level.tiles[row][col].fill = "eee"
  findIntersection: (x0, y0, x1, y1) ->
    dx = Math.abs(x1 - x0)
    dy = Math.abs(y1 - y0)

    x = Math.floor(x0)
    y = Math.floor(y0)

    n = 1
    error = xInc = yInc = 0

    if (dx == 0)
      xInc = 0
      error = Infinity
    else if (x1 > x0)
      xInc = 1
      n += Math.floor(x1) - x
      error = (Math.floor(x0) + 1 - x0) * dy
    else
      xInc = -1
      n += x - Math.floor(x1)
      error = (x0 - Math.floor(x0)) * dy

    if (dy == 0)
      yInc = 0
      error -= Infinity
    else if y1 > y0
      yInc = 1
      n += Math.floor(y1) - y
      error -= (Math.floor(y0) + 1 - y0) * dx
    else
      yInc = -1
      n += y - Math.floor(y1)
      error -= (y0 - Math.floor(y0)) * dx

    while n > 0
      --n
      @visit(x, y)
      if error > 0
        y += yInc
        error -= dx
      else 
        x += xInc
        error += dy



window.Level = Level