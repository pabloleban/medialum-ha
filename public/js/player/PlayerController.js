class PlayerController{
    
    constructor() {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    }

    upKeyPressed = () => this.cursors.up.isDown || this.upKey.isDown;
    downKeyPressed = () => this.cursors.down.isDown || this.downKey.isDown
    rightKeyPressed = () => this.cursors.right.isDown || this.rightKey.isDown
    leftKeyPressed = () => this.cursors.left.isDown || this.leftKey.isDown
    actionKeyJustPressed = () => Phaser.Input.Keyboard.JustDown(this.actionKey)
}