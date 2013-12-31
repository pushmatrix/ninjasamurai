class Tile
  constructor: (params) ->
    @type = params.type || '.'
    @row  = params.row
    @col  = params.col
    @fill = null

    @image = document.createElement('img')
    @image.src = switch(@type)
      when '.'
        'img/wood.png'
      when 'x'
        'img/rock.png'

  render: ->
    if @fill
      game.context.beginPath()
      game.context.fillStyle = @fill
      game.context.rect(@col * Tile.size, @row * Tile.size, Tile.size, Tile.size)
      game.context.fill()
    else
      game.context.drawImage(@image, @col * Tile.size, @row * Tile.size) 


Tile.size = 64
window.Tile = Tile