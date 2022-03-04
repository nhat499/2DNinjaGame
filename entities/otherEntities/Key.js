class Key {
    constructor(game, x, y, door) {
        Object.assign(this, { game, x, y, door});
        this.spritesheet = ASSET_MANAGER.getAssset('sprites/Miscellaneous.png');
        this.scale = 0.5;
      // Sound from Zapsplat.com
      //this.coinCollectedSound = new Audio();
      //this.coinCollectedSound.src = "sound_effects/moneySound.mp3"

        
        this.findPortal();
        this.animations = [];
  
        this.animations["key"] = new Animator(this.spritesheet,370,252,145,76,1,16,0,false,true);
        this.updateBB();
    }
  
    findPortal() {
      this.game.entities.forEach((e) => {
        if (e instanceof Portal) this.portal = e;
      });
    }

    
    update() {
      let self = this;
      this.game.entities.forEach((e) => {
        if (e.BB && self.BB.collide(e.BB)) {
          if ( e instanceof MainNinja) {
            self.portal.open = true;
            self.removeFromWorld = true;
          }
        }
      });

    }
  
    updateBB() {
        this.lastBB = this.lastBB;
        this.BB = new BoundingBox(this.x, this.y, 76, 76);
    }
  
    draw(ctx) {
        this.animations["key"].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y - this.game.camera.y,
          this.scale
        );
    }
}
  