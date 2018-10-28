var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
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
var scene;
console.log(scene)
const actionZoneDistance = 16


var allMaterials = [
  {
    name: "wood",
    image: "wood.png",
    full_name: "Madera",
    description: "Simplemente madera.",
    inInventory: 0
  },
  {
    name: "stone",
    image: "stone.png",
    full_name: "Piedra",
    description: "Duro y resistente.",
    inInventory: 0
  },
  {
    name: "sapphire",
    image: "sapphire.png",
    full_name: "Zafiro",
    description: "Gema preciosa y rara.",
    inInventory: 0
  },
  {
    name: "emerald",
    image: "emerald.png",
    full_name: "Esmeralda",
    description: "Gema preciosa y muy rara.",
    inInventory: 0
  },
  {
    name: "ruby",
    image: "ruby.png",
    full_name: "Esmeralda",
    description: "Gema preciosa e increiblemente rara.",
    inInventory: 0
  },
  {
    name: "diamond",
    image: "diamond.png",
    full_name: "Diamante",
    description: "La gema preciosa más rara de todas.",
    inInventory: 0
  }
]


function preload() {
    scene = game.scene.scenes[0]

    this.load.image('tiles', 'assets/images/tiles.png');
    this.load.image('tree', 'assets/images/tree.png');
    inventory.preload();

    this.load.audio('chop-1', 'assets/sounds/chop-1.mp3');
    this.load.audio('chop-2', 'assets/sounds/chop-2.mp3');
    this.load.audio('chop-3', 'assets/sounds/chop-3.mp3');
    this.load.audio('chop-4', 'assets/sounds/chop-4.mp3');
    this.load.audio('ambience-forest', 'assets/sounds/ambience-forest.mp3');


    allMaterials.map ((m,i) => {
      allMaterials[i].key = `m_${m.name}`;
      this.load.spritesheet(allMaterials[i].key, `assets/images/${m.image}`, { frameWidth: 16, frameHeight: 16 })  
    })

    this.load.spritesheet('player', 'assets/images/characters.png', { frameWidth: 16, frameHeight: 16 })
}

var cursors, actionKey;

var player;
var zone;
var trees;
var tilemap = [0,0,0,0,0,0,0,1,2,3]

const mapHeight = 50;
const mapWidth = 50;

function create() {

  //this.sound.add('ambience-forest').play({loop: true});

  var mapData = [];

  for (var y = 0; y < mapHeight; y++)
  {
      var row = [];

      for (var x = 0; x < mapWidth; x++)
      {
          //  Scatter the tiles so we get more mud and less stones
          var tileIndex = Phaser.Math.RND.weightedPick(tilemap);

          row.push(tileIndex);
      }

      mapData.push(row);
  }


  const map = this.make.tilemap({ data: mapData, tileWidth: 16, tileHeight: 16})
  const tiles = map.addTilesetImage('tiles');
  const bgLayer = map.createDynamicLayer(0, tiles, 0, 0)
  bgLayer.setScale(3)

  //init groups
  trees = this.physics.add.staticGroup();
  const addTree = (x,y) => {
    var tree = trees.create(x,y,"tree")
    tree.life = 100;
    tree.setSize(30, 25)
    tree.setOffset(10, 130)
    tree.setScale(3)
  }
  addTree(100, 200)
  addTree(300, 100)
  addTree(500, 300)

  cursors = this.input.keyboard.createCursorKeys();
  actionKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
  

  player = this.physics.add.sprite(50, 50, 'player');
  player.setSize(6, 7)
  player.setOffset(player.body.offset.x, player.height - player.body.height)
  player.depth = 1
  player.setScale(3)

  actionZone = this.add.zone(50, 50).setSize(10, 10)
  this.physics.world.enable(actionZone);
  actionZone.setOrigin(0.5,0.5)
  actionZone.setY(player.body.center.y + actionZoneDistance);

  this.physics.add.collider(player, trees);
  this.physics.add.overlap(actionZone, trees, (zone, tree) => {canChop(tree, zone)});

  createPlayerAnimations();

  player.anims.play('idle-d');

  this.cameras.main.startFollow(player, true);

  inventory.create();
}

var lastDirection = "down";

function updateObjectsDepth(){
	trees.children.entries.map(t => {
		t.depth = t.y + 80 - player.y > 0 ? 2 : 0;
	})
}

function update() {
  player.setVelocityY(0);
  player.setVelocityX(0);
  if(cursors.up.isDown) {
    player.setVelocityY(-150);
    player.anims.play('walk-u', true);
    lastDirection = "up"
    actionZone.setY(player.body.center.y - actionZoneDistance);
    actionZone.setX(player.body.center.x);
  }
  else if(cursors.down.isDown) {
    player.setVelocityY(150);
    player.anims.play('walk-d', true);
    lastDirection = "down"
    actionZone.setY(player.body.center.y + actionZoneDistance);
    actionZone.setX(player.body.center.x);
  }
  else if(cursors.left.isDown) {
    player.setVelocityX(-150);
    player.anims.play('walk-l', true);
    lastDirection = "left"
    actionZone.setX(player.body.center.x - actionZoneDistance);
    actionZone.setY(player.body.center.y);
  }
  else if(cursors.right.isDown) {
    player.setVelocityX(150);
    player.anims.play('walk-r', true);
    lastDirection = "right"
    actionZone.setX(player.body.center.x + actionZoneDistance);
    actionZone.setY(player.body.center.y);
  } else {
    switch(lastDirection){
      case "down": player.anims.play('idle-d'); break;
      case "left": player.anims.play('idle-l'); break;
      case "right": player.anims.play('idle-r'); break;
      case "up": player.anims.play('idle-u'); break;
    }
  }
  
  updateObjectsDepth();
  inventory.update();
}

function canChop(tree, zone){
  if(Phaser.Input.Keyboard.JustDown(actionKey)){
    chopTree(tree);
  }
}

function chopTree(tree){
  tree.life -= 25
  game.sound.add('chop-'+(Math.floor(Math.random() * 4) + 1)).play();
  if(tree.life <= 0){
    //tree chopped
    tree.disableBody(true, true);
    allMaterials[allMaterials.findIndex(m => m.name == "wood")].inInventory += 2
  }
}