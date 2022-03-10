class Ninja {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/entities/ninja.png");
        this.slashSheet = ASSET_MANAGER.getAssset("sprites/slashBlue.png");
        this.scale = 1;
        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;
        this.hp = 100;
        this.dmg = 5;
        // state variable
        this.facing = "right"; // 0 right, 1 = left;
        this.action = "idle"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"
        this.doubleJump = true;
        this.canAttack = true;
        this.updateBB();
        this.updateAlertBB();

        //this.updateAttackRange();
        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

        this.actionDecider = ["moveleft", "moveright", "stay", "attack"];
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

    move(action) {
        let speed = 0;
        if (action ===  "moveleft") {
            this.facing = "left"
            this.action = "walk";
            speed = -250;
        } else if (action ===  "moveright") {
            this.facing = "right";
            this.action = "walk";
            speed = 250;
        } else if (action === "stay") {
            this.action = "idle";
        } else if (action === "attack") {
            this.action = "attack";
        }
        this.velocity.x = speed;
    }

    update() {                  // must have update method
        const TICK = this.game.clockTick;
        if (this.action === "dmg") {
            this.monsterHB = undefined;
            if (this.animations["dmg" + this.facing].animationFinish) { // being hit animation
                this.action = "idle";
                this.canAttack = true;
            }
            if (this.hp <= 0) {
                this.action = "die";
            }
        } else if (this.action === "die") { // dying animation timer
            if (this.animations["die" + this.facing].animationFinish) {
                console.log("die");
                this.removeFromWorld = true;
            }
        } else if (this.action === "idle") { // idle 
            this.monsterHB = undefined;
            if (this.animations["idle" + this.facing].animationFinish) {
                this.canAttack = true;
                let i = Math.floor(Math.random() * 3); 
                this.move(this.actionDecider[i]);
            }
        } else if (this.action === "walk") { // moving
            this.monsterHB = undefined;
            if (this.animations["walk" + this.facing].animationFinish) {
                this.action = "idle";
                this.velocity.x = 0;
            }
        } else if (this.action === "attack") {
            if (this.animations["attack" + this.facing].animationFinish) {
                this.updateMonsterHB();
                this.action = "idle";
                this.velocity.x = 0;
            }
        }

        this.velocity.y += this.fallAcc * TICK // apply gravity

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;
        this.updateAlertBB();

        
// collision handeling
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Platform) && self.lastBB.bottom <= entity.BB.top) {
                    self.velocity.y = 0;
                    self.y = entity.BB.top - 110;
                }
                if (entity instanceof Wall && self.BB.bottom > entity.BB.top) { 
                    if (self.lastBB.left >= entity.BB.right) { // left collision
                        self.velocity.x = 0;
                        self.x = entity.BB.right;
                    } else  if (self.lastBB.right <= entity.BB.left) { // right collision
                        // need to add right collision here
                        self.velocity.x = 0;
                        self.x = entity.BB.left - 55;
                    }
                }
            }
            self.handleAlert(self, entity);
            if (entity.hitBox && self.BB.collide(entity.hitBox) && self.hp > 0) { //&&  self.hp > 0 
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
        this.updateAlertBB();
    };

    updateBB() {
        let slideBuffer = 0;
        // if(this.action === "slide") slideBuffer = 64;
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + slideBuffer, 55, 110 - slideBuffer);
    }

    updateAlertBB() {
        this.lastAlertBB = this.alertBB;
        this.alertBB = new BoundingBox(this.x-200, this.y, 455, 110)
    }

    updateMonsterHB() {
        let bufferx = 0;
        if (this.facing === "right") bufferx = 10;
        if (this.facing === "left") bufferx = -80;
        this.monsterHB = new BoundingBox(this.x + bufferx,this.y, 120,100);
    }

    // alert handeling
    handleAlert(self, entity) {
        if (entity instanceof MainNinja && self.alertBB.collide(entity.BB) && self.action != "die") {
            if (self.BB.left - 100 >= entity.BB.left) { // left collision
                self.facing = "left";
                self.action = "walk";
                self.velocity.x = -250;

            } else if (self.BB.right + 100 <= entity.BB.right) { // right collision
                self.facing = "right";
                self.action = "walk";
                self.velocity.x = 250;
            } else if (self.canAttack) {
                if (self.BB.left >= entity.BB.left) { 
                    self.facing = "left";
                } else {
                    self.facing = "right";
                }
                self.velocity.x = 0;
                self.action = "attack";
                self.canAttack = false;
            }
        }

    }

    draw(ctx) {                 // must have draw method
        let slideBuffer = 0
        let offsetX = 0;
        if (this.action === "slide") slideBuffer = 64;
    
        if (this.action === "attack" && this.facing === "left") offsetX = 75;
        if (this.action === "attack" && this.facing === "right") offsetX = -20;

        this.animations[this.action + this.facing].drawFrame(
            this.game.clockTick, ctx, this.x + offsetX - this.game.camera.x, 
            this.y + slideBuffer - this.game.camera.y, 0.25);

        //this.animations["slashleft"].drawFrame(this.game.clockTick, ctx, this.x + attackLeftBuff, 0, 0.50);

        // slash animation 
        if (this.action === "attack") {
            let offsetX = 0;
            let offsetY = -50;
            if (this.facing == "left") offsetX = 30;
            if (this.facing === "right") offsetX = 60;
            this.animations["slash" + this.facing].drawFrame(this.game.clockTick, 
                ctx, this.x + offsetX - 120 - this.game.camera.x, this.y + offsetY - this.game.camera.y, 0.20);
        }

        if (debugStat) {
            this.debug(ctx);
        }

    };

        debug(ctx) {
            this.game.ctx.strokeStyle = "red"; // the outline of shape
            this.game.ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

            this.game.ctx.strokeStyle = "blue"; // alert range
            this.game.ctx.strokeRect(this.alertBB.x - this.game.camera.x, this.alertBB.y - this.game.camera.y, this.alertBB.width, this.alertBB.height);

            if (this.monsterHB) {
                this.game.ctx.strokeStyle = "purple"; // attack range
                this.game.ctx.strokeRect(this.monsterHB.x - this.game.camera.x, this.monsterHB.y - this.game.camera.y, 
                this.monsterHB.width, this.monsterHB.height);
            }
        }

}