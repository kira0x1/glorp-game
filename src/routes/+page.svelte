<script lang="ts">
    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../PhaserGame.svelte";

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null };
    const spritePosition = { x: 0, y: 0 };
    let lastTime = 0;
    let elapsed = 0;

    const changeScene = () => {
        const scene = phaserRef.scene;
        const mainMenu = scene as MainMenu;

        if (scene.scene.key === "Game") {
            scene.events.on("update", (time, delta) => {
                elapsed += delta;

                if (elapsed > 40) {
                    const player = scene.children.getByName(
                        "player",
                    ) as Phaser.GameObjects.Sprite;

                    spritePosition.x = Number(player.x.toFixed(0));
                    spritePosition.y = Number(player.y.toFixed(0));
                    elapsed = 0;
                }
            });
        }

        if (mainMenu) {
            // Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
            mainMenu.changeScene();
        }
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {};
</script>

<div id="app">
    <PhaserGame bind:phaserRef currentActiveScene={currentScene} />
    <div>
        <div>
            <button class="button" on:click={changeScene}>Change Scene</button>
        </div>
        <div class="spritePosition">
            Sprite Position:
            <pre>{JSON.stringify(spritePosition, null, 2)}</pre>
        </div>
    </div>
</div>

<style>
    #app {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spritePosition {
        margin: 10px 0 0 10px;
        font-size: 0.8em;
    }

    .button {
        width: 140px;
        margin: 10px;
        padding: 10px;
        background-color: #000000;
        color: rgba(255, 255, 255, 0.87);
        border: 1px solid rgba(255, 255, 255, 0.87);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            border: 1px solid #0ec3c9;
            color: #0ec3c9;
        }

        &:active {
            background-color: #0ec3c9;
        }

        /* Disabled styles */
        &:disabled {
            cursor: not-allowed;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: rgba(255, 255, 255, 0.3);
        }
    }
</style>
