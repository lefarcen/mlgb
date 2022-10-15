// Created by carolsail

const { ccclass, property } = cc._decorator;

import {
  AUDIO_EFFECT_ENUM,
  GAME_BOARD_ENUM,
  GAME_EVENT_ENUM,
  GAME_STATUS_ENUM,
  GAME_SCENE_ENUM,
} from "./Enum";
import { levels } from "./Levels";
import DataManager from "./DataManager";
import Block from "./Block";
import EventManager from "./EventManager";
import { getRandom, pluck, shuffle, sort } from "./Utils";

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  boardLevelNode: cc.Node = null;
  @property(cc.Node)
  boardLevelExtendNode: cc.Node = null;
  @property(cc.Node)
  boardRandomLeftNode: cc.Node = null;
  @property(cc.Node)
  boardRandomRightNode: cc.Node = null;
  @property(cc.Node)
  boardSlotNode: cc.Node = null;
  @property(cc.Node)
  boardHideNode: cc.Node = null;
  @property([cc.Prefab])
  blockPrefab: cc.Prefab[] = [];
  @property(cc.Label)
  titleLabel: cc.Label = null;
  @property(cc.Node)
  gameOverNode: cc.Node = null;
  @property(cc.Node)
  gameCompleteNode: cc.Node = null;
  @property(cc.ParticleSystem)
  boom: cc.ParticleSystem = null;

  onLoad() {
    cc.director.preloadScene(GAME_SCENE_ENUM.MENU);
    // 物理系统
    const phyManager = cc.director.getPhysicsManager();
    phyManager.enabled = true;
    phyManager.gravity = cc.v2(0, -320 * 2);
    // 事件
    EventManager.instance.on(
      GAME_EVENT_ENUM.CHANGE_BOARD,
      this.onBoardChange,
      this
    );
    EventManager.instance.on(
      GAME_EVENT_ENUM.CHECK_CLEAR,
      this.onClearCheck,
      this
    );
    EventManager.instance.on(
      GAME_EVENT_ENUM.CHECK_LOSED,
      this.onLosedCheck,
      this
    );
    EventManager.instance.on(
      GAME_EVENT_ENUM.CHECK_COMPLETE,
      this.onCompleteCheck,
      this
    );
    EventManager.instance.on(GAME_EVENT_ENUM.PLAY_BOOM, this.onPlayBoom, this);
    EventManager.instance.on(
      GAME_EVENT_ENUM.REWORD_BACK,
      this.onRewordBack,
      this
    );
    this.gameStart();
  }

  // 开始游戏
  gameStart() {
    // 读档
    DataManager.instance.restore();
    // 初始化
    this.initGame(DataManager.instance.level);
    // 游戏状态
    DataManager.instance.gameStatus = GAME_STATUS_ENUM.RUNING;
  }

  // 重置游戏
  onGameReset() {
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    this.gameOverNode.active = false;
    this.gameCompleteNode.active = false;
    DataManager.instance.reset();
    this.gameStart();
  }

  // 下一关卡
  onGameNext() {
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    this.gameCompleteNode.active = false;
    this.gameOverNode.active = false;
    DataManager.instance.level += 1;
    DataManager.instance.reset();
    this.gameStart();
  }

  // 移出（入扩展区）
  onGameExtend() {
    if (DataManager.instance.gameStatus != GAME_STATUS_ENUM.RUNING) return;
    // slot槽数据
    const slot_blocks = DataManager.instance.blocks.filter(
      (item) => item.boardType == GAME_BOARD_ENUM.SLOT
    );
    // 排序
    sort(slot_blocks, "level");
    if (slot_blocks.length <= 0) return;
    const extend_blocks = DataManager.instance.blocks.filter(
      (item) => item.boardType == GAME_BOARD_ENUM.LEVEL_EXTEND
    );
    if (extend_blocks.length >= DataManager.instance.currentLevel.slotNum)
      return;
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    // 截取取出
    let nums = Math.min(
      3,
      DataManager.instance.currentLevel.slotNum - extend_blocks.length,
      slot_blocks.length
    );
    for (let i = 0; i < nums; i++) {
      slot_blocks[i].boardType = GAME_BOARD_ENUM.LEVEL_EXTEND;
      slot_blocks[i].rendor();
    }
  }

  // 撤销
  onGameUndo() {
    if (DataManager.instance.gameStatus != GAME_STATUS_ENUM.RUNING) return;
    // 操作记录出栈
    const block: Block = DataManager.instance.records.pop();
    if (!block) return;
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    block.toSlotCancel();
  }

  // 洗牌
  onGameShuffle() {
    if (DataManager.instance.gameStatus != GAME_STATUS_ENUM.RUNING) return;
    // 提取数据打乱然后重组
    const level_blocks = DataManager.instance.blocks.filter(
      (item) => item.boardType == GAME_BOARD_ENUM.LEVEL
    );
    if (level_blocks.length <= 0) return;
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    const contents = shuffle(pluck(level_blocks, "content"));
    let pos = 0;
    level_blocks.forEach((block) => {
      block.content = contents[pos++];
      block.rendor();
    });
  }

  // 明牌
  onClickable() {
    if (DataManager.instance.gameStatus != GAME_STATUS_ENUM.RUNING) return;
    const level_blocks = DataManager.instance.blocks.filter(
      (item) =>
        item.boardType == GAME_BOARD_ENUM.LEVEL && item.higherIds.length > 0
    );
    if (level_blocks.length <= 0) return;
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    DataManager.instance.clickable = !DataManager.instance.clickable;
    level_blocks.forEach((block) => {
      block.node.getChildByName("bg").active = !DataManager.instance.clickable;
    });
  }

  // 换区位
  onBoardChange(block: Block) {
    let board = this.boardLevelNode;
    if (block.boardType == GAME_BOARD_ENUM.SLOT) board = this.boardSlotNode;
    if (block.boardType == GAME_BOARD_ENUM.RANDOM_LEFT)
      board = this.boardRandomLeftNode;
    if (block.boardType == GAME_BOARD_ENUM.RANDOM_RIGHT)
      board = this.boardRandomRightNode;
    if (block.boardType == GAME_BOARD_ENUM.LEVEL_EXTEND)
      board = this.boardLevelExtendNode;
    if (block.boardType == GAME_BOARD_ENUM.HIDE) board = this.boardHideNode;
    block.node.setParent(board);
  }

  // 消除
  onClearCheck(block: Block) {
    // slot槽数据
    const slot_blocks = DataManager.instance.blocks.filter(
      (item) => item.boardType == GAME_BOARD_ENUM.SLOT
    );
    const targets = slot_blocks.filter((item) => item.content == block.content);
    // 判断是否消除
    if (targets.length >= DataManager.instance.currentLevel.clearableNum) {
      DataManager.instance.gameStatus = GAME_STATUS_ENUM.CLEAR;
      EventManager.instance.emit(
        GAME_EVENT_ENUM.PLAY_AUDIO,
        AUDIO_EFFECT_ENUM.CLEAR
      );
      // 清除
      targets.forEach((target) => {
        // 移除操作记录
        if (
          DataManager.instance.records.findIndex(
            (item) => item.id == target.id
          ) >= 0
        ) {
          DataManager.instance.records.splice(
            DataManager.instance.records.findIndex(
              (item) => item.id == target.id
            ),
            1
          );
        }
        // 注册动画
        const anim = target.node.getComponent(cc.Animation);
        anim.off("play", this.onClearPlay, target);
        anim.on("play", this.onClearPlay, target);
        anim.off("stop", this.onClearStop, target);
        anim.on("stop", this.onClearStop, target);
        anim.play();
        // 入隐藏区（动画结束后执行）
        // target.boardType = GAME_BOARD_ENUM.HIDE
      });
      // 是否全部清除
      // const left_blocks = DataManager.instance.blocks.filter(item => item.boardType != GAME_BOARD_ENUM.HIDE)
      // if(left_blocks.length <= 0){
      //     EventManager.instance.emit(GAME_EVENT_ENUM.CHECK_COMPLETE, this)
      // }else{
      //     DataManager.instance.gameStatus = GAME_STATUS_ENUM.RUNING
      // }
    } else {
      // 判断游戏是否结束
      if (slot_blocks.length >= DataManager.instance.currentLevel.slotNum) {
        EventManager.instance.emit(GAME_EVENT_ENUM.CHECK_LOSED, this);
      }
    }
  }

  // 失败
  onLosedCheck() {
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.LOSE
    );
    DataManager.instance.gameStatus = GAME_STATUS_ENUM.LOSED;
    this.gameOverNode.active = true;
  }

  // 成功
  onCompleteCheck() {
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.WIN
    );
    DataManager.instance.gameStatus = GAME_STATUS_ENUM.COMPLETE;
    cc.find("Canvas/GameComplete/Panel/Restart").active =
      DataManager.instance.level >= levels.length;
    cc.find("Canvas/GameComplete/Panel/Next").active =
      DataManager.instance.level < levels.length;
    this.gameCompleteNode.active = true;
  }

  // 回菜单
  onBackMenu() {
    EventManager.instance.emit(
      GAME_EVENT_ENUM.PLAY_AUDIO,
      AUDIO_EFFECT_ENUM.CLICK
    );
    cc.director.loadScene(GAME_SCENE_ENUM.MENU);
  }

  // 动画开始
  onClearPlay() {
    this.node.getChildByName("label").active = false;
    this.node.getChildByName("bg").active = false;
  }

  // 动画结束
  onClearStop() {
    this.node.getChildByName("label").active = true;
    this.node.getChildByName("bg").active = true;
    this.node.getComponent("Block").boardType = GAME_BOARD_ENUM.HIDE;
    // 判断是否全部清除
    const left_blocks = DataManager.instance.blocks.filter(
      (item) => item.boardType != GAME_BOARD_ENUM.HIDE
    );
    if (left_blocks.length <= 0) {
      EventManager.instance.emit(GAME_EVENT_ENUM.CHECK_COMPLETE, this);
    } else {
      DataManager.instance.gameStatus = GAME_STATUS_ENUM.RUNING;
    }
  }

  // 播放粒子
  onPlayBoom(pos: cc.Vec2) {
    if (this.boom) {
      this.boom.node.setPosition(pos);
      const color = new cc.Color(
        getRandom(0, 255),
        getRandom(0, 255),
        getRandom(0, 255),
        255
      );
      this.boom.startColor = this.boom.endColor = color;
      this.boom.resetSystem();
    }
  }

  // 触发激励广告
  onReword(e: any, type: string) {
    // type: 'onGameExtend' 'onGameUndo' 'onGameShuffle' 'onClickable'
    if (DataManager.instance.adOpen) {
      EventManager.instance.emit(GAME_EVENT_ENUM.PLAY_REWORD, type);
    } else {
      this[type]();
    }
  }
  // 激励广告回调
  onRewordBack(data: any) {
    if (data.status) {
      this[data.type]();
    } else {
      EventManager.instance.emit(GAME_EVENT_ENUM.PLAY_TOAST, {
        msg: data.msg,
        seconds: 2,
      });
    }
  }

  // 初始化棋盘
  initChessBox(width: number, height: number) {
    const box = new Array(width);
    for (let i = 0; i < width; i++) {
      box[i] = new Array(height);
      for (let j = 0; j < height; j++) {
        box[i][j] = { blocks: [] };
      }
    }
    return box;
  }

  createLevels(onLoad: (levels: LevelType[]) => void) {
    const oldLeves = levels;
    cc.log("createLevels");

    new Promise<cc.SpriteFrame[]>((res, rej) => {
      cc.assetManager.loadBundle("items", (err, bundle) => {
        if (err) {
          rej("load failed");
        }

        cc.log("onLoad", bundle);

        const promiseList: Promise<cc.SpriteFrame>[] = [];
        for (let i = 0; i < 21; i++) {
          promiseList.push(
            new Promise<cc.SpriteFrame>((res, reg) => {
              bundle.load(
                `${i + 1}`,
                cc.Texture2D,
                (err, texture: cc.Texture2D) => {
                  if (err) {
                    rej("load failed");
                  }
                  cc.log("loaded", texture);
                  const spriteFrame = new cc.SpriteFrame(texture);
                  res(spriteFrame);
                }
              );
            })
          );
        }

        Promise.all(promiseList)
          .then((arr) => {
            res(arr);
          })
          .catch((err) => {
            if (err) {
              rej("load failed");
            }
          });
      });
    }).then((list) => {
      //
      oldLeves.forEach((item) => {
        item.blockContentArr = list;
      });

      onLoad(oldLeves);
    });
  }

  // 初始化游戏
  initGame(num: number) {
    this.createLevels((levels) => {
      cc.log("onreceing leves", levels);

      // 获取关卡数据
      let currentLevel: LevelType = levels[num - 1];
      if (!currentLevel) {
        if (levels[0]) {
          num = 1;
          DataManager.instance.level = num;
          currentLevel = levels[0];
        } else {
          return;
        }
      }
      this.clearNodeHistory();
      DataManager.instance.currentLevel = currentLevel;
      this.titleLabel.string = `第${num}关`;

      // 计算总块数
      const blockUnit = currentLevel.clearableNum * currentLevel.blockTypeNum;
      let totalBlockNum =
        currentLevel.leftRandomBlocks +
        currentLevel.rightRandomBlocks +
        currentLevel.levelNum * currentLevel.levelBlockNum;
      if (totalBlockNum % blockUnit != 0)
        totalBlockNum = (Math.floor(totalBlockNum / blockUnit) + 1) * blockUnit;
      // 生产块信息列表
      const blockArr: BlockType[] = [];
      let contentArr: cc.Asset[] = [];
      const contentTarget = currentLevel.blockContentArr.slice(
        0,
        currentLevel.blockTypeNum
      );
      for (let i = 0; i < totalBlockNum; i++) {
        contentArr.push(contentTarget[i % currentLevel.blockTypeNum]);
      }
      contentArr = shuffle(contentArr);
      for (let i = 0; i < totalBlockNum; i++) {
        blockArr.push({
          id: i,
          x: null,
          y: null,
          width: currentLevel.chessItemWidth * 3,
          height: currentLevel.chessItemHeight * 3,
          level: 0,
          boardType: null,
          content: contentArr[i],
          higherIds: [],
          lowerIds: [],
        } as BlockType);
      }

      // 记录位置叠加器
      let pos = 0;

      // 初始化随机区中的块
      for (let i = 0; i < currentLevel.leftRandomBlocks; i++) {
        const node = cc.instantiate(
          this.blockPrefab[DataManager.instance.themeIndex]
        );
        node.setParent(this.boardRandomLeftNode);
        blockArr[pos].boardType = GAME_BOARD_ENUM.RANDOM_LEFT;
        blockArr[pos].x -= i * 5;
        blockArr[pos].y = 0;
        blockArr[pos].level -= i + 10;
        // 折叠关系
        let pre = pos - 1;
        while (pre >= 0) {
          blockArr[pos].higherIds.push(pre);
          pre--;
        }
        let next = pos + 1;
        while (next < currentLevel.leftRandomBlocks) {
          blockArr[pos].lowerIds.push(next);
          next++;
        }
        node.getComponent("Block").init(blockArr[pos]);
        pos++;
      }
      for (let i = 0; i < currentLevel.rightRandomBlocks; i++) {
        const node = cc.instantiate(
          this.blockPrefab[DataManager.instance.themeIndex]
        );
        node.setParent(this.boardRandomRightNode);
        blockArr[pos].boardType = GAME_BOARD_ENUM.RANDOM_RIGHT;
        blockArr[pos].x += i * 5;
        blockArr[pos].y = 0;
        blockArr[pos].level -= i + 10;
        let pre = pos - 1;
        while (pre >= currentLevel.leftRandomBlocks) {
          blockArr[pos].higherIds.push(pre);
          pre--;
        }
        let next = pos + 1;
        while (
          next <
          currentLevel.leftRandomBlocks + currentLevel.rightRandomBlocks
        ) {
          blockArr[pos].lowerIds.push(next);
          next++;
        }
        node.getComponent("Block").init(blockArr[pos]);
        pos++;
      }

      /**
       * 是否生成规律排列的块
       * 1. leftRandomBlocks == 0
       * 2. rightRandomBlocks == 0
       * 3. levelBlockNum % clearableNum == 0
       * 4. levelNum*levelBlockNum % clearableNum*blockTypeNum == 0
       * 5. levelBlockNum <= 16
       */
      let isRandom = true;
      if (
        currentLevel.leftRandomBlocks == 0 &&
        currentLevel.rightRandomBlocks == 0 &&
        currentLevel.levelBlockNum % currentLevel.clearableNum == 0 &&
        (currentLevel.levelNum * currentLevel.levelBlockNum) %
          (currentLevel.clearableNum * currentLevel.blockTypeNum) ==
          0 &&
        currentLevel.levelBlockNum <= 16
      ) {
        isRandom = false;
      }

      // 初始化棋盘
      const chessBox = this.initChessBox(
        currentLevel.chessWidthNum,
        currentLevel.chessHeightNum
      );
      const chessBlocks: BlockType[] = [];
      // 初始化关卡区中的块
      let remainBlockNum =
        totalBlockNum -
        currentLevel.leftRandomBlocks -
        currentLevel.rightRandomBlocks;
      // 利用剩下的块按层组成
      let minWidth = 0,
        maxWidth = currentLevel.chessWidthNum - 2,
        minHeight = 0,
        maxHeight = currentLevel.chessHeightNum - 2;
      for (let i = 0; i < currentLevel.levelNum; i++) {
        // 每一层block数量
        let blockNum = Math.min(currentLevel.levelBlockNum, remainBlockNum);
        // 到最后一层
        if (currentLevel.levelNum - 1 == i) blockNum = remainBlockNum;
        // 边界收缩逻辑处理
        if (currentLevel.blockBorderStep > 0 && i > 0) {
          // 4个方向
          switch (i % 4) {
            case 0:
              minWidth += currentLevel.blockBorderStep;
              break;
            case 3:
              maxWidth -= currentLevel.blockBorderStep;
              break;
            case 2:
              minHeight += currentLevel.blockBorderStep;
              break;
            case 1:
              maxHeight -= currentLevel.blockBorderStep;
              break;
          }
        }
        // 获取块
        const blocks = blockArr.slice(pos, pos + blockNum);
        pos += blockNum;

        // 生成块坐标
        const blockPosSet = new Set<string>();
        for (let j = 0; j < blocks.length; j++) {
          const block = blocks[j];
          let nx: number, ny: number, key: string;
          if (isRandom) {
            // 根据边界情况随机坐标
            nx = Math.floor(Math.random() * maxWidth + minWidth);
            ny = Math.floor(Math.random() * maxHeight + minHeight);
            key = `${nx}_${ny}`;
            // 同批次块只能部分重叠
            if (blockPosSet.has(key)) {
              // 出现重复循环尝试
              while (true) {
                nx = Math.floor(Math.random() * maxWidth + minWidth);
                ny = Math.floor(Math.random() * maxHeight + minHeight);
                key = `${nx}_${ny}`;
                if (!blockPosSet.has(key)) break;
              }
            }
          } else {
            // 满足规律情况，生成有规律排列的块
            const sqrt = Math.floor(Math.sqrt(currentLevel.levelBlockNum));
            nx =
              (j % sqrt) * 4 +
              Math.floor((currentLevel.chessWidthNum - 3 * sqrt) / 2);
            if (sqrt % 2 == 0) nx -= 1;
            ny = Math.floor(j / sqrt) * 5 + i;
            key = `${nx}_${ny}`;
          }

          chessBox?.[nx]?.[ny]?.blocks?.push(block);
          blockPosSet.add(key);

          // 折叠关系
          // 周围格子坐标范围
          const minX = Math.max(nx - 2, 0);
          const minY = Math.max(ny - 2, 0);
          const maxX = Math.min(nx + 3, currentLevel.chessWidthNum - 2);
          const maxY = Math.min(ny + 3, currentLevel.chessWidthNum - 2);

          // 遍历周围格子
          let maxLevel = 0;
          for (let i = minX; i < maxX; i++) {
            for (let j = minY; j < maxY; j++) {
              const nearlyBlocks = chessBox[i][j].blocks;
              if (nearlyBlocks.length > 0) {
                // 取当前位置最顶层的块
                const topestBlock = nearlyBlocks[nearlyBlocks.length - 1];
                // 排除自己
                if (topestBlock.id === block.id) continue;
                maxLevel = Math.max(maxLevel, topestBlock.level);
                block.lowerIds.push(topestBlock.id);
                topestBlock.higherIds.push(block.id);
              }
            }
          }

          block.boardType = GAME_BOARD_ENUM.LEVEL;
          block.x = nx;
          block.y = ny;
          block.level = maxLevel + 1;
          block.x = nx * currentLevel.chessItemWidth;
          block.y = ny * currentLevel.chessItemHeight;
          // 渲染
          // const node = cc.instantiate(this.blockPrefab)
          // node.getComponent('Block').init(block)
        }

        // 批次
        chessBlocks.push(...blocks);
        // 条件递进
        remainBlockNum -= blockNum;
        if (remainBlockNum <= 0) break;
      }
      // 棋盘区渲染
      chessBlocks.forEach((block) => {
        const node = cc.instantiate(
          this.blockPrefab[DataManager.instance.themeIndex]
        );
        node.getComponent("Block").init(block);
      });

      // 初始化槽位和拓展区尺寸
      const width =
        currentLevel.slotNum * currentLevel.chessItemWidth * 3 +
        (currentLevel.slotNum + 1) * 5;
      this.boardSlotNode.width = this.boardLevelExtendNode.width = width;

      // 棋盘区域居中调整
      const x =
        ((currentLevel.chessItemWidth * currentLevel.chessWidthNum) / 2) * -1 +
        currentLevel.chessWidthNum;
      const y =
        (currentLevel.chessItemHeight * currentLevel.chessHeightNum) / 2 - 230;
      this.boardLevelNode.setPosition(x, y);
    });
  }

  clearNodeHistory() {
    this.boardLevelNode.removeAllChildren();
    this.boardLevelExtendNode.removeAllChildren();
    this.boardRandomLeftNode.removeAllChildren();
    this.boardRandomRightNode.removeAllChildren();
    this.boardSlotNode.removeAllChildren();
    this.boardHideNode.removeAllChildren();
  }

  onDestroy() {
    EventManager.instance.off(GAME_EVENT_ENUM.CHANGE_BOARD, this.onBoardChange);
    EventManager.instance.off(GAME_EVENT_ENUM.CHECK_CLEAR, this.onClearCheck);
    EventManager.instance.off(GAME_EVENT_ENUM.CHECK_LOSED, this.onLosedCheck);
    EventManager.instance.off(
      GAME_EVENT_ENUM.CHECK_COMPLETE,
      this.onCompleteCheck
    );
    EventManager.instance.off(GAME_EVENT_ENUM.PLAY_BOOM, this.onPlayBoom);
    EventManager.instance.off(GAME_EVENT_ENUM.REWORD_BACK, this.onRewordBack);
  }
}
