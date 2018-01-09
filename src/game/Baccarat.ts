import * as Assets from '../assets';

namespace Poker {
    export const enum SHAPE {
        'SPADE' = 0,
        'CLOVER' = 13,
        'Diamond' = 26,
        'Heart' = 39
    }
}

export default class Baccarat extends Phaser.State {
    private deck: number[];
    private cards: Phaser.Sprite[];

    readonly cardSheetWidth: number = 334;
    readonly cardSheetHeight: number = 440;
    readonly cardScale: number = 0.2;

    public preload(): void {
        this.deck = Phaser.ArrayUtils.numberArray(0, 51);
        Phaser.ArrayUtils.shuffle(this.deck);
    }

    makeCard(shape: Poker.SHAPE, index: number): Phaser.Sprite {
        let cardIndex = shape + index - 1;
        let card = this.game.add.sprite(0, 0, Assets.Spritesheets.SpritesheetsCards33444048.getName());
        card.scale.set(this.cardScale);
        card.frame = cardIndex;
        return card;
    }

    makeDeck(): void {
        Phaser.ArrayUtils.shuffle(this.deck);
    }
}
