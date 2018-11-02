const player = {
    object: null,
    lastDirection: "down",
    actionZone: null,
    actionZoneDistance: 16,
    energy: 10,
    maxEnergy: 10,
    cursors: null,
    actionKey: null,
    upKey: null,
    downKey: null,
    rightKey: null,
    leftKey: null,
    energyBackground: null,
    energyBar: null,
    energyText: null,
    upKeyPressed: () => player.cursors.up.isDown || player.upKey.isDown,
    downKeyPressed: () => player.cursors.down.isDown || player.downKey.isDown,
    rightKeyPressed: () => player.cursors.right.isDown || player.rightKey.isDown,
    leftKeyPressed: () => player.cursors.left.isDown || player.leftKey.isDown,
    preload: () => {
        scene.load.spritesheet('player', 'assets/images/characters.png', { frameWidth: 16, frameHeight: 16 })

        player.cursors = scene.input.keyboard.createCursorKeys();
        player.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        player.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        player.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        player.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        player.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    },
    create: () => {
        player.object = scene.physics.add.sprite(500, 500, 'player');
        player.object.setSize(6, 7)
        player.object.setOffset(player.object.body.offset.x, player.object.height - player.object.body.height)
        player.object.depth = 1
        player.object.setScale(3)
      
        player.actionZone = scene.add.zone(50, 50).setSize(10, 10)
        scene.physics.world.enable(player.actionZone);
        player.actionZone.setOrigin(0.5,0.5)
        player.actionZone.setY(player.object.body.center.y + player.actionZoneDistance);

        player.createAnimations();

        player.object.anims.play('idle-d');
      
        player.energyBar = new Phaser.GameObjects.Graphics(scene).setScrollFactor(0);
        player.energyText = scene.add.text(125 , 19, player.energy+"/"+player.maxEnergy,  { fontSize: '24px', align: 'center'}).setScrollFactor(0);
        player.energyBar.x = 30
        player.energyBar.y = 7
        player.energyText.depth = 110000;
        player.energyBar.depth = 100000
        scene.add.existing(player.energyBar);
        player.updateEnergyBar();
    },

    updateEnergyBar: () => {

        var barScale = 20;

        player.energyBar.clear();
        //BG
        player.energyBar.fillStyle(0x000000);
        player.energyBar.fillRect(player.energyBar.x, player.energyBar.y, player.maxEnergy * barScale, 30);

        //Energy
        // player.energyBar.fillStyle(0xffffff);
        // player.energyBar.fillRect(player.energyBar.x + 2, player.energyBar.y + 2, 76, 12);

        if (player.energy < player.maxEnergy * 0.2) {
            player.energyBar.fillStyle(0xff0000);
        } else {
            player.energyBar.fillStyle(0x0000ff);
        }

        var d = Math.floor((player.maxEnergy * barScale - 4) / player.maxEnergy * player.energy);
console.log(d)
        player.energyBar.fillRect(player.energyBar.x + 2, player.energyBar.y + 2, d, 26);
        player.energyText.setText(player.energy+"/"+player.maxEnergy);
    },

    update: () => {
        player.object.setVelocityY(0);
        player.object.setVelocityX(0);
        
        if(player.upKeyPressed()) {
            player.object.setVelocityY(-150);
            player.object.anims.play('walk-u', true);
            player.lastDirection = "up"
            player.actionZone.setY(player.object.body.center.y - player.actionZoneDistance);
            player.actionZone.setX(player.object.body.center.x);
        }
        else if(player.downKeyPressed()) {
            player.object.setVelocityY(150);
            player.object.anims.play('walk-d', true);
            player.lastDirection = "down"
            player.actionZone.setY(player.object.body.center.y + player.actionZoneDistance);
            player.actionZone.setX(player.object.body.center.x);
        }
        else if(player.leftKeyPressed()) {
            player.object.setVelocityX(-150);
            player.object.anims.play('walk-l', true);
            player.lastDirection = "left"
            player.actionZone.setX(player.object.body.center.x - player.actionZoneDistance);
            player.actionZone.setY(player.object.body.center.y);
        }
        else if(player.rightKeyPressed()) {
            player.object.setVelocityX(150);
            player.object.anims.play('walk-r', true);
            player.lastDirection = "right"
            player.actionZone.setX(player.object.body.center.x + player.actionZoneDistance);
            player.actionZone.setY(player.object.body.center.y);
        } else {
            switch(player.lastDirection){
                case "down": player.object.anims.play('idle-d'); break;
                case "left": player.object.anims.play('idle-l'); break;
                case "right": player.object.anims.play('idle-r'); break;
                case "up": player.object.anims.play('idle-u'); break;
            }
        }
    },
    createAnimations: () => {
        scene.anims.create({
            key: 'walk-d',
            frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'walk-l',
            frames: scene.anims.generateFrameNumbers('player', { start: 15, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'walk-r',
            frames: scene.anims.generateFrameNumbers('player', { start: 27, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'walk-u',
            frames: scene.anims.generateFrameNumbers('player', { start: 39, end: 41 }),
            frameRate: 10,
            repeat: -1
        });
    
        scene.anims.create({
            key: 'idle-d',
            frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
        });
    
        scene.anims.create({
            key: 'idle-l',
            frames: scene.anims.generateFrameNumbers('player', { start: 16, end: 16 }),
        });
    
        scene.anims.create({
            key: 'idle-r',
            frames: scene.anims.generateFrameNumbers('player', { start: 28, end: 28 }),
        });
    
        scene.anims.create({
            key: 'idle-u',
            frames: scene.anims.generateFrameNumbers('player', { start: 40, end: 40 }),
        });
    },
    canChop: (tree, zone) => {
        if(Phaser.Input.Keyboard.JustDown(player.actionKey)){
            player.chopTree(tree);
        }
    },      
    canMine: (ore, zone) => {
        if(Phaser.Input.Keyboard.JustDown(player.actionKey)){
            player.mineOre(ore);
        }
    },
    chopTree: tree => {
    	if(tree.life > 0){
	        tree.life -= 25
	        scene.sound.add('chop-'+(Math.floor(Math.random() * 4) + 1)).play();
	        if(tree.life <= 0){
              //tree chopped
              scene.sound.add('falling-tree', {volume: 0.1}).play();
	          tree.disableBody();
	          allMaterials[allMaterials.findIndex(m => m.name == "wood")].inInventory += 2
	        }
    	}
    },
    mineOre: ore => {
        ore.life -= 25
        scene.sound.add('mine-'+(Math.floor(Math.random() * 2) + 1)).play();

        var particle_emitter, particles;

        switch(ore.name){
            case "sapphire":
            	particle_emitter = sapphire_emitter;
                particles = sapphire_particle;
                break;
            case "ruby":
            	particle_emitter = ruby_emitter;
                particles = ruby_particle;
                break;
            case "emerald":
            	particle_emitter = emerald_emitter; 
                particles = emerald_particle;
                break;
            case "diamond":
            default:
            	particle_emitter = diamond_emitter;
                particles = diamond_particle;
                break;  
        }

        particle_emitter.explode((Math.floor(Math.random() * 5) + 2), ore.x,ore.y)

        particles.depth = ore.depth + 1; 
        if(ore.life <= 0){
            //ore mined chopped
            ore.disableBody(true, true);
            particle_emitter.explode((Math.floor(Math.random() * 8) + 5), ore.x,ore.y)
            allMaterials[allMaterials.findIndex(m => m.name == ore.name)].inInventory += 2
        }
    }
}