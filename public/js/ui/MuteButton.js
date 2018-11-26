class MuteButton extends Phaser.Physics.Arcade.Image{
    constructor(x,y){
        super(scene, x, y);
        this.setTexture("note")
        this.muted = false;
        this.setPosition(x, y);
        this.setScale(3)
        this.on('pointerdown', function (event) {
            this.toggleMute();
        });

        scene.add.existing(this);
    }

    toggleMute(){
        if(muted){
            muted = false;
        } else {
            muted = true;
        }

        game.sound.mute = this.muted
    }
}