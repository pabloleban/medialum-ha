class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(x, y){
        super(scene, x, y);
        this.setTexture("player");
        this.setPosition(x, y);
        scene.physics.world.enable(this);
        this.body.setSize(6, 7)
        this.body.setOffset(this.body.offset.x, this.height - this.body.height)
        this.setScale(3);
        this.footstepCounter = 0;

        this.createAnimations();
        this.anims.play('idle-d');
        this.lastDirection = "down"

        this.actionZoneDistance = 16
        this.energy = 3
        this.maxEnergy = 10
        this.speed = 150
        
        this.footstepCooldown = this.speed * 1.70
        this.actionZone = scene.add.zone(50, 50)
        this.actionZone.setSize(10, 10);
        this.actionZone.setOrigin(0.5,0.5) 
        scene.physics.world.enable(this.actionZone);
        this.actionZone.setY(this.body.center.y + this.actionZoneDistance);

        this.controller = new PlayerController();
        scene.add.existing(this);
    }

    footstep(){
        if(this.footstepCounter > this.footstepCooldown){
            this.footstepCounter = 0;
            scene.sound.add(`step-grass-${Phaser.Math.Between(1, 2)}`, {volume: 0.1}).play();
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
        
        this.footstepCounter += delta;

        if(this.controller.upKeyPressed()) {
            this.body.setVelocityY(-this.speed);
            this.anims.play('walk-u', true);
            this.lastDirection = "up"
            this.actionZone.setY(this.body.center.y - this.actionZoneDistance);
            this.actionZone.setX(this.body.center.x);
            this.footstep();
        }
        else if(this.controller.downKeyPressed()) {
            this.body.setVelocityY(this.speed);
            this.anims.play('walk-d', true);
            this.lastDirection = "down"
            this.actionZone.setY(this.body.center.y + this.actionZoneDistance);
            this.actionZone.setX(this.body.center.x);
            this.footstep();
        }
        else if(this.controller.leftKeyPressed()) {
            this.body.setVelocityX(-this.speed);
            this.anims.play('walk-l', true);
            this.lastDirection = "left"
            this.actionZone.setX(this.body.center.x - this.actionZoneDistance);
            this.actionZone.setY(this.body.center.y);
            this.footstep();
        }
        else if(this.controller.rightKeyPressed()) {
            this.body.setVelocityX(this.speed);
            this.anims.play('walk-r', true);
            this.lastDirection = "right"
            this.actionZone.setX(this.body.center.x + this.actionZoneDistance);
            this.actionZone.setY(this.body.center.y);
            this.footstep();
        } else {
            switch(this.lastDirection){
                case "down": this.anims.play('idle-d'); break;
                case "left": this.anims.play('idle-l'); break;
                case "right": this.anims.play('idle-r'); break;
                case "up": this.anims.play('idle-u'); break;
            }
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.controller.actionKey) && ui.bottomText.opened){
            ui.bottomText.nextText();
        }
    }

    canChop(tree, zone){
        if(Phaser.Input.Keyboard.JustDown(this.controller.actionKey) && !ui.bottomText.opened){
            tree.chop()
        }
    }

    canMine(ore, zone){
        if(Phaser.Input.Keyboard.JustDown(this.controller.actionKey) && !ui.bottomText.opened){
            ore.mine()
        }
    }

    decreaseEnergy(amount){
        if(this.energy - amount <= 0 ){
            this.energy = 0;
        } else {
            this.energy -= amount;
        }

        ui.energyBar.updateEnergyBar();
    }

    showTired(){
        ui.bottomText.show("Estás muy cansado!\nVolvé mañana.")
    }

    createAnimations(){
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
    }
}