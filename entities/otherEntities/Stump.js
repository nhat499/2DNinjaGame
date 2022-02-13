class Stump {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("./sprites/Miscellaneous.png");
        //this.scale = 1;

        this.BB = new BoundingBox(this.x, this.y, 96, 92);

        this.action = "idle";

        this.speed = .1 * 4 + 1;
    };

    update() {

        if (this.action == "movingRight") {
            this.x += this.speed;
        } else if (this.action == "movingLeft") {
            this.x -= this.speed;
        } else {
            this.x += this.speed * 0;
        }

        this.updateBB();

        // COLLISION LOGIC---------------------------------
        let self = this;

        this.game.entities.forEach(function (entity) {
            if (entity.BB && !self.BB.collide(entity.BB) && entity instanceof MainNinja) {
                self.action = "idle";
            }
        });
        //-------------------------------------------------

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 96, 92);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 700, 393, 96, 92, 
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            96, 92);

        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };
};