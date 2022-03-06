class Slime {
  constructor(game, x, y, boss) {
    // all entites should have construture
    Object.assign(this, { game, x, y, boss });
    //this.BB = new BoundingBox(this.x + 30, this.y + 55, 65, 65);
    this.BB = new BoundingBox(this.x, this.y, 70, 65);

    //this.verlocity = {x: -PARAMS.BITWIDTH, y: PARAMS.BLOCKWIDTH * 3};
    this.spritesheet = ASSET_MANAGER.getAssset('sprites/slime.png');
    this.scale = 0.5;
    if (this.boss) {
      this.scale = 2;
      this.monsterHB = undefined;
    }

    // Sound from Zapsplat.com
    this.sound = new Audio();
    this.sound.src = "sound_effects/slimeSound.mp3";
    this.sound.volume = 0.5;

    this.maxHP = this.boss ? 1000 : 100;
    this.hp = this.maxHP;
    this.baseDmg = this.boss ? 30 : 15;
    this.attackDmg = this.baseDmg;

    // state variable
    this.facing = 'left'; // 0 right, 1 = left;
    this.action = 'idle'; // 0 idle, 1 = moving, 2 = taking dmg, 3 = dying;

    // animation
    this.animations = []; // list of animations
    this.loadAnimation();

    // phyiscs variable
    this.velocity = { x: 0, y: 0 };
    this.fallAcc = 562 * 3;

    this.actionDecider = ['moveleft', 'moveright', 'stay', 'attack'];

    this.healthBar = new HealthBar(this, 0, 0);
  }

  loadAnimation () {
    this.animations['idleleft'] = new Animator(
      this.spritesheet,
      3159,
      0,
      242,
      246,
      2,
      0.5,
      3,
      false,
      true
    );
    this.animations['idleright'] = new Animator(
      this.spritesheet,
      2661,
      0,
      242,
      246,
      2,
      0.5,
      3,
      true,
      true
    );

    this.animations['walkleft'] = new Animator(
      this.spritesheet,
      3159,
      242,
      249,
      244,
      7,
      0.25,
      0,
      false,
      true
    );
    this.animations['walkright'] = new Animator(
      this.spritesheet,
      1416,
      242,
      249,
      244,
      7,
      0.25,
      0,
      true,
      true
    );

    this.animations['attackleft'] = new Animator(
      this.spritesheet,
      3159,
      242,
      249,
      244,
      7,
      0.25,
      0,
      false,
      true
    );
    this.animations['attackright'] = new Animator(
      this.spritesheet,
      1416,
      242,
      249,
      244,
      7,
      0.25,
      0,
      true,
      true
    );

    this.animations['dyingleft'] = new Animator(
      this.spritesheet,
      3159,
      484,
      249,
      246,
      8,
      0.1,
      0,
      false,
      true
    );
    this.animations['dyingright'] = new Animator(
      this.spritesheet,
      1167,
      484,
      249,
      246,
      8,
      0.1,
      0,
      true,
      true
    );

    this.animations['dmgleft'] = new Animator(
      this.spritesheet,
      3159,
      484,
      249,
      246,
      1,
      0.2,
      0,
      false,
      true
    );
    this.animations['dmgright'] = new Animator(
      this.spritesheet,
      2910,
      484,
      249,
      246,
      1,
      0.,
      0,
      true,
      true
    );

    //this.animations["attackleft"] = new Animator(this.spritesheet, 3159, 860, 219, 100, 7, 0.25, 30, true, true);
    this.animations['attack'] = new Animator(
      this.spritesheet,
      -30,
      860,
      219,
      100,
      13,
      1.75 / 13,
      30,
      false,
      true
    );
  };

  move(action) {
    let speed = 0;
    if (action === 'moveleft') {
      this.facing = 'left';
      this.action = 'walk';
      speed = -250;
    } else if (action === 'moveright') {
      this.facing = 'right';
      this.action = 'walk';
      speed = 250;
    } else if (action === 'stay') {
      if (this.facing == 'left') {
        this.facing == 'right';
      } else {
        this.facing = 'left';
      }
      this.action = 'idle';
    } else if (action === 'attack') {
      this.action = 'attack';
    }
    this.velocity.x = speed;
  }

  update() {
    // must have update method
    // logic to update it's state, background have no state, just have x,y
    const TICK = this.game.clockTick;

    // dmg timer
    if (this.action === 'dmg') {
      if (this.animations['dmg' + this.facing].animationFinish) {
        // being hit animation
        this.action = 'idle';
      }
      // if (this.hp <= 0) {
      //   this.action = 'dying';
      // }
    } else if (this.hp <= 0) {//if (this.action === 'dying') {
      // dying animation timer
      this.action = "dying";
      if (this.animations['dying' + this.facing].animationFinish) {
        this.removeFromWorld = true;
        this.dropLoot();
      }
    } else if (this.action === 'idle') {
      // idle
      this.monsterHB = undefined;
      if (this.animations['idle' + this.facing].animationFinish) {
        let x = 3; // // pick number 0-3
        if (this.boss) x = 4; // pick number 0-4
        let i = Math.floor(Math.random() * x);
        this.move(this.actionDecider[i]);
      }
    } else if (this.action === 'walk') {
      // moving
      if (this.animations['walk' + this.facing].animationFinish) {
        this.action = 'idle';
        this.velocity.x = 0;
      }
    } else if (this.action === 'attack') {
      if (this.animations['attack'].animationFinish) {
        this.updateSlimeHB();
        this.action = 'idle';
        this.velocity.x = 0;
      }
    }

    this.velocity.y += this.fallAcc * TICK; // apply gravity

    // update location
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK;
    this.updateBB(); //bounding box;

    let self = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && self.BB && self.BB.collide(entity.BB)) {
        if (
          (entity instanceof Ground || entity instanceof Platform) &&
          self.lastBB.bottom <= entity.BB.top
        ) {
          self.velocity.y = 0;
          self.y = entity.BB.top - 130 * self.scale;
        }

        if (entity instanceof InvWall) {
          if (self.lastBB.left >= entity.BB.right) {
            self.velocity.x = 0;
            self.x = entity.BB.right;
          } else if (self.lastBB.right <= entity.BB.left) {
            self.velocity.x = 0;
            self.x = entity.BB.left - 140 * self.scale;
          }
        }

        if (entity instanceof Wall && self.BB.bottom > entity.BB.top) {
          if (self.lastBB.left >= entity.BB.right) {
            // left collision
            self.velocity.x = 0;
            self.x = entity.BB.right;
          } else if (self.lastBB.right <= entity.BB.left ) {
            // right collision
            self.velocity.x = 0;
            self.x = entity.BB.left - 140 * self.scale;
          }
        }
      }

      if (entity.hitBox && self.BB.collide(entity.hitBox) && self.hp > 0) {
        self.sound.play();
        if (entity.facing === 'left') {
          if (!self.boss) {
            self.facing = 'right';
            self.velocity.x = -100;
          }
        } else {
          if (!self.boss) {
            self.facing = 'left';
            self.velocity.x = 100;
          }
        }
        if (entity.action === 'attack2') {
          if (!self.boss) {
            self.velocity.y = -300;
          }
        }
        self.hp -= entity.hitBox.hbDmg;
        self.game.addEntity(new dmgIndicator(self.game, self.BB.x,self.BB.y, entity.hitBox.hbDmg));
        if (!self.boss) {
          self.action = 'dmg';
        }
        if (entity instanceof Kunai) {
          entity.removeFromWorld = true;
        }
        if (self.hp <= 0) {
          self.action = "dying";
          self.attackDmg = 0;
        }
      }
    });
    this.updateBB();
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      140 * this.scale,
      130 * this.scale,
      this.attackDmg
    );
  }

  updateSlimeHB() {
    this.monsterHB = new BoundingBox(
      this.x - 300,
      this.y + 125 * this.scale,
      140 * this.scale + 600,
      3, 
      this.attackDmg * 2
    );
  }

  dropLoot() {
    if (this.boss) {
      for (let i = 0; i < 50; i++) {
        let randx = Math.random() * 20 - 10;
        let randy = Math.random() * 20 - 10;
        console.log();
        const coin = new Coin(this.game, this.x + 2*randx, this.y + randy, false);
        this.game.addEntity(coin);
      }
      const key = new Key(this.game, this.x, this.y);
      this.game.addEntity(key);
    } else {
      for (let i = 0; i < 5; i++) {
        const coin = new Coin(this.game, this.x, this.y, false);
        this.game.addEntity(coin);
      }
    }
  }

  draw(ctx) {
    // must have draw method
    let offsetX = 0;
    let offsetY = -110 * this.scale;

    if (this.action === 'idle' && this.facing === 'left')
      offsetX = -26 * this.scale;
    if (
      (this.action === 'walk' || this.action === 'attack') &&
      this.facing === 'left'
    )
      offsetX = -26 * this.scale;
    if (this.action === 'dying' && this.facing === 'left')
      offsetX = -60 * this.scale;
    if (this.action === 'dmg' && this.facing === 'left')
      offsetX = -60 * this.scale;

    if (this.action === 'dmg' && this.facing === 'right')
      offsetX = -50 * this.scale;
    if (
      (this.action === 'walk' || this.action === 'attack') &&
      this.facing === 'right'
    )
      offsetX = -50 * this.scale;
    if (this.action === 'walk' && this.facing === 'right')
      offsetX = -70 * this.scale;
    if (this.action === 'idle' && this.facing === 'right')
      offsetX = -90 * this.scale;

    //if (this.action != 'attack') {
      this.animations[this.action + this.facing].drawFrame(
        this.game.clockTick,
        ctx,
        this.x + offsetX - this.game.camera.x,
        this.y + offsetY - this.game.camera.y,
        this.scale
      );
      if (this.action === "attack")
      this.animations['attack'].drawFrame(
        this.game.clockTick,
        ctx,
        this.x + offsetX - this.game.camera.x,
        this.y + offsetY - this.game.camera.y + 140 * this.scale,
        this.scale
      );

    this.healthBar.draw(ctx);

    let debug = false
    if (debug) {
      ctx.strokeStyle = 'Red';
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y - this.game.camera.y,
        this.BB.width,
        this.BB.height
      );
  
      if (this.monsterHB) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(
          this.monsterHB.x - this.game.camera.x,
          this.monsterHB.y - this.game.camera.y,
          this.monsterHB.width,
          this.monsterHB.height
        );
      }
    }
  }
}
