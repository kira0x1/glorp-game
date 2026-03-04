import { GameObjects } from "phaser";

export class Player extends GameObjects.Sprite {
    xDir: number = 1;
    speed: number = 15;

    constructor(scene: Phaser.Scene) {
        super(scene, 40, 60, "star");
        this.scale = 0.6;

        this.name = "player";
        scene.add.existing(this);

        this.active = true;
        scene.sys.updateList.add(this);
    }

    create() {
        console.log("create");
    }

    preUpdate(time: number, delta: number) {
        this.x += (this.speed * this.xDir) / delta;

        if (this.x >= this.scene.scale.width - this.width / 2) {
            this.xDir = -1;
        } else if (this.x <= this.width / 2) {
            this.xDir = 1;
        }
    }

    removedFromScene() {
        super.removedFromScene();
        console.log("removed from scene");
    }

    update() {
        console.log("updating...");
        super.update();
    }
}
