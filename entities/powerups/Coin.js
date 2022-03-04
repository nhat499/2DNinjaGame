class Coin {
  constructor(game, x, y, animationOnly) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAssset('sprites/Miscellaneous.png');
    this.scale = 0.5;
    // Sound from Zapsplat.com
    this.coinCollectedSound = new Audio();
    this.coinCollectedSound.src = "sound_effects/moneySound.mp3"
    this.animations = [];
    this.verlocityX= Math.random() * 300 - 150;
    this.verlocityY= Math.random() * -1000;
    this.fallAcc = 1686;

    this.BB = animationOnly
      ? undefined
      : new BoundingBox(this.x, this.y, 30, 30);

    this.state = 'spinning';
    this.action = 'idle';

    this.animationOnly = animationOnly;
    
    this.animations['spinning'] = new Animator(
      this.spritesheet,
      519,
      252,
      76,
      76,
      4,
      0.15,
      16,
      false,
      true
    );
    this.updateBB();
  }

  update() {
    if (!this.animationOnly) {
      //physics
      const TICK = this.game.clockTick;
      //gravity
      this.verlocityY += this.fallAcc * TICK

      // update location
      this.x += this.verlocityX * TICK;
      this.y += this.verlocityY * TICK;
      this.updateBB();


      let self = this;

      this.game.entities.forEach((e) => {
        if (e.BB && self.BB.collide(e.BB)) {
          if ( e instanceof MainNinja && this.fallAcc === 0) {
          self.removeFromWorld = true;
          self.coinCollectedSound.play();
          e.collectCoins(1);
          }
          if (e instanceof Ground) {
            this.fallAcc = 0;
            self.verlocityY = 0;
            self.verlocityX = 0;
          }
        }
      });
    }
  }

  updateBB() {
    if (!this.animationOnly) {
      this.lastBB = this.lastBB;
      this.BB = new BoundingBox(this.x, this.y, 30, 45);
    }
  }

  draw(ctx) {
    if (this.animationOnly) {
      this.animations[this.state].drawFrame(
        this.game.clockTick,
        ctx,
        this.x,
        this.y,
        this.scale
      );
    } else {
      this.animations[this.state].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y - this.game.camera.y,
        this.scale
      );
    }
    let debug = false;
    if (debug && !this.animationOnly) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.BB.x - this.game.camera.x,
        this.BB.y - this.game.camera.y,
        this.BB.width,
        this.BB.height);
    }
  }
}
