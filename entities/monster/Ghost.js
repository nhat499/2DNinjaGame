class Ghost {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/ghost1.png");
        this.scale = 1;

        this.hp = 1;

        // state variable
        this.action = "walk"; // 0 idle, 1 = moving, 2 = dying;
        this.facing = "left"; // 0 right, 1 = left;

        this.velocity = {x:0, y:0};
        this.fallAcc = 562 * 3;

        this.gamePosition = x; // used to keep ghost at the desired leocation in game (else it'll oscillate around the x = 0 position)

        this.speed = Math.random() * 4 + 1;

        this.airPattern = true;

        // used for interval movement-----------
        this.angle = 0;
        //this.angleSpeed = Math.random() * 2 + 1; // increase the addition quanity (in this case '1') to guarantee a faster oscillation speed
        this.angleSpeed = .2 * .2;
        //this.curve = Math.random() + 1 * 200; // inscrese the addition quanity (in this case '1') to guarantee a wider oscillation interverval
        this.curve = Math.random() * 10;

        this.oldX = this.x; // used in left/right facing logic to check if ghost's is moving left or right
        // -------------------------------------

        this.updateBB();

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations["idle" + "right"] = new Animator(this.spritesheet, 150, 39, 195, 288, 1, 0.5, 0, false, true);

        this.animations["walk" + "left"] = new Animator(this.spritesheet, 695, 39, 195, 288, 1, 0.5, 0, false, true);

        this.animations["walk" + "right"] = new Animator(this.spritesheet, 1192, 39, 195, 288, 1, 0.5, 0, false, true);

        this.animations["hurt" + "left"] = new Animator(this.spritesheet, 14215, 39, 250, 350, 12, .08, 268, false, true);

        this.animations["hurt" + "right"] = new Animator(this.spritesheet, 21475, 39, 250, 350, 12, .08, 268, false, true);

        this.animations["die" + "right"] = new Animator(this.spritesheet, 7950, 39, 311, 288, 12, 0.25, 0, false, true);
    };

    // updateBB() {
    //     this.lastBB = this.BB;
    //     this.BB = new BoundingBox(this.x, this.y, 50, 75); // height: 85
    // }


    update() {                  // must have update method

        if (this.hp <= 0) {
            this.removeFromWorld = true;
        }

        //this.action = "walk";

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
        // if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        // if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        // UPDATE POSITION 
        //*(if this is not included then the entity's velocity will not be reflected on the canvas)
        // "velocity" of an object definition - the rate of change of its position with respect to a frame of referene, and is a funciton of time.
        this.x -= this.speed; // increasing the first factor ('this.curve' in this case) results in a wider horizontal oscillation interval
        this.y += this.curve * Math.sin(this.angle);
        // if (this.airPattern == true) {
        //     this.x = this.game.ctx.canvas.width/2 * Math.cos(this.angle * Math.PI/180) + (this.game.ctx.canvas.width/2 - 200);
        //     this.y = this.game.ctx.canvas.height/3 * Math.sin(this.angle * Math.PI/180) + (this.game.ctx.canvas.height/3);
        //     //console.log("Width: " + this.surfaceWidth + " Height: " + this.surfaceHeight);
        //     this.angle += this.angleSpeed;
        // }



        // this.game.entities.forEach(function (entity) {
        //     if (entity instanceof MainNinja) {

        //     }
        // });


         
        //this.x -= this.speed;

        if (this.x + 500 < 0) this.x = this.game.camera.x + 1000; // the '+ 500' makes sure the ghosts reach the edge of the screen before dissapearing. Replace '900' with right side x position of screen
        //console.log(this.game.camera.x);

        // SPRITE LEFT & RIGHT FACING LOGIC -------------
        if (this.x < this.oldX) {
            this.facing = "left";
        } else {
            this.facing = "right";
        }
        // -----------------------------------------------

        // COLLISION LOGIC-----------------------
        this.updateBB();

        let self = this;

        self.action = "walk";

        this.game.entities.forEach(function (entity) {

            if (entity.hitBox && self.BB.collide(entity.hitBox)  && self.hp > 0) {
                //console.log("i was hurt");
                self.action = "hurt";
                //self.x += 100;
                
                self.angle -= 2; // on-hit knockback functionality for Ghost entitity

                // if (self.facing === "left") {
                //     self.angle -= 2.5;
                // } else {
                //     //self.angle += 2.5;
                // }

                self.hp -= 1;
                
             }

            //  if (entity.BB && self.BB.collide(entity.BB) && entity instanceof MainNinja) {
            //      // add Ghost attack state here
            //  }

        });
        //---------------------------------------

        this.oldX = this.x;
        //this.y = this.curve * Math.cos(this.angle * Math.PI/180); // this will add vertical oscillation to the entity
        this.angle += this.angleSpeed;

        this.updateBB(); // updates the entity's bounding box as the entity's place on the canvas changes

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 50, 75); // height: 85
    }

    draw(ctx) {  // must have draw method
        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, 
            this.y - this.game.camera.y, .25);
        // if (this.facing != "left") {
        //     this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, .25);
        // } else {
        //     this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx.scale(), this.x - this.game.camera.x, this.y, .25);
        // }

        this.game.ctx.strokeStyle = "Red"; // the outline of shape
        this.game.ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };
}