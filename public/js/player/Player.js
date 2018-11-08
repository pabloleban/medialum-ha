class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene = scene;
        this.setTexture("player");
        this.setPosition(x, y);
        this.scene.physics.world.enable(this);
        this.body.setSize(6, 7)
        this.body.setOffset(this.body.offset.x, this.height - this.body.height)
        this.setScale(3)

        this.createAnimations();
        this.anims.play('idle-d');
        this.lastDirection = "down"

        this.actionZoneDistance = 16
        this.energy = 10
        this.maxEnergy = 10
        
        this.actionZone = this.scene.add.zone(50, 50)
        this.actionZone.setSize(10, 10);
        this.actionZone.setOrigin(0.5,0.5)
        this.scene.physics.world.enable(this.actionZone);
        this.actionZone.setY(this.body.center.y + this.actionZoneDistance);

        this.controller = new PlayerController(this.scene);
        this.energyBar = new EnergyBar(this, this.scene);
        this.scene.add.existing(this);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
        
        if(this.controller.upKeyPressed()) {
            this.body.setVelocityY(-150);
            this.anims.play('walk-u', true);
            this.lastDirection = "up"
            this.actionZone.setY(this.body.center.y - this.actionZoneDistance);
            this.actionZone.setX(this.body.center.x);
        }
        else if(this.controller.downKeyPressed()) {
            this.body.setVelocityY(150);
            this.anims.play('walk-d', true);
            this.lastDirection = "down"
            this.actionZone.setY(this.body.center.y + this.actionZoneDistance);
            this.actionZone.setX(this.body.center.x);
        }
        else if(this.controller.leftKeyPressed()) {
            this.body.setVelocityX(-150);
            this.anims.play('walk-l', true);
            this.lastDirection = "left"
            this.actionZone.setX(this.body.center.x - this.actionZoneDistance);
            this.actionZone.setY(this.body.center.y);
        }
        else if(this.controller.rightKeyPressed()) {
            this.body.setVelocityX(150);
            this.anims.play('walk-r', true);
            this.lastDirection = "right"
            this.actionZone.setX(this.body.center.x + this.actionZoneDistance);
            this.actionZone.setY(this.body.center.y);
        } else {
            switch(this.lastDirection){
                case "down": this.anims.play('idle-d'); break;
                case "left": this.anims.play('idle-l'); break;
                case "right": this.anims.play('idle-r'); break;
                case "up": this.anims.play('idle-u'); break;
            }
        }
    }

    canChop(tree, zone){
        if(Phaser.Input.Keyboard.JustDown(this.controller.actionKey)){
            tree.chop();
        }
    }

    canMine(ore, zone){
        if(Phaser.Input.Keyboard.JustDown(this.controller.actionKey)){
            ore.mine();
        }
    }

    decreaseEnergy(amount){
        if(this.energy - amount <= 0 ){
            this.energy = 0;
        } else {
            this.energy -= amount;
        }

        this.energyBar.updateEnergyBar();
    }

    createAnimations(){
        this.scene.anims.create({
            key: 'walk-d',
            frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'walk-l',
            frames: scene.anims.generateFrameNumbers('player', { start: 15, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'walk-r',
            frames: scene.anims.generateFrameNumbers('player', { start: 27, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'walk-u',
            frames: scene.anims.generateFrameNumbers('player', { start: 39, end: 41 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'idle-d',
            frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
        });
    
        this.scene.anims.create({
            key: 'idle-l',
            frames: scene.anims.generateFrameNumbers('player', { start: 16, end: 16 }),
        });
    
        this.scene.anims.create({
            key: 'idle-r',
            frames: scene.anims.generateFrameNumbers('player', { start: 28, end: 28 }),
        });
    
        this.scene.anims.create({
            key: 'idle-u',
            frames: scene.anims.generateFrameNumbers('player', { start: 40, end: 40 }),
        });
    }
}