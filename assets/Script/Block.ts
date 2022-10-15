// Created by carolsail

const { ccclass, property } = cc._decorator;

import {
  AUDIO_EFFECT_ENUM,
  GAME_BOARD_ENUM,
  GAME_EVENT_ENUM,
  GAME_STATUS_ENUM,
} from "./Enum";
import { clickDown, clickUp } from "./Utils";
import DataManager from "./DataManager";
import EventManager from "./EventManager";

@ccclass
export default class Block extends cc.Component {
  id: number;
  // 属于哪个board
  _boardType: GAME_BOARD_ENUM;
  // 坐标
  x: number;
  y: number;
  // 大小
  width: number;
  height: number;
  // 层级
  level: number;
  // 内容
  content: cc.SpriteFrame;
  // 被哪些block压住
  higherIds: number[] = [];
  // 压住哪些block
  lowerIds: number[] = [];
  // 原始数据
  old_boardType: GAME_BOARD_ENUM;
  old_x: number;
  old_y: number;
  old_width: number;
  old_height: number;
  old_level: number;

  get boardType() {
    return this._boardType;
  }

  set boardType(data: GAME_BOARD_ENUM) {
    if (this.boardType != data) {
      this._boardType = data;
      EventManager.instance.emit(GAME_EVENT_ENUM.CHANGE_BOARD, this);
    }
  }

  onLoad() {
    const { TOUCH_START, TOUCH_CANCEL, TOUCH_END } = cc.Node.EventType;
    this.node.on(TOUCH_START, this.onTouchstart, this);
    this.node.on(TOUCH_END, this.onTouchend, this);
    this.node.on(TOUCH_CANCEL, this.onTouchend, this);
  }

  // 初始化
  init(block: BlockType) {
    Object.assign(this, block);
    DataManager.instance.blocks.push(this);
    this.old_boardType = block.boardType as GAME_BOARD_ENUM;
    this.old_x = block.x;
    this.old_y = block.y;
    this.old_width = block.width;
    this.old_height = block.height;
    this.old_level = block.level;
    this.rendor();
  }

  // 渲染
  rendor() {
    this.node.x = this.x;
    this.node.y = this.y;
    this.node.width = this.width;
    this.node.height = this.height;
    this.node.zIndex = this.level;
    // this.node.getChildByName('label').getComponent(cc.Label).string = this.content
    this.node.getChildByName("bg").active = !this.clickable();
    this.node.getChildByName("item").getComponent(cc.Sprite).spriteFrame =
      this.content;
  }

  // 可点击的
  clickable() {
    switch (this.boardType) {
      case GAME_BOARD_ENUM.LEVEL: {
        if (DataManager.instance.clickable) return true;
        return this.higherIds.length <= 0;
      }
      case GAME_BOARD_ENUM.RANDOM_LEFT:
      case GAME_BOARD_ENUM.RANDOM_RIGHT: {
        return this.higherIds.length <= 0;
      }
      case GAME_BOARD_ENUM.LEVEL_EXTEND: {
        return true;
      }
      default:
        return false;
    }
  }

  // 入槽
  toSlot() {
    this.lowerIds.forEach((id) => {
      const block: Block = DataManager.instance.blocks.find(
        (item) => item.id == id
      );
      if (block.higherIds.findIndex((item) => item == this.id) >= 0) {
        block.higherIds.splice(
          block.higherIds.findIndex((item) => item == this.id),
          1
        );
      }
      block.rendor();
    });
    if (
      DataManager.instance.records.findIndex((item) => item.id == this.id) == -1
    ) {
      DataManager.instance.records.push(this);
    }
    this.level = 0;
    this.y = 0;
    this.boardType = GAME_BOARD_ENUM.SLOT;
    // 排序(通过level进行排序)
    const slots_all = DataManager.instance.blocks.filter(
      (item) => item.boardType == GAME_BOARD_ENUM.SLOT
    );
    const slots_same = DataManager.instance.blocks.filter(
      (item) =>
        item.content == this.content && item.boardType == GAME_BOARD_ENUM.SLOT
    );
    let maxLevel = 0;
    slots_all.forEach((slot) => {
      if (slot.level > maxLevel) maxLevel = slot.level;
    });
    slots_same.forEach((item) => {
      item.level = maxLevel + 1;
      item.rendor();
    });
    // 是否消除
    EventManager.instance.emit(GAME_EVENT_ENUM.CHECK_CLEAR, this);
  }

  // 出槽
  toSlotCancel() {
    const targets: Block[] = DataManager.instance.blocks.filter((item) =>
      this.lowerIds.includes(item.id)
    );
    targets.forEach((target) => {
      if (target.higherIds) {
        target.higherIds.push(this.id);
        target.rendor();
      }
    });
    this.level = this.old_level;
    this.y = this.old_y;
    this.boardType = this.old_boardType;
    this.rendor();
  }

  onTouchstart(e: cc.Event.EventTouch) {
    if (DataManager.instance.gameStatus != GAME_STATUS_ENUM.RUNING) return;
    if (!this.clickable()) return;
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.SHOOT
    );
    // 点击位置对应到canvas上的坐标
    const location = e.getLocation();
    const pos = cc.find("Canvas").convertToNodeSpaceAR(location);
    // EventManager.instance.emit(GAME_EVENT_ENUM.PLAY_BOOM, pos)
    EventManager.instance.emit(GAME_EVENT_ENUM.PLAY_BROKEN, pos);
    // clickDown(this.node)
    this.toSlot();
  }

  onTouchend() {
    // if(DataManager.instance.gameStatus != GAME_STATUS_ENUM.RUNING) return
    // if(!this.clickable()) return
    // clickUp(this.node, ()=>{
    //     this.toSlot()
    // })
  }

  onDestroy() {
    const { TOUCH_START, TOUCH_CANCEL, TOUCH_END } = cc.Node.EventType;
    this.node.off(TOUCH_START, this.onTouchstart);
    this.node.off(TOUCH_END, this.onTouchend);
    this.node.off(TOUCH_CANCEL, this.onTouchend);
  }
}
