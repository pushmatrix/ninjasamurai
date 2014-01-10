ig.module(
  'game.entities.spawn-point'
)
.requires(
  'impact.entity'
)
.defines(function(){

EntitySpawnPoint = ig.Entity.extend({
  _wmDrawBox: true,
  _wmBoxColor: 'rgba(0, 0, 255, 0.7)',

  size: {x: 200, y: 200}
});
});
