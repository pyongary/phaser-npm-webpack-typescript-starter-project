import * as Assets from '../assets';

export default class PlayGame extends Phaser.State {
    private deck: number[] = null;
    private cardsInGame: Phaser.Sprite[] = null;
    private nextCardIndex: number;

    private cardSheetWidth: number = 334;
    private cardSheetHeight: number = 440;
    private cardScale: number = 0.2;

    public preload(): void {
        // this.cardSpritesheet = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 175, Assets.Spritesheets.SpritesheetsCards33444048.getName());
    }

    makeCard(cardIndex: number): Phaser.Sprite {
        let card = this.game.add.sprite(this.cardSheetWidth * this.cardScale / -2, this.game.height / 2, Assets.Spritesheets.SpritesheetsCards33444048.getName());
        card.anchor.set(0.5);
        card.scale.set(this.cardScale);
        card.frame = this.deck[cardIndex];
        return card;
    }

    handleSwipe(dir) {
        let cardToMove = (this.nextCardIndex + 1) % 2;
        this.cardsInGame[cardToMove].y += dir * this.cardSheetHeight * this.cardScale * 1.1;
        let tween = this.game.add.tween(this.cardsInGame[cardToMove]).to({ x: this.game.width / 2 }, 500, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.add(function() { this.game.time.events.add(Phaser.Timer.SECOND, this.moveCards, this); }, this);
    }

    beginSwipe(e) {
        this.game.input.onDown.remove(this.beginSwipe, this);
        this.game.input.onUp.add(this.endSwipe, this);
    }

    endSwipe(e): void {
        this.game.input.onUp.remove(this.endSwipe, this);
        let swipeTime = e.timeUp - e.timeDown;
        let swipeDistance = Phaser.Point.subtract(e.position, e.positionDown);
        let swipeMagnitude = swipeDistance.getMagnitude();
        let swipeNormal = Phaser.Point.normalize(swipeDistance);
        if (swipeMagnitude > 20 && swipeTime < 1000 && Math.abs(swipeNormal.y) > 0.8) {
            if (swipeNormal.y > 0.8) {
                this.handleSwipe(1);
            }
            if (swipeNormal.y < -0.8) {
                this.handleSwipe(-1);
            }
        } else {
            this.game.input.onDown.add(this.beginSwipe, this);
        }
    }

    public create(): void {
        this.game.stage.backgroundColor = '#4488AA';
        this.deck = Phaser.ArrayUtils.numberArray(0, 51);
        // Phaser.ArrayUtils.shuffle(this.deck);
        this.cardsInGame = [this.makeCard(0), this.makeCard(1)];
        this.nextCardIndex = 2;
        let tween = this.game.add.tween(this.cardsInGame[0]).to({ x: this.game.width / 2 }, 500, Phaser.Easing.Cubic.Out, true);
        this.game.input.onDown.add(this.beginSwipe, this);
    }

    moveCards(): void {
        let cardToMove = this.nextCardIndex % 2;
        let moveOutTween = this.game.add.tween(this.cardsInGame[cardToMove]).to(
            {x: this.game.width + this.cardSheetWidth * this.cardScale},
            500,
            Phaser.Easing.Cubic.Out, true);
        cardToMove = (this.nextCardIndex + 1) % 2;
        let moveDownTween = this.game.add.tween(this.cardsInGame[cardToMove]).to(
            {y: this.game.height / 2 }, 500, Phaser.Easing.Cubic.Out, true);
        moveDownTween.onComplete.add(function() {
            let cardToMove = this.nextCardIndex % 2;
            this.cardsInGame[cardToMove].frame = this.deck[this.nextCardIndex];
            this.nextCardIndex = (this.nextCardIndex + 1) % 52;
            this.cardsInGame[cardToMove].x = this.cardSheetWidth * this.cardScale / -2;
            this.game.input.onDown.add(this.beginSwipe, this);
        }, this);
    }
}