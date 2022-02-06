class Kunai {
    constructor(game, x,y, xVerlocity) {    // all entites should have construture
        Object.assign(this, {game, x, y, xVerlocity});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Miscellaneous.png");
        this.scale = 1;
        
        // state variable
        this.state = "throw";


        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["throw"] = new Animator(this.spritesheet, 255, 270, 100, 100, 1, 3, 0, false, true);
    };

    update() {                  // must have update method
        this.x += this.xVerlocity * this.game.clockTick;
        // update bb
    };

    draw(ctx) {                 // must have draw method
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, 
            this.y - this.game.camera.y, 0.5);
    };
}

class Shuriken {
    constructor(game, x,y, xVerlocity) {    // all entites should have construture
        Object.assign(this, {game, x, y, xVerlocity});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/Miscellaneous.png");
        this.scale = 1;
        
        // state variable
        this.state = "throw";


        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["throw"] = new Animator(this.spritesheet, 55, 260, 100, 100, 1, 3, 0, false, true);
    };

    update() {                  // must have update method
        this.x += this.xVerlocity * this.game.clockTick;
        // update bb
    };

    draw(ctx) {                 // must have draw method
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, 
            this.y - this.game.camera.y, 0.5);
    };
}