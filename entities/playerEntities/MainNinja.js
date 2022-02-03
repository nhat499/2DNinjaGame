class MainNinja {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/ninjaMainSheet.png");
        //this.slashSheet = ASSET_MANAGER.getAssset("sprites/slashBlue.png");
        this.scale = 1;
        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;
        // state variable
        this.facing = "left"; // 0 right, 1 = left;
        this.action = "attack2"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"
        this.attack = 0; // there 3 attack
        // this.attacking = 0;
        // this.attackEnd = 7 * this.game.clockTick;
        this.doubleJump = true;
        this.updateBB();

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

        // this.walkLeft = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        // this.walkRight = new Animator(this.spritesheet, 3159, 238, -242, 246, 7, 0.23, -3, false, true);

    };


    loadAnimations() {
        this.animations["couch" + "right"] = new Animator(this.spritesheet, 3800 +30, 0, 154.5, 300, 3, 0.3, 0, false, true);
        this.animations["couch" + "left"] = new Animator(this.spritesheet, 3306.5, 0, 154.5, 300, 3, 0.3, 0, true, true);

        this.animations["dizzy" + "right"] = new Animator(this.spritesheet, 3800 +45, 300, 146, 300, 3, 0.3, 25, false, true);
        this.animations["dizzy" + "left"] = new Animator(this.spritesheet, 3242 + 20, 300, 146, 300, 3, 0.3, 25, true, true);


        this.animations["die" + "right"] =  new Animator(this.spritesheet, 3800 +45, 600, 220, 300, 5, 1, 0, false, true);
        this.animations["die" + "left"] =  new Animator(this.spritesheet, 2655, 600, 220, 300, 5, 1, 0, true, true);

        this.animations["grabWall" + "left"] =  new Animator(this.spritesheet, 3800 +37, 900, 130, 300, 1, 1, 0, false, true);
        this.animations["grabWall" + "right"] =  new Animator(this.spritesheet, 3633, 900, 130, 300, 1, 1, 0, true, true);

        this.animations["idle" + "right"] =  new Animator(this.spritesheet, 3800 +30, 1500, 135, 300, 4, 0.3, 10, false, true);
        this.animations["idle" + "left"] =  new Animator(this.spritesheet, 3200, 1500, 135, 300, 4, 0.3, 10, true, true);

        this.animations["jump" + "right"] =  new Animator(this.spritesheet, 3800 +55 + 200, 1800, 200, 400, 1, 0.5, 0, false, true);
        this.animations["jump" + "left"] =  new Animator(this.spritesheet, 1945 + 1400, 1800, 200, 400, 1, 0.5, 0, false, true);

        this.animations["jump2" + "right"] =  new Animator(this.spritesheet, 3800 +55 + 400, 1800, 200, 400, 5, 0.07, 0, false, true);
        this.animations["jump2" + "left"] =  new Animator(this.spritesheet, 1945 + 400, 1800, 200, 400, 5, 0.07, 0, true, true);

        this.animations["run" + "right"] =  new Animator(this.spritesheet, 3800 +40, 2200, 200, 300, 6, 0.09, 15, false, true);
        this.animations["run" + "left"] =  new Animator(this.spritesheet, 2485, 2200, 200, 300, 6, 0.09, 15, true, true);
        
        this.animations["attack0" + "right"] =  new Animator(this.spritesheet, 3800, 2500, 400, 300, 7, 0.05, 0, false, true);
        this.animations["attack0" + "left"] =  new Animator(this.spritesheet, 3800, 2500, -400, 300, 7, 0.05, 0, false, true);

        this.animations["attack1" + "right"] =  new Animator(this.spritesheet, 3800, 2800, 425, 300, 6, 0.05, 0, false, true);
        this.animations["attack1" + "left"] =  new Animator(this.spritesheet, 1250, 2800, 425, 300, 6, 0.05, 0, true, true);

        this.animations["attack2" + "right"] =  new Animator(this.spritesheet, 3800, 3100, 420, 400, 8, 0.05, 0, false, true);
        this.animations["attack2" + "left"] =  new Animator(this.spritesheet, 440, 3100, 420, 400, 8, 0.05, 0, true, true);

        this.animations["jumpAttack" + "right"] =  new Animator(this.spritesheet, 3800 +40, 3500, 400, 400, 4, 0.05, 0, false, true);
        this.animations["jumpAttack" + "left"] =  new Animator(this.spritesheet, 2160 +40, 3500, 400, 400, 4, 0.05, 0, true, true);

        this.animations["slide" + "right"] =  new Animator(this.spritesheet, 3800 +15, 3900, 224, 300, 3, 0.5, 48, false, true);
        this.animations["slide" + "left"] =  new Animator(this.spritesheet, 3017, 3900, 224, 300, 2, 0.5, 48, true, true);

        this.animations["throw" + "right"] =  new Animator(this.spritesheet, 3800 +8, 4200, 208, 300, 3, 0.2, 16, false, true);
        this.animations["throw" + "left"] =  new Animator(this.spritesheet, 3132, 4200, 208, 300, 3, 0.2, 16, true, true);
    };

    //update() {}

    update() {                  
        // must have update method
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
        if (this.velocity.y === 0 //&& this.action != "jump" && this.action != "jump2" 
            //&& this.action != "attack0"
            ) {
            // ground physics (aka: character is not airborne)

            if ( ! this.game.slide) { // if slide key is not down (which is always true at the start of the game) then...
                this.velocity.x = 0; // set horizontal velocity to 0
                this.action = "idle"; // be in "idle" state
                if (this.game.left && !this.game.right && !this.game.attack) { // if only the left-arrow key is down then...
                    this.facing = "left"; // make character face left
                    this.action = "run"; // make character run
                    this.velocity.x -= MAX_RUN; // negative horizontal velocity so that character moves towards the left
                }
                if (this.game.right && !this.game.left && !this.game.attack) { // if only the right-arrow key is down then...
                    this.facing = "right"; // make character face left
                    this.action = "run"; // make character run 
                    this.velocity.x += MAX_RUN; // positive horizontal velocity so that character moves towards the right
                }
            } else if ( this.game.slide) { // else if slide key is down then...
                if (this.facing === "right" && this.velocity.x > 0) { // if chacter is moving right then...
                    this.action = "slide"; // make character slide
                    this.velocity.x -= DEC_REL * 2 * TICK;  // reduce character's positive (moving right) horizontal velocity over time
                } 
                if (this.facing === "left" && this.velocity.x < 0) { // if character is moving left then...
                    this.action = "slide"; // make character slide
                    this.velocity.x += DEC_REL * 2 * TICK; // reduce character's negative (moving left) velocity over time
                }
            } else if (Math.abs(this.velocity.x) >= MAX_RUN && !this.game.slide) { // else if character is in a slide && horizontal velocity is greater than running velocity && slide key is NOT down then...
                if (this.facing === "right") { // if character is facing right then...
                    this.velocity.x -= DEC_REL * 5 * TICK; // reduce character's negative (moving left) velocity over time
                } 
                if (this.facing === "left") { // if character is facing left then... 
                    this.velocity.x += DEC_REL * 5 * TICK; // reduce character's positive (moving right) velocity over time
                }
            }
            
            if (this.game.jump && this.velocity.y === 0 && !this.game.attack) { // jump key press
                this.velocity.y -= 3000;  // 1st jump
                ///this.fallAcc = STOP_FALL;
                this.action = "jump";
                this.game.jump = false;
            }
        } else {
            // character is already in the air
            // double jump

            this.velocity.y += this.fallAcc * TICK;

            if (this.doubleJump && this.game.jump) {
                if (this.action === "jumpAttack") this.hitBox = undefined;
                this.velocity.y = -6000;
                this.action = "jump2";
                if (this.facing === "right" && this.velocity.x < 0) this.velocity.x = 400;
                if (this.facing === "right" && this.velocity.x > 0) this.velocity.x = 400;
                if (this.facing === "left" && this.velocity.x > 0) this.velocity.x = -400;
                if (this.facing === "left" && this.velocity.x < 0) this.velocity.x = -400;
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

        // throw mechanic
        if (this.game.throw) {
            this.action = "throw"
            if (this.animations["throw" + this.facing].animationFinish) {
                this.game.throw = false;
            }
        }

        // attack mechanic
        if (this.game.attack) {
            if (this.velocity.y != 0) {
                this.action = "jumpAttack";
                this.hitBox = new BoundingBox(
                    this.x - 70, this.y - 20,
                    200, 200)
            } else {
                this.action = "attack" + this.attack;
                if (this.facing === "right") {
                    this.hitBox = new BoundingBox(
                        this.x + 60
                        , this.y + 20,
                        130,100);
                } else {
                    this.hitBox = new BoundingBox(
                        this.x - 130
                        , this.y + 20,
                        130,100);
                }
                if (this.animations["attack0" + this.facing].animationFinish) {
                    this.game.attack = false;
                    this.attack = (this.attack + 1) % 3
                    this.hitBox=undefined
                } else if (this.animations["attack1" + this.facing].animationFinish) {
                    this.game.attack = false;
                    this.attack = (this.attack + 1) % 3
                    this.hitBox=undefined
                } else if (this.animations["attack2" + this.facing].animationFinish) {
                    this.game.attack = false;
                    this.attack = (this.attack + 1) % 3
                    this.hitBox=undefined
                }

                
            }
        }


        this.velocity.y += this.fallAcc * TICK;

        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        let doubleJumpBonus = 0;
        if (!this.doubleJump) doubleJumpBonus = 50;
        if (this.velocity.x >= MAX_RUN)  this.velocity.x = MAX_RUN + doubleJumpBonus;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN - doubleJumpBonus;

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;


        
        // collision handling
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {
                //if (self.velocity.y >= 0) { // falling
                      // add more ground stuff here
                if ((entity instanceof Ground || entity instanceof Platform || entity instanceof Wall) 
                && self.lastBB.bottom <= entity.BB.top) { // landing, top collison
                    self.doubleJump = true;
                    self.velocity.y = 0;
                    self.y = entity.BB.top - 130;
                    if (self.action === "jumpAttack") {
                        self.hitBox = undefined
                        self.game.attack = false;
                    }  
                    //self.updateBB();     
                } 

                if (entity instanceof Wall && self.BB.bottom > entity.BB.top) { 
                    if (self.lastBB.left >= entity.BB.right) { // left collision
                        console.log(" case")
                        self.action = "grabWall";
                        self.game.attack = false;
                        self.hitBox = undefined
                        self.doubleJump = true;
                        self.velocity.x = 0;
                        self.x = entity.BB.right;
                        self.velocity.y = 0;
                        self.y = self.y;
                    } else  if (self.lastBB.right <= entity.BB.left) { // right collision
                        console.log("case 2")
                            self.action = "grabWall";
                            self.game.attack = false;
                            self.hitBox = undefined
                            self.doubleJump = true;
                            self.velocity.x = 0;
                            self.x = entity.BB.left - 60;
                            self.velocity.y = 0;
                            self.y = self.y;
                    }
                    //self.updateBB();
                }

                if(entity instanceof Slime) {
                    if (self.facing === "left") {
                        self.velocity.x = 300;
                    } else {
                        self.velocity.x = -300;
                    }
                    self.action = "dizzy";
                    self.velocity.y = -200;
                }

        
            }

        });
        self.updateBB();
    };

    idle() {
        this.action = "idle";
    }

    updateBB() {
        let slideBuffer = 0;
        if(this.action === "slide") slideBuffer = 32;
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + 20 +slideBuffer,
            60, 
            110 - slideBuffer);
    }

    draw(ctx) {                 // must have draw method

        let jumpBuffer = 0, attacky = 0, slidey = 0;
        let attackx = 0,slidex = 0, throwx = 0;

    // drawing a adjust
        if (this.action === "jump") jumpBuffer = 60;
        if (this.action === "slide") { 
            if (this.facing === "right") slidex = -40; else if (this.facing === "left") slidex = -15;
            slidey = 15
        };

        // attack0 adjustment
        if (this.action === "attack0") {
            if (this.facing === "right") attackx = -30; 
            if (this.facing === "left") attackx = 80;
            attacky = 13;
        }

        // attack 1 adjustment
        if(this.action === "attack1") {
            if (this.facing === "left") attackx = -100;
            if (this.facing === "right") attackx = -30;
            attacky = 7

        }

        // attack 2 ajustment
        if (this.action === "attack2") {
            if (this.facing === "left") attackx = -100;
            if (this.facing === "right") attackx = -30;
            attacky = 40;
        }

        // jump attack ajustment
        if (this.action === "jumpAttack") {
            attackx = -60;
        
            attacky = 30;
        }

        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, 
            this.x + attackx + slidex - this.game.camera.x + throwx,
            this.y - jumpBuffer - attacky + slidey, 
            .5);

        this.debug(ctx);
    };

    debug(ctx) {
         // left debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.left ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(10, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("L", 20, this.game.surfaceHeight - 20);

        // down debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.down ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(50, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("d", 60, this.game.surfaceHeight - 20);

        // up debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.up ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(50, this.game.surfaceHeight -80, 30, 30);
        ctx.fillText("u", 60, this.game.surfaceHeight - 60);

        // right debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.right ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(90, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("r", 100, this.game.surfaceHeight - 20);

        // jump debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.jump ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(130, this.game.surfaceHeight -40, 50, 30);
        ctx.fillText("space", 140, this.game.surfaceHeight - 20);

        // attack debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.attack ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(190, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("a", 200, this.game.surfaceHeight - 20);

        // slide debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.slide ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(230, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("s", 240, this.game.surfaceHeight - 20);      
        
        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.throw ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(270, this.game.surfaceHeight -40, 30, 30);
        ctx.fillText("d", 280, this.game.surfaceHeight - 20); 

        // this.walkLeft.drawFrame(this.game.clockTick, ctx, 400,400,.75);
        // this.walkRight.drawFrame(this.game.clockTick, ctx, 300,400,.75);

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

        if(this.hitBox) {
            this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y, this.hitBox.width, this.hitBox.height);
        }
    }

}