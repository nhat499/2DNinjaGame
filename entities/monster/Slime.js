class Slime {                      
    constructor(game, x,y) {    // all entites should have construture
        Object.assign(this, {game, x, y});
        //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3}; 
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/slime.png");
        this.scale = 1;

        // state variable
        this.facing = "right"; // 0 right, 1 = left;
        this.action = "walk"; // 0 idle, 1 = moving, 2 = taking dmg, 3 = dying;

        // animation
        this.animations = []; // list of animations
        //this.loadAnimations();
        this.animations["walkleft"] = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        this.animations["walkright"] = new Animator(this.spritesheet, 1444, 238, 242, 246, 7, 0.23, 3, true, true);

        this.animations["idleleft"] = new Animator(this.spritesheet, 3159, 0, 242, 246, 2, 0.5, 3, false, true);
        this.animations["idleright"] = new Animator(this.spritesheet, 1444, 0, 242, 246, 2, 0.5, 3, true, true);
        this.animations["dyingleft"] = new Animator(this.spritesheet, 3159, 484, 242, 246, 8, 0.25, 3, false, true);
        this.animations["dyingright"] = new Animator(this.spritesheet, 1444, 484, 242, 246, 8, 0.25, 3, true, true);

        this.animations["dmgleft"] = new Animator(this.spritesheet, 3159, 484, 242, 246, 2, 0.25, 3, false, true);



        // this.walkLeft = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        // this.walkRight = new Animator(this.spritesheet, 3159, 238, -242, 246, 7, 0.23, -3, false, true);
        // this.idleLeft = new Animator(this.spritesheet, 3159, 0, 242, 246, 2, 0.5, 3, false, true);
        // this.idleRight = new Animator(this.spritesheet, 3159, 0, -242, 246, 2, 0.5, -3, false, true);
        // this.dyingLeft = new Animator(this.spritesheet, 3159, 484, 242, 246, 8, 0.25, 3, false, true);
        // this.dyingRight = new Animator(this.spritesheet, 3159, 484, -242, 246, 8, 0.25, -3, false, true);

    };

    // loadAnimations() {
    //     for (let i = 0; i < 4; i++) { // 4 states
    //         this.animations.push([]);
    //         for (let j = 0; j < 2; j++) { // 2 direction
    //             this.animations[i].push([]);
    //         } 
    //     }

    //     // facing right idle
    //     this.animations[0][0] = new Animator(this.spritesheet, )
    // }


    update() {                  // must have update method
        // logic to update it's state, background have no state, just have x,y
    };

    draw(ctx) {                 // must have draw method
        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.75);
    };
}