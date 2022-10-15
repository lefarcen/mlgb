// Created by carolsail

// 左上角坐标点的节点
export function createNodeWithLT(name?: string){
    const node: cc.Node = new cc.Node()
    node.setAnchorPoint(cc.v2(0, 1));
    if(name) node.name = name
    return node  
}

// 打乱数组
export function shuffle(arr: any[]){
    let length: number = arr.length,
        randomIndex: number,
        temp: any;
    while (length) {
        randomIndex = Math.floor(Math.random() * (length--));
        temp = arr[randomIndex];
        arr[randomIndex] = arr[length];
        arr[length] = temp
    }
    return arr
}

// 点击动画
export function clickDown(node: cc.Node | undefined){
    if(!node) return
    node.setScale(0.9)
}
export function clickUp(node: cc.Node | undefined, callback?: () => void){
    if(!node) return;
    node.setScale(1)
    callback && callback()
}

// 对象数组排序
export function sort(arr: any[], key: any, flag: boolean = true){
    return arr.sort((a, b)=>{
        if(a[key] > b[key]){
            return flag ? 1 : -1
        }else if(a[key] < b[key]){
            return flag ? -1 : 1
        }else{
            return 0
        }
    })
}

// 对象中抽取某个字段为一组数据
export const pluck = <T extends Record<string, any>, K extends keyof T>(
    arr: T[],
    key: K
): Array<T[K]> => arr.map((item: T) => item[key])

// 生产随机数字
export function getRandom(lower: number, upper:number): number {
    return Math.floor(Math.random() * (upper - lower+1)) + lower;
}
