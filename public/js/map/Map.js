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
        this.fencePadding = 10

        var mapData = [];
        var fenceData = [];

        for (var y = 0; y <= this.mapHeight; y++){
            var row = [];
            var fenceRow = [];
            for (var x = 0; x <= this.mapWidth; x++){
                var tileIndex = Phaser.Math.RND.weightedPick(this.tilemap);
                row.push(tileIndex);

                if(y == 0 + this.fencePadding && x == 0 + this.fencePadding){
                    //top left
                    fenceRow.push(this.fenceTiles.topLeft)
                } else if(y == 0 + this.fencePadding && x == this.mapWidth - this.fencePadding){
                    //top right
                    fenceRow.push(this.fenceTiles.topRight)
                } else if(y == this.mapHeight - this.fencePadding && x == 0 + this.fencePadding){
                    //bottom left
                    fenceRow.push(this.fenceTiles.bottomLeft)
                } else if(y == this.mapHeight - this.fencePadding && x == this.mapWidth - this.fencePadding){
                    //bottom right
                    fenceRow.push(this.fenceTiles.bottomRight)
                } else if((y == 0 + this.fencePadding || y == this.mapHeight - this.fencePadding) && x > 0 + this.fencePadding && x < this.mapWidth - this.fencePadding){
                    //horizontal
                    fenceRow.push(this.fenceTiles.horizontal)
                } else if(x == 0 + this.fencePadding && y > 0 + this.fencePadding && y < this.mapHeight - this.fencePadding){
                    //vertical left
                    fenceRow.push(this.fenceTiles.verticalLeft)
                } else if(x == this.mapWidth - this.fencePadding && y > 0 + this.fencePadding && y < this.mapHeight - this.fencePadding){
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
        this.fence
    
        this.scene.physics.add.collider(this.player, this.trees);
        this.scene.physics.add.collider(this.player, this.ores);
        this.scene.physics.add.overlap(this.player.actionZone, this.trees, (zone, tree) => {player.canChop(tree, zone)});
        this.scene.physics.add.overlap(this.player.actionZone, this.ores, (zone, ore) => {player.canMine(ore, zone)});

        var bird = new Bird(this.scene, 200, 200);
        
    }

    addTree(x, y){
        if(this.insidePlayableMap(x,y)){
            this.trees.add(new Tree(this.scene, x, y))
        }  
    }

    addOre(x, y, oreName){
        if(this.insidePlayableMap(x,y)){
            this.ores.add(new Ore(this.scene, x, y, oreName))
        }
    }

    insidePlayableMap(x,y){
        if(x < this.fencePadding * 16 * 3 || x > this.mapWidth  * 16 * 3 - this.fencePadding * 16 * 3){
            console.error(`Coordinate x: ${x} is outside the playable area`);
            return false;
        }

        if(y < this.fencePadding * 16 * 3 || y > this.mapHeight * 16 * 3 - this.fencePadding * 16 * 3){
            console.error(`Coordinate y: ${y} is outside the playable area`);
            return false;
        }

        return true;
    }
}