// Created by carolsail 

import DataManager from "./DataManager";
import { AUDIO_EFFECT_ENUM, GAME_EVENT_ENUM, GAME_SCENE_ENUM } from "./Enum";
import EventManager from "./EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuManager extends cc.Component {

    @property(cc.Node)
    themeChooseNode: cc.Node = null

    itemBody: cc.Node = null

    onLoad () {
        cc.director.preloadScene(GAME_SCENE_ENUM.GAME)
        this.itemBody = this.themeChooseNode.getChildByName('Body')
    }

    onGameStart(){
        EventManager.instance.emit(GAME_EVENT_ENUM.PLAY_AUDIO, AUDIO_EFFECT_ENUM.CLICK)
        DataManager.instance.reset()
        cc.director.loadScene(GAME_SCENE_ENUM.GAME)
    }

    onThemeLayer(){
        this.itemBody.children.forEach((item, index)=>{
            item.getChildByName('checkmark').active = DataManager.instance.themeIndex == index
        })
        this.themeChooseNode.active = true
    }

    onThemeChoose(e){
        const index = this.itemBody.children.findIndex(item=>item==e.currentTarget)
        DataManager.instance.themeIndex = index
        this.themeChooseNode.active = false
    }

}
