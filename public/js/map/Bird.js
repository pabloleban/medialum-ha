class Bird extends Phaser.Physics.Arcade.Sprite {

    constructor(player, scene, x, y, color){
        super(scene, x, y);
        this.scene = scene;
        this.player = player;

        this.idle = true;
        this.setPosition(x, y);
        
        this.setScale(2)
        this.scene.physics.world.enable(this);
        this.setSize(6,6)
        this.setOffset(13,23);
        this.createAnimations();

        this.flyAwayZone = this.scene.add.zone(50, 50)
        this.flyAwayZone.setSize(200, 200);
        this.flyAwayZone.setOrigin(0.5,0.5)
        this.scene.physics.world.enable(this.flyAwayZone);

        this.moveCounter = 0;
        this.scene.add.existing(this);

        this.maxFlyAwaySpeed = 200;
        this.possibleMoveDirections = ["up","down","left","right"]
        this.tempMoveDirections = this.possibleMoveDirections.slice(0);
        this.nextMoveTime = 0;

        this.scene.physics.add.overlap(this.player, this.flyAwayZone, player => { this.flyAway(player) });
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        this.flyAwayZone.setY(this.body.center.y);
        this.flyAwayZone.setX(this.body.center.x);

        this.moveCounter += delta;

        if(this.idle){

            if(this.moveCounter > this.nextMoveTime){
                if(this.tempMoveDirections.length <= 0){
                    this.tempMoveDirections = this.possibleMoveDirections.slice(0)
                }

                var moveIndex = Phaser.Math.Between(0, this.tempMoveDirections.length - 1);

                var newDirection = this.tempMoveDirections[moveIndex]
                this.tempMoveDirections.splice(moveIndex, 1);
                
                switch(newDirection){
                    case "up":
                        this.anims.play('b-idle-u')
                        this.body.setVelocityY(-50)
                    break;
                    case "down":
                        this.anims.play('b-idle-d')
                        this.body.setVelocityY(50)
                    break;
                    case "left":
                        this.anims.play('b-idle-l')
                        this.body.setVelocityX(-50)
                    break;
                    case "right":
                        this.anims.play('b-idle-r')
                        this.body.setVelocityX(50)
                    break;
                }

                this.moveCounter = 0;
                this.nextMoveTime = Phaser.Math.Between(500, 5000);
            }

            if(this.body.velocity.y != 0){
                if(this.body.velocity.y > 0){
                    this.body.setVelocityY(this.body.velocity.y - 1)
                } else {
                    this.body.setVelocityY(this.body.velocity.y + 1)
                }
            }

            if(this.body.velocity.x != 0){
                if(this.body.velocity.x > 0){
                    this.body.setVelocityX(this.body.velocity.x - 1)
                } else {
                    this.body.setVelocityX(this.body.velocity.x + 1)
                }
            }

        } else {
            this.body.setVelocityX(this.flyDirection.x);
            this.body.setVelocityY(this.flyDirection.y);
            if(this.moveCounter > this.nextMoveTime){
                this.idle = true;
                this.body.setVelocityX(0)
                this.body.setVelocityY(0)
            }
        }
    }

    flyAway(fromObject){
        if(this.idle){
            this.idle = false;
            this.moveCounter = 0;
            this.body.setVelocityX(0)
            this.body.setVelocityY(0)

            this.flyDirection = {
                x: this.x - fromObject.x,
                y: this.y - fromObject.y
            }

            if(this.flyDirection.x > this.maxFlyAwaySpeed){
                this.flyDirection.x = this.maxFlyAwaySpeed
            } else if(this.flyDirection.x < -this.maxFlyAwaySpeed){
                this.flyDirection.x = -this.maxFlyAwaySpeed
            }

            if(this.flyDirection.y > this.maxFlyAwaySpeed){
                this.flyDirection.y = this.maxFlyAwaySpeed
            } else if(this.flyDirection.y < -this.maxFlyAwaySpeed){
                this.flyDirection.y = -this.maxFlyAwaySpeed
            }
            
            if(this.flyDirection.x < 20 && this.flyDirection.x > -20){
                if(this.flyDirection.y > 0){
                    this.anims.play('fly-d')
                } else {
                    this.anims.play('fly-u')
                }
            } else {
                if(this.flyDirection.x > 0){
                    this.anims.play('fly-r')
                } else {
                    this.anims.play('fly-l')
                }
            }

            this.flyDirection.x = this.flyDirection.x * 2.5
            this.flyDirection.y = this.flyDirection.y * 2.5

            this.scene.sound.add('bird-flap').play()
        }
    }
    
    createAnimations(){
        this.scene.anims.create({
            key: 'fly-d',
            frames: scene.anims.generateFrameNumbers('birds', { start: 51, end: 53 }),
            frameRate: 30,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fly-l',
            frames: scene.anims.generateFrameNumbers('birds', { start: 63, end: 65 }),
            frameRate: 30,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fly-r',
            frames: scene.anims.generateFrameNumbers('birds', { start: 75, end: 77 }),
            frameRate: 30,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fly-u',
            frames: scene.anims.generateFrameNumbers('birds', { start: 87, end: 89 }),
            frameRate: 30,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'b-idle-d',
            frames: scene.anims.generateFrameNumbers('birds', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'b-idle-l',
            frames: scene.anims.generateFrameNumbers('birds', { start: 15, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'b-idle-r',
            frames: scene.anims.generateFrameNumbers('birds', { start: 27, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'b-idle-u',
            frames: scene.anims.generateFrameNumbers('birds', { start: 39, end: 41 }),
            frameRate: 10,
            repeat: -1
        });
    }

}