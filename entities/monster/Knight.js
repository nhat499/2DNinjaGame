class Knight {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/entities/knight5.png");
        this.slashSheet = ASSET_MANAGER.getAssset("sprites/theSlashSheet.png");
        this.BB = new BoundingBox(this.x + 60, this.y + 50, 80, 115);  
        this.scale = 1;
        this.hp = 100;
        this.dmg = 5;
        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;
        this.spriteOffsetX = 60;
        // state variable
        this.facing = "left"; // 0 right, 1 = left;
        this.action = "idle"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"
        this.canAttack = true;
        this.updateAlertBB();
        //this.updateMonsterHB();

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

        // this.walkLeft = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        // this.walkRight = new Animator(this.spritesheet, 3159, 238, -242, 246, 7, 0.23, -3, false, true);
        this.actionDecider = ["moveleft", "moveright", "stay", "attack"];
    };

    loadAnimations() {
        this.animations["idle" + "right"] = new Animator(this.spritesheet, 5120, 0, 512, 512, 10, 0.2, 0, false, true);
        this.animations["idle" + "left"] = new Animator(this.spritesheet, 0, 0, 512, 512, 10, 0.2, 0, true, true);

        this.animations["attack" + "right"] = new Animator(this.spritesheet, 5120, 512, 512, 512, 10, 0.1, 0, false, true);
        this.animations["attack" + "left"] = new Animator(this.spritesheet, 0, 512, 512, 512, 10, 0.1, 0, true, true);

        this.animations["slash" + "right"] = new Animator(this.slashSheet,0, 0, 1024, 1024,25, 0.04, 0, true, true);
        this.animations["slash" + "left"] = new Animator(this.slashSheet,0, 1024, 1024, 1024,25, 0.04, 0, false, true);

        this.animations["die" + "right"] =  new Animator(this.spritesheet, 5120, 1024, 512, 512, 10, 0.1, 0, false, true);
        this.animations["die" + "left"] =  new Animator(this.spritesheet, 0, 1024, 512, 512, 10, 0.1, 0, true, true);

        this.animations["dmg" + "right"] =  new Animator(this.spritesheet, 5120, 1024, 512, 512, 2, 0.1, 0, false, true);
        this.animations["dmg" + "left"] =  new Animator(this.spritesheet, 4096, 1024, 512, 512, 2, 0.1, 0, true, true);


        this.animations["walk" + "right"] =  new Animator(this.spritesheet, 5120, 1536, 512, 512, 10, 0.05, 0, false, true);
        this.animations["walk" + "left"] =  new Animator(this.spritesheet, 0, 1536, 512, 512, 10, 0.05, 0, true, true);
        this.animations["jump" + "right"] = new Animator(this.spritesheet, 5120, 2048, 512, 512, 10, 0.05, 0, false, true);
        this.animations["jump" + "left"] =  new Animator(this.spritesheet, 0, 2048, 512, 512, 10, 0.05, 0, true, true);
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
        // logic to update it's state, background have no state, just have x,y
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

        // update location
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;
        this.updateAlertBB();


        let self = this;
        // collision
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Platform) && self.lastBB.bottom <= entity.BB.top) {
                    self.velocity.y = 0;
                    self.y = entity.BB.top - 115 - 50;
                }
                if (entity instanceof Wall && self.BB.bottom > entity.BB.top) { 
                    if (self.lastBB.left >= entity.BB.right) { // left collision
                        self.velocity.x = 0;
                        self.x = entity.BB.right - 60;
                    } else  if (self.lastBB.right <= entity.BB.left) { // right collision
                        // need to add right collision here
                        self.velocity.x = 0;
                        self.x = entity.BB.left - 80 - 60;
                    }
                }
            }
            self.handleAlert(self, entity);
            if (entity.hitBox && self.BB.collide(entity.hitBox)) { //&&  self.hp > 0 
                if (entity.facing === "left") {
                    self.facing = "right";
                    self.velocity.x = -100;
                } else {
                    self.facing = "left";
                    self.velocity.x = 100;
                }
                self.hp -= 0.5;
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
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 60, this.y + 50, 80, 115);    
    }

    updateAlertBB() {
        this.lastAlertBB = this.alertBB;
        this.alertBB = new BoundingBox(this.x-200 + 60, this.y + 50, 480, 115)
    }

    updateMonsterHB() {
        let bufferx = 0;
        let buffery = 50;
        if (this.facing === "right") bufferx = 70;
        if (this.facing === "left") bufferx = 0;
        this.monsterHB = new BoundingBox(this.x + bufferx,this.y + buffery, 120,100);
    }


    handleAlert(self, entity) {
        if (entity instanceof MainNinja && self.alertBB.collide(entity.BB)
            && self.action != "die" && self.action != "attack") {
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
        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, 
            this.y - this.game.camera.y, 0.4);
        this.debug(ctx);
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