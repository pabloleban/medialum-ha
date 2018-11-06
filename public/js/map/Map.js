class Map {
    constructor(scene, player){
        this.scene = scene;
        this.player = player;

        this.trees = this.scene.physics.add.group({immovable:true});
        this.ores = this.scene.physics.add.group({immovable:true});        
        this.tilemap = [0,0,0,0,0,0,0,1,2,3]
        this.fenceTiles = {topLeft: 0, topRight: 1, bottomLeft: 8, bottomRight: 10, verticalLeft: 4, verticalRight: 2, horizontal: 9}
        this.mapHeight = 50;
        this.mapWidth = 50;        
        var mapData = [];
        var fenceData = [];

        for (var y = 0; y <= this.mapHeight; y++){
            var row = [];
            var fenceRow = [];
            for (var x = 0; x <= this.mapWidth; x++){
                var tileIndex = Phaser.Math.RND.weightedPick(this.tilemap);
                row.push(tileIndex);

                if(y == 0 || y == this.mapHeight){
                    if(x == 0){
                        fenceRow.push(this.fenceTiles.topLeft)
                    } else if(x == this.mapWidth) {
                        fenceRow.push(this.fenceTiles.topRight)
                    } else {
                        fenceRow.push(this.fenceTiles.horizontal)
                    }
                }
            }
            mapData.push(row);
            fenceData.push(fenceRow)
        }
      
        this.map = this.scene.make.tilemap({ data: mapData, tileWidth: 16, tileHeight: 16})
        const tiles = this.map.addTilesetImage('tiles');
        this.grassLayer = this.map.createDynamicLayer(0, tiles, 0, 0)
        this.grassLayer.setScale(3)
        this.fence = this.scene.make.tilemap({ data: fenceData, tileWidth: 16, tileHeight: 16})
        const talass = this.fence.addTilesetImage('fences')
        this.fenceLayer = this.fence.createDynamicLayer(0, talass, 0, 0)
        this.fenceLayer.setScale(3)
    
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