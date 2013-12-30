class Tile
  constructor: (params) ->
    @type = params.type || '.'
    @row  = params.row
    @col  = params.col
    @width = 128
    @height = 128

    @image = document.createElement('img')
    @image.src = switch(@type)
      when '.'
        'img/wood.png'
      when 'x'
        'img/rock.png'

  render: ->
    game.context.fillStyle = '#ff9900'
    game.context.drawImage(@image, @col * @width, @row * @height) 
    game.context.fill()



window.Tile = Tile