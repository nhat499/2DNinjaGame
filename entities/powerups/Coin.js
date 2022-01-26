class Coin {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset('sprites/assets.png');
    this.scale = 1;

    this.animations = [];

    this.state = 'spinning';

    this.animations['spinning'] = new Animator(
      this.spritesheet,
      519,
      252,
      76,
      76,
      4,
      0.1,
      0,
      false,
      true
    );
  }

  draw(ctx) {
    this.animations[this.state].drawFrame(
      this.game.clockTick,
      ctx,
      this.x,
      this.y,
      1
    );
  }

  update() {}
}
