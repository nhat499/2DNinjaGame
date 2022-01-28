class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0 //horizontal scrolling
        //this.health = 0;
        // this.lives = 0; 
        this.ninja = new MainNinja(this.game, 0,170);

        this.loadLevel1();
        this.game.addEntity(this.ninja);
        //this.game.addEntity(this.knight);
        //this.game.addEntity(this.ghost);
        
    }

    update() {
        
        let leftPoint = this.game.surfaceWidth / 3;
        let rightPoint = this.game.surfaceWidth - leftPoint;
        //let midPoint = (this.game.surfaceWidth / 2); // 85 IS HALF OF THE NINJA
        //this.x = this.ninja.x - midPoint;
        if ( this.x < this.ninja.x - rightPoint) {
            this.x = this.ninja.x - rightPoint;
        } else if (this.x > this.ninja.x - leftPoint) {
            this.x = this.ninja.x - leftPoint;
        }
            
    }

    loadLevel1() {
        let ground = new Ground(this.game, -256, 700, 2560);
        let wall1 = new Wall(this.game, 100, 0, 512);
        let wall2 = new Wall(this.game, 400, 128, 512);
        let Platform1 = new Platform(this.game, 700, 400, 128);
        
        let slime1 = new Slime(this.game,1300,300)
        let slime2 = new Slime(this.game,1400,300)
        let slime3 = new Slime(this.game,1500,300)
        let slime4 = new Slime(this.game,1600,300)
        let slime5 = new Slime(this.game,1700,300)
        let slime6 = new Slime(this.game,1800,300)
        //let ground3 = new Ground(this.game, 0, this.game.surfaceHeight - 500, this.game.surfaceWidth- 500, 128);
        // let blueFlame = new BlueFlame(this.game, this.game.surfaceHeight-70, 30);
        // let orangeFlame = new OrangeFlame(this.game, this.game.surfaceHeight -70, 50);

        // ground
        this.game.addEntity(ground);
        this.game.addEntity(Platform1);
        
        // wall
        this.game.addEntity(wall1);
        this.game.addEntity(wall2);
        // this.game.addEntity(ground1);
        // this.game.addEntity(ground3);
        
        // this.game.addEntity(orangeFlame);
        //this.game.addEntity(ground3);

        // monster
        this.game.addEntity(slime1);
        this.game.addEntity(slime2);
        this.game.addEntity(slime3);
        this.game.addEntity(slime4);
        this.game.addEntity(slime5);
        this.game.addEntity(slime6);

        
    }



}