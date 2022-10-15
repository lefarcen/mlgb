window.__require=function e(t,o,n){function r(i,a){if(!o[i]){if(!t[i]){var s=i.split("/");if(s=s[s.length-1],!t[s]){var l="function"==typeof __require&&__require;if(!a&&l)return l(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+i+"'")}i=s}var u=o[i]={exports:{}};t[i][0].call(u.exports,function(e){return r(t[i][1][e]||e)},u,u.exports,e,t,o,n)}return o[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<n.length;i++)r(n[i]);return r}({Block:[function(e,t,o){"use strict";cc._RF.push(t,"4b71bAMn1ZNcZb+rcc5IMJQ","Block");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,s=(i.property,e("./Enum")),l=e("./DataManager"),u=e("./EventManager"),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.higherIds=[],t.lowerIds=[],t}return r(t,e),Object.defineProperty(t.prototype,"boardType",{get:function(){return this._boardType},set:function(e){this.boardType!=e&&(this._boardType=e,u.default.instance.emit(s.GAME_EVENT_ENUM.CHANGE_BOARD,this))},enumerable:!1,configurable:!0}),t.prototype.onLoad=function(){var e=cc.Node.EventType,t=e.TOUCH_START,o=e.TOUCH_CANCEL,n=e.TOUCH_END;this.node.on(t,this.onTouchstart,this),this.node.on(n,this.onTouchend,this),this.node.on(o,this.onTouchend,this)},t.prototype.init=function(e){Object.assign(this,e),l.default.instance.blocks.push(this),this.old_boardType=e.boardType,this.old_x=e.x,this.old_y=e.y,this.old_width=e.width,this.old_height=e.height,this.old_level=e.level,this.rendor()},t.prototype.rendor=function(){this.node.x=this.x,this.node.y=this.y,this.node.width=this.width,this.node.height=this.height,this.node.zIndex=this.level,this.node.getChildByName("bg").active=!this.clickable(),this.node.getChildByName("item").getComponent(cc.Sprite).spriteFrame=this.content},t.prototype.clickable=function(){switch(this.boardType){case s.GAME_BOARD_ENUM.LEVEL:return!!l.default.instance.clickable||this.higherIds.length<=0;case s.GAME_BOARD_ENUM.RANDOM_LEFT:case s.GAME_BOARD_ENUM.RANDOM_RIGHT:return this.higherIds.length<=0;case s.GAME_BOARD_ENUM.LEVEL_EXTEND:return!0;default:return!1}},t.prototype.toSlot=function(){var e=this;this.lowerIds.forEach(function(t){var o=l.default.instance.blocks.find(function(e){return e.id==t});o.higherIds.findIndex(function(t){return t==e.id})>=0&&o.higherIds.splice(o.higherIds.findIndex(function(t){return t==e.id}),1),o.rendor()}),-1==l.default.instance.records.findIndex(function(t){return t.id==e.id})&&l.default.instance.records.push(this),this.level=0,this.y=0,this.boardType=s.GAME_BOARD_ENUM.SLOT;var t=l.default.instance.blocks.filter(function(e){return e.boardType==s.GAME_BOARD_ENUM.SLOT}),o=l.default.instance.blocks.filter(function(t){return t.content==e.content&&t.boardType==s.GAME_BOARD_ENUM.SLOT}),n=0;t.forEach(function(e){e.level>n&&(n=e.level)}),o.forEach(function(e){e.level=n+1,e.rendor()}),u.default.instance.emit(s.GAME_EVENT_ENUM.CHECK_CLEAR,this)},t.prototype.toSlotCancel=function(){var e=this;l.default.instance.blocks.filter(function(t){return e.lowerIds.includes(t.id)}).forEach(function(t){t.higherIds&&(t.higherIds.push(e.id),t.rendor())}),this.level=this.old_level,this.y=this.old_y,this.boardType=this.old_boardType,this.rendor()},t.prototype.onTouchstart=function(e){if(l.default.instance.gameStatus==s.GAME_STATUS_ENUM.RUNING&&this.clickable()){u.default.instance.emit(s.GAME_EVENT_ENUM.PLAY_AUDIO,s.AUDIO_EFFECT_ENUM.SHOOT);var t=e.getLocation(),o=cc.find("Canvas").convertToNodeSpaceAR(t);u.default.instance.emit(s.GAME_EVENT_ENUM.PLAY_BROKEN,o),this.toSlot()}},t.prototype.onTouchend=function(){},t.prototype.onDestroy=function(){var e=cc.Node.EventType,t=e.TOUCH_START,o=e.TOUCH_CANCEL,n=e.TOUCH_END;this.node.off(t,this.onTouchstart),this.node.off(n,this.onTouchend),this.node.off(o,this.onTouchend)},c([a],t)}(cc.Component);o.default=d,cc._RF.pop()},{"./DataManager":"DataManager","./Enum":"Enum","./EventManager":"EventManager"}],BrokenManager:[function(e,t,o){"use strict";cc._RF.push(t,"71c7bXMtodKVr7UVH2z6vBT","BrokenManager");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=e("./EventManager"),a=e("./Enum"),s=e("./Utils"),l=cc._decorator,u=l.ccclass,d=l.property,f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.brokenPrefab=[],t}return r(t,e),t.prototype.onLoad=function(){i.default.instance.on(a.GAME_EVENT_ENUM.PLAY_BROKEN,this.onBrokenBuild,this)},t.prototype.onBrokenBuild=function(e){var t=new cc.Node;t.parent=this.node;for(var o=s.getRandom(2,4),n=0;n<o;n++){var r=n%4;if(this.brokenPrefab[r]){var c=cc.instantiate(this.brokenPrefab[r]);c.parent=t,e.x=e.x+n,e.y=e.y+n,c.setPosition(e);var i=s.getRandom(-200,200),a=0;n%2==0&&(a=s.getRandom(300,600)),n%2==1&&(a=s.getRandom(-300,-100)),c.getComponent("Broken").force(i,a)}}},t.prototype.onDestroy=function(){i.default.instance.off(a.GAME_EVENT_ENUM.PLAY_BROKEN,this.onBrokenBuild)},c([d([cc.Prefab])],t.prototype,"brokenPrefab",void 0),c([u],t)}(cc.Component);o.default=f,cc._RF.pop()},{"./Enum":"Enum","./EventManager":"EventManager","./Utils":"Utils"}],Broken:[function(e,t,o){"use strict";cc._RF.push(t,"c226cidsrRAGKBcEktYaf2y","Broken");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,s=(i.property,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.rb=null,t}return r(t,e),t.prototype.onLoad=function(){var e=this;this.rb=this.node.getComponent(cc.RigidBody),this.scheduleOnce(function(){e.node.parent&&e.node.parent.destroy()},0)},t.prototype.force=function(e,t){var o=this,n=this.rb.linearVelocity;this.scheduleOnce(function(){n.x=e,n.y=t,o.rb.linearVelocity=n},0)},c([a],t)}(cc.Component));o.default=s,cc._RF.pop()},{}],DataManager:[function(e,t,o){"use strict";cc._RF.push(t,"20ea9h8HypImLlMSrrul0b1","DataManager"),Object.defineProperty(o,"__esModule",{value:!0});var n=e("./Enum"),r=function(){function e(){this._level=1,this.blocks=[],this.records=[],this.currentLevel=null,this.gameStatus=n.GAME_STATUS_ENUM.INIT,this.clickable=!1,this.themeIndex=2,this.adOpen=!1}return e.getInstance=function(){return null===this._instance&&(this._instance=new this),this._instance},Object.defineProperty(e,"instance",{get:function(){return this.getInstance()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"level",{get:function(){return this._level},set:function(e){this._level=e,this.save()},enumerable:!1,configurable:!0}),e.prototype.reset=function(){this.blocks=[],this.records=[],this.currentLevel=null,this.gameStatus=n.GAME_STATUS_ENUM.INIT,this.clickable=!1},e.prototype.save=function(){cc.sys.localStorage.setItem("SHEEP_STORAGE_KEY",JSON.stringify({level:this.level}))},e.prototype.restore=function(){var e=cc.sys.localStorage.getItem("SHEEP_STORAGE_KEY");try{var t=JSON.parse(e);this.level=(null==t?void 0:t.level)||1}catch(o){this.level=1,this.reset()}},e._instance=null,e}();o.default=r,cc._RF.pop()},{"./Enum":"Enum"}],Enum:[function(e,t,o){"use strict";cc._RF.push(t,"4af04WiEYdKBox6f7XMj7ND","Enum"),Object.defineProperty(o,"__esModule",{value:!0}),o.GAME_SCENE_ENUM=o.AUDIO_EFFECT_ENUM=o.GAME_EVENT_ENUM=o.GAME_BOARD_ENUM=o.GAME_STATUS_ENUM=void 0,function(e){e[e.INIT=0]="INIT",e[e.RUNING=1]="RUNING",e[e.CLEAR=2]="CLEAR",e[e.LOSED=3]="LOSED",e[e.COMPLETE=4]="COMPLETE"}(o.GAME_STATUS_ENUM||(o.GAME_STATUS_ENUM={})),function(e){e.LEVEL="LEVEL",e.LEVEL_EXTEND="LEVEL_EXTEND",e.RANDOM_LEFT="RANDOM_LEFT",e.RANDOM_RIGHT="RANDOM_RIGHT",e.SLOT="SLOT",e.HIDE="HIDE"}(o.GAME_BOARD_ENUM||(o.GAME_BOARD_ENUM={})),function(e){e.CHECK_CLEAR="CHECK_CLEAR",e.CHECK_LOSED="CHECK_LOSED",e.CHECK_COMPLETE="CHECK_COMPLETE",e.CHANGE_BOARD="CHANGE_BOARD",e.PLAY_AUDIO="PLAY_AUDIO",e.PLAY_BOOM="PLAY_BOOM",e.PLAY_REWORD="PLAY_REWORD",e.REWORD_BACK="REWORD_BACK",e.PLAY_TOAST="PLAY_TOAST",e.PLAY_BROKEN="PLAY_BROKEN"}(o.GAME_EVENT_ENUM||(o.GAME_EVENT_ENUM={})),function(e){e[e.CLICK=0]="CLICK",e[e.CLEAR=1]="CLEAR",e[e.SHOOT=2]="SHOOT",e[e.LOSE=3]="LOSE",e[e.WIN=4]="WIN"}(o.AUDIO_EFFECT_ENUM||(o.AUDIO_EFFECT_ENUM={})),function(e){e.MENU="Menu",e.GAME="Game"}(o.GAME_SCENE_ENUM||(o.GAME_SCENE_ENUM={})),cc._RF.pop()},{}],EventManager:[function(e,t,o){"use strict";cc._RF.push(t,"18c2fxCSqJDN5h8ePTTIR9L","EventManager"),Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function e(){this.eventMap=new Map}return e.getInstance=function(){return null===this._instance&&(this._instance=new this),this._instance},Object.defineProperty(e,"instance",{get:function(){return this.getInstance()},enumerable:!1,configurable:!0}),e.prototype.on=function(e,t,o){this.eventMap.has(e)?this.eventMap.get(e).push({event:t,context:o}):this.eventMap.set(e,[{event:t,context:o}])},e.prototype.off=function(e,t){if(this.eventMap.has(e)){var o=this.eventMap.get(e),n=o.findIndex(function(e){return e.event==t});n>-1&&o.splice(n,1)}},e.prototype.emit=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];if(this.eventMap.has(e)){var n=this.eventMap.get(e);n.forEach(function(e){var o=e.event,n=e.context;n?o.apply(n,t):o(t)})}},e.prototype.clear=function(){this.eventMap.clear()},e._instance=null,e}();o.default=n,cc._RF.pop()},{}],GameManager:[function(e,t,o){"use strict";cc._RF.push(t,"8218aOTCVJOtIvpMkY3PEos","GameManager");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,s=i.property,l=e("./Enum"),u=e("./Levels"),d=e("./DataManager"),f=e("./EventManager"),h=e("./Utils"),E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.boardLevelNode=null,t.boardLevelExtendNode=null,t.boardRandomLeftNode=null,t.boardRandomRightNode=null,t.boardSlotNode=null,t.boardHideNode=null,t.blockPrefab=[],t.titleLabel=null,t.gameOverNode=null,t.gameCompleteNode=null,t.boom=null,t}return r(t,e),t.prototype.onLoad=function(){cc.director.preloadScene(l.GAME_SCENE_ENUM.MENU);var e=cc.director.getPhysicsManager();e.enabled=!0,e.gravity=cc.v2(0,-640),f.default.instance.on(l.GAME_EVENT_ENUM.CHANGE_BOARD,this.onBoardChange,this),f.default.instance.on(l.GAME_EVENT_ENUM.CHECK_CLEAR,this.onClearCheck,this),f.default.instance.on(l.GAME_EVENT_ENUM.CHECK_LOSED,this.onLosedCheck,this),f.default.instance.on(l.GAME_EVENT_ENUM.CHECK_COMPLETE,this.onCompleteCheck,this),f.default.instance.on(l.GAME_EVENT_ENUM.PLAY_BOOM,this.onPlayBoom,this),f.default.instance.on(l.GAME_EVENT_ENUM.REWORD_BACK,this.onRewordBack,this),this.gameStart()},t.prototype.gameStart=function(){d.default.instance.restore(),this.initGame(d.default.instance.level),d.default.instance.gameStatus=l.GAME_STATUS_ENUM.RUNING},t.prototype.onGameReset=function(){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK),this.gameOverNode.active=!1,this.gameCompleteNode.active=!1,d.default.instance.reset(),this.gameStart()},t.prototype.onGameNext=function(){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK),this.gameCompleteNode.active=!1,this.gameOverNode.active=!1,d.default.instance.level+=1,d.default.instance.reset(),this.gameStart()},t.prototype.onGameExtend=function(){if(d.default.instance.gameStatus==l.GAME_STATUS_ENUM.RUNING){var e=d.default.instance.blocks.filter(function(e){return e.boardType==l.GAME_BOARD_ENUM.SLOT});if(h.sort(e,"level"),!(e.length<=0)){var t=d.default.instance.blocks.filter(function(e){return e.boardType==l.GAME_BOARD_ENUM.LEVEL_EXTEND});if(!(t.length>=d.default.instance.currentLevel.slotNum)){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK);for(var o=Math.min(3,d.default.instance.currentLevel.slotNum-t.length,e.length),n=0;n<o;n++)e[n].boardType=l.GAME_BOARD_ENUM.LEVEL_EXTEND,e[n].rendor()}}}},t.prototype.onGameUndo=function(){if(d.default.instance.gameStatus==l.GAME_STATUS_ENUM.RUNING){var e=d.default.instance.records.pop();e&&(f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK),e.toSlotCancel())}},t.prototype.onGameShuffle=function(){if(d.default.instance.gameStatus==l.GAME_STATUS_ENUM.RUNING){var e=d.default.instance.blocks.filter(function(e){return e.boardType==l.GAME_BOARD_ENUM.LEVEL});if(!(e.length<=0)){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK);var t=h.shuffle(h.pluck(e,"content")),o=0;e.forEach(function(e){e.content=t[o++],e.rendor()})}}},t.prototype.onClickable=function(){if(d.default.instance.gameStatus==l.GAME_STATUS_ENUM.RUNING){var e=d.default.instance.blocks.filter(function(e){return e.boardType==l.GAME_BOARD_ENUM.LEVEL&&e.higherIds.length>0});e.length<=0||(f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK),d.default.instance.clickable=!d.default.instance.clickable,e.forEach(function(e){e.node.getChildByName("bg").active=!d.default.instance.clickable}))}},t.prototype.onBoardChange=function(e){var t=this.boardLevelNode;e.boardType==l.GAME_BOARD_ENUM.SLOT&&(t=this.boardSlotNode),e.boardType==l.GAME_BOARD_ENUM.RANDOM_LEFT&&(t=this.boardRandomLeftNode),e.boardType==l.GAME_BOARD_ENUM.RANDOM_RIGHT&&(t=this.boardRandomRightNode),e.boardType==l.GAME_BOARD_ENUM.LEVEL_EXTEND&&(t=this.boardLevelExtendNode),e.boardType==l.GAME_BOARD_ENUM.HIDE&&(t=this.boardHideNode),e.node.setParent(t)},t.prototype.onClearCheck=function(e){var t=this,o=d.default.instance.blocks.filter(function(e){return e.boardType==l.GAME_BOARD_ENUM.SLOT}),n=o.filter(function(t){return t.content==e.content});n.length>=d.default.instance.currentLevel.clearableNum?(d.default.instance.gameStatus=l.GAME_STATUS_ENUM.CLEAR,f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLEAR),n.forEach(function(e){d.default.instance.records.findIndex(function(t){return t.id==e.id})>=0&&d.default.instance.records.splice(d.default.instance.records.findIndex(function(t){return t.id==e.id}),1);var o=e.node.getComponent(cc.Animation);o.off("play",t.onClearPlay,e),o.on("play",t.onClearPlay,e),o.off("stop",t.onClearStop,e),o.on("stop",t.onClearStop,e),o.play()})):o.length>=d.default.instance.currentLevel.slotNum&&f.default.instance.emit(l.GAME_EVENT_ENUM.CHECK_LOSED,this)},t.prototype.onLosedCheck=function(){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.LOSE),d.default.instance.gameStatus=l.GAME_STATUS_ENUM.LOSED,this.gameOverNode.active=!0},t.prototype.onCompleteCheck=function(){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.WIN),d.default.instance.gameStatus=l.GAME_STATUS_ENUM.COMPLETE,cc.find("Canvas/GameComplete/Panel/Restart").active=d.default.instance.level>=u.levels.length,cc.find("Canvas/GameComplete/Panel/Next").active=d.default.instance.level<u.levels.length,this.gameCompleteNode.active=!0},t.prototype.onBackMenu=function(){f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_AUDIO,l.AUDIO_EFFECT_ENUM.CLICK),cc.director.loadScene(l.GAME_SCENE_ENUM.MENU)},t.prototype.onClearPlay=function(){this.node.getChildByName("label").active=!1,this.node.getChildByName("bg").active=!1},t.prototype.onClearStop=function(){this.node.getChildByName("label").active=!0,this.node.getChildByName("bg").active=!0,this.node.getComponent("Block").boardType=l.GAME_BOARD_ENUM.HIDE,d.default.instance.blocks.filter(function(e){return e.boardType!=l.GAME_BOARD_ENUM.HIDE}).length<=0?f.default.instance.emit(l.GAME_EVENT_ENUM.CHECK_COMPLETE,this):d.default.instance.gameStatus=l.GAME_STATUS_ENUM.RUNING},t.prototype.onPlayBoom=function(e){if(this.boom){this.boom.node.setPosition(e);var t=new cc.Color(h.getRandom(0,255),h.getRandom(0,255),h.getRandom(0,255),255);this.boom.startColor=this.boom.endColor=t,this.boom.resetSystem()}},t.prototype.onReword=function(e,t){d.default.instance.adOpen?f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_REWORD,t):this[t]()},t.prototype.onRewordBack=function(e){e.status?this[e.type]():f.default.instance.emit(l.GAME_EVENT_ENUM.PLAY_TOAST,{msg:e.msg,seconds:2})},t.prototype.initChessBox=function(e,t){for(var o=new Array(e),n=0;n<e;n++){o[n]=new Array(t);for(var r=0;r<t;r++)o[n][r]={blocks:[]}}return o},t.prototype.createLevels=function(e){var t=u.levels;cc.log("createLevels"),new Promise(function(e,t){cc.assetManager.loadBundle("items",function(o,n){o&&t("load failed"),cc.log("onLoad",n);for(var r=[],c=function(e){r.push(new Promise(function(o){n.load(""+(e+1),cc.Texture2D,function(e,n){e&&t("load failed"),cc.log("loaded",n);var r=new cc.SpriteFrame(n);o(r)})}))},i=0;i<21;i++)c(i);Promise.all(r).then(function(t){e(t)}).catch(function(e){e&&t("load failed")})})}).then(function(o){t.forEach(function(e){e.blockContentArr=o}),e(t)})},t.prototype.initGame=function(e){var t=this;this.createLevels(function(o){var n,r,c;cc.log("onreceing leves",o);var i=o[e-1];if(!i){if(!o[0])return;e=1,d.default.instance.level=e,i=o[0]}t.clearNodeHistory(),d.default.instance.currentLevel=i,t.titleLabel.string="\u7b2c"+e+"\u5173";var a=i.clearableNum*i.blockTypeNum,s=i.leftRandomBlocks+i.rightRandomBlocks+i.levelNum*i.levelBlockNum;s%a!=0&&(s=(Math.floor(s/a)+1)*a);for(var u=[],f=[],E=i.blockContentArr.slice(0,i.blockTypeNum),p=0;p<s;p++)f.push(E[p%i.blockTypeNum]);for(f=h.shuffle(f),p=0;p<s;p++)u.push({id:p,x:null,y:null,width:3*i.chessItemWidth,height:3*i.chessItemHeight,level:0,boardType:null,content:f[p],higherIds:[],lowerIds:[]});var _=0;for(p=0;p<i.leftRandomBlocks;p++){(v=cc.instantiate(t.blockPrefab[d.default.instance.themeIndex])).setParent(t.boardRandomLeftNode),u[_].boardType=l.GAME_BOARD_ENUM.RANDOM_LEFT,u[_].x-=5*p,u[_].y=0,u[_].level-=p+10;for(var N=_-1;N>=0;)u[_].higherIds.push(N),N--;for(var M=_+1;M<i.leftRandomBlocks;)u[_].lowerIds.push(M),M++;v.getComponent("Block").init(u[_]),_++}for(p=0;p<i.rightRandomBlocks;p++){var v;for((v=cc.instantiate(t.blockPrefab[d.default.instance.themeIndex])).setParent(t.boardRandomRightNode),u[_].boardType=l.GAME_BOARD_ENUM.RANDOM_RIGHT,u[_].x+=5*p,u[_].y=0,u[_].level-=p+10,N=_-1;N>=i.leftRandomBlocks;)u[_].higherIds.push(N),N--;for(M=_+1;M<i.leftRandomBlocks+i.rightRandomBlocks;)u[_].lowerIds.push(M),M++;v.getComponent("Block").init(u[_]),_++}var m=!0;0==i.leftRandomBlocks&&0==i.rightRandomBlocks&&i.levelBlockNum%i.clearableNum==0&&i.levelNum*i.levelBlockNum%(i.clearableNum*i.blockTypeNum)==0&&i.levelBlockNum<=16&&(m=!1);var y=t.initChessBox(i.chessWidthNum,i.chessHeightNum),A=[],g=s-i.leftRandomBlocks-i.rightRandomBlocks,b=0,O=i.chessWidthNum-2,T=0,R=i.chessHeightNum-2;for(p=0;p<i.levelNum;p++){var C=Math.min(i.levelBlockNum,g);if(i.levelNum-1==p&&(C=g),i.blockBorderStep>0&&p>0)switch(p%4){case 0:b+=i.blockBorderStep;break;case 3:O-=i.blockBorderStep;break;case 2:T+=i.blockBorderStep;break;case 1:R-=i.blockBorderStep}var U=u.slice(_,_+C);_+=C;for(var L=new Set,D=0;D<U.length;D++){var B=U[D],k=void 0,I=void 0,G=void 0;if(m){if(G=(k=Math.floor(Math.random()*O+b))+"_"+(I=Math.floor(Math.random()*R+T)),L.has(G))for(;G=(k=Math.floor(Math.random()*O+b))+"_"+(I=Math.floor(Math.random()*R+T)),L.has(G););}else{var P=Math.floor(Math.sqrt(i.levelBlockNum));k=D%P*4+Math.floor((i.chessWidthNum-3*P)/2),P%2==0&&(k-=1),G=k+"_"+(I=5*Math.floor(D/P)+p)}null===(c=null===(r=null===(n=null==y?void 0:y[k])||void 0===n?void 0:n[I])||void 0===r?void 0:r.blocks)||void 0===c||c.push(B),L.add(G);for(var S=Math.max(k-2,0),w=Math.max(I-2,0),j=Math.min(k+3,i.chessWidthNum-2),F=Math.min(I+3,i.chessWidthNum-2),H=0,x=S;x<j;x++)for(var V=w;V<F;V++){var K=y[x][V].blocks;if(K.length>0){var W=K[K.length-1];if(W.id===B.id)continue;H=Math.max(H,W.level),B.lowerIds.push(W.id),W.higherIds.push(B.id)}}B.boardType=l.GAME_BOARD_ENUM.LEVEL,B.x=k,B.y=I,B.level=H+1,B.x=k*i.chessItemWidth,B.y=I*i.chessItemHeight}if(A.push.apply(A,U),(g-=C)<=0)break}A.forEach(function(e){cc.instantiate(t.blockPrefab[d.default.instance.themeIndex]).getComponent("Block").init(e)});var Y=i.slotNum*i.chessItemWidth*3+5*(i.slotNum+1);t.boardSlotNode.width=t.boardLevelExtendNode.width=Y;var q=i.chessItemWidth*i.chessWidthNum/2*-1+i.chessWidthNum,J=i.chessItemHeight*i.chessHeightNum/2-230;t.boardLevelNode.setPosition(q,J)})},t.prototype.clearNodeHistory=function(){this.boardLevelNode.removeAllChildren(),this.boardLevelExtendNode.removeAllChildren(),this.boardRandomLeftNode.removeAllChildren(),this.boardRandomRightNode.removeAllChildren(),this.boardSlotNode.removeAllChildren(),this.boardHideNode.removeAllChildren()},t.prototype.onDestroy=function(){f.default.instance.off(l.GAME_EVENT_ENUM.CHANGE_BOARD,this.onBoardChange),f.default.instance.off(l.GAME_EVENT_ENUM.CHECK_CLEAR,this.onClearCheck),f.default.instance.off(l.GAME_EVENT_ENUM.CHECK_LOSED,this.onLosedCheck),f.default.instance.off(l.GAME_EVENT_ENUM.CHECK_COMPLETE,this.onCompleteCheck),f.default.instance.off(l.GAME_EVENT_ENUM.PLAY_BOOM,this.onPlayBoom),f.default.instance.off(l.GAME_EVENT_ENUM.REWORD_BACK,this.onRewordBack)},c([s(cc.Node)],t.prototype,"boardLevelNode",void 0),c([s(cc.Node)],t.prototype,"boardLevelExtendNode",void 0),c([s(cc.Node)],t.prototype,"boardRandomLeftNode",void 0),c([s(cc.Node)],t.prototype,"boardRandomRightNode",void 0),c([s(cc.Node)],t.prototype,"boardSlotNode",void 0),c([s(cc.Node)],t.prototype,"boardHideNode",void 0),c([s([cc.Prefab])],t.prototype,"blockPrefab",void 0),c([s(cc.Label)],t.prototype,"titleLabel",void 0),c([s(cc.Node)],t.prototype,"gameOverNode",void 0),c([s(cc.Node)],t.prototype,"gameCompleteNode",void 0),c([s(cc.ParticleSystem)],t.prototype,"boom",void 0),c([a],t)}(cc.Component);o.default=E,cc._RF.pop()},{"./DataManager":"DataManager","./Enum":"Enum","./EventManager":"EventManager","./Levels":"Levels","./Utils":"Utils"}],Levels:[function(e,t,o){"use strict";cc._RF.push(t,"6b21fP28e9JmZd/hLhgTFdL","Levels"),Object.defineProperty(o,"__esModule",{value:!0}),o.levels=void 0;var n=[];o.levels=[{chessWidthNum:20,chessHeightNum:20,chessItemWidth:22,chessItemHeight:22,slotNum:7,clearableNum:3,leftRandomBlocks:0,rightRandomBlocks:0,levelNum:2,levelBlockNum:9,blockTypeNum:3,blockBorderStep:1,blockContentArr:n},{chessWidthNum:20,chessHeightNum:20,chessItemWidth:22,chessItemHeight:22,slotNum:7,clearableNum:3,leftRandomBlocks:4,rightRandomBlocks:4,levelNum:4,levelBlockNum:9,blockTypeNum:6,blockBorderStep:1,blockContentArr:n},{chessWidthNum:20,chessHeightNum:20,chessItemWidth:22,chessItemHeight:22,slotNum:7,clearableNum:3,leftRandomBlocks:6,rightRandomBlocks:6,levelNum:8,levelBlockNum:16,blockTypeNum:12,blockBorderStep:2,blockContentArr:n},{chessWidthNum:20,chessHeightNum:20,chessItemWidth:22,chessItemHeight:22,slotNum:7,clearableNum:3,leftRandomBlocks:8,rightRandomBlocks:8,levelNum:10,levelBlockNum:18,blockTypeNum:16,blockBorderStep:3,blockContentArr:n}],cc._RF.pop()},{}],MenuManager:[function(e,t,o){"use strict";cc._RF.push(t,"9d3e4x7taZIJ5k4dKv6+AcT","MenuManager");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=e("./DataManager"),a=e("./Enum"),s=e("./EventManager"),l=cc._decorator,u=l.ccclass,d=l.property,f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.themeChooseNode=null,t.itemBody=null,t}return r(t,e),t.prototype.onLoad=function(){cc.director.preloadScene(a.GAME_SCENE_ENUM.GAME),this.itemBody=this.themeChooseNode.getChildByName("Body")},t.prototype.onGameStart=function(){s.default.instance.emit(a.GAME_EVENT_ENUM.PLAY_AUDIO,a.AUDIO_EFFECT_ENUM.CLICK),i.default.instance.reset(),cc.director.loadScene(a.GAME_SCENE_ENUM.GAME)},t.prototype.onThemeLayer=function(){this.itemBody.children.forEach(function(e,t){e.getChildByName("checkmark").active=i.default.instance.themeIndex==t}),this.themeChooseNode.active=!0},t.prototype.onThemeChoose=function(e){var t=this.itemBody.children.findIndex(function(t){return t==e.currentTarget});i.default.instance.themeIndex=t,this.themeChooseNode.active=!1},c([d(cc.Node)],t.prototype,"themeChooseNode",void 0),c([u],t)}(cc.Component);o.default=f,cc._RF.pop()},{"./DataManager":"DataManager","./Enum":"Enum","./EventManager":"EventManager"}],MusicManager:[function(e,t,o){"use strict";cc._RF.push(t,"241d8Um6HdNfZB7vjfWKWMI","MusicManager");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=e("./Enum"),a=e("./EventManager"),s=cc._decorator,l=s.ccclass,u=s.property,d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.click=null,t.clear=null,t.shoot=null,t.lose=null,t.win=null,t.bgm=null,t}return r(t,e),t.prototype.onLoad=function(){},t.prototype.onAudioPlay=function(){},t.prototype.onDestroy=function(){a.default.instance.off(i.GAME_EVENT_ENUM.PLAY_AUDIO,this.onAudioPlay)},c([u(cc.AudioClip)],t.prototype,"click",void 0),c([u(cc.AudioClip)],t.prototype,"clear",void 0),c([u(cc.AudioClip)],t.prototype,"shoot",void 0),c([u(cc.AudioClip)],t.prototype,"lose",void 0),c([u(cc.AudioClip)],t.prototype,"win",void 0),c([u(cc.AudioClip)],t.prototype,"bgm",void 0),c([l],t)}(cc.Component);o.default=d,cc._RF.pop()},{"./Enum":"Enum","./EventManager":"EventManager"}],ToastManager:[function(e,t,o){"use strict";cc._RF.push(t,"2b382cwYDJAi60o4dP1LDrn","ToastManager");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=e("./Enum"),a=e("./EventManager"),s=cc._decorator,l=s.ccclass,u=s.property,d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.msg=null,t}return r(t,e),t.prototype.onLoad=function(){a.default.instance.on(i.GAME_EVENT_ENUM.PLAY_TOAST,this.onShow,this),this.msg.active=!1},t.prototype.onShow=function(e){var t=this,o=e.msg,n=e.seconds;this.msg.active||(this.msg.getComponent(cc.Label).string=o,this.msg.active=!0,setTimeout(function(){t.msg.active=!1},1e3*n))},t.prototype.onDestroy=function(){a.default.instance.off(i.GAME_EVENT_ENUM.PLAY_TOAST,this.onShow)},c([u(cc.Node)],t.prototype,"msg",void 0),c([l],t)}(cc.Component);o.default=d,cc._RF.pop()},{"./Enum":"Enum","./EventManager":"EventManager"}],Utils:[function(e,t,o){"use strict";cc._RF.push(t,"cf56cfx1mhF4amkFhxRuYg2","Utils"),Object.defineProperty(o,"__esModule",{value:!0}),o.getRandom=o.pluck=o.sort=o.clickUp=o.clickDown=o.shuffle=o.createNodeWithLT=void 0,o.createNodeWithLT=function(e){var t=new cc.Node;return t.setAnchorPoint(cc.v2(0,1)),e&&(t.name=e),t},o.shuffle=function(e){for(var t,o,n=e.length;n;)o=e[t=Math.floor(Math.random()*n--)],e[t]=e[n],e[n]=o;return e},o.clickDown=function(e){e&&e.setScale(.9)},o.clickUp=function(e,t){e&&(e.setScale(1),t&&t())},o.sort=function(e,t,o){return void 0===o&&(o=!0),e.sort(function(e,n){return e[t]>n[t]?o?1:-1:e[t]<n[t]?o?-1:1:0})},o.pluck=function(e,t){return e.map(function(e){return e[t]})},o.getRandom=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},cc._RF.pop()},{}],WechatManager:[function(e,t,o){"use strict";cc._RF.push(t,"6fe58GvlB5L5pYq85dPdUkI","WechatManager");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,i=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(i=(c<3?r(i):c>3?r(t,o,i):r(t,o))||i);return c>3&&i&&Object.defineProperty(t,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=e("./DataManager"),a=e("./Enum"),s=e("./EventManager"),l=cc._decorator,u=l.ccclass,d=l.property,f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.open=!1,t.unitId="adunit-3b6000cfe10d059e",t.rewordAd=null,t}return r(t,e),t.prototype.onLoad=function(){cc.game.addPersistRootNode(this.node),i.default.instance.adOpen=this.open,s.default.instance.on(a.GAME_EVENT_ENUM.PLAY_REWORD,this.showRewordAd,this),this.initRewordAd()},t.prototype.initRewordAd=function(){"undefined"!=typeof wx&&null==this.rewordAd&&(this.rewordAd=wx.createRewardedVideoAd({adUnitId:this.unitId}),this.rewordAd.onError(function(){console.error("\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25")}))},t.prototype.showRewordAd=function(e){var t=this;"undefined"!=typeof wx?this.rewordAd&&(this.rewordAd.offClose(),this.rewordAd.onClose(function(o){t.rewordAd.offClose(),o&&o.isEnded||void 0===o?s.default.instance.emit(a.GAME_EVENT_ENUM.REWORD_BACK,{status:!0,msg:"\u53d1\u653e\u5956\u52b1",type:e}):s.default.instance.emit(a.GAME_EVENT_ENUM.REWORD_BACK,{status:!1,msg:"\u5e7f\u544a\u64ad\u653e\u4e2d\u65ad"})}),this.rewordAd.show().catch(function(){t.rewordAd.load().then(function(){return t.rewordAd.show()}).catch(function(){s.default.instance.emit(a.GAME_EVENT_ENUM.REWORD_BACK,{status:!1,msg:"\u5e7f\u544a\u5c55\u793a\u5931\u8d25"})})})):s.default.instance.emit(a.GAME_EVENT_ENUM.REWORD_BACK,{status:!1,msg:"\u4ec5\u652f\u6301\u5fae\u4fe1\u5e73\u53f0"})},t.prototype.onDestroy=function(){s.default.instance.off(a.GAME_EVENT_ENUM.PLAY_REWORD,this.showRewordAd)},c([d("boolean")],t.prototype,"open",void 0),c([d("string")],t.prototype,"unitId",void 0),c([u],t)}(cc.Component);o.default=f,cc._RF.pop()},{"./DataManager":"DataManager","./Enum":"Enum","./EventManager":"EventManager"}]},{},["Block","Broken","BrokenManager","DataManager","Enum","EventManager","GameManager","Levels","MenuManager","MusicManager","ToastManager","Utils","WechatManager"]);