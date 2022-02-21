class HealthBar {
  constructor(entity, offsetX, offsetY) {
    this.entity = entity;

    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  setHealth(health) {
    this.health = health;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(
      this.entity.x - this.entity.game.camera.x + this.offsetX,
      this.entity.y - this.entity.game.camera.y - 50 + this.offsetY,
      this.entity.BB.width,
      10
    );
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    var width = (this.entity.BB.width * this.entity.hp) / 100;
    ctx.rect(
      this.entity.x - this.entity.game.camera.x + this.offsetX,
      this.entity.y - this.entity.game.camera.y - 50 + this.offsetY,
      width,
      10
    );
    ctx.fillStyle = 'lightGreen';
    ctx.fill();
    ctx.closePath();
  }
}
