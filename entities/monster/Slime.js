class Slime {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.BB = new BoundingBox(this.x + 30, this.y + 55, 65, 65);

        this.hp = 100;
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/slime.png");
        this.scale = 0.5;

        // state variable
        this.facing = "left"; // 0 right, 1 = left;
        this.action = "dmg"; // 0 idle, 1 = moving, 2 = taking dmg, 3 = dying;

        // animation
        this.animations = []; // list of animations

        this.animations["idleleft"] = new Animator(this.spritesheet, 3159, 0, 242, 246, 2, 0.5, 3, false, true);
        this.animations["idleright"] = new Animator(this.spritesheet, 2661, 0, 242, 246, 2, 0.5, 3, true, true);

        this.animations["walkleft"] = new Animator(this.spritesheet, 3159, 242, 249, 244, 7, 0.25, 0, false, true);
        this.animations["walkright"] = new Animator(this.spritesheet, 1416, 242, 249, 244, 7, 0.25, 0, true, true);

        this.animations["dyingleft"] = new Animator(this.spritesheet, 3159, 484, 249, 246, 8, 0.1, 0, false, true);
        this.animations["dyingright"] = new Animator(this.spritesheet, 1167, 484, 249, 246, 8, 0.1, 0, true, true);

        this.animations["dmgleft"] = new Animator(this.spritesheet, 3159, 484, 249, 246, 1, 0.5, 0, false, true);
        this.animations["dmgright"] = new Animator(this.spritesheet, 2910, 484, 249, 246, 1, 0.5, 0, true, true);

        // phyiscs variable
        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;

        this.actionDecider = [250, -250];
    };

    move(speed) {
        this.action = "walk";
        if (speed < 0) {
            this.facing = "left"
        } else if (speed > 0) {
            this.facing = "right"
        } 
        // else {
        //     this.action = "idle";
        // }
        this.velocity.x = speed;
    }

    // update() {
    //     this.updateBB();
    // }

    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
        const TICK = this.game.clockTick;


        // dmg timer
        if (this.action === "dmg") {
            if (this.animations["dmg" + this.facing].animationFinish) { // being hit animation
                this.action = "idle";
            }
            if (this.hp <= 0) {
                this.action = "dying";
            }
        }

        // dying animation timer
        if (this.action === "dying") {
            if (this.animations["dying"+this.facing].animationFinish) {
                this.removeFromWorld = true;
            }
        }

        // idle 
        if (this.action === "idle") {
            if (this.animations["idle" + this.facing].animationFinish) {
                let i = Math.floor(Math.random() * 2) // pick number 0-2
                this.move(this.actionDecider[i]);
            }
        }

        // moving
        if (this.action === "walk") {
            if (this.animations["walk" + this.facing].animationFinish) {
                this.action = "idle";
                this.velocity.x = 0;
            }
        }

        this.velocity.y += this.fallAcc * TICK // apply gravity


        // update location
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;
        
        
        let self = this;

        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Platform) && self.lastBB.bottom <= entity.BB.top) {
                    self.velocity.y = 0;
                    self.y = entity.BB.top - 65;
                    self.updateBB();
                }
            }
            if (entity.hitBox && self.BB.collide(entity.hitBox) && self.hp > 0) {
                if (entity.facing === "left") {
                    self.facing = "right";
                    self.velocity.x = -100;
                } else {
                    self.facing = "left";
                    self.velocity.x = 100;
                }
                self.hp -= 0.5;
                
                self.action = "dmg";
            }
        });
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = this.BB = new BoundingBox(this.x, this.y, 70, 65);
    }

    draw(ctx) {                 // must have draw method
        let offsetX = 0
        let offsetY = -55;

        if (this.action === "idle" && this.facing === "left") offsetX = -13;
        if (this.action === "walk" && this.facing === "left") offsetX = -13;
        if (this.action === "dying" && this.facing === "left") offsetX = -30;
        if (this.action === "dmg" && this.facing === "left") offsetX = -30;

        if (this.action === "dmg" && this.facing === "right") offsetX = -25;
        if (this.action === "dying" && this.facing === "right") offsetX = -25;
        if (this.action === "walk" && this.facing === "right") offsetX = -35;
        if (this.action === "idle" && this.facing === "right") offsetX = -45;

        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, 
            this.x +offsetX - this.game.camera.x,this.y + offsetY, this.scale);

        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
}