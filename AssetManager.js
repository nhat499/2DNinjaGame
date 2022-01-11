class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownLoad(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callBack) {
        //if (this.downloadQueue.length === 0) setTimeout (callBack, 10);
        for(let i = 0; i < this.downloadQueue.length; i ++) {
            let img = new Image();
            let self = this;   // so we can still have access to succescount / errorcount inside eventListener

            let path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", function() {
                console.log("loaded" + this.src);
                self.successCount++;
                if (self.isDone()) callBack();
            });

            img.addEventListener("error", function () {
                console.log("error loading" + this.src);
                self.errorCount++;
                if (self.isDone()) callBack();
            })

            img.src = path;
            this.cache[path] = img;
        }
    };

    getAssset(path) {
        return this.cache[path];
    }
}