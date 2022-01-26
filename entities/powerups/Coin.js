class Coin {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAssset('sprites/assets.png');
    this.scale = 0.5;

    this.animations = [];

    this.state = 'spinning';

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

  draw(ctx) {
    this.animations[this.state].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      this.scale
    );
  }

  update() {}
}
