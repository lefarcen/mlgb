// Created by carolsail

// 游戏状态
export enum GAME_STATUS_ENUM {
    INIT,
    RUNING,
    CLEAR,
    LOSED,
    COMPLETE
}

// 各区位
export enum GAME_BOARD_ENUM {
    LEVEL = 'LEVEL',
    LEVEL_EXTEND = 'LEVEL_EXTEND',
    RANDOM_LEFT = 'RANDOM_LEFT',
    RANDOM_RIGHT = 'RANDOM_RIGHT',
    SLOT = 'SLOT',
    HIDE = 'HIDE'
}

// 事件类型
export enum GAME_EVENT_ENUM {
    CHECK_CLEAR = 'CHECK_CLEAR',
    CHECK_LOSED = 'CHECK_LOSED',
    CHECK_COMPLETE = 'CHECK_COMPLETE',
    CHANGE_BOARD = 'CHANGE_BOARD',
    PLAY_AUDIO = 'PLAY_AUDIO',
    PLAY_BOOM = 'PLAY_BOOM',
    PLAY_REWORD = 'PLAY_REWORD',
    REWORD_BACK = 'REWORD_BACK',
    PLAY_TOAST = 'PLAY_TOAST',
    PLAY_BROKEN = 'PLAY_BROKEN'
}

// 音效
export enum AUDIO_EFFECT_ENUM {
    CLICK,
    CLEAR,
    SHOOT,
    LOSE,
    WIN
}

// 场景
export enum GAME_SCENE_ENUM {
    MENU = 'Menu',
    GAME = 'Game'
}