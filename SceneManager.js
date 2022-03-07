class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0; //horizontal scrolling
    this.y = 0;
    //this.health = 0;
    // this.lives = 0;
    this.gameOver = false;
    this.title = true;
    this.level = level;
    //this.currLv = "level1"
    this.currLv = "level1";
    this.sound = new Audio();
    this.sound.loop = true;
    this.sound.src = 'music/bgm1.mp3';
    //this.sound.volume = 0.3;

    this.volumeNum = document.getElementById('volumeTracker');

    this.checkbox = document.getElementById('debug');

    this.checkbox.addEventListener('change', function() {
      if (this.checked) {
        debugStat = true;
      } else {
        if (debugStat == true) {
          debugStat = false;
        }
      }
    });

    //this.loadLevel1();
    //console.log(level1);
    //this.loadLevel(this.level);
    
    //let knight = new Knight(this.game, 600, 100);
    //this.game.addEntity(knight);
    //let slime = new Slime(this.game, 1000, -100);
    //this.game.addEntity(slime);

    //this.game.addEntity(this.knight);
    //this.game.addEntity(this.ghost);
    // this.ninja = new MainNinja(this.game, 0, 170); 
    // this.game.addEntity(this.ninja);

    this.coinAnimation = new Coin(this.game, 820, 6, true);
    this.potion = new Potion(this.game, 25, this.game.surfaceHeight - 225)

    document
      .getElementById('buy-health-potion')
      .addEventListener('click', () => {
        if (this.ninja.coins >= 25) {
          this.ninja.spendCoins(25);
          //this.ninja.hp = this.ninja.maxHP;
          this.potion.quantity += 1;
        }
      });

    document.getElementById('closeShop').addEventListener('click', () => {
      document.getElementById('shop').style.display = 'none';
    });
  }

  update() {
    // if (this.title) {
    //     this.
    //   //this.sound.play();
    // }

    // update horizontal camera

    this.sound.volume = (this.volumeNum.value / 100);
    if (this.ninja) {
      let leftPoint = this.game.surfaceWidth / 3;
      let rightPoint = this.game.surfaceWidth - leftPoint;
      if (this.x < this.ninja.x - rightPoint) {
        this.x = this.ninja.x - rightPoint;
      } else if (this.x > this.ninja.x - leftPoint) {
        this.x = this.ninja.x - leftPoint;
      }
  
      //update verticle camera
      let upperPoint = this.game.surfaceHeight / 2.5;
      let lowerPoint = this.game.surfaceHeight - upperPoint;
      if (this.y > this.ninja.y - upperPoint) {
        this.y = this.ninja.y - upperPoint;
      } else if (this.y < this.ninja.y - lowerPoint) {
        this.y = this.ninja.y - lowerPoint;
      }
      // let midpoint = this.game.surfaceHeight / 2;
      // if (this.y > this.ninja.y - midpoint) {
      //   this.y = this.ninja.y - midpoint;
      // } else if (this.y < this.ninja.y - midpoint) {
      //   this.y = this.ninja.y - midpoint;
      // }
    }

    if (this.title && this.game.click) {
      if (this.game.click.y > 410 && this.game.click.y < 450) {
        // click start game
        this.title = false;
        this.sound.play();
        this.loadLevel(this.level[this.currLv]);
      }
    }

 
    if (this.gameOver && this.game.click) {
      if (this.game.click.y > 410 && this.game.click.y < 450) {
        //restart game
        this.loadLevel(this.level[this.currLv]);
        this.gameOver = false;
        this.game.pause = false;
      }
    }

    if (this.ninja && this.ninja.hp <= 0 && !this.gameOver) {
      this.gameOver = true;
    }
  }

  loadLevel(level) {
    this.clearEntities();
    this.x = 0;
    this.y = 0;

    for (let i = 0; i < level.platforms.length; i++) {
      let platform = level.platforms[i];
      this.game.addEntity(
        new Platform(this.game, platform.x, platform.y, platform.width)
      );
    }

    for (let i = 0; i < level.walls.length; i++) {
      let wall = level.walls[i];
      this.game.addEntity(new Wall(this.game, wall.x, wall.y, wall.height));
    }

    for (let i = 0; i < level.stumps.length; i++) {
      let stump = level.stumps[i];
      this.game.addEntity(new Stump(this.game, stump.x, stump.y));
    }

    for (let i = 0; i < level.grounds.length; i++) {
      let ground = level.grounds[i];
      this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width));
    }

    for (let i = 0; i < level.portals.length; i++) {
      let portal = level.portals[i];
      let thePort = new Portal(this.game, portal.x, portal.y, portal.nextLevel)
      this.game.addEntity(thePort);
    }

    for (let i = 0; i < level.slimes.length; i++) {
      let slime = level.slimes[i];
      this.game.addEntity(new Slime(this.game, slime.x, slime.y, slime.boss));
    }

    for (let i = 0; i < level.knights.length; i++) {
      let knight = level.knights[i];
      this.game.addEntity(new Knight(this.game, knight.x, knight.y));
    }

    for (let i = 0; i < level.ninjas.length; i++) {
      let ninja = level.ninjas[i];
      this.game.addEntity(new Ninja(this.game, ninja.x, ninja.y));
    }

    for (let i = 0; i < level.ghosts.length; i++) {
      let ghost = level.ghosts[i];
      this.game.addEntity(new Ghost(this.game, ghost.x, ghost.y));
    }
    this.ninja = new MainNinja(this.game, 0, 170);
    this.game.addEntity(this.ninja);
  }

  clearEntities() {
    this.game.entities.forEach(function (entity) {
      entity.removeFromWorld = true;
    });
  }

  draw(ctx) {
    if (this.title) {
      ctx.drawImage(ASSET_MANAGER.getAssset('sprites/BG.png'), 0, 0);

      ctx.fillStyle =
        this.game.mouse && this.game.mouse.y > 410 && this.game.mouse.y < 450
          ? 'Grey'
          : 'White';
      ctx.font = '50px serif';
      ctx.fillText('Start Game', 385, 450);
    }

    if (this.gameOver) {
      // ctx.filter = 'grayscale(1)';
      ctx.fillStyle = 'red';
      ctx.font = '50px serif';
      ctx.fillText('GAME OVER', 385, 350);
      this.game.pause = true;

      ctx.fillStyle =
        this.game.mouse && this.game.mouse.y > 410 && this.game.mouse.y < 450
          ? 'Grey'
          : 'White';
      ctx.fillText('Retry', 450, 450);
    }

    if (!this.title) {
      ctx.font = '40px serif';
      ctx.fillStyle = 'black';
      ctx.fillText(this.ninja.coins ?? 0, 870, 40);

      this.coinAnimation.draw(ctx);
      this.potion.draw(ctx);
    }
  }
}
