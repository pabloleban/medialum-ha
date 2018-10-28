function createPlayerAnimations(){
  game.anims.create({
    key: 'walk-d',
    frames: game.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  game.anims.create({
    key: 'walk-l',
    frames: game.anims.generateFrameNumbers('player', { start: 15, end: 17 }),
    frameRate: 10,
    repeat: -1
  });
  game.anims.create({
    key: 'walk-r',
    frames: game.anims.generateFrameNumbers('player', { start: 27, end: 29 }),
    frameRate: 10,
    repeat: -1
  });
  game.anims.create({
    key: 'walk-u',
    frames: game.anims.generateFrameNumbers('player', { start: 39, end: 41 }),
    frameRate: 10,
    repeat: -1
  });

  game.anims.create({
    key: 'idle-d',
    frames: game.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
    frameRate: 10
  });

  game.anims.create({
    key: 'idle-l',
    frames: game.anims.generateFrameNumbers('player', { start: 16, end: 16 }),
    frameRate: 10
  });

  game.anims.create({
    key: 'idle-r',
    frames: game.anims.generateFrameNumbers('player', { start: 28, end: 28 }),
    frameRate: 10
  });

  game.anims.create({
    key: 'idle-u',
    frames: game.anims.generateFrameNumbers('player', { start: 40, end: 40 }),
    frameRate: 10
  });
}