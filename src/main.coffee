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

    @players = []
    @enemies = []

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

    for player in @players
      player?.update()

    for enemy in @enemies
      enemy?.update()

    @level.render()

    for player in @players
      player?.render()

    for enemy in @enemies
      enemy?.render()

    requestAnimationFrame(@render, @canvas)

window.onload = ->
  @game = new Game(document.getElementById('game'))

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

  @game.loadLevel(map)

  game.addEnemy(208, 176)
  game.addEnemy(400, 464)
  game.addEnemy(560, 48)
  game.addEnemy(48, 400)

  @game.render()

  gui = new dat.GUI()
  gui.add(game.input, 'useRightStickControls').name('Easy Controls')
