// Created by carolsail

import DataManager from './DataManager';
import { GAME_EVENT_ENUM } from './Enum';
import EventManager from './EventManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class WechatManager extends cc.Component {

    // 是否开启
    @property('boolean')
    open: boolean = false
    // 激励广告
    @property('string')
    unitId: string = 'adunit-3b6000cfe10d059e';
    private rewordAd = null;

    onLoad(){
        cc.game.addPersistRootNode(this.node)
        DataManager.instance.adOpen = this.open
        // 注册事件
        EventManager.instance.on(GAME_EVENT_ENUM.PLAY_REWORD, this.showRewordAd, this)
        // 广告初始化
        this.initRewordAd();
    }

    // 初始化激励广告
    initRewordAd(){
        if (typeof wx === 'undefined') return;
        if(this.rewordAd == null){
            this.rewordAd = wx.createRewardedVideoAd({
                adUnitId: this.unitId
            });
            this.rewordAd.onError((err: any) => {
                console.error('广告加载失败')
            });
        }
    }

    // 展示广告
    showRewordAd(type: string){
        if (typeof wx === 'undefined') {
            EventManager.instance.emit(GAME_EVENT_ENUM.REWORD_BACK, {status: false, msg: '仅支持微信平台'})
            return;
        }
        if(this.rewordAd){
            this.rewordAd.offClose();
            // 注册回调
            this.rewordAd.onClose((res: any) => {
                this.rewordAd.offClose();
                if (res && res.isEnded || res === undefined) {
                    EventManager.instance.emit(GAME_EVENT_ENUM.REWORD_BACK, {status: true, msg: '发放奖励', type})
                }else {
                    EventManager.instance.emit(GAME_EVENT_ENUM.REWORD_BACK, {status: false, msg: '广告播放中断'})
                }
            });
            this.rewordAd.show().catch(() => {
                // 失败重试
                this.rewordAd.load()
                .then(() => this.rewordAd.show())
                .catch((err: any) => {
                    EventManager.instance.emit(GAME_EVENT_ENUM.REWORD_BACK, {status: false, msg: '广告展示失败'})
                })
            });
        }
    }

    onDestroy(){
        EventManager.instance.off(GAME_EVENT_ENUM.PLAY_REWORD, this.showRewordAd)
    }
}
