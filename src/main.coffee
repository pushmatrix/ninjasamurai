class Game
  constructor: (@canvas) ->
    @context = @canvas.getContext('2d')
    @width   = @canvas.width
    @height  = @canvas.height

  loadLevel: (map) =>
    @level = new Level(map)

  render: =>
    @level.render()
    requestAnimationFrame(@render, @canvas)


window.game = new Game(document.getElementById('game'))
map = ['x', 'x', 'x', 'x', 'x',
       'x', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x',
       'x', 'x', 'x', 'x', 'x']

game.loadLevel(map)
game.render()