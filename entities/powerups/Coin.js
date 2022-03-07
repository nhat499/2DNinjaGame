class Coin {
  constructor(game, x, y, animationOnly) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAssset('sprites/Miscellaneous.png');
    this.scale = 0.5;
    // Sound from Zapsplat.com
    this.coinCollectedSound = new Audio();
    this.coinCollectedSound.src = 'sound_effects/moneySound.mp3';
    this.animations = [];
    this.verlocityX = Math.random() * 300 - 150;
    this.verlocityY = Math.random() * -1000;
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
      this.verlocityY += this.fallAcc * TICK;

      // update location
      this.x += this.verlocityX * TICK;
      this.y += this.verlocityY * TICK;
      this.updateBB();

      let self = this;

      this.game.entities.forEach((e) => {
        if (e.BB && self.BB.collide(e.BB)) {
          if (e instanceof MainNinja && self.fallAcc === 0) {
            self.removeFromWorld = true;
            self.coinCollectedSound.play();
            e.collectCoins(1);
          }
          if (e instanceof Ground || e instanceof Platform) {
            if (self.lastBB.bottom <= e.BB.top) {
              // landing
              self.fallAcc = 0;
              self.y = e.BB.top - 45;
              self.verlocityY = 0;
              self.verlocityX = 0;
            }
          }
          if (e instanceof Wall) {
            if (self.lastBB.left >= e.BB.right) {
              // left collision
              self.x = e.BB.right;
            } else if (self.lastBB.right <= e.BB.left) {
              // right ocllsion
              self.x = e.BB.left - 30;
            }
          }
        }
      });
      this.updateBB();
    }
  }

  updateBB() {
    if (!this.animationOnly) {
      this.lastBB = this.BB;
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
      ctx.strokeStyle = 'red';
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y - this.game.camera.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}

class Potion {
  constructor(game, x, y, name) {
    Object.assign(this, { game, x, y, name });

    if (this.name === 'speedPotion') {
      this.spritesheet = ASSET_MANAGER.getAssset(
        'sprites/Object/potion_purple.png'
      );
    } else {
      this.spritesheet = ASSET_MANAGER.getAssset('sprites/Object/potion.png');
    }

    this.scale = 0.15;
    this.animation = new Animator(
      this.spritesheet,
      0,
      0,
      512,
      512,
      1,
      1,
      0,
      false,
      true
    );

    this.quantity = parseInt(localStorage.getItem(this.name), 10) ?? 0;
    this.cdTimer = 0;
  }

  update() {}

  addQuantity(qty) {
    this.quantity += qty;
    localStorage.setItem(this.name, this.quantity);
  }

  draw(ctx) {
    this.animation.drawFrame(
      this.game.clockTick,
      ctx,
      this.x,
      this.y,
      this.scale
    );
    /*ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.font = '20px Verdana';
    ctx.fillText(this.quantity + 'x', this.x + 25, this.y + 90, 40);
    ctx.strokeText(this.quantity + 'x', this.x + 25, this.y + 90, 40);

    ctx.fill();
    ctx.stroke();*/

    drawStroked(ctx, this.quantity + 'x', this.x + 25, this.y + 90, '20px');

    if (this.cdTimer > 0) {
      drawStroked(
        ctx,
        Math.round(this.cdTimer) + 's',
        this.x + 30,
        this.y + 50,
        '20px'
      );
    }
  }
}

function drawStroked(ctx, text, x, y, fontSize) {
  ctx.font = `${fontSize || '20px'} Sans-serif`;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
}
