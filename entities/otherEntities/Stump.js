class Stump {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Miscellaneous.png");
        //this.scale = 1;

        this.updateBB();

        this.action = "idle";

        this.speed = .1 * 4 + 1;
    };

    update() {
        this.updateBB();

        // if (this.action == "movingRight") {
        //     this.x += this.speed;
        // } else if (this.action == "movingLeft") {
        //     this.x -= this.speed;
        // } else {
        //     this.x += this.speed * 0;
        // }

        this.updateBB();

        // COLLISION LOGIC---------------------------------
        let self = this;

        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                if (entity instanceof MainNinja && entity.lastBB.left > self.BB.right) { // collide left
                    self.x = entity.BB.left - 96;
                    console.log('test');
                }
                if (entity instanceof Wall && self.lastBB.left > entity.BB.right) { // collide to the left
                    self.x = entity.BB.right;
                }
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

        if (false) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Sign {
    constructor(game, x, y, text, picture) {
        Object.assign(this, {game, x, y, text});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Object/Sign_1.png");
        this.picture = ASSET_MANAGER.getAssset(picture);
        //this.scale = 1;
        this.showText = false;
        this.updateBB();
    };

    update() {
        this.updateBB();
        // COLLISION LOGIC---------------------------------
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB) && entity instanceof MainNinja) {
                //self.action = "idle";
                self.showText = true;
            } else {
                self.showText = false;
            }
        });
        //-------------------------------------------------

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x,
            this.y, 63, 65);
        }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y);

        ctx.font = 'Sans-serif 20px';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'white';

        
        ctx.strokeText("hint", this.x - this.game.camera.x + 15, this.y - this.game.camera.y + 25);
        ctx.fillText("hint", this.x - this.game.camera.x + 15, this.y - this.game.camera.y + 25);
        
        if (this.showText) {
            ctx.strokeText(this.text, this.x - this.game.camera.x - 20, this.y - this.game.camera.y - 70, 300);
            ctx.fillText(this.text, this.x - this.game.camera.x - 20, this.y - this.game.camera.y - 70, 300);
        

            // ctx.drawImage(this.picture, 0, 0,
            //     this.picture.width, this.picture.height, 
            //     this.x - this.game.camera.x - 7, 
            //     this.y - this.game.camera.y - 100,
            //     this.picture.width * 0.2, this.picture.height * 0.2);
        }

        if (false) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        
    };
};