import { GAME_EVENT_ENUM } from './Enum';
// Created by carolsail

import EventManager from "./EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToastManager extends cc.Component {

    @property(cc.Node)
    msg: cc.Node = null;

    onLoad () {
        EventManager.instance.on(GAME_EVENT_ENUM.PLAY_TOAST, this.onShow, this)
        this.msg.active = false
    }

    onShow({msg, seconds}){
        if(!this.msg.active){
            this.msg.getComponent(cc.Label).string = msg;
            this.msg.active = true;
            setTimeout(()=>{
                this.msg.active = false;
            }, seconds * 1000);
        }
    }

    onDestroy() {
        EventManager.instance.off(GAME_EVENT_ENUM.PLAY_TOAST, this.onShow)
    }
}
