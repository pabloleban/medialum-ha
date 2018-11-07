class Map {
    constructor(scene, player){
        this.scene = scene;
        this.player = player;

        this.trees = this.scene.physics.add.group({immovable:true});
        this.ores = this.scene.physics.add.group({immovable:true});        
        this.tilemap = [0,0,0,0,0,0,0,1,2,3]
        this.fenceTiles = {topLeft: 0, topRight: 1, bottomLeft: 8, bottomRight: 10, verticalLeft: 4, verticalRight: 2, horizontal: 9}
        this.mapHeight = 25;
        this.mapWidth = 25;        
        var mapData = [];
        var fenceData = [];

        for (var y = 0; y <= this.mapHeight; y++){
            var row = [];
            var fenceRow = [];
            for (var x = 0; x <= this.mapWidth; x++){
                var tileIndex = Phaser.Math.RND.weightedPick(this.tilemap);
                row.push(tileIndex);

                if(y == 0 && x == 0){
                    //top left
                    fenceRow.push(this.fenceTiles.topLeft)
                } else if(y == 0 && x == this.mapWidth){
                    //top right
                    fenceRow.push(this.fenceTiles.topRight)
                } else if(y == this.mapHeight && x == 0){
                    //bottom left
                    fenceRow.push(this.fenceTiles.bottomLeft)
                } else if(y == this.mapHeight && x == this.mapWidth){
                    //bottom right
                    fenceRow.push(this.fenceTiles.bottomRight)
                } else if((y == 0 || y == this.mapHeight) && x > 0 && x < this.mapWidth){
                    //horizontal
                    fenceRow.push(this.fenceTiles.horizontal)
                } else if(x == 0 && y > 0 && y < this.mapHeight){
                    //vertical left
                    fenceRow.push(this.fenceTiles.verticalLeft)
                } else if(x == this.mapWidth && y > 0 && y < this.mapHeight){
                    //vertical right
                    fenceRow.push(this.fenceTiles.verticalRight)
                } else {
                    fenceRow.push(-1);
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