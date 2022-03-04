class Kunai {
    constructor(game, x,y, xVerlocity) {    // all entites should have construture
        Object.assign(this, {game, x, y, xVerlocity});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Miscellaneous.png");
        this.scale = 1;
        this.attackDmg = 10;
        // state variable
        this.state = "throw";
        this.facing = "left";

        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["throw" + "right"] = new Animator(this.spritesheet, 255, 210, 100, 100, 1,  0.5, 0, false, true);
        this.animations["throw" + "left"] = new Animator(this.spritesheet, 255, 280, 100, 100, 1,  0.5, 0, false, true);

        this.updateHB();
    };

    update() {                  // must have update method
        if (this.xVerlocity < 0) {
            this.facing = "left";
        } else {
            this.facing = "right";
        }
        this.x += this.xVerlocity * this.game.clockTick;
        // update bb
        this.updateHB();
        if (this.animations[this.state + this.facing].animationFinish) {
            this.removeFromWorld = true;
        }
        // collision detection
        // let self = this;
        // this.game.entities.forEach(function (entity) {
        //     if (entity.BB && self.hitBox && self.hitBox.collide(entity.BB)) {
        //         if (entity instanceof Slime) {
        //             console.log("hello");
        //             //self.animations[self.state + self.facing].animationFinish = true;
        //             //self.removeFromWorld = true;
        //             //self.hitBox = undefined;
        //         }
                
        //     }
        // });

    };

    updateHB() {
        this.lasthitBox = this.hitBox;
        this.hitBox = new BoundingBox(this.x,this.y, 50, 50, this.attackDmg);
    }

    draw(ctx) {                 // must have draw method
        this.animations[this.state + this.facing].drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, 
            this.y - this.game.camera.y, 0.5);

        let debug = true;
        if (debug) {
            if (this.hitBox) {
                this.game.ctx.strokeStyle = "red"; // the outline of shape
                this.game.ctx.strokeRect(this.hitBox.x - this.game.camera.x, 
                this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
            }

        }

    };



}

class Shuriken {
    constructor(game, x,y, xVerlocity) {    // all entites should have construture
        Object.assign(this, {game, x, y, xVerlocity});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Miscellaneous.png");
        this.scale = 1;
        
        // state variable
        this.state = "throw";
        this.facing = "left";
        this.updateHB();
        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["throw"] = new Animator(this.spritesheet, 55, 260, 100, 100,1, 0.5, 0, false, true);
    };

    update() {                  // must have update method
        if (this.xVerlocity < 0) {
            this.facing = "left";
        } else {
            this.facing = "right";
        }
        this.x += this.xVerlocity * this.game.clockTick;
        // update bb
        this.updateHB();
        if (this.animations[this.state].animationFinish) {
            this.removeFromWorld = true;
        }
    };

    updateHB() {
        this.lasthitBox = this.HB;
        this.hitBox = new BoundingBox(this.x,this.y, 50, 50);
    }

    draw(ctx) {                 // must have draw method
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, 
            this.y - this.game.camera.y, 0.5);

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.hitBox.x - this.game.camera.x, 
            this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
    };
}