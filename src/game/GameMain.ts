import * as Assets from '../assets';

const enum SHAPE {
    'SPADE' = 0,
    'CLOVER' = 13,
    'Diamond' = 26,
    'Heart' = 39
}

export default class GameMain extends Phaser.State {
    private deck: Phaser.Sprite[];
    private cardIndex: number = 0;
    private cardSheetWidth: number = 334;
    private cardSheetHeight: number = 440;
    private cardScale: number = 0.2;

    private button: Phaser.Button;

    public preload(): void {
    }

    makeCard(shape: SHAPE, index: number): Phaser.Sprite {
        let cardIndex = shape + index - 1;
        let card = this.game.add.sprite(0, 0, Assets.Spritesheets.SpritesheetsCards33444048.getName());
        card.scale.set(this.cardScale);
        card.frame = cardIndex;
        return card;
    }

    up(): void {
        console.log('button up', arguments);
    }

    over(): void {
        console.log('button over');
    }

    out(): void {
        console.log('button out');
    }

    onClick1 (): void {
        let card = this.makeCard(SHAPE.SPADE, 1);
        card.frame = this.cardIndex++;
        let length = this.deck.push(card);
        console.log('new length is : ' + length );
        let tween = this.game.add.tween(card).to({ x: this.game.width / 2, y: this.game.height / 2 }, 500, Phaser.Easing.Cubic.Out, true);
    }

    onClick2 (): void {
        let xPos = Math.floor(Math.random() * this.game.width) + 1;
        let yPos = Math.floor(Math.random() * this.game.height) + 1;
        let total = 0;
        for (let i = 0; i < this.deck.length; i++) {
            this.game.add.tween(this.deck[i]).to({x: xPos, y: yPos}, 500, Phaser.Easing.Elastic.InOut, true);
            total = i;
        }
        console.log('moving card count is : ' + total);
    }

    onClick3 (): void {
        while (this.deck.length > 0) {
            let card = this.deck.pop();
            card.destroy();
        }
        this.cardIndex = 0;
        console.log('new length is : ' + this.deck.length );
    }

    finished (): void {
        console.log('completed!');
    }

    onClick4 (): void {
        let xPos = Math.floor(Math.random() * this.game.width) + 1;
        let yPos = Math.floor(Math.random() * this.game.height) + 1;
        let tweenList: Phaser.Tween[] = new Array();
        for (let i = 0; i < this.deck.length; i++) {
            let tween = this.game.add.tween(this.deck[i]).to({x: xPos, y: yPos}, 500, Phaser.Easing.Elastic.In, false);
            tweenList.push(tween);
        }
        for (let i = 0; i < tweenList.length - 1; i++) {
            tweenList[i].chain(tweenList[i + 1]);
        }

        tweenList[0].start();
        let last = tweenList[tweenList.length - 1];
        last.onComplete.add(this.finished, this);
    }

    public create(): void {
        this.deck = new Array();
        this.game.stage.backgroundColor = '#4488AA';
        // this.deck = Phaser.ArrayUtils.numberArray(0, 51);
        // Phaser.ArrayUtils.shuffle(this.deck);
        // let tween = this.game.add.tween(this.cardsInGame[0]).to({ x: this.game.width / 2 }, 500, Phaser.Easing.Cubic.Out, true);
        // this.game.input.onDown.add(this.beginSwipe, this);
        this.button = this.game.add.button(this.game.world.centerX - 125, 400, Assets.Spritesheets.SpritesheetsButtonImage193713.getName(), this.onClick1, this, 2, 1, 0);
        this.button = this.game.add.button(this.game.world.centerX + 125, 400, Assets.Spritesheets.SpritesheetsButtonImage193713.getName(), this.onClick2, this, 2, 1, 0);
        this.button = this.game.add.button(this.game.world.centerX - 125, 500, Assets.Spritesheets.SpritesheetsButtonImage193713.getName(), this.onClick3, this, 2, 1, 0);
        this.button = this.game.add.button(this.game.world.centerX + 125, 500, Assets.Spritesheets.SpritesheetsButtonImage193713.getName(), this.onClick4, this, 2, 1, 0);
    }


}