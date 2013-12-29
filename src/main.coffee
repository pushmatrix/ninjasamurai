class Game
  constructor: (@canvas) ->
    @context = @canvas.getContext('2d')
    @width   = @canvas.width
    @height  = @canvas.height

  render: =>
    requestAnimationFrame(@render, @canvas)


window.game = new Game(document.getElementById('game'))
game.render()