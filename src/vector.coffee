class Vector
  constructor: (@x = 0, @y = 0) ->
  
  magnitude: ->
    Math.sqrt(@x * @x + @y * @y)

  normalize: ->
    magnitude = @magnitude()
    @x /= magnitude
    @y /= magnitude

  dot: (vec) ->
    @x * vec.x + @y * vec.y

  # TODO: Prevent normalization on NON-COPY of vector

  angleBetween: (vec)->
    @normalize()
    vec.normalize()

    # a . b = ||a|| * ||b|| cos(0)
    angle = Math.acos(@dot(vec))
    angle * 180 / Math.PI 

window.Vector = Vector