class BottomText extends Phaser.GameObjects.Graphics {

    constructor(){
        super(scene);

        this.textSpeed = 100;

        const sampleText = [
            "Estás muy cansado!",
            "Vuelve mañana."
        ]

        this.bottomText = scene.add.text(0, config.height - 200, sampleText, 
        {fontSize: '32px',
            padding: 32,
            lineSpacing: 10}
        );
        this.bottomText.setScrollFactor(0)
        this.bottomText.depth = 200000;

        this.textBox = new Phaser.GameObjects.Graphics(scene);        
        this.setScrollFactor(0);
        this.depth = 100000;
        this.fillStyle(0x0000ff);
        this.alpha = 0.75
        this.fillRect(0, config.height - 200, config.width, 200);

        scene.add.existing(this);
    }

}