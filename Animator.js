class Animator {
    constructor(spriteSheet, xStart, yStart, width, height, 
        frameCount, frameDuration, framePadding, reverse, loop) {

        Object.assign(this, {spriteSheet, xStart, 
            yStart, width, height, frameCount, frameDuration, framePadding, 
            reverse, loop});
        
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;    
    }

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDOne()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        
        ctx.drawImage(this.spriteSheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);
        
    };


    currentFrame() {
        let currFrame = Math.floor(this.elapsedTime / this.frameDuration);
        return currFrame;
    };

    isDOne() {
        let isDone = (this.elapsedTime >= this.totalTime)
        return isDone;
    };

}