var config = {
  type: Phaser.AUTO,
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
var scene;

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
    this.load.image('sapphire', 'assets/images/sapphire_ore.png');
    this.load.image('ruby', 'assets/images/ruby_ore.png');
	this.load.image('emerald', 'assets/images/emerald_ore.png');
    this.load.image('diamond', 'assets/images/diamond_ore.png');
    this.load.image('ruby_particle', 'assets/images/ruby_particle.png');
    this.load.image('sapphire_particle', 'assets/images/sapphire_particle.png');
    this.load.image('emerald_particle', 'assets/images/emerald_particle.png');
    this.load.image('diamond_particle', 'assets/images/diamond_particle.png');
    this.load.spritesheet('smoke', 'assets/images/smoke.png', { frameWidth: 16, frameHeight: 16 })
    inventory.preload();

    this.load.audio('chop-1', 'assets/sounds/chop-1.mp3');
    this.load.audio('chop-2', 'assets/sounds/chop-2.mp3');
    this.load.audio('chop-3', 'assets/sounds/chop-3.mp3');
    this.load.audio('chop-4', 'assets/sounds/chop-4.mp3');
    this.load.audio('mine-1', 'assets/sounds/mine-1.mp3');
    this.load.audio('mine-2', 'assets/sounds/mine-2.mp3');
    this.load.audio('ambience-forest', 'assets/sounds/ambience-forest.mp3');

    player.preload();

    allMaterials.map ((m,i) => {
      allMaterials[i].key = `m_${m.name}`;
      this.load.spritesheet(allMaterials[i].key, `assets/images/${m.image}`, { frameWidth: 16, frameHeight: 16 })  
    })
}

var trees;
var tilemap = [0,0,0,0,0,0,0,1,2,3]

const mapHeight = 50;
const mapWidth = 50;

function create() {

  var ambience = this.sound.add('ambience-forest');
  ambience.play({loop: true});
  ambience.volume = 0.3;

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
    tree.setOffset(10, 0)
    tree.setScale(3)
    tree.setOrigin(0.5,1)
    tree.depth = y;
    tree.fallRight = Math.random() >= 0.5;
  }
  addTree(100, 200)
  addTree(300, 100)
  addTree(500, 300)

  var default_emitter = {
    speed: {min: 140, max: 200},
    lifespan: {min:700, max: 1000},
    angle: { min: 220, max: 320 },
    rotate: {min: 0, max: 360},
    gravityY: 250,
    frequency: -1,
    scale: {min: 2, max: 5}
  }
  
  anim = this.anims.create({
      key: 'play',
      frames: this.anims.generateFrameNumbers('smoke'),
      frameRate: 10,
      repeat: false
  });
  
  smoke_particle = scene.add.particles('smoke')
  smoke_emitter = smoke_particle.createEmitter({
	  speed: { min: 50, max: 100 },
	  lifespan: {min: 1000, max: 1500 },
	  angle: { min: 220, max: 320 },
	  rotate: { min: 0, max: 360 },
	  gravityY: -10,
	  //scale: { min: 3, max: 5 },
	  frequency: -1,
	  particleClass: SmokeParticle
  });   
  
  sapphire_particle = scene.add.particles('sapphire_particle')
  sapphire_emitter = sapphire_particle.createEmitter(default_emitter);   
  ruby_particle = scene.add.particles('ruby_particle')
  ruby_emitter = ruby_particle.createEmitter(default_emitter);   
  emerald_particle = scene.add.particles('emerald_particle')
  emerald_emitter = emerald_particle.createEmitter(default_emitter)
  diamond_particle = scene.add.particles('diamond_particle')
  diamond_emitter = diamond_particle.createEmitter(default_emitter);

  ores = this.physics.add.staticGroup();
  const addOre = (x,y,oreName) => {
    var ore = ores.create(x,y,oreName)
    ore.life = 100;
    ore.name = oreName;
    switch(oreName){
      case "sapphire":
        ore.setSize(40, 30)
        ore.setOffset(-4, 25)
        break;
      case "ruby":
        ore.setSize(60, 38)
        ore.setOffset(-15, 13)
        break;
      case "emerald":
        ore.setSize(40, 35)
        ore.setOffset(-4, 25)  
        break;
      case "diamond":
        ore.setSize(45, 30)
        ore.setOffset(-15, 30)
        break;  
    }
    ore.setScale(3)
    ore.depth = y;
  }
  addOre(350, 250,"sapphire")
  addOre(550, 350,"diamond")
  addOre(850, 650,"ruby")
  addOre(150, 750,"emerald")
  
  player.create();

  this.physics.add.collider(player.object, trees);
  this.physics.add.collider(player.object, ores);
  this.physics.add.overlap(player.actionZone, trees, (zone, tree) => {player.canChop(tree, zone)});
  this.physics.add.overlap(player.actionZone, ores, (zone, ore) => {player.canMine(ore, zone)});

  this.cameras.main.startFollow(player.object, true);

  inventory.create();
  
}

function updateObjectsDepth(){
	trees.children.entries.map(t => {
		t.depth = t.y - 20
  })
  ores.children.entries.map(o => {
    o.depth = o.y
  })
  
  player.object.depth = player.object.y 
}

function update() {
  player.update();  
  updateObjectsDepth();
  inventory.update();
  
  trees.children.entries.map(t => {
	  if(t.life <= 0 && ((t.fallRight && t.angle <= 90) || (!t.fallRight && t.angle >= -90))){
		  t.angle += (t.angle + (t.fallRight ? 1 : -1)) / 30
	  }
	  
	  if(t.life <= 0 && (t.angle >= 90 || t.angle <= -90)){
		  t.disableBody(true, true);
		  smoke_emitter.explode(10, t.x, t.y)
		  trees.remove(t)
	  }
  })
}