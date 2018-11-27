class UI {
    constructor(){
        this.bottomText = new BottomText();
        this.energyBar = new EnergyBar();
        this.muteButton = new MuteButton(config.width - 30,35);
    }
}