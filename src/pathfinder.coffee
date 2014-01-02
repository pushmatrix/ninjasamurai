class Pathfinder
  constructor: (@startCol, @startRow, @targetCol, @targetRow) ->
    @open = @closed = []
    for row in game.level.tiles
      for tile in row
        tile.fill = null
    game.level.tiles[@targetRow][@targetCol].fill = "#ff0000"
    game.level.tiles[@startRow][@startCol].fill = "#00ff00"

    @nodeMap = []
    for i in [0..game.level.rows]
      @nodeMap[i] = []

    @addToOpenList
      col: @startCol
      row: @startRow
      g: 0
      f: 0

    finished = 0
    while !finished
     # console.log '***'
      node = @findSmallestF()
      @open.splice(@open.indexOf(node), 1)
      @nodeMap[node.row][node.col].state = 'c'
      if !node
        console.log 'no path found'
        finished = 1
      else if node.row == @targetRow && node.col == @targetCol
        #console.log 'finished!'
        direction = ""
        @path = []
        while node
          if !(node.row == @startRow && node.col == @startCol) && !(node.row == @targetRow && node.col == @targetCol)
            if node.direction != direction
              @path.push [node.col, node.row]
              game.level.tiles[node.row][node.col].fill = "#fff"
              direction = node.direction
          #console.log node.row, node.col
           # console.log 'ok'
            #game.level.tiles[node.row][node.col].fill = "#fff"
          node = node.parent
        finished = 1
      else
        @processAdjacentTiles(node)

  processAdjacentTiles: (node) ->
    for i in [-1..1]
      for j in [-1..1]
        continue if i == 0 && j == 0
        row = node.row + i
        col = node.col + j
        tile = game.level.map[row * game.level.rows + col]
        # Is it a walkable space?
        newNode = @nodeMap[row][col]
        if tile == "." && newNode?.state != 'c'
  
          # check for diagonal movement
          if i * j != 0
            # check if it is possible to reach this node diagonally.
            # do this by looking at the 2 tiles that make up the movement, and see if either of them are a wall.
            if (game.level.map[(node.row + i) * game.level.rows + node.col] == ".") &&
               (game.level.map[node.row * game.level.rows + (node.col + j)] == ".")
              movementCost = 14
            else
              continue
          else
            movementCost = 10

          # Is it already on the open list?
          if newNode?.state == 'o'
            #console.log "checking if #{node.g + movementCost} is less than #{newNode.g}:", "[#{node.col}, #{node.row}] ", "[#{newNode.col}, #{newNode.row}]"
            if node.g + movementCost < newNode.g 
              newNode.parent = node
              # recalculate f, g, h for node
              newNode.h = @getManhattanDistance(col, row)
              newNode.f = node.g + g + newNode.h
              newNode.direction = "#{i}#{j}"
          else
            #console.log 'adding to open list', col, row
            g = node.g + movementCost
            h = @getManhattanDistance(col, row)
            f = g + h
            @addToOpenList
              col: col
              row: row
              f: f
              g: g
              h: h
              direction: "#{i}#{j}"
              parent: node


  getManhattanDistance: (col, row) ->
    (Math.abs(@targetRow - row) + Math.abs(@targetCol - col)) * 10

  findSmallestF: ->
    smallest = @open[0]
    for i in @open
      if i.f < smallest.f
        smallest = i
    smallest

  addToOpenList: (node) ->
    node.state = 'o'
    @nodeMap[node.row][node.col] = node
    @open.push node


window.Pathfinder = Pathfinder