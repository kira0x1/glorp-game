import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Player } from "../player";

export class Game extends Scene {
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;

        this.gameText = this.add
            .text(512, 384, "game - glorp!", {
                fontFamily: "Arial Black",
                fontSize: 48,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 5,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        const player = new Player(this);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
