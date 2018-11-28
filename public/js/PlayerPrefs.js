class PlayerPrefs {
    constructor(){
        this.itemName = "mha-playerprefs"

        this.conf = localStorage.getItem(this.itemName);

        if(this.conf){
            this.conf = JSON.parse(this.conf)
        } else {
            this.conf = {}
        }
    }

    get(attr){
        return this.conf[attr]
    }

    set(attr, val){
        this.conf[attr] = val;

        localStorage.setItem(this.itemName, JSON.stringify(this.conf))
    }
}