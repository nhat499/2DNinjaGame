class Ghost {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/ghost.png");
        this.scale = 1;

        // state variable
        this.action = "walk"; // 0 idle, 1 = moving, 2 = dying;
        this.facing = "right"; // 0 right, 1 = left;

        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;

        this.updateBB();

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations["idle" + "right"] = new Animator(this.spritesheet, 150, 39, 195, 288, 1, 0.5, 0, false, true);

        this.animations["walk" + "right"] = new Animator(this.spritesheet, 675, 39, 195, 288, 1, 0.5, 0, false, true);

        this.animations["die" + "right"] = new Animator(this.spritesheet, 7950, 39, 311, 288, 12, 0.25, 0, false, true);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, 50, 75); // height: 85
    }


    update() {                  // must have update method

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


        if (this.velocity.y === 0 //&& this.action != "jump" && this.action != "jump2" 
            //&& this.action != "attack0"
        ) {} else {
            this.velocity.y += this.fallAcc * TICK;
        }

        //this.velocity.y += this.fallAcc * TICK;

        // max speed calculation
        //if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        //if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        // update position 
        //*(if this is not included then the entity's velocity will not be reflected on the canvas)
        // "velocity" of an object definition - the rate of change of its position with respect to a frame of referene, and is a funciton of time.
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); // updates the entity's bounding box as the entity's place on the canvas changes

        // collision handling
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB) && entity != self) {
                //console.log("I collided with something");
                //if (self.velocity.y >= 0) { // falling
                    if (entity instanceof Ground) {  // add more ground stuff here;

                        if (self.lastBB.bottom <= entity.BB.top) { // landing, top collison
                            self.doubleJump = true;
                            self.velocity.y = 0;
                            self.y = entity.BB.top - 75;
                            
                            self.updateBB();
                            if (self.action === "jumpAttack") {
                                self.hitBox = undefined
                                self.game.attack = false;
                            }
                            //if (self.action === "jump" || self.action === "jump2") self.action = "idle"; 
                        
                            //self.updateBB();
                        
                        }else if (self.lastBB.right >= entity.BB.left){ // right collision
                            console.log("case1")
                        
                            //self.action = "grabWall";
                            // self.velocity.x = 0;
                            // self.x = entity.BB.left - 60 + self.game.camera.x;
                  
                            //self.updateBB();
                            
                        } else if (self.lastBB.left >= entity.BB.right) { // left collision
                            console.log("other case")
                            // self.action = "grabWall";
                            // self.velocity.x = 0;
                            // self.x = entity.BB.right + 60;
                            //self.updateBB();
                        }
                    }
                //}

                

                
            }
        });


    };

    draw(ctx) {                 // must have draw method
        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, .25);

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}