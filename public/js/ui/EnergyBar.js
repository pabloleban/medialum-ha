class EnergyBar {
    constructor(){
        this.energyBar = new Phaser.GameObjects.Graphics(scene);        
        this.energyBar.setScrollFactor(0);
        this.energyText = scene.add.text(125 , 19, "",  { fontSize: '24px', align: 'center'}).setScrollFactor(0);
        this.energyBar.x = 30
        this.energyBar.y = 7
        this.energyText.depth = 110000;
        this.energyBar.depth = 100000
        
        scene.add.existing(this.energyBar);
        this.updateEnergyBar();
    }

    updateEnergyBar(){
        var barScale = 20;

        this.energyBar.clear();
        //BG
        this.energyBar.fillStyle(0x000000);
        this.energyBar.fillRect(this.energyBar.x, this.energyBar.y, player.maxEnergy * barScale, 30);

        if (player.energy <= player.maxEnergy * 0.3) {
            this.energyBar.fillStyle(0xff0000);
        } else {
            this.energyBar.fillStyle(0x0000ff);
        }

        var d = Math.floor((player.maxEnergy * barScale - 4) / player.maxEnergy * player.energy);

        this.energyBar.fillRect(this.energyBar.x + 2, this.energyBar.y + 2, d, 26);
        this.energyText.setText(player.energy+"/"+player.maxEnergy);
    }
}