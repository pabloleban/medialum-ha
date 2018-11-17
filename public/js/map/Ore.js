class Ore extends Phaser.Physics.Arcade.Image{
    constructor(x, y, oreName){
        super(scene, x, y);
        this.name = oreName;
        this.setTexture(this.name)
        this.life = 100;
        scene.physics.world.enable(this);
        switch(this.name){
          case "sapphire":
            this.setSize(18, 10)
            this.body.setOffset(5, 18)
            break;
          case "ruby":
            this.setSize(18, 14)
            this.body.setOffset(5, 14)
            break;
          case "emerald":
            this.setSize(18, 10)
            this.body.setOffset(5, 18)
            break;
          case "diamond":
            this.setSize(14, 10)
            this.body.setOffset(2, 18)
            break;  
        }
        this.setScale(3)
        this.depth = y;

        scene.add.existing(this);
    }

    mine(){
        this.life -= 25
        scene.sound.add('mine-'+(Math.floor(Math.random() * 2) + 1)).play();

        var particle_emitter, particles;

        switch(this.name){
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

        particle_emitter.explode((Math.floor(Math.random() * 5) + 2), this.x, this.y)

        particles.depth = this.depth + 1; 
        if(this.life <= 0){
            //ore mined
            this.disableBody(true, true);
            particle_emitter.explode((Math.floor(Math.random() * 8) + 5), this.x, this.y)
            allMaterials[allMaterials.findIndex(m => m.name == this.name)].inInventory += 2
            player.decreaseEnergy(1)
        }
    }
    
}