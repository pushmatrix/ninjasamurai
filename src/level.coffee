class Level
  constructor: (@map) ->
    @rows = 5
    @cols = 5
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

window.Level = Level