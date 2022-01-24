class Ghost {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/ghost.png");
        this.scale = 1;

        // state variable
        this.facing = "right"; // 0 right, 1 = left;
        this.action = "idle"; // 0 idle, 1 = moving, 2 = dying;

        this.velocity = {x:0, y:0};

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
        this.lastBB = this.lastBB;
        this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, 60, 110);
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


    };

    draw(ctx) {                 // must have draw method
        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.75);
    };
}