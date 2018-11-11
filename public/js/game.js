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
let player;

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
    scene = this;

    this.load.spritesheet('player', 'assets/images/characters.png', { frameWidth: 16, frameHeight: 16 })

    this.load.spritesheet('birds', 'assets/images/birds.png', { frameWidth: 32, frameHeight: 32 })

    this.load.image('tiles', 'assets/images/tiles.png');
    this.load.image('fences', 'assets/images/fences.png');
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
    this.load.audio('falling-tree', 'assets/sounds/falling-tree.mp3');
    this.load.audio('mine-1', 'assets/sounds/mine-1.mp3');
    this.load.audio('mine-2', 'assets/sounds/mine-2.mp3');
    this.load.audio('ambience-forest', 'assets/sounds/ambience-forest.mp3');
    this.load.audio('bird-flap', 'assets/sounds/bird-flap.mp3');

    allMaterials.map ((m,i) => {
      allMaterials[i].key = `m_${m.name}`;
      this.load.spritesheet(allMaterials[i].key, `assets/images/${m.image}`, { frameWidth: 16, frameHeight: 16 })  
    })
}



function create() {

  var ambience = this.sound.add('ambience-forest', {volume: 0.3});
  ambience.play({loop: true});

  smokeParticle = scene.add.particles('smoke')
  smokeParticle.depth = 999999999

  var defaultEmitter = {
    speed: {min: 140, max: 200},
    lifespan: {min:700, max: 1000},
    angle: { min: 220, max: 320 },
    rotate: {min: 0, max: 360},
    gravityY: 250,
    frequency: -1,
    scale: {min: 2, max: 5}
  }

  player = new Player(scene, 1000, 1000);
  map = new Map(scene, player);

  map.addTree(100, 200)
  map.addTree(300, 100)
  map.addTree(500, 300)
  
  map.addBird(750, 750);
  map.addBird(800, 770);
  map.addBird(650, 770);
  
  this.physics.add.collider(player, map.trees);

  anim = this.anims.create({
      key: 'play',
      frames: this.anims.generateFrameNumbers('smoke'),
      frameRate: 10,
      repeat: false
  });
  
  sapphire_particle = scene.add.particles('sapphire_particle')
  sapphire_emitter = sapphire_particle.createEmitter(defaultEmitter);   
  ruby_particle = scene.add.particles('ruby_particle')
  ruby_emitter = ruby_particle.createEmitter(defaultEmitter);   
  emerald_particle = scene.add.particles('emerald_particle')
  emerald_emitter = emerald_particle.createEmitter(defaultEmitter)
  diamond_particle = scene.add.particles('diamond_particle')
  diamond_emitter = diamond_particle.createEmitter(defaultEmitter);

  map.addOre(350, 250, "sapphire")
  map.addOre(550, 350, "diamond")
  map.addOre(850, 650, "ruby")
  map.addOre(150, 750, "emerald")

  this.cameras.main.startFollow(player, true);

  inventory.create();
  
}

function updateObjectsDepth(){
	map.trees.children.entries.map(t => {
		t.depth = t.y - 20
  })
  map.ores.children.entries.map(o => {
    o.depth = o.y + 10
  })

  map.birds.children.entries.map(b => {
    b.depth = b.y
  })
  
  
  player.depth = player.y 
}

function update() { 
  updateObjectsDepth();
  inventory.update();
  
  map.trees.children.entries.map(t => {
	  if(t.life <= 0 && ((t.fallRight && t.angle <= 90) || (!t.fallRight && t.angle >= -90))){
		  t.angle += (t.angle + (t.fallRight ? 1 : -1)) / 55
	  }

	  if(t.life <= 0 && (t.angle >= 90 || t.angle <= -90)){
      t.disableBody(true, true);
		  t.smokeEmitter.explode(80)
		  map.trees.remove(t)
	  }
  })
}