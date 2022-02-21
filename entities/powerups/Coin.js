class Coin {
  constructor(game, x, y, animationOnly) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAssset('sprites/Miscellaneous.png');
    this.scale = 0.5;

    this.animations = [];

    this.BB = animationOnly
      ? undefined
      : new BoundingBox(this.x, this.y, 76, 76);

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
  }

  update() {
    if (!this.animationOnly) {
      let self = this;

      this.game.entities.forEach((e) => {
        if (e.BB && self.BB.collide(e.BB) && e instanceof MainNinja) {
          self.removeFromWorld = true;
          e.collectCoins(1);
        }
      });
    }
  }

  updateBB() {
    if (!this.animationOnly) {
      this.lastBB = this.lastBB;
      this.BB = new BoundingBox(this.x, this.y, 76, 76);
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
  }
}
