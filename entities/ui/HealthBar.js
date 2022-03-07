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
    this.drawHUDHpBar(
      ctx,
      this.entity.x - this.entity.game.camera.x + this.offsetX,
      this.entity.y - this.entity.game.camera.y - 50 + this.offsetY,
      this.entity.BB.width,
      5,
      this.entity.hp,
      this.entity.maxHP
    );
  }

  drawHUDHpBar(ctx, x, y, w, h, currHP, maxHP, mainCharacter) {
    if (currHP < maxHP || mainCharacter) {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.rect(x, y, w, h);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = '#4c473b'; //black
      ctx.rect(x, y, w, h);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      if (this.entity.hp <= 0) this.entity.hp = 0;
      let width = (w * currHP) / maxHP;
      ctx.rect(x, y, width, h);
      ctx.fillStyle =
        width / w <= 0.2 ? 'red' : width / w <= 0.5 ? 'orange' : 'lightGreen';
      ctx.fill();
      ctx.closePath();
      if (mainCharacter) {
        ctx.beginPath();
        ctx.font = h + 'px Sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(currHP + '/' + maxHP, x + w / 3, y + h - 4, w / 3);
      }
    }
  }
}

class dmgIndicator {
  constructor(game, x, y, dmg, color) {
    Object.assign(this, { game, x, y, dmg, color });
    this.velocity = -128;
    this.elaspsed = 0;
  }

  update() {
    this.elaspsed += this.game.clockTick;
    if (this.elaspsed > 1) this.removeFromWorld = true;
    this.y += this.game.clockTick * this.velocity;
  }

  draw(ctx) {
    ctx.font = 'normal normal 900 50px Elephant';
    ctx.fillStyle = this.color ? this.color : 'orange';
    ctx.fillText(
      this.dmg,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y
    );
  }
}
