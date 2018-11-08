class Bird extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, color){
        super(scene, x, y);
        this.scene = scene;
        this.idle = false;
        //this.setTexture("birds");
        this.setPosition(x, y);
        this.setScale(3)
        this.createAnimations();
        this.anims.play('b-idle-r');
        this.lastDirection = "down"

        this.moveCounter = 0;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.possibleMoveDirections = ["up","down","left","right"]
        this.tempMoveDirections = this.possibleMoveDirections.slice(0);
        this.nextMoveTime = 2000;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
    
        this.moveCounter += delta;

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
            this.nextMoveTime = Phaser.Math.Between(2000, 5000);
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
    }

    createAnimations(){
        this.scene.anims.create({
            key: 'fly-d',
            frames: scene.anims.generateFrameNumbers('birds', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fly-l',
            frames: scene.anims.generateFrameNumbers('birds', { start: 15, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fly-r',
            frames: scene.anims.generateFrameNumbers('birds', { start: 27, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fly-u',
            frames: scene.anims.generateFrameNumbers('birds', { start: 39, end: 41 }),
            frameRate: 10,
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