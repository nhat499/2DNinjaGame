class Ninja {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/entities/ninja.png");
        this.slashSheet = ASSET_MANAGER.getAssset("sprites/slashBlue.png");
        this.scale = 1;
        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;
        this.hp = 100;
        // state variable
        this.facing = "right"; // 0 right, 1 = left;
        this.action = "attack"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"
        this.doubleJump = true;
        this.updateBB();
        this.updateAttackRange();
        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

        this.actionDecider = [250, -250, 0];
        // this.walkLeft = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        // this.walkRight = new Animator(this.spritesheet, 3159, 238, -242, 246, 7, 0.23, -3, false, true);

    };

    loadAnimations() {
        this.animations["idle" + "right"] = new Animator(this.spritesheet, 5360, 1457, 232, 439, 10, 0.2, 0, false, true);
        this.animations["idle" + "left"] = new Animator(this.spritesheet, 3040, 1457, 232, 439, 10, 0.2, 0, true, true);

        this.animations["attack" + "right"] = new Animator(this.spritesheet, 5360, 0, 536, 495, 10, 0.05, 0, false, true);
        this.animations["attack" + "left"] = new Animator(this.spritesheet, 5360, 0, -536, 495, 10, 0.05, 0, false, true);

        this.animations["climb" + "right"] = new Animator(this.spritesheet, 5360, 495, 282, 464, 10, 0.1, 0, false, true);
        this.animations["climb" + "left"] = new Animator(this.spritesheet, 2540, 495, 282, 464, 10, 0.1, 0, true, true);

        this.animations["slash" + "left"] = new Animator(this.slashSheet,-1024, 0, 1024, 1024,10, .05, 0, true, true);
        this.animations["slash" + "right"] = new Animator(this.slashSheet,-1024, 1024, 1024, 1024,10, .05, 0, false, true);

        this.animations["die" + "right"] =  new Animator(this.spritesheet, 5360, 959, 482, 498, 10, 0.1, 0, false, true);
        this.animations["die" + "left"] =  new Animator(this.spritesheet, 540, 959, 482, 498, 10, 0.1, 0, true, true);
        
        this.animations["dmg" + "right"] =  new Animator(this.spritesheet, 5360, 959, 482, 498, 1, 0.1, 0, false, true);
        this.animations["dmg" + "left"] =  new Animator(this.spritesheet, 4862, 959, 482, 498, 1, 0.1, 0, false, true);

        this.animations["walk" + "right"] =  new Animator(this.spritesheet, 5360, 2901, 363, 452, 10, 0.05, 0, false, true);
        this.animations["walk" + "left"] =  new Animator(this.spritesheet, 1730, 2901, 363, 452, 10, 0.05, 0, true, true);

        this.animations["slide" + "right"] =  new Animator(this.spritesheet, 5360, 3359, 373, 351, 10, 0.1, 0, false, true);
        this.animations["slide" + "left"] =  new Animator(this.spritesheet, 1630, 3359, 373, 351, 10, 0.1, 0, true, true);

        this.animations["jump" + "right"] = new Animator(this.spritesheet, 5360, 1896, 362, 483, 10, 0.1, 0, false, true);
        this.animations["jump" + "left"] =  new Animator(this.spritesheet, 1740, 1896, 362, 483, 10, 0.1, 0, true, true);

        this.animations["jumpAttack" + "right"] = new Animator(this.spritesheet, 5360, 2379, 504, 522, 10, 0.1, 0, false, true);
        this.animations["jumpAttack" + "left"] =  new Animator(this.spritesheet, 320, 2379, 504, 522, 10, 0.1, 0, true, true);
    };

    move(speed) {
        this.action = "walk";
        if (speed < 0) {
            this.facing = "left"
        } else if (speed > 0) {
            this.facing = "right"
        } else {
            if (this.facing == "left") {
                this.facing = "right";
            } else {
                this.facing = "left";
            }
            this.action = "idle";
            //this.action = "dmg";
        }
        this.velocity.x = speed;
    }

    update() {                  // must have update method
        const TICK = this.game.clockTick;
        this.velocity.y += this.fallAcc * TICK // apply gravity

        if (this.action === "dmg") {
            if (this.animations["dmg" + this.facing].animationFinish) { // being hit animation
                this.action = "idle";
            }
            if (this.hp <= 0) {
                this.action = "die";
            }
        } else if (this.action === "die") { // dying animation timer
            if (this.animations["die"+this.facing].animationFinish) {
                this.removeFromWorld = true;
            }
        } else if (this.action === "idle") { // idle 
            if (this.animations["idle" + this.facing].animationFinish) {
                let i = Math.floor(Math.random() * 3) // pick number 0-3
                //this.move(this.actionDecider[2]);
                this.move(this.actionDecider[i]);
            }
        } else if (this.action === "walk") { // moving
            if (this.animations["walk" + this.facing].animationFinish) {
                this.action = "idle";
                this.velocity.x = 0;
            }
        }

        

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;


        
// collision handeling
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Platform) && self.lastBB.bottom <= entity.BB.top) {
                    self.velocity.y = 0;
                    self.y = entity.BB.top - 110;
                }
                // if (entity instanceof Wall && self.BB.bottom > entity.BB.top) { 
                //     if (self.lastBB.left >= entity.BB.right) { // left collision
                //         self.velocity.x = 0;
                //         self.x = entity.BB.right - 60;
                //     } else  if (self.lastBB.right <= entity.BB.left) { // right collision
                //         // need to add right collision here
                //     }
                // }
            }
                        //doesnt have dmg animation yet
            if (entity.hitBox && self.BB.collide(entity.hitBox) &&  self.hp > 0) { //&&  self.hp > 0 
                if (entity.facing === "left") {
                    self.facing = "right";
                    self.velocity.x = -100;
                } else {
                    self.facing = "left";
                    self.velocity.x = 100;
                }
                self.hp -= 0.5;
                if (self.hp <= 0) {
                    self.action = "die";
                }
                self.action = "dmg";
                if (entity.action === "attack2") {
                    self.velocity.y = -300;
                }
            }
        });
        this.updateBB();
        this.updateAttackRange();
    };

    updateBB() {
        let slideBuffer = 0;
        // if(this.action === "slide") slideBuffer = 64;
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + slideBuffer, 55, 110 - slideBuffer);
    }

    updateAttackRange() {
        this.lastAttackRange = this.attackRange;
        let bufferx = 0
        if (this.facing === "right") bufferx = 50;
        this.attackRange = new BoundingBox(this.x + bufferx,this.y, 100,100);
    }


    draw(ctx) {                 // must have draw method
        let slideBuffer = 0
        if (this.action === "slide") slideBuffer = 64;
        let attackLeftBuff = 0;
        if (this.action === "attack" && this.facing === "left") attackLeftBuff = 150;
        this.animations[this.action + this.facing].drawFrame(
            this.game.clockTick, ctx, this.x + attackLeftBuff - this.game.camera.x, 
            this.y + slideBuffer - this.game.camera.y, 0.25);

        //this.animations["slashleft"].drawFrame(this.game.clockTick, ctx, this.x + attackLeftBuff, 0, 0.50);

        if (this.action === "attack") {
            let buffer = 0;
            if (this.facing == "left") buffer = -20;
            if (this.facing === "right") buffer = 70;
            this.animations["slash" + this.facing].drawFrame(this.game.clockTick, 
                ctx, this.x + buffer - 120 - this.game.camera.x, this.y - 75 - this.game.camera.y, 0.20);
        }

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.attackRange.x - this.game.camera.x, this.attackRange.y - this.game.camera.y, 
            this.attackRange.width, this.attackRange.height);
    };

}