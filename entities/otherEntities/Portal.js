class Portal {
    constructor(game, x, y, level) {
        Object.assign(this, { game, x, y, level});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Object/portal.png");
        this.active = false;
        this.BB = new BoundingBox(this.x + 20, this.y, 90, 128);
        //this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        //this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {
        //this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
        
    };

    // drawMinimap(ctx, mmX, mmY) {
    //     ctx.fillStyle = "Brown";
    //     ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    // };

    draw(ctx) {
        if (this.active) {
            ctx.drawImage(this.spritesheet, this.x - this.game.camera.x,
                this.y - this.game.camera.y, 128, 128);
        }


        let debug = false;
        if (debug) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};