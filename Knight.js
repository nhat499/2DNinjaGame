class Knight {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/knight5.png");
        this.slashSheet = ASSET_MANAGER.getAssset("sprites/theSlashSheet.png");
        this.scale = 1;
        this.velocity = {x:0, y:0};
        this.fallAcc = 562;
        // state variable
        this.facing = "left"; // 0 right, 1 = left;
        this.action = "attack"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

        // this.walkLeft = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        // this.walkRight = new Animator(this.spritesheet, 3159, 238, -242, 246, 7, 0.23, -3, false, true);

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
        this.animations["run" + "right"] =  new Animator(this.spritesheet, 5120, 1536, 512, 512, 10, 0.05, 0, false, true);
        this.animations["run" + "left"] =  new Animator(this.spritesheet, 0, 1536, 512, 512, 10, 0.05, 0, true, true);
        this.animations["jump" + "right"] = new Animator(this.spritesheet, 5120, 2048, 512, 512, 10, 0.05, 0, false, true);
        this.animations["jump" + "left"] =  new Animator(this.spritesheet, 0, 2048, 512, 512, 10, 0.05, 0, true, true);
    };


    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
        const TICK = this.game.clockTick;

        const MIN_WALK = 4.453125 * 3;
        const MAX_WALK = 93.75 * 3;
        const MAX_RUN = 153.75 * 3;
        const ACC_WALK = 133.59375 * 3;
        const ACC_RUN = 200.390625 * 3;
        const DEC_REL = 182.8125 * 3;
        const DEC_SKID = 365.625 * 3;
        const MIN_SKID = 33.75;

        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        const RUN_FALL = 2025 * 3;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;

        const MAX_FALL = 270 * 3;
      
        // gravity ------------------------
        
        // update verlocity
        if (this.action != "jump") { // not jumping
            // ground physics
            if (Math.abs(this.velocity.x) < MIN_WALK) {
                this.velocity.x = 0;
                this.action = "idle";
                if (this.game.left) {
                    this.facing = "left";
                    this.action = "run";
                    this.velocity.x -= MIN_WALK;
                }
                if (this.game.right) {
                    this.facing = "right";
                    this.action = "run";
                    this.velocity.x += MIN_WALK;
                }
            } else if (Math.abs(this.velocity.x) >= MIN_WALK) {
                if (this.facing === "right") {
                    if (this.game.right && !this.game.left) {
                        this.velocity.x += ACC_RUN * TICK;
                    } else if (this.game.left && !this.game.right) {
                        this.velocity.x -= DEC_SKID * TICK;
                        // this.state = slowing down state add walk animation later;
                    } else {
                        this.velocity.x -= DEC_REL * TICK;
                    }
                }
                if (this.facing === "left") {
                    if (this.game.left && !this.game.right) {
                        this.velocity.x -= ACC_RUN * TICK;
                    } else if (this.game.right && !this.game.left) {
                        this.velocity.x += DEC_SKID * TICK;
                    } else {
                        this.velocity.x += DEC_REL * TICK;
                    }
                }
            }
            this.velocity.y += this.fallAcc * TICK;
            if (this.game.jump) { // jump key press
                this.velocity.y = -900;
                this.fallAcc = RUN_FALL;
                this.action = "jump";
            }
        } else {
            // knight is in the air
            this.velocity.y += this.fallAcc * TICK;

            //horizontal physics 
            if (this.game.right && !this.game.left) {
                this.facing = "right";
                this.action = "run";
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x += ACC_RUN * TICK;
                } else this.velocity.x += ACC_WALK * TICK;
            } else if (this.game.left && !this.game.right) {
                this.facing = "left";
                this.action = "run";
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x -= ACC_RUN* TICK;
                } else this.velocity.x -= ACC_WALK * TICK;
            } else {
                // do nothing
            }
        }

        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;

        // if (this.y >= this.game.surfaceHeight - 312) this.y = this.game.surfaceHeight - 312;

        // MAX SPEED WALK? DO I NEED THAT?

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;

        // fall off map death animation;
 // gravity

        if (this.game.attack === true) {
            this.action = "attack";
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        //this.BB = new BoundingBox(this.x, this.y, 384, 384);
        
    }

    draw(ctx) {                 // must have draw method
        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.75);
        if (this.action === "attack") {
            let buffer = 0;
            if (this.facing == "left") buffer = -128;
            this.animations["slash" + this.facing].drawFrame(this.game.clockTick, ctx, this.x + buffer, this.y - 64, 0.5);
        }

        // left debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.left ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(10, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("L", 20, this.game.surfaceHeight - 20);

        // down debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.down ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(50, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("d", 60, this.game.surfaceHeight - 20);

        // up debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.up ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(50, this.game.surfaceHeight -80, 30, 30);
        ctx.fillText("u", 60, this.game.surfaceHeight - 60);

        // right debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.right ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(90, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("r", 100, this.game.surfaceHeight - 20);

        // jump debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.jump ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(130, this.game.surfaceHeight -40, 50, 30);
        ctx.fillText("space", 140, this.game.surfaceHeight - 20);

        // attack debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.attack ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(190, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("a", 200, this.game.surfaceHeight - 20);


        // this.walkLeft.drawFrame(this.game.clockTick, ctx, 400,400,.75);
        // this.walkRight.drawFrame(this.game.clockTick, ctx, 300,400,.75);

    };

}