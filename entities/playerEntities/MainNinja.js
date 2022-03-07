class MainNinja {
    constructor(game, x, y) { // all entites should have construture
        Object.assign(this, {
            game,
            x,
            y
        });
        this.spritesheet = ASSET_MANAGER.getAssset("sprites/entities/ninjaMainSheet.png");
        this.miscellaneous = ASSET_MANAGER.getAssset("sprites/Miscellaneous.png");
        //this.slashSheet = ASSET_MANAGER.getAssset("sprites/slashBlue.png");
        this.scale = 1;
        this.velocity = {
            x: 0,
            y: 0
        };
        // Sound from Zapsplat.com
        this.sounds = [];
        this.loadSound();

        this.fallAcc = 562 * 3;
        // state variable
        this.facing = "left"; // 0 right, 1 = left;
        this.action = "idle"; // "idle" "run" "walk" "jump" "attack" "takeDmg" "die" "alert"
        this.attack = 2; // there 3 attack
        //this.attacking = false;
        // this.attackEnd = 7 * this.game.clockTick;
        this.invicible = false;
        this.doubleJump = true;
        this.updateBB();

        //
        this.attackDmg = 50;
        this.att3Freq = 0.1;

        // hp
        this.maxHP = 150;
        this.hp = this.maxHP;
        this.healthBar = new HealthBar(this, 0, 40);
        this.coins = parseInt(localStorage.getItem('coins') ?? 0, 10);

        // animation
        this.animations = []; // list of animations
        this.loadAnimations();

        // this.walkLeft = new Animator(this.spritesheet, 3159, 238, 242, 246, 7, 0.23, 3, false, true);
        // this.walkRight = new Animator(this.spritesheet, 3159, 238, -242, 246, 7, 0.23, -3, false, true);

    };

    loadSound() {
        this.sounds["attackSound"] = new Audio();
        this.sounds["attackSound"].src = "sound_effects/sword-1b.wav";
        this.sounds["attackSound"].volume = 0.2;

        this.sounds["hurtSound"] = new Audio();
        this.sounds["hurtSound"].src = "sound_effects/hurtSound.mp3";

        this.sounds["footStep"] = new Audio();
        this.sounds["footStep"].src = "sound_effects/footStep.mp3";
        this.sounds["footStep"].playbackRate = 1.5;
        this.sounds["footStep"].volume = 0.2;

        this.sounds["jumpSound"]= new Audio();
        this.sounds["jumpSound"].src = "sound_effects/jumpSound.mp3";
        this.sounds["jumpSound"].playbackRate = 8;
        this.sounds["jumpSound"].volume = 0.2;
    }

    loadAnimations() {
        this.animations["idlehud"] = new Animator(this.spritesheet, 3800 + 30, 1500, 135, 190, 4, 0.3, 10, false, true);

        this.animations["invicible"] = new Animator(this.miscellaneous, 140, 0, 150, 80, 3, 0.5, 0, false, true);

        this.animations["couch" + "right"] = new Animator(this.spritesheet, 3800 + 30, 0, 154.5, 300, 3, 0.3, 0, false, true);
        this.animations["couch" + "left"] = new Animator(this.spritesheet, 3306.5, 0, 154.5, 300, 3, 0.3, 0, true, true);

        this.animations["dizzy" + "right"] = new Animator(this.spritesheet, 3800 + 45, 300, 146, 300, 3, 0.3, 25, false, true);
        this.animations["dizzy" + "left"] = new Animator(this.spritesheet, 3242 + 20, 300, 146, 300, 3, 0.3, 25, true, true);

        this.animations["die" + "right"] = new Animator(this.spritesheet, 3800 + 45, 600, 220, 300, 5, 1, 0, false, true);
        this.animations["die" + "left"] = new Animator(this.spritesheet, 2655, 600, 220, 300, 5, 1, 0, true, true);

        this.animations["grabWall" + "left"] = new Animator(this.spritesheet, 3800 + 37, 900, 130, 300, 1, 1, 0, false, true);
        this.animations["grabWall" + "right"] = new Animator(this.spritesheet, 3633, 900, 130, 300, 1, 1, 0, true, true);

        this.animations["idle" + "right"] = new Animator(this.spritesheet, 3800 + 30, 1500, 135, 300, 4, 0.3, 10, false, true);
        this.animations["idle" + "left"] = new Animator(this.spritesheet, 3200, 1500, 135, 300, 4, 0.3, 10, true, true);

        this.animations["jump" + "right"] = new Animator(this.spritesheet, 3800 + 55 + 200, 1800, 200, 400, 1, 0.5, 0, false, true);
        this.animations["jump" + "left"] = new Animator(this.spritesheet, 1945 + 1400, 1800, 200, 400, 1, 0.5, 0, false, true);

        this.animations["jump2" + "right"] = new Animator(this.spritesheet, 3800 + 55 + 400, 1800, 200, 400, 5, 0.07, 0, false, true);
        this.animations["jump2" + "left"] = new Animator(this.spritesheet, 1945 + 400, 1800, 200, 400, 5, 0.07, 0, true, true);

        this.animations["run" + "right"] = new Animator(this.spritesheet, 3800 + 40, 2200, 200, 300, 6, 0.09, 15, false, true);
        this.animations["run" + "left"] = new Animator(this.spritesheet, 2485, 2200, 200, 300, 6, 0.09, 15, true, true);

        this.animations["attack0" + "right"] = new Animator(this.spritesheet, 3800, 2500, 400, 300, 7, 0.05, 0, false, true);
        this.animations["attack0" + "left"] = new Animator(this.spritesheet, 3800, 2500, -400, 300, 7, 0.05, 0, false, true);

        this.animations["attack1" + "right"] = new Animator(this.spritesheet, 3800, 2800, 425, 300, 6, 0.05, 0, false, true);
        this.animations["attack1" + "left"] = new Animator(this.spritesheet, 1250, 2800, 425, 300, 6, 0.05, 0, true, true);

        this.animations["attack2" + "right"] = new Animator(this.spritesheet, 3800, 3100, 420, 400, 8, 0.02, 0, false, true);
        this.animations["attack2" + "left"] = new Animator(this.spritesheet, 440, 3100, 420, 400, 8, 0.02, 0, true, true);

        this.animations["attack3" + "right"] = new Animator(this.spritesheet, 3800 + 40, 3500, 400, 400, 4, 0.05, 0, false, true);
        this.animations["attack3" + "left"] = new Animator(this.spritesheet, 2160 + 40, 3500, 400, 400, 4, 0.05, 0, true, true);

        this.animations["slide" + "right"] = new Animator(this.spritesheet, 3800 + 15, 3900, 224, 300, 3, 0.5, 48, false, true);
        this.animations["slide" + "left"] = new Animator(this.spritesheet, 3017, 3900, 224, 300, 2, 0.5, 48, true, true);

        this.animations["throw" + "right"] = new Animator(this.spritesheet, 3800 + 8, 4200, 208, 300, 3, 0.1, 16, false, true);
        this.animations["throw" + "left"] = new Animator(this.spritesheet, 3132, 4200, 208, 300, 3, 0.1, 16, true, true);
    };

    collectCoins(qty) {
        this.coins += qty;
        localStorage.setItem('coins', this.coins);
    }

    spendCoins(qty) {
        this.coins -= qty;
        localStorage.setItem('coins', this.coins);
    }

    update() {

        // must have update method
        // logic to update it's state, background have no state, just have x,y
        const TICK = this.game.clockTick;

        const MAX_WALK = 93.75 * 3;
        const MAX_RUN = 153.75 * 3;

        const DEC_REL = 182.8125;




        const MAX_FALL = 270 * 3;

        if (this.velocity.y === 0 //&& this.action != "jump" && this.action != "jump2" 
            //&& this.action != "attack0"
        ) {
            // ground physics (aka: character is not airborne)

            if (this.action.substring(0, 6) != "attack" && this.action != "throw") { // if slide key is not down (which is always true at the start of the game) then...
                this.velocity.x = 0; // set horizontal velocity to 0
                this.action = "idle"; // be in "idle" state
                if (this.game.left && !this.game.right && !this.game.attack && !this.game.throw) { // if only the left-arrow key is down then...
                    this.sounds["footStep"].play();
                    this.facing = "left"; // make character face left
                    this.action = "run"; // make character run
                    this.velocity.x -= MAX_RUN; // negative horizontal velocity so that character moves towards the left
                }
                if (this.game.right && !this.game.left && !this.game.attack) { // if only the right-arrow key is down then...
                    this.sounds["footStep"].play();
                    this.facing = "right"; // make character face left
                    this.action = "run"; // make character run 
                    this.velocity.x += MAX_RUN; // positive horizontal velocity so that character moves towards the right
                }
            }

            if (this.game.slide) { // else if slide key is down then...
                if (this.facing === "right" && this.velocity.x > 0) { // if chacter is moving right then...
                    this.action = "slide"; // make character slide
                    this.velocity.x -= DEC_REL * 50 * TICK; // reduce character's positive (moving right) horizontal velocity over time
                }
                if (this.facing === "left" && this.velocity.x < 0) { // if character is moving left then...
                    this.action = "slide"; // make character slide
                    this.velocity.x += DEC_REL * 50 * TICK; // reduce character's negative (moving left) velocity over time
                }
            } else if (Math.abs(this.velocity.x) >= MAX_RUN && !this.game.slide) { // else if character is in a slide && horizontal velocity is greater than running velocity && slide key is NOT down then...
                if (this.facing === "right") { // if character is facing right then...
                    this.velocity.x -= DEC_REL * 5 * TICK; // reduce character's negative (moving left) velocity over time
                }
                if (this.facing === "left") { // if character is facing left then... 
                    this.velocity.x += DEC_REL * 5 * TICK; // reduce character's positive (moving right) velocity over time
                }
            }

            if (this.game.jump && this.action.substring(0, 6) != "attack") { // jump key press
                this.velocity.y -= 3000; // 1st jump
                ///this.fallAcc = STOP_FALL;
                this.sounds["jumpSound"].play();
                this.action = "jump";
                this.game.jump = false;
            }
        } else {
            // character is already in the air
            // double jump

            this.velocity.y += this.fallAcc * TICK;

            if (this.doubleJump && this.game.jump) {
                if (this.action === "attack3") this.hitBox = undefined;
                this.velocity.y = -6000;
                this.sounds["jumpSound"].play();
                this.action = "jump2";
                if (this.facing === "right" && this.velocity.x < 0) this.velocity.x = 400;
                if (this.facing === "right" && this.velocity.x > 0) this.velocity.x = 400;
                if (this.facing === "left" && this.velocity.x > 0) this.velocity.x = -400;
                if (this.facing === "left" && this.velocity.x < 0) this.velocity.x = -400;
                this.doubleJump = false;
            }

            //horizontal physics 
            if (this.game.right && !this.game.left) {
                this.facing = "right";
                //this.action = "run";
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x += MAX_WALK * TICK;
                } else this.velocity.x += MAX_WALK * TICK;
            } else if (this.game.left && !this.game.right) {
                this.facing = "left";
                //this.action = "run";
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x -= MAX_WALK * TICK;
                } else this.velocity.x -= MAX_WALK * TICK;
            } else {
                // do nothing
            }
        }



        // throw mechanic
        this.throwMech();

        // attac mechanic 2 // this work but attack changes mid attack
        // if (this.game.attack) {
        //     // attack 0
        //     if ((this.game.up || this.game.action === "attack2")) {
        //         this.attack = 2;
        //     } else if (((this.game.right || this.game.left) || this.game.action === "attack1")) {
        //             this.attack = 1;
        //     } else if ((!this.game.right || !this.game.left || this.game.action === "attack0")) {
        //         this.attack = 0;
        //     } 
        //     this.action = "attack" + this.attack;
        //     if (this.animations[this.action + this.facing].animationFinish) {
        //         this.game.attack = false;
        //     }
        // }



        // attack mechanic 3 //
        this.attackMech();
        this.potionMech();

        if (this.invicible) {
            if (this.animations["invicible"].animationFinish) {
                this.invicible = false;
            }
        }

        this.velocity.y += this.fallAcc * TICK;

        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        let doubleJumpBonus = 0;
        if (!this.doubleJump) doubleJumpBonus = 50;
        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN + doubleJumpBonus;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN - doubleJumpBonus;


        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB(); //bounding box;
        // fall off map
        if (this.y > 2500) {
            this.action = "die"
            this.hp = 0;
        }


        // collision handling
        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && self.BB.collide(entity.BB)) {

                //if (self.velocity.y >= 0) { // falling
                // add more ground stuff here
                if ((entity instanceof Ground || entity instanceof Platform || entity instanceof Wall || entity instanceof Stump)
                    && self.lastBB.bottom <= entity.BB.top) { // landing, top collison
                    self.doubleJump = true;
                    self.velocity.y = 0;
                    self.y = entity.BB.top - 130;
                    if (self.action === "attack3") {
                        self.velocity.x = 0;
                        self.hitBox = undefined;
                        self.action = "idle";
                        //self.game.attack = false;
                    }
                    //self.updateBB();     
                }

                if (entity.open && entity instanceof Portal && self.game.up) {
                    self.game.camera.currLv = entity.level;
                    self.game.camera.loadLevel(level[entity.level]);
                }

                if ((entity instanceof Wall || entity instanceof Ground) && self.BB.bottom > entity.BB.top) {
                    if (self.lastBB.left >= entity.BB.right) { // left collision
                        if (self.velocity.y !== 0) {
                            self.action = "grabWall";
                        }
                        self.game.attack = false;
                        self.hitBox = undefined
                        self.doubleJump = true;
                        self.velocity.x = 0;
                        self.x = entity.BB.right;
                        self.velocity.y = 0;
                    } else if (self.lastBB.right <= entity.BB.left) { // right collision
                        if (self.velocity.y !== 0) {
                            self.action = "grabWall";
                        }
                        self.game.attack = false;
                        self.hitBox = undefined
                        self.doubleJump = true;
                        self.velocity.x = 0;
                        self.x = entity.BB.left - 60;
                        self.velocity.y = 0;
                    }
                    //self.updateBB();
                }

                if (entity instanceof Ground) {
                    if (self.lastBB.top >= entity.BB.bottom) { // top collision
                        self.y = entity.BB.bottom - 20;
                    }
                }

                if (entity instanceof Stump && self.BB.bottom > entity.BB.top) {
                    if (self.lastBB.left >= entity.BB.right) { // left collision
                        // if (self.velocity.y !== 0) {
                        //     self.action = "grabWall";
                        // }
                        self.game.attack = false;
                        self.hitBox = undefined;
                        //self.doubleJump = true;
                        self.velocity.x = 0;
                        self.x = entity.BB.right;
                        self.velocity.y = 0;
                        self.y = self.y;
                        entity.action = "movingLeft";
                    } else if (self.lastBB.right <= entity.BB.left) { // right collision
                        // if (self.velocity.y !== 0) {
                        //     self.action = "grabWall";
                        // }
                        self.game.attack = false;
                        self.hitBox = undefined;
                        //self.doubleJump = true;
                        self.velocity.x = 0;
                        self.x = entity.BB.left - 60;
                        self.velocity.y = 0;
                        self.y = self.y;
                        entity.action = "movingRight";
                    }
                }

                if (!self.invicible) {
                    if (entity instanceof Slime || entity instanceof Ghost || entity instanceof Ninja || entity instanceof Knight) { // touch dmg
                        self.takeDamage(entity.BB);
                    }
                }

            }
            if (!self.invicible) {
                if (entity.monsterHB && self.BB.collide(entity.monsterHB)) { // got hit
                    self.takeDamage(entity.monsterHB);
                    if (entity instanceof Slime) { // bounce attack
                        self.invicible = true;
                        self.hitBox = undefined;
                        self.velocity.y = -6000;
                    }
                    if (entity.BB.left <= self.BB.left) {
                        self.velocity.x = 100;
                    } else {
                        self.velocity.x = -100;
                    }

                }
            }

        });
        self.updateBB();
    };

    throwMech() {
        if (this.action.substring(0,6) != "attack" && (this.game.throw || this.action === "throw")) {
            if (this.action != "throw") {
                if (this.velocity.y === 0) {
                    this.velocity.x = 0;
                }
                this.action = "throw";
                let kunaiVerlocity = 1000;
                if (this.facing === "left") {
                    kunaiVerlocity = -1000;
                }
                let shuriken = new Kunai(this.game, this.x, this.y + 50, kunaiVerlocity);
                this.game.addEntity(shuriken);
            } else {
                if (this.animations[this.action + this.facing].animationFinish) {
                    this.action = "idle";
                }
            }
        }
    }

    attackMech() {
        if (this.action != "throw" && (this.game.attack || this.action.substring(0, 6) === "attack")) {
            this.sounds["attackSound"].play();
            if (this.action.substring(0, 6) != "attack") {
                if (this.velocity.y === 0) {
                    this.velocity.x = 0;
                }
                if (this.game.up) {
                    this.action = "attack2";
                } else if ((this.game.left || this.game.right) && this.velocity.y === 0) {
                    this.action = "attack1";
                } else if (this.velocity.y === 0) {
                    this.action = "attack0";
                } else {
                    this.action = "attack3";
                }
                this.updateHB(this.action, this.facing);
            } else {
                // if (this.action != "attack3"){
                //     this.hitBox = undefined; 
                // } else {  
                //     this.updateHB(this.action, this.facing);
                // }
                this.hitBox = undefined;
                if (this.action === "attack3") {
                    this.att3Freq -= this.game.clockTick;
                    if (this.att3Freq <= 0) {
                        this.att3Freq = 0.1;
                        this.updateHB(this.action, this.facing);
                    }
                }


                if ((this.action === "attack2")) { // up attack
                    this.action = "attack2";
                } else if ((this.action === "attack1")) { // left or right attack
                    this.action = "attack1";
                } else if (this.velocity.y != 0) { // air attack
                    this.action = "attack3";
                } else { // neutral attack
                    this.action = "attack0";
                }
                if (this.animations[this.action + this.facing].animationFinish) {
                    this.animations[this.action + this.facing].animationFinish = false;
                    if (this.action != "attack3") {
                        this.action = "idle";
                    }
                }
            }
        }
    }

    potionMech() {
        if (this.game.camera.potion.cdTimer >= 0) {
            // display cool down
            this.game.camera.potion.cdTimer -= this.game.clockTick;
            //console.log(this.game.camera.potion.cdTimer);
        } else if (this.game.potion && this.game.camera.potion.quantity > 0) {
            this.hp += 100;
            //show heal amout
            let healIndicator = new dmgIndicator(this.game, this.BB.x, this.BB.y, 100, "lightgreen");
            this.game.addEntity(healIndicator);
            if (this.hp > this.maxHP) this.hp = this.maxHP;
            this.game.camera.potion.quantity -= 1;
            this.game.camera.potion.cdTimer = 10;
        }
    }

    updateBB() {
        let slideBuffer = 0;
        if (this.action === "slide") slideBuffer = 32;
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + 20 + slideBuffer,
            60,
            110 - slideBuffer);
    }

    updateHB(attack, facing) {
        let offsetX = 0;
        let offsetY = 20;
        let width = 130;
        let height = 100;
        let dmgModifer = 1;
        // right facing
        if (facing === "right") {
            offsetX = 60;
            // this.hitBox = new BoundingBox(this.x + 60, this.y + 20, 130, 100, this.attackDmg);
        }
        // left facing
        if (facing === "left") {
            offsetX = -130;
            // this.hitBox = new BoundingBox(this.x - 130, this.y + 20, 130, 100, this.attackDmg);
        }
        // jump attack bounding box
        if (attack === "attack3") {
            offsetY = -20;
            offsetX = -70;
            width = 200;
            height = 200;
            dmgModifer= 0.7;
            // this.hitBox = new BoundingBox(this.x - 70, this.y - 20, 200, 200, 0.1 * this.attackDmg)
        }

        this.hitBox = new BoundingBox(this.x + offsetX, this.y + offsetY, width, height, dmgModifer * this.attackDmg, attack);
    }

    takeDamage(hitBox) {
        if (hitBox && this.hp > 0 && hitBox.hbDmg > 0) {
            this.hp -= hitBox.hbDmg;
            this.game.addEntity(
                new dmgIndicator(this.game,this.BB.x,this.BB.y,hitBox.hbDmg, "blue"))
            this.sounds["hurtSound"].play();
            if (this.facing === "left") {
                this.velocity.x = 300;
            } else {
                this.velocity.x = -300;
            }
            this.invicible = true;
            this.action = "dizzy";
            this.hitBox = undefined;
            this.velocity.y = -200;
        } else if (this.hp <= 0) {
            this.hp = 0;
            this.action = "die";
        }
    }

    draw(ctx) { // must have draw method
        let slidey = 0;
        let offsetX = 0;
        let offsetY = 0;

        // drawing a adjust
        if (this.action === "jump") {
            offsetY = 30;
        }
        if (this.action === "slide") {
            if (this.facing === "right") offsetX = -40;
            else if (this.facing === "left") offsetX = -15;
            offsetY = -15;
        };

        // attack0 adjustment
        if (this.action === "attack0") {
            if (this.facing === "right") offsetX = -30;
            if (this.facing === "left") offsetX = 80;
            offsetY = 13;
        }

        // attack 1 adjustment
        if (this.action === "attack1") {
            if (this.facing === "left") offsetX = -100;
            if (this.facing === "right") offsetX = -30;
            offsetY = 7;
        }

        // attack 2 ajustment
        if (this.action === "attack2") {
            if (this.facing === "left") offsetX = -100;
            if (this.facing === "right") offsetX = -30;
            offsetY = 40;
        }
        // jump attack ajustment
        if (this.action === "attack3") {
            offsetX = -60;
            offsetY = 30;
        }

        this.animations[this.action + this.facing].drawFrame(this.game.clockTick, ctx,
            this.x + offsetX - this.game.camera.x,
            this.y - offsetY + slidey - this.game.camera.y,
            .5);

        if (this.invicible) {
            this.animations["invicible"].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 10, this.y - this.game.camera.y, .5);
        }
        this.healthBar.draw(ctx);
        // draw character hud
        this.drawCharacterHud(ctx);

        if (debugStat) {
            this.debug(ctx);
        }
    };

    drawCharacterHud(ctx) {
        let hpBarWidth = 300;
        let hpBarHeight = 30;
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 6;
        ctx.arc(60,this.game.surfaceHeight - 60,50, 0, 2 * Math.PI);
        ctx.stroke();
        this.healthBar.drawHUDHpBar(ctx, 115, 
            this.game.surfaceHeight - 75, 
            hpBarWidth,
            hpBarHeight,
            this.hp, this.maxHP, true);
        this.animations["idlehud"].drawFrame(this.game.clockTick, ctx,
            15,
            this.game.surfaceHeight - 55 - 100,
            .75);
    }

    debug(ctx) {
        // left debug
        ctx.font = "10px serif"
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.left ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(10, this.game.surfaceHeight - 40, 30, 30);
        ctx.fillText("<", 20, this.game.surfaceHeight - 20);

        // down debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.down ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(50, this.game.surfaceHeight - 40, 30, 30);
        ctx.fillText("v", 60, this.game.surfaceHeight - 20);

        // up debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.up ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(50, this.game.surfaceHeight - 80, 30, 30);
        ctx.fillText("^", 60, this.game.surfaceHeight - 60);

        // right debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.right ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(90, this.game.surfaceHeight - 40, 30, 30);
        ctx.fillText(">", 100, this.game.surfaceHeight - 20);

        // jump debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.jump ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(130, this.game.surfaceHeight - 40, 50, 30);
        ctx.fillText("space", 140, this.game.surfaceHeight - 20);

        // attack debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.attack ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(190, this.game.surfaceHeight - 40, 30, 30);
        ctx.fillText("a", 200, this.game.surfaceHeight - 20);

        // slide debug
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.slide ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeRect(230, this.game.surfaceHeight - 40, 30, 30);
        ctx.fillText("s", 240, this.game.surfaceHeight - 20);

        ctx.strokeStlye = "black";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.game.throw ? "White" : "Grey";
        ctx.fillStyle = ctx.strokeStlye;
        ctx.strokeRect(270, this.game.surfaceHeight - 40, 30, 30);
        ctx.fillText("d", 280, this.game.surfaceHeight - 20);

        ctx.strokeStyle = "black";
        ctx.fillText("Xloc: " + this.x, 10, 10);
        ctx.strokeStyle = "black";
        ctx.fillText("Yloc: " + this.y, 10, 30);

        // this.walkLeft.drawFrame(this.game.clockTick, ctx, 400,400,.75);
        // this.walkRight.drawFrame(this.game.clockTick, ctx, 300,400,.75);

        this.game.ctx.strokeStyle = "red"; // the outline of shape
        this.game.ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

        if (this.hitBox) {
            this.game.ctx.strokeStyle = "red"; // the outline of shape
            this.game.ctx.strokeRect(this.hitBox.x - this.game.camera.x,
                this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
        }
    }

}