class BlueFlame {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/blueFlameRow.png");
        this.scale = 1;

        // state variable
        this.state = "burning";

        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["burning"] = new Animator(this.spritesheet, 0, 0, 64, 64, 60, 0.1, 0, false, true);
    };

    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
    };

    draw(ctx) {                 // must have draw method
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };
}

class OrangeFlame {
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/orangeFireRow.png");
        this.scale = 1;

        // state variable
        this.state = "burning";

        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["burning"] = new Animator(this.spritesheet, 0, 0, 64, 128, 32, 0.1, 0, false, true);
    };

    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
    };

    draw(ctx) {                 // must have draw method
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };
}