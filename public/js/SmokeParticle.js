class SmokeParticle extends Phaser.GameObjects.Particles.Particle
{
    constructor (emitter)
    {
        super(emitter);

        this.t = 0;
        this.i = 0;
    }

    // update (delta, step, processors)
    // {
        //super.update(delta, step, processors);

        // this.t += delta;
		
        // if (this.t >= anim.msPerFrame && this.i < anim.frames.length - 1)
        // {
        //     this.i++;

        //     this.frame = anim.frames[this.i].frame;

        //     this.t -= anim.msPerFrame;
        // }
        
        
		// console.log(this)
    // }
}