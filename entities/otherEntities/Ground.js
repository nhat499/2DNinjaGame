class Ground {
    constructor(game, x,y,w) {
        Object.assign(this, { game, x, y, w });
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/floorTileSet.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, 128);

        this.game.addEntity(new InvWall(this.game, this.x - 3, this.y - 3));
        this.game.addEntity(new InvWall(this.game, this.x + this.w, this.y - 3));
    };

    update() {};

    draw(ctx) {
        let blockCount = this.w / 128;
        for (let i = 0; i < blockCount; i++) {
           ctx.drawImage(this.spritesheet,128, 0, 128,128, 
            this.x + (i * 128) - this.game.camera.x, 
            this.y - this.game.camera.y, 
            128, 128);
        }
        if (debugStat) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };;
};

class Wall {
    constructor(game, x, y, h) {
        Object.assign(this, { game, x, y, h});
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/floorTileSet.png");

        this.BB = new BoundingBox(this.x, this.y, 128*2, this.h);
        //this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        //this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        this.blockSize = 128;
    };

    update() {
        //this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    };

    // drawMinimap(ctx, mmX, mmY) {
    //     ctx.fillStyle = "Brown";
    //     ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    // };

    draw(ctx) {
        let blockCount = this.h / this.blockSize;
        for (let i = 0; i < blockCount; i++) {
           // ctx.drawImage(this.spritesheet,0,0, 128,128, this.x + i - this.game.camera.x, this.y, 128, 128);
           let yOffset = i * this.blockSize;
           
           ctx.drawImage(this.spritesheet,0, 128, this.blockSize, this.blockSize - 0.5, 
            this.x - this.game.camera.x + 128, 
            this.y + yOffset - this.game.camera.y, 
            this.blockSize, this.blockSize - - 0.5);
           
           ctx.drawImage(this.spritesheet,384, 0, this.blockSize, this.blockSize, 
            this.x - this.game.camera.x, 
            this.y + yOffset - this.game.camera.y, 
            this.blockSize, this.blockSize);
            //ctx.drawImage(this.spritesheet, 0,0,16,16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        //}
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }

        if (debugStat) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };;
};

class Platform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/floorTileSet.png");

        this.BB = new BoundingBox(this.x - 128, this.y, this.w + 256, 64);
        // this.invBBL = new BoundingBox(this.x - 128 - 3, this.y - 3, 3,3);
        // this.invBBR = new BoundingBox(this.x -128 +  this.w + 256, this.y - 3, 3, 3);

        
        this.game.addEntity(new InvWall(this.game, this.x - 128 - 3, this.y - 3));
        this.game.addEntity(new InvWall(this.game, this.x -128 +  this.w + 256, this.y - 3));
    };

    update() {};


    draw(ctx) {
        let blockCount = this.w / 128;
        ctx.drawImage(this.spritesheet,257, 256, 128,127, 
            this.x - this.game.camera.x - 128, 
            this.y - this.game.camera.y, 
            128, 128);
        let i = 0;
        for (; i < blockCount; i++) {
           // ctx.drawImage(this.spritesheet,0,0, 128,128, this.x + i - this.game.camera.x, this.y, 128, 128);
           ctx.drawImage(this.spritesheet,384, 256, 128,128, 
            this.x + (i * 128) - this.game.camera.x, 
            this.y - this.game.camera.y, 
            128, 128);
        }

        ctx.drawImage(this.spritesheet,512, 256, 128,128, 
            this.x + (i * 128) - this.game.camera.x, 
            this.y - this.game.camera.y, 
            128, 128);
        
        if (debugStat) {
            this.debug(ctx);
        }
        
    };
    debug(ctx) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    }
};

class InvWall {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        //this.spritesheet = ASSET_MANAGER.getAssset("sprites/floorTileSet.png");

        this.BB = new BoundingBox(this.x, this.y, 3,3);
    };
    update() {};
    draw(ctx) {
        if (debugStat) {
            this.debug(ctx);
        }
    };

    debug(ctx) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    }
}
