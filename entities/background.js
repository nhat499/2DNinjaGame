class hill {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        // this.spritesheet = ASSET_MANAGER.getAssset("");
    }

    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
    };

    draw(ctx) {                 // must have draw method
        //ctx.drawImage(this.spritesheet, x, y, w, h, this.draw.x - this.game.camera.x, this.y, ...);
    };
}