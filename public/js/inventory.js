const inventory = {
    opened: false,
    allInvTexts: [],
    allInvIcons: [],
    width: 200,
    height: 100,
    background: null,
    inventoryTitle: null,
    inventoryKey: null,
    setInventoryKey: () => {
        inventory.inventoryKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)
    },
    preload: () => {
        scene.load.image('inventory', 'assets/images/bag.png');
    },
    create: () => {
        const inventoryButton = scene.add.image(30, 30, 'inventory').setScrollFactor(0).setInteractive();
        inventoryButton.depth = 100000;
        inventoryButton.setScale(3)
      
        rect = new Phaser.Geom.Rectangle(0, 0, inventory.width, inventory.height );
      
        inventory.background = scene.add.graphics({ fillStyle: { color: 0x0000ff } });
        inventory.background.setPosition(config.width * 0.12, config.height * 0.25)
        inventory.background.setScrollFactor(0)
        inventory.background.fillRectShape(rect);
        inventory.background.setScale(3)
        inventory.background.alpha = 0.75
        inventory.background.depth = 100000
      
        inventory.inventoryTitle = scene.add.bitmapText(330 , 160, "normal_font", "Materiales", 32).setScrollFactor(0);
        inventory.inventoryTitle.depth = 110000;
      
        allMaterials.map((m, i) => {
          const maxRows = 3;
      
          const material = scene.add.image(170 + Math.floor(i / maxRows) * 270 , 230 + i % maxRows * 70 , m.key).setScrollFactor(0)
          const text = scene.add.dynamicBitmapText(205  + Math.floor(i / maxRows) * 270, 212 + i % maxRows * 70, "normal_font", "", 32).setScrollFactor(0)

          material.depth = 110000;
          material.setScale(3)
      
          text.depth = 110000;
          text.materialName = m.name
      
          inventory.allInvIcons.push(material)
          inventory.allInvTexts.push(text)
        })        

        inventoryButton.on('pointerdown', function (event) {
            //open inventory
            inventory.setInventoryOpen(!inventory.opened);
        });
    
        inventory.setInventoryOpen(false)
        inventory.setInventoryKey();
    },
    update: () => {
        inventory.allInvTexts.map(t => {
            t.setText(allMaterials.find(m => m.name == t.materialName).inInventory)
        })

        if(Phaser.Input.Keyboard.JustDown(inventory.inventoryKey)){
            inventory.setInventoryOpen(!inventory.opened);
        }
    },
    setInventoryOpen: open => {
        if(open){
            inventory.background.visible = true
            inventory.allInvIcons.map(i => i.visible = true)
            inventory.allInvTexts.map(t => t.visible = true)
            inventory.inventoryTitle.visible = true;
            inventory.opened = true;
        } else {
            inventory.background.visible = false
            inventory.allInvIcons.map(i => i.visible = false)
            inventory.allInvTexts.map(t => t.visible = false)
            inventory.inventoryTitle.visible = false;
            inventory.opened = false;
        }
    },
}

