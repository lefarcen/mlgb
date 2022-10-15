// Created by carolsail

import EventManager from "./EventManager";
import { GAME_EVENT_ENUM } from './Enum';
import { getRandom } from './Utils';

const {ccclass, property} = cc._decorator;

@ccclass
export default class BrokenManager extends cc.Component {

    @property([cc.Prefab])
    brokenPrefab: cc.Prefab[] = [];

    onLoad () {
        EventManager.instance.on(GAME_EVENT_ENUM.PLAY_BROKEN, this.onBrokenBuild, this)
    }

    onBrokenBuild(pos: cc.Vec2){
        const node: cc.Node = new cc.Node()
        node.parent = this.node
        let nums = getRandom(2, 4)
        for(let i = 0; i < nums; i++){
            const index = i % 4;
            if(this.brokenPrefab[index]){
                const broken = cc.instantiate(this.brokenPrefab[index])
                broken.parent = node
                pos.x = pos.x + i
                pos.y = pos.y + i
                broken.setPosition(pos)
                let x = getRandom(-200, 200)
                let y = 0
                if(i % 2 == 0) {
                    y = getRandom(300, 600)
                }
                if(i % 2 == 1) {
                    y = getRandom(-300, -100)
                }
                broken.getComponent('Broken').force(x, y)
            }
        }
    }

    onDestroy(){
        EventManager.instance.off(GAME_EVENT_ENUM.PLAY_BROKEN, this.onBrokenBuild)
    }
}
