class Tile
  constructor: (params) ->
    @type = params.type || '.'
    @row  = params.row
    @col  = params.col

    @image = document.createElement('img')
    @image.src = switch(@type)
      when '.'
        'img/wood.png'
      when 'x'
        'img/rock.png'

  render: ->
    game.context.drawImage(@image, @col * Tile.size, @row * Tile.size) 


Tile.size = 64
window.Tile = Tile