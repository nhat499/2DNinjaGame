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
    // ctx.beginPath();
    // ctx.fillStyle = 'black';
    // ctx.rect(
    //   this.entity.x - this.entity.game.camera.x + this.offsetX,
    //   this.entity.y - this.entity.game.camera.y - 50 + this.offsetY,
    //   this.entity.BB.width,
    //   5
    // );
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // if (this.entity.hp <= 0) this.entity.hp = 0;
    // var width = (this.entity.BB.width * this.entity.hp) / this.entity.maxHP;
    // ctx.rect(
    //   this.entity.x - this.entity.game.camera.x + this.offsetX,
    //   this.entity.y - this.entity.game.camera.y - 50 + this.offsetY,
    //   width,
    //   5
    // );
    // ctx.fillStyle = 'lightGreen';
    // if (width / this.entity.BB.width < 0.5) ctx.fillStyle = 'Orange';
    // if (width / this.entity.BB.width < 0.2) ctx.fillStyle = 'red';

    // ctx.fill();
    // ctx.closePath();

    this.drawHUDHpBar(ctx, this.entity.x - this.entity.game.camera.x + this.offsetX,
      this.entity.y - this.entity.game.camera.y - 50 + this.offsetY,
      this.entity.BB.width,
      5, this.entity.hp, this.entity.maxHP)
  }

  drawDmgLine() {

  }

  drawHUDHpBar(ctx,x,y,w,h,currHP,maxHP) {
    ctx.beginPath();
    ctx.strokeStyle = '#4c473b';
    ctx.rect(x,y,w,h);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    if (this.entity.hp <= 0) this.entity.hp = 0;
    let width = w * currHP / maxHP;
    ctx.rect(x,y,width,h);
    ctx.fillStyle = 'lightGreen';
    if (width / w <= 0.5) ctx.fillStyle = 'Orange';
    if (width / w <= 0.2) ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
}