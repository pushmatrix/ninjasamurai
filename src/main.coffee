class Game
  constructor: (@canvas) ->
    @context = @canvas.getContext('2d')
    @width   = @canvas.width
    @height  = @canvas.height
    @player = new Player()
    KeyHandler.listen()

  loadLevel: (map) =>
    @level = new Level(map)

  render: =>
    @player.update()
    @level.render()
    @player.render()
    requestAnimationFrame(@render, @canvas)


window.game = new Game(document.getElementById('game'))
map = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x',
       'x', '.', '.', '.', 'x', 'x', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', '.', '.', '.', '.', '.', '.', '.', '.', 'x',
       'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']

game.loadLevel(map)
game.render()