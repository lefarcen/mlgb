// Created by carolsail 

import { AUDIO_EFFECT_ENUM, GAME_EVENT_ENUM } from "./Enum";
import EventManager from "./EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MusicManager extends cc.Component {

    @property(cc.AudioClip)
    click: cc.AudioClip = null
    @property(cc.AudioClip)
    clear: cc.AudioClip = null
    @property(cc.AudioClip)
    shoot: cc.AudioClip = null
    @property(cc.AudioClip)
    lose: cc.AudioClip = null
    @property(cc.AudioClip)
    win: cc.AudioClip = null
    @property(cc.AudioClip)
    bgm: cc.AudioClip = null

    onLoad(){
        // cc.game.addPersistRootNode(this.node)
        // EventManager.instance.on(GAME_EVENT_ENUM.PLAY_AUDIO, this.onAudioPlay, this)
        // cc.audioEngine.setMusicVolume(0.8)
        // if(!cc.audioEngine.isMusicPlaying()) cc.audioEngine.playMusic(this.bgm, true)
    }

    onAudioPlay(type: AUDIO_EFFECT_ENUM){
        // switch(type){
        //     case AUDIO_EFFECT_ENUM.CLICK:
        //         cc.audioEngine.playEffect(this.click, false)
        //     break
        //     case AUDIO_EFFECT_ENUM.CLEAR:
        //         cc.audioEngine.playEffect(this.clear, false)
        //     break
        //     case AUDIO_EFFECT_ENUM.SHOOT:
        //         cc.audioEngine.playEffect(this.shoot, false)
        //     break
        //     case AUDIO_EFFECT_ENUM.LOSE:
        //         cc.audioEngine.playEffect(this.lose, false)
        //     break
        //     case AUDIO_EFFECT_ENUM.WIN:
        //         cc.audioEngine.playEffect(this.win, false)
        //     break
        // }
    }

    protected onDestroy(): void {
        EventManager.instance.off(GAME_EVENT_ENUM.PLAY_AUDIO, this.onAudioPlay)
    }
}
