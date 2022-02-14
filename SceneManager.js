class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0 //horizontal scrolling
        this.y = 0
        //this.health = 0;
        // this.lives = 0; 
        this.gameOver = false;
        this.title = true;
        this.level = level1;

        //this.loadLevel1();
        //console.log(level1);
        //this.loadLevel(this.level);

        //let knight = new Knight(this.game, 600, 100);
        //this.game.addEntity(knight);
        //let slime = new Slime(this.game, 1000, -100);
        //this.game.addEntity(slime);
        
        //this.game.addEntity(this.knight);
        //this.game.addEntity(this.ghost);
        this.ninja = new MainNinja(this.game, 0,170);
        this.game.addEntity(this.ninja);
    }

    update() {
        // update horizontal camera
        let leftPoint = this.game.surfaceWidth / 3;
        let rightPoint = this.game.surfaceWidth - leftPoint;
        if ( this.x < this.ninja.x - rightPoint) {
            this.x = this.ninja.x - rightPoint;
        } else if (this.x > this.ninja.x - leftPoint) {
            this.x = this.ninja.x - leftPoint;
        }
        
        // update verticle camera
        let upperPoint = this.game.surfaceHeight / 3;
        let lowerPoint = this.game.surfaceHeight - upperPoint;
        if (this.y > this.ninja.y - upperPoint) {
            this.y = this.ninja.y - upperPoint;
        } else if (this.y < this.ninja.y - lowerPoint) {
            this.y = this.ninja.y - lowerPoint;
        }

        if (this.title && this.game.click) {
            if (this.game.click.y > 410 && this.game.click.y < 450) { // click start game
                this.title = false;
                this.loadLevel(this.level);
            }
        }
    }

    loadLevel(level) {
        this.clearEntities();
        this.x = 0;
        this.y = 0;

        for (let i = 0; i < level.grounds.length; i++) {
            let ground = level.grounds[i];
            console.log(ground);
            this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width))
        }

        for (let i = 0; i < level.platforms.length; i++) {
            let platform = level.platforms[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, platform.width))
        }

        for (let i = 0; i < level.walls.length; i++) {
            let wall = level.walls[i];
            this.game.addEntity(new Wall(this.game, wall.x, wall.y, wall.height))
        }

        // for (let i = 0; i < level.stumps.length; i++) {
        //     let stump = level.stumps[i];
        //     this.game.addEntity(new Stump(this.game, stump.x, stump.y))
        // }

        // for (let i = 0; i < level.slimes.length; i++) {
        //     let slime = level.slimes[i];
        //     this.game.addEntity(new Slime(this.game, slime.x, slime.y));
        // }

        // for (let i = 0; i < level.knights.length; i++) {
        //     let knight = level.knights[i];
        //     this.game.addEntity(new Knight(this.game, knight.x, knight.y))
        // }

        // for (let i = 0; i < level.ninjas.length; i++) {
        //   let ninja = level.ninjas[i];
        //   this.game.addEntity(new Ninja(this.game, ninja.x, ninja.y))
        // }

        for (let i = 0; i < level.ghosts.length; i++) {
          let ghost = level.ghosts[i];
          this.game.addEntity(new Ghost(this.game, ghost.x, ghost.y))
        }
        this.ninja = new MainNinja(this.game, 0,170);
        this.game.addEntity(this.ninja);
    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    draw(ctx) {
        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAssset("sprites/BG.png"), 0, 0)

            ctx.fillStyle = this.game.mouse
            && this.game.mouse.y > 410 && this.game.mouse.y < 450 
            ? "Grey": "White";
            ctx.font = "50px serif"
            ctx.fillText("Start Game", 385,450);
        }

    }

}