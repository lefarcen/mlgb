// Created by carolsail

const animals: cc.SpriteFrame[] = [
  // "ð­",
  // "ð",
  // "ð¶",
  // "ð±",
  // "ð¼",
  // "ð»",
  // "ð°",
  // "ð¦ï¸",
  // "ð¸",
  // "ð·",
  // "ðº",
  // "ð¹",
  // "ð",
  // "ð",
  // "ð",
  // "ð³",
  // "ð¬",
  // "ð¦ï¸",
  // "ð¦",
  // "ð¦",
  // "ð¦",
  // "ð¦",
  // "ð¦",
  // "ð¦",
];

/**
 * æ¯å¦çæè§å¾æåçå: éè¦åæ¶æ»¡è¶³ä»¥ä¸æ¡ä»¶
 * 1. leftRandomBlocks == 0
 * 2. rightRandomBlocks == 0
 * 3. levelBlockNum % clearableNum == 0
 * 4. levelNum*levelBlockNum % clearableNum*blockTypeNum == 0
 * 5. levelBlockNum <= 16
 */
export const levels: LevelType[] = [
  {
    // æ£çæ ¼å­(é¢è®¾æ¯ä¸ªBlockå ç¨3ä¸ªæ ¼å­)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // æ ¼å­å¤§å°
    chessItemWidth: 22,
    chessItemHeight: 22,
    // æ§½ä½å®¹çº³æ°
    slotNum: 7,
    // åæè¾¾ææ°
    clearableNum: 3,
    // å·¦éæºåºåæ°
    leftRandomBlocks: 0,
    // å³éæºåºåæ°
    rightRandomBlocks: 0,
    // å±æ°
    levelNum: 2,
    // æ¯å±åæ°
    levelBlockNum: 9,
    // åç±»å«æ°
    blockTypeNum: 3,
    // åè¾¹çæ¶ç¼©æ­¥é¿
    blockBorderStep: 1,
    // ååå®¹
    blockContentArr: animals,
  },
  {
    // æ£çæ ¼å­(é¢è®¾æ¯ä¸ªBlockå ç¨3ä¸ªæ ¼å­)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // æ ¼å­å¤§å°
    chessItemWidth: 22,
    chessItemHeight: 22,
    // æ§½ä½å®¹çº³æ°
    slotNum: 7,
    // åæè¾¾ææ°
    clearableNum: 3,
    // å·¦éæºåºåæ°
    leftRandomBlocks: 4,
    // å³éæºåºåæ°
    rightRandomBlocks: 4,
    // å±æ°
    levelNum: 4,
    // æ¯å±åæ°
    levelBlockNum: 9,
    // åç±»å«æ°
    blockTypeNum: 6,
    // åè¾¹çæ¶ç¼©æ­¥é¿
    blockBorderStep: 1,
    // ååå®¹
    blockContentArr: animals,
  },
  {
    // æ£çæ ¼å­(é¢è®¾æ¯ä¸ªBlockå ç¨3ä¸ªæ ¼å­)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // æ ¼å­å¤§å°
    chessItemWidth: 22,
    chessItemHeight: 22,
    // æ§½ä½å®¹çº³æ°
    slotNum: 7,
    // åæè¾¾ææ°
    clearableNum: 3,
    // å·¦éæºåºåæ°
    leftRandomBlocks: 6,
    // å³éæºåºåæ°
    rightRandomBlocks: 6,
    // å±æ°
    levelNum: 8,
    // æ¯å±åæ°
    levelBlockNum: 16,
    // åç±»å«æ°
    blockTypeNum: 12,
    // åè¾¹çæ¶ç¼©æ­¥é¿
    blockBorderStep: 2,
    // ååå®¹
    blockContentArr: animals,
  },
  {
    // æ£çæ ¼å­(é¢è®¾æ¯ä¸ªBlockå ç¨3ä¸ªæ ¼å­)
    chessWidthNum: 20,
    chessHeightNum: 20,
    // æ ¼å­å¤§å°
    chessItemWidth: 22,
    chessItemHeight: 22,
    // æ§½ä½å®¹çº³æ°
    slotNum: 7,
    // åæè¾¾ææ°
    clearableNum: 3,
    // å·¦éæºåºåæ°
    leftRandomBlocks: 8,
    // å³éæºåºåæ°
    rightRandomBlocks: 8,
    // å±æ°
    levelNum: 10,
    // æ¯å±åæ°
    levelBlockNum: 18,
    // åç±»å«æ°
    blockTypeNum: 16,
    // åè¾¹çæ¶ç¼©æ­¥é¿
    blockBorderStep: 3,
    // ååå®¹
    blockContentArr: animals,
  },
];
