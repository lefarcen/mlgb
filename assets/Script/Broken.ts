// Created by carolsail
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    rb: cc.RigidBody = null;

    onLoad () {
        this.rb = this.node.getComponent(cc.RigidBody)
        // 5s消失
        this.scheduleOnce(()=>{
            this.node.parent && this.node.parent.destroy();
        }, 0);
    }

    force(x: number, y: number){
        const lv = this.rb.linearVelocity
        this.scheduleOnce(()=>{
            lv.x = x
            lv.y = y
            this.rb.linearVelocity = lv
        }, 0)
    }
}
