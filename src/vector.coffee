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

  copy: ->
    new Vector(@x, @y)


  angleBetween: (vec)->
    vec1 = @copy()
    vec2 = vec.copy()
    vec1.normalize()
    vec2.normalize()

    # a . b = ||a|| * ||b|| cos(0)
    angle = Math.acos(vec1.dot(vec2))
    angle * 180 / Math.PI 

window.Vector = Vector