class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0 //horizontal scrolling
        //this.health = 0;
        // this.lives = 0; 
        this.ninja = new MainNinja(this.game, 0, 0);
        this.loadLevel1();
        this.game.addEntity(this.ninja);

    }

    update() {
        let rightPoint = this.game.surfaceWidth - this.game.surfaceWidth / 4;
        let leftPoint = this.game.surfaceWidth / 4;
        let midPoint = this.game.surfaceWidth / 2;
        this.x = this.ninja.x - midPoint;
        //if (this.x < this.ninja.x)
    }

    loadLevel1() {
        let ground = new Ground(this.game, 300, this.game.surfaceHeight - 64, this.game.surfaceWidth, 128);
        let ground2 = new Ground(this.game, 0, this.game.surfaceHeight - 500, this.game.surfaceWidth- 500, 128);
        //let ground3 = new Ground(this.game, 0, this.game.surfaceHeight - 500, this.game.surfaceWidth- 500, 128);
        let blueFlame = new BlueFlame(this.game, this.game.surfaceHeight-70, 30);
        let orangeFlame = new OrangeFlame(this.game, this.game.surfaceHeight -70, 50);
        this.game.addEntity(ground);
        this.game.addEntity(ground2);
        this.game.addEntity(blueFlame);
        this.game.addEntity(orangeFlame);
        //this.game.addEntity(ground3);
    }

}