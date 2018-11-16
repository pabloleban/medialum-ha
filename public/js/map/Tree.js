class Tree extends Phaser.Physics.Arcade.Sprite {   
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene = scene;
        this.setTexture("tree");
        this.setPosition(x, y);
        this.scene.physics.world.enable(this);
        this.setSize(12, 10)
        this.setOffset(19, 70)
        this.setScale(3)
        this.setOrigin(0.5,1)
        this.depth = y;
        this.life = 100;
        this.fallRight = Math.random() >= 0.5;
        this.fallingImpactRange = 400
 
        var treeSource = {
            tree: this,
            getRandomPoint: function (vec){  
                return vec.setTo(Phaser.Math.Between(this.tree.x, this.tree.x - (this.tree.height * 3 * (this.tree.fallRight ? -1 : 1))), this.tree.y);
            }
        }

        this.smokeEmitter = smokeParticle.createEmitter({
            speed: { min: 50, max: 100 },
            lifespan: {min: 1000, max: 1500 },
            angle: { min: 220, max: 320 },
            rotate: { min: 0, max: 360 },
            gravityY: -10,
            scale: { min: 3, max: 5 },
            frequency: -1,
            particleClass: SmokeParticle,
            emitZone: { type: "random", source: treeSource}
        });

        this.scene.add.existing(this);
    }    

    chop(){
    	if(this.life > 0){
	        this.life -= 25
	        this.scene.sound.add('chop-'+(Math.floor(Math.random() * 4) + 1)).play();
	        if(this.life <= 0){
                //tree chopped
                this.scene.sound.add('falling-tree', {volume: 0.1}).play();
                this.disableBody();
                allMaterials[allMaterials.findIndex(m => m.name == "wood")].inInventory += 2
                player.decreaseEnergy(1)
	        }
    	}
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.life <= 0 && ((this.fallRight && this.angle <= 90) || (!this.fallRight && this.angle >= -90))){
            this.angle += (this.angle + (this.fallRight ? 1 : -1)) / 55
        }
    
        if(this.life <= 0 && (this.angle >= 90 || this.angle <= -90)){
            this.disableBody(true, true);
            this.smokeEmitter.explode(80)
            map.birds.children.entries.map(b => {
                if(this.x - b.x < this.fallingImpactRange && this.x - b.x > -this.fallingImpactRange && this.y - b.y < this.fallingImpactRange && this.y - b.y > -this.fallingImpactRange){
                    b.flyAway(this)
                }
            })
        }
    }
}