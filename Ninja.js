class Ninja {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/ninja.png");
        this.slashSheet = ASSET_MANAGER.getAssset("sprites/slashBlue.png");
        this.scale = 1;
        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;
        // state variable
        this.facing = "left"; // 0 right, 1 = left;
        this.action = "idle"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"

        this.doubleJump = true;
        this.updateBB();

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

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
        this.animations["die" + "left"] =  new Animator(this.spritesheet, 540, 959, 482, 498, 10, 0.1, 0, false, true);
        
        this.animations["run" + "right"] =  new Animator(this.spritesheet, 5360, 2901, 363, 452, 10, 0.05, 0, false, true);
        this.animations["run" + "left"] =  new Animator(this.spritesheet, 1730, 2901, 363, 452, 10, 0.05, 0, true, true);

        this.animations["slide" + "right"] =  new Animator(this.spritesheet, 5360, 3359, 373, 351, 10, 0.1, 0, false, true);
        this.animations["slide" + "left"] =  new Animator(this.spritesheet, 1630, 3359, 373, 351, 10, 0.1, 0, true, true);

        this.animations["jump" + "right"] = new Animator(this.spritesheet, 5360, 1896, 362, 483, 10, 0.1, 0, false, true);
        this.animations["jump" + "left"] =  new Animator(this.spritesheet, 1740, 1896, 362, 483, 10, 0.1, 0, true, true);

        this.animations["jumpAttack" + "right"] = new Animator(this.spritesheet, 5360, 2379, 504, 522, 10, 0.1, 0, false, true);
        this.animations["jumpAttack" + "left"] =  new Animator(this.spritesheet, 320, 2379, 504, 522, 10, 0.1, 0, true, true);
    };


    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
        const TICK = this.game.clockTick;

        const MIN_WALK = 4.453125 * 3;
        const MAX_WALK = 93.75 * 3;
        const MAX_RUN = 153.75 * 3;
        const ACC_WALK = 133.59375 * 3;
        const ACC_RUN = 200.390625 * 3;
        const DEC_REL = 182.8125 ;
        const DEC_SLIDE = 300;
        const MIN_SKID = 33.75;

        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        const RUN_FALL = 2025 * 3;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;

        const MAX_FALL = 270 * 3;
      
        
        //this.velocity.y += this.fallAcc * TICK;
        // update verlocity
        // if (this.action === "slide") {
        //     this.velocity.x -= 500 * TICK;
        //     if (Math.abs(this.velocity.x) <= MAX_RUN/2) {
        //         this.action = "idle";
        //     }
        // }
        if (this.velocity.y >= 0 && this.action != "jump") { // not jumping
            // ground physics

            if ( ! this.game.slide) {
                this.velocity.x = 0;
                this.action = "idle";
                if (this.game.left && !this.game.right && !this.game.attack) {
                    this.facing = "left";
                    this.action = "run";
                    this.velocity.x -= MAX_RUN;
                }
                if (this.game.right && !this.game.left && !this.game.attack) {
                    this.facing = "right";
                    this.action = "run";
                    this.velocity.x += MAX_RUN;
                }
            } else if ( this.game.slide) {
                if (this.facing === "right" && this.velocity.x > 0) {
                    this.action = "slide";
                    this.velocity.x -= DEC_REL * 2 * TICK;  
                } 
                if (this.facing === "left" && this.velocity.x < 0) {
                    this.action = "slide";
                    this.velocity.x += DEC_REL * 2 * TICK;
                }
            } else if (Math.abs(this.velocity.x) >= MAX_RUN && !this.game.slide) {
                if (this.facing === "right") {
                    this.velocity.x -= DEC_REL * 5 * TICK;  
                } 
                if (this.facing === "left") {
                    this.velocity.x += DEC_REL * 5 * TICK;
                }
            }
            


            if (this.game.jump && this.action != "jump") { // jump key press
                this.velocity.y -= 3000;
                console.log("1st jump");
                ///this.fallAcc = STOP_FALL;
                this.action = "jump";
                this.game.jump = false;
            }
        } else {
            // in the air

            // double jump

            this.velocity.y += this.fallAcc * TICK;

            if (this.doubleJump && this.game.jump && this.action === "jump") {
                this.velocity.y = -3000;
                console.log("2st jump");
                if (this.facing === "right") this.velocity.x += 300;
                if (this.facing === "left") this.velocity.x -= 300;
                this.doubleJump = false;
            }

            //horizontal physics 
            if (this.game.right && !this.game.left) {
                this.facing = "right";
                //this.action = "run";
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x += ACC_RUN * TICK;
                } else this.velocity.x += ACC_WALK * TICK;
            } else if (this.game.left && !this.game.right) {
                this.facing = "left";
                //this.action = "run";
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x -= ACC_RUN* TICK;
                } else this.velocity.x -= ACC_WALK * TICK;
            } else {
                // do nothing
            }
        }

        this.velocity.y += this.fallAcc * TICK;

        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        let doubleJumpBonus = 0;
        if (!this.doubleJump) doubleJumpBonus = 300;
        if (this.velocity.x >= MAX_RUN)  this.velocity.x = MAX_RUN + doubleJumpBonus;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN - doubleJumpBonus;


        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;

        if (this.game.attack) {           // attack
            this.action = "attack";
        }
        
// collision handeling
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                if (self.velocity.y > 0) { // falling
                    if ((entity instanceof Ground) &&  // add more ground stuff here;
                    (self.lastBB.bottom >= entity.BB.top)) { // landing
                        self.doubleJump = true;
                        self.velocity.y = 0;
                        self.y = entity.y - 220;
                        if (self.action === "jump") self.action = "idle"; 
                        
                        //self.updateBB();
                    }else {
                        //console.log("fall");
                        //self.fallAcc = self.fallAcc;
                    }
                }
            }
        });
    };

    updateBB() {
        let slideBuffer = 0;
        if(this.action === "slide") slideBuffer = 64;
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + slideBuffer, 110, 220 - slideBuffer);
    }

    draw(ctx) {                 // must have draw method
        let slideBuffer = 0
        if (this.action === "slide") slideBuffer = 64;
        let attackLeftBuff = 0;
        if (this.action === "attack" && this.facing === "left") attackLeftBuff = 150;
        this.animations[this.action + this.facing].drawFrame(
            this.game.clockTick, ctx, this.x + attackLeftBuff - this.game.camera.x, this.y + slideBuffer, 0.5);

        //this.animations["slashleft"].drawFrame(this.game.clockTick, ctx, this.x + attackLeftBuff, 0, 0.50);

        if (this.action === "attack") {
            let buffer = 0;
            if (this.facing == "left") buffer = -20;
            this.animations["slash" + this.facing].drawFrame(this.game.clockTick, ctx, this.x + buffer - 120, this.y - 100, 0.40);
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

        // slide debug
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.slide ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(230, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("s", 240, this.game.surfaceHeight - 20);      
        

        // this.walkLeft.drawFrame(this.game.clockTick, ctx, 400,400,.75);
        // this.walkRight.drawFrame(this.game.clockTick, ctx, 300,400,.75);

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

    };

}