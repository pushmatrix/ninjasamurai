#= require enemy
#= require keyhandler
#= require level
#= require player
#= require pathfinder
#= require tile
#= require vector

class Game
  constructor: (@canvas) ->
    @context = @canvas.getContext('2d')
    @width   = @canvas.width
    @height  = @canvas.height
    @player = new Player()
    @enemies = []
    @addEnemy(208, 176)
    @addEnemy(400, 464)
    @addEnemy(560, 48)
    @addEnemy(48, 400)
    KeyHandler.listen()

  addEnemy: (x, y) ->
    @enemies.push new Enemy(x, y)
  loadLevel: (map) =>
    @level = new Level(map)

  render: =>
    for row in @level.tiles
      for tile in row
        tile.fill = null

    @player.update()
    for enemy in @enemies
      enemy.update()
    @level.render()
    for enemy in @enemies
      enemy.render()
    @player.render()
    requestAnimationFrame(@render, @canvas)

window.game = new Game(document.getElementById('game'))
map = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', 'x', 'x', '.', '.', 'x', '.', '.', 'x',
       'x', '.', 'x', 'x', '.', '.', 'x', 'x', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x', '.', '.', 'x',
       'x', '.', 'x', 'x', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', 'x',
       'x', '.', 'x', 'x', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', 'x',
       'x', '.', 'x', 'x', '.', '.', 'x', 'x', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', 'x', '.', '.', 'x', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', 'x', 'x', '.', '.', 'x', 'x', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', 'x', 'x', 'x', 'x', 'x', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', 'x',
       'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']

game.loadLevel(map)
game.render()




#new Pathfinder(2, 4, 6, 4)
