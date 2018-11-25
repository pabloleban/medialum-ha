class BottomText extends Phaser.GameObjects.Graphics {

    constructor(){
        super(scene);

        this.textSpeed = 5;
        this.textCounter = 0;
        this.text = ``
        this.textArray = []
        this.textIndex = 0
        this.opened = false;

        this.bottomText = scene.add.text(0, config.height - 200, "", 
        {fontSize: '32px',
            padding: 32,
            lineSpacing: 10}
        );
        this.bottomText.setScrollFactor(0)
        this.bottomText.depth = 200000;

        this.setScrollFactor(0);
        this.depth = 100000;
        this.fillStyle(0x0000ff);
        this.alpha = 0.75
        this.fillRect(0, config.height - 200, config.width, 200);

        this.close();

        scene.add.existing(this);
    }

    close(){
        this.visible = false;
        this.bottomText.visible = false;
        this.opened = false;
    }

    preUpdate(time, delta){
        this.textCounter += delta

        if(this.text != this.bottomText.text && this.textCounter >= this.textSpeed){
            this.textCounter=0;
            this.bottomText.setText(this.bottomText.text + this.text[this.bottomText.text.length]);
        }
    }

    show(text){
        this.visible = true;
        this.bottomText.visible = true;

        this.bottomText.setText("")

        if(text.constructor === Array){
            this.textArray = text;
            this.text = text[0]
        } else {
            this.text = text;
            this.textArray = [text];
        }

        this.textIndex = 0;
        this.opened = true;
    }

    nextText(){
        if(this.textIndex >= this.textArray.length - 1){
            this.close();
        } else {
            this.textIndex++;
            this.text = this.textArray[this.textIndex]
            this.bottomText.setText("")
        }
    } 
}