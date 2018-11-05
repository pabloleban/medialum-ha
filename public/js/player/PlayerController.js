class PlayerController{
    constructor(scene) {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    }

    upKeyPressed() { return this.cursors.up.isDown || this.upKey.isDown }
    downKeyPressed() { return this.cursors.down.isDown || this.downKey.isDown }
    rightKeyPressed() { return this.cursors.right.isDown || this.rightKey.isDown }
    leftKeyPressed() { return this.cursors.left.isDown || this.leftKey.isDown }
}