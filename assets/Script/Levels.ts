// Created by carolsail

const animals: cc.SpriteFrame[] = [
  // "🐭",
  // "🐗",
  // "🐶",
  // "🐱",
  // "🐼",
  // "🐻",
  // "🐰",
  // "🦁️",
  // "🐸",
  // "🐷",
  // "🐺",
  // "🐹",
  // "🐔",
  // "🐌",
  // "🐟",
  // "🐳",
  // "🐬",
  // "🦀️",
  // "🦞",
  // "🦔",
  // "🦈",
  // "🦝",
  // "🦉",
  // "🦊",
];

/**
 * 是否生成规律排列的块: 需要同时满足以下条件
 * 1. leftRandomBlocks == 0
 * 2. rightRandomBlocks == 0
 * 3. levelBlockNum % clearableNum == 0
 * 4. levelNum*levelBlockNum % clearableNum*blockTypeNum == 0
 * 5. levelBlockNum <= 16
 */
export const levels: LevelType[] = [
  {
    // 棋盘格子(预设每个Block占用3个格子)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // 格子大小
    chessItemWidth: 22,
    chessItemHeight: 22,
    // 槽位容纳数
    slotNum: 7,
    // 合成达成数
    clearableNum: 3,
    // 左随机区块数
    leftRandomBlocks: 0,
    // 右随机区块数
    rightRandomBlocks: 0,
    // 层数
    levelNum: 2,
    // 每层块数
    levelBlockNum: 9,
    // 块类别数
    blockTypeNum: 3,
    // 块边界收缩步长
    blockBorderStep: 1,
    // 块内容
    blockContentArr: animals,
  },
  {
    // 棋盘格子(预设每个Block占用3个格子)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // 格子大小
    chessItemWidth: 22,
    chessItemHeight: 22,
    // 槽位容纳数
    slotNum: 7,
    // 合成达成数
    clearableNum: 3,
    // 左随机区块数
    leftRandomBlocks: 4,
    // 右随机区块数
    rightRandomBlocks: 4,
    // 层数
    levelNum: 4,
    // 每层块数
    levelBlockNum: 9,
    // 块类别数
    blockTypeNum: 6,
    // 块边界收缩步长
    blockBorderStep: 1,
    // 块内容
    blockContentArr: animals,
  },
  {
    // 棋盘格子(预设每个Block占用3个格子)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // 格子大小
    chessItemWidth: 22,
    chessItemHeight: 22,
    // 槽位容纳数
    slotNum: 7,
    // 合成达成数
    clearableNum: 3,
    // 左随机区块数
    leftRandomBlocks: 6,
    // 右随机区块数
    rightRandomBlocks: 6,
    // 层数
    levelNum: 8,
    // 每层块数
    levelBlockNum: 16,
    // 块类别数
    blockTypeNum: 12,
    // 块边界收缩步长
    blockBorderStep: 2,
    // 块内容
    blockContentArr: animals,
  },
  {
    // 棋盘格子(预设每个Block占用3个格子)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // 格子大小
    chessItemWidth: 22,
    chessItemHeight: 22,
    // 槽位容纳数
    slotNum: 7,
    // 合成达成数
    clearableNum: 3,
    // 左随机区块数
    leftRandomBlocks: 8,
    // 右随机区块数
    rightRandomBlocks: 8,
    // 层数
    levelNum: 10,
    // 每层块数
    levelBlockNum: 18,
    // 块类别数
    blockTypeNum: 16,
    // 块边界收缩步长
    blockBorderStep: 3,
    // 块内容
    blockContentArr: animals,
  },
];
