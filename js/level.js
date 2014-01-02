// Generated by CoffeeScript 1.6.1
(function() {
  var Level;

  Level = (function() {

    function Level(map) {
      this.map = map;
      this.rows = 20;
      this.cols = 20;
      this.tiles = [];
      this.buildTiles();
    }

    Level.prototype.buildTiles = function() {
      var col, index, row, _i, _ref, _results;
      _results = [];
      for (row = _i = 0, _ref = this.rows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
        this.tiles[row] = [];
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (col = _j = 0, _ref1 = this.cols - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
            index = row * this.rows + col;
            _results1.push(this.tiles[row][col] = new Tile({
              type: this.map[index],
              row: row,
              col: col
            }));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Level.prototype.render = function() {
      var col, row, _i, _ref, _results;
      _results = [];
      for (row = _i = 0, _ref = this.rows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (col = _j = 0, _ref1 = this.cols - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(this.tiles[row][col].render());
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Level.prototype.getTile = function(row, col) {
      return this.tiles[row][col];
    };

    return Level;

  })();

  window.Level = Level;

}).call(this);