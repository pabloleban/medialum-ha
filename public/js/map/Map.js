class Map {
    constructor(scene, player){
        this.scene = scene;
        this.player = player;

        this.trees = this.scene.physics.add.group({immovable:true});
        this.ores = this.scene.physics.add.group({immovable:true});        
        this.tilemap = [0,0,0,0,0,0,0,1,2,3]
        this.mapHeight = 50;
        this.mapWidth = 50;        
        var mapData = [];

        for (var y = 0; y < this.mapHeight; y++){
            var row = [];
            for (var x = 0; x < this.mapWidth; x++){
                var tileIndex = Phaser.Math.RND.weightedPick(this.tilemap);
                row.push(tileIndex);
            }
            mapData.push(row);
        }
      
        this.map = this.scene.make.tilemap({ data: mapData, tileWidth: 16, tileHeight: 16})
        this.tiles = this.map.addTilesetImage('tiles');
        this.grassLayer = this.map.createDynamicLayer(0, this.tiles, 0, 0)
        this.grassLayer.setScale(3)
    
        this.scene.physics.add.collider(this.player, this.trees);
        this.scene.physics.add.collider(this.player, this.ores);
        this.scene.physics.add.overlap(this.player.actionZone, this.trees, (zone, tree) => {player.canChop(tree, zone)});
        this.scene.physics.add.overlap(this.player.actionZone, this.ores, (zone, ore) => {player.canMine(ore, zone)});
    }

    addTree(x, y){
        this.trees.add(new Tree(this.scene, x, y))
    }

    addOre(x, y, oreName){
        this.ores.add(new Ore(this.scene, x, y, oreName))
    }

    
}