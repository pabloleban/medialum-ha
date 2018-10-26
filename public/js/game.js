var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  render: {
    pixelArt: true,
    autoResize: true
  }
};

var game = new Phaser.Game(config);

function preload() {

    //  tiles are 16x16 each
    this.load.image('tiles', 'assets/images/tiles.png');
    this.load.image('tree', 'assets/images/tree.png');
    this.load.spritesheet('player', 'assets/images/characters.png', { frameWidth: 16, frameHeight: 16 });

    //scaling options
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //keep going when focus lost
    //this.stage.disableVisibilityChange = true;

    //have the game centered horizontally
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;

}

var cursors;
var player;
var trees;

function create() {

    const map = this.make.tilemap({ tileWidth: 16, tileHeight: 16, width: 17, height: 13 })
    const tiles = map.addTilesetImage('tiles');
    var groundLayer = map.createBlankDynamicLayer('ground', tiles)
    
    groundLayer.fill(220, 0, 0, map.width, map.height);
    
    map.convertLayerToStatic(groundLayer);
    
    trees = this.physics.add.staticGroup()
    
    var tree = trees.create(20,20,"tree")
    tree.setSize(13, 15)
    tree.setOffset(19, 64)

    
    
    
    
    cursors = this.input.keyboard.createCursorKeys();
    player = this.physics.add.sprite(50, 50, 'player');
    player.setSize(7, 7)
    player.setOffset(player.body.offset.x, player.height - player.body.height)
    this.physics.add.collider(player, trees);
    
    this.anims.create({
      key: 'walk-d',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-l',
      frames: this.anims.generateFrameNumbers('player', { start: 15, end: 17 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-r',
      frames: this.anims.generateFrameNumbers('player', { start: 27, end: 29 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-u',
      frames: this.anims.generateFrameNumbers('player', { start: 39, end: 41 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle-d',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'idle-l',
      frames: this.anims.generateFrameNumbers('player', { start: 16, end: 16 }),
      frameRate: 10
    });
    
    this.anims.create({
      key: 'idle-r',
      frames: this.anims.generateFrameNumbers('player', { start: 28, end: 28 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'idle-u',
      frames: this.anims.generateFrameNumbers('player', { start: 40, end: 40 }),
      frameRate: 10
    });

    player.anims.play('idle-d');

    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setZoom(3)
}

var lastDirection = "";

function updateObjectsDepth(){
	trees.children.entries.map(t => {
		t.depth = 50 - player.y;
	})
}

function update() {
  player.setVelocityY(0);
  player.setVelocityX(0);
  if(cursors.up.isDown) {
    player.setVelocityY(-50);
    player.anims.play('walk-u', true);
    lastDirection = "up"
  }
  else if(cursors.down.isDown) {
    player.setVelocityY(50);
    player.anims.play('walk-d', true);
    lastDirection = "down"
  }
  else if(cursors.left.isDown) {
    player.setVelocityX(-50);
    player.anims.play('walk-l', true);
    lastDirection = "left"
  }
  else if(cursors.right.isDown) {
    player.setVelocityX(50);
    player.anims.play('walk-r', true);
    lastDirection = "right"
  } else {
    switch(lastDirection){
      case "down": player.anims.play('idle-d'); break;
      case "left": player.anims.play('idle-l'); break;
      case "right": player.anims.play('idle-r'); break;
      case "up": player.anims.play('idle-u'); break;
    }
  }
  
  updateObjectsDepth();
}
