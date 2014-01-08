#= require vector

#= require tile
#= require level

#= require player
#= require input_manager

#= require enemy
#= require pathfinder

class Game
  constructor: (@canvas) ->
    @context = @canvas.getContext('2d')
    @width   = @canvas.width
    @height  = @canvas.height
    @player = new Player(0, Playstation4Map)

    @enemies = []
    @addEnemy(208, 176)
    @addEnemy(400, 464)
    @addEnemy(560, 48)
    @addEnemy(48, 400)

    @input = new InputManager


  addEnemy: (x, y) ->
    @enemies.push new Enemy(x, y)

  loadLevel: (map) =>
    @level = new Level(map)

  render: =>
    @input.update()

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
