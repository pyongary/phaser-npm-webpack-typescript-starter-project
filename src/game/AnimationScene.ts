import * as Assets from '../assets';
import Keyboard = Phaser.Keyboard;

export default class AnimationScene extends Phaser.State {
    private mummyList: Phaser.Sprite[] = null;
    private keyboard: Phaser.CursorKeys;
    private player: Phaser.Sprite;


    createMummy(): void {
        let xPos = Math.floor(Math.random() * this.game.width) + 1;
        let yPos = Math.floor(Math.random() * this.game.height) + 1;

        let mummySpritesheet = this.game.add.sprite(xPos, yPos, Assets.Spritesheets.SpritesheetsMetalslugMummy374518.getName());

        mummySpritesheet.animations.add('walk');
        mummySpritesheet.animations.play('walk', 30, true);

        mummySpritesheet.events.onAnimationStart.add(() => {
            console.log('start mummy anim');
        });
        mummySpritesheet.events.onAnimationComplete.add(() => {
            console.log('start mummy complete');
        });
        mummySpritesheet.events.onAnimationLoop.add(() => {
            // console.log('start mummy loop');
        });

        mummySpritesheet.inputEnabled = true;
        mummySpritesheet.events.onInputDown.add( () => {
                if (mummySpritesheet.animations.paused === true) {
                    // this.mummySpritesheet.animations.play('walk', 30, true);
                    mummySpritesheet.animations.paused = false;
                    console.log('play');
                }
                else {
                    // this.mummySpritesheet.animations.stop();
                    mummySpritesheet.animations.paused = true;
                    console.log('stop');
                }
            }
        );

        this.mummyList.push(mummySpritesheet);
    }

    clearMummy(): void {
        for (let mummy of this.mummyList) {
            mummy.destroy();
        }
    }

    shake(): void {
        this.game.camera.shake(0.05, 500);
    }

    public create(): void {
        this.game.stage.backgroundColor = '#4488AA';
        this.mummyList = new Array();

        this.game.add.tileSprite(0, 0, 1920, 1920, Assets.Images.ImagesDebugGrid1920x1920.getName());
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.ImagesAsunaByVali233.getName());

        this.game.add.button(this.game.world.centerX - 300, 400, Assets.Spritesheets.SpritesheetsButtonImage193713.getName(), this.createMummy, this, 2, 1, 0);
        this.game.add.button(this.game.world.centerX + 100, 400, Assets.Spritesheets.SpritesheetsButtonImage193713.getName(), this.clearMummy, this, 2, 1, 0);

        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.keyboard = this.game.input.keyboard.createCursorKeys();
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.shake);
        // this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);

        // this.game.camera.flash(0x000000, 1000);
    }

    public update(): void {
        this.player.body.setZeroVelocity();

        if (this.keyboard.up.isDown) {
            this.player.body.moveUp(300);
        }
        else if (this.keyboard.down.isDown) {
            this.player.body.moveDown(300);
        }

        if (this.keyboard.left.isDown) {
            this.player.body.velocity.x = -300;
        }
        else if (this.keyboard.right.isDown) {
            this.player.body.moveRight(300);
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.camera.shake(0.05, 500);
        }
    }
}
