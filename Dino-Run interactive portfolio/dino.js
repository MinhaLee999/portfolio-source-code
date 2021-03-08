import { makeSprite, t } from "@replay/core";

export const dinoWidth = 50;
export const dinoHeight = 50;

export const Dino = makeSprite({

    render({props}){
        return[
            t.spriteSheet({
                fileName:"dinorun6.png",
                columns: 6,
                rows: 1,
                index: props.index,
                width: dinoWidth,
                height: dinoHeight,
            })
        ];
    }
});