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
        this.depth = 10000000
        this.setScrollFactor(0)
        this.setInteractive();
        this.updateButton();
        scene.add.existing(this);
    }

    toggleMute(){
        if(this.muted){
            this.muted = false;
        } else {
            this.muted = true;
        }
        game.sound.mute = this.muted
        this.updateButton();
    }

    updateButton(){
        if(this.muted){
            this.alpha = 0.4
        } else {
            this.alpha = 1
        }
    }
}