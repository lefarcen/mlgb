
// 关卡类型
interface LevelType {
    // 棋盘格子(预设每个Block占用3个格子)
    chessWidthNum: number;
    chessHeightNum: number;
    // 格子大小
    chessItemWidth: number;
    chessItemHeight: number;
    // 槽位容纳数
    slotNum: number;
    // 合成达成数
    clearableNum: number;
    // 左随机区块数
    leftRandomBlocks: number;
    // 右随机区块数
    rightRandomBlocks: number;
    // 层数
    levelNum: number;
    // 每层块数
    levelBlockNum: number;
    // 块类别数
    blockTypeNum: number;
    // 块边界收缩步长
    blockBorderStep: number;
    // 块内容
    blockContentArr: cc.SpriteFrame[];

    // 槽容量
    // slotNum: number;
    // // 左随机区块数
    // leftRandomBlocks: number;
    // // 右随机区块数
    // rightRandomBlocks: number;
    // // 需要多少个一样块的才能合成
    // composeNum: number;
    // // 动物类别数
    // typeNum: number;
    // // 每层块数（大致）
    // levelBlockNum: number;
    // // 边界收缩步长
    // borderStep: number;
    // // 总层数（最小为 2）
    // levelNum: number;
    // // 动物数组
    // animals: string[];
}

// 块类型
interface BlockType {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    level: number;
    boardType: string;
    content: cc.Asset;
    // 被哪些block压着
    higherIds: number[];
    // 压着哪些block
    lowerIds: number[];
    // id: number;
    // x: number;
    // y: number;
    // level: number;
    // type: string;
    // // 压住的其他块
    // higherThanBlocks: BlockType[];
    // // 被哪些块压住（为空表示可点击）
    // lowerThanBlocks: BlockType[];
    // // 出自哪个区
    // board: string;
}

// 格子单元
interface ChessBoardUnitType {
    blocks: BlockType[];
}
