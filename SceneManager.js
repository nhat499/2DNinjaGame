class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0 //horizontal scrolling
        //this.health = 0;
        // this.lives = 0; 
        this.ninja = new MainNinja(this.game, 0, 170);
        //this.knight = new Knight(this.game, 0, -80);
        //this.ghost = new Ghost(this.game, 800, 170);
        this.loadLevel1();
        this.game.addEntity(this.ninja);
        //this.game.addEntity(this.knight);
        //this.game.addEntity(this.ghost);
        
    }

    update() {
        
        let leftPoint = this.game.surfaceWidth / 4;
        let rightPoint = this.game.surfaceWidth - leftPoint;
        let midPoint = (this.game.surfaceWidth / 2); // 85 IS HALF OF THE NINJA
        this.x = this.ninja.x - leftPoint;
        if (this.x > this.ninja.x - leftPoint) {
            this.x = this.ninja.x - leftPoint;
        }
    }

    loadLevel1() {
        let ground = new Ground(this.game, 300, 700, 640, 128);
        let ground2 = new Ground(this.game, 0, 300, 768, 128);
        let ground3 = new Ground(this.game, 500, 50, 768, 300);
        //let ground3 = new Ground(this.game, 0, this.game.surfaceHeight - 500, this.game.surfaceWidth- 500, 128);
        // let blueFlame = new BlueFlame(this.game, this.game.surfaceHeight-70, 30);
        // let orangeFlame = new OrangeFlame(this.game, this.game.surfaceHeight -70, 50);
        this.game.addEntity(ground);
        this.game.addEntity(ground2);
        this.game.addEntity(ground3);
        // this.game.addEntity(blueFlame);
        // this.game.addEntity(orangeFlame);
        //this.game.addEntity(ground3);
    }



}