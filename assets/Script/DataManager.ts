// Created by carolsail

import Block from "./Block";
import { GAME_STATUS_ENUM } from "./Enum";

const STORAGE_KEY = "SHEEP_STORAGE_KEY";

export default class DataManager {
  private static _instance: any = null;

  static getInstance<T>(): T {
    if (this._instance === null) {
      this._instance = new this();
    }

    return this._instance;
  }

  static get instance() {
    return this.getInstance<DataManager>();
  }

  _level: number = 1;
  blocks: Block[] = [];
  records: Block[] = [];
  currentLevel: LevelType = null;
  gameStatus: GAME_STATUS_ENUM = GAME_STATUS_ENUM.INIT;
  clickable: boolean = false;
  themeIndex: number = 2;
  adOpen: boolean = false;

  get level() {
    return this._level;
  }

  set level(data: number) {
    this._level = data;
    this.save();
  }

  reset() {
    this.blocks = [];
    this.records = [];
    this.currentLevel = null;
    this.gameStatus = GAME_STATUS_ENUM.INIT;
    this.clickable = false;
  }

  save() {
    cc.sys.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        level: this.level,
      })
    );
  }

  restore() {
    const _data = cc.sys.localStorage.getItem(STORAGE_KEY) as any;
    try {
      const data = JSON.parse(_data);
      this.level = data?.level || 1;
    } catch {
      this.level = 1;
      this.reset();
    }
  }
}
