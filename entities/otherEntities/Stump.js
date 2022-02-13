class Stump {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("./sprites/Miscellaneous.png");

        this.BB = new BoundingBox(this.x, this.y, 96, 92);
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 700, 393, 96, 92, 
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            96, 92);

        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };
};