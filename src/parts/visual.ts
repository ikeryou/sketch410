import { Object3D } from "three"
import { Canvas } from "../webgl/canvas"
import { Func } from "../core/func"
import { Param } from "../core/param"
import { Util } from "../libs/util"
import { Panel } from "./panel"

export class Visual extends Canvas {

  private _allCon: Object3D

  private _panels: Array<Panel> = []
  // private _speed: number = 1

  constructor(opt:any) {
    super(opt)

    this._allCon = new Object3D()
    this.mainScene.add(this._allCon)

    const num = 10
    for(let i = 0; i < num; i++) {
      const p = new Panel(num - i)
      this._allCon.add(p)
      this._panels.push(p)
    }

    this._allCon.rotation.x = Util.radian(45)
    this._allCon.rotation.y = Util.radian(-45)

    this._resize()
  }


  _update():void {
    // this._allCon.rotation.y += this._speed * -0.005

    // if(Update.instance.cnt % 60 === 0) {
    //   Param.instance.block.size.value = Util.randomInt(10, 40)
    //   Param.instance.block.max.value = Util.randomInt(20, 40)
    //   Param.instance.block.maxRange.value = Util.randomInt(10, 40)
    //   // this._allCon.rotation.y = Util.radian(Util.range(180))
    //   // this._speed = Util.range(1.5)
    // }

    const margin = Func.val(25, 50)
    this._panels.forEach((p,i) => {
      p.position.y = i * margin - (this._panels.length - 1) * margin * 0.5 + margin
    })

    if(this.isNowRenderFrame()) {
      this._render()
    }
  }

  _render():void {
    this.renderer.setClearColor(Param.instance.block.bgColor.value, 1)
    this.renderer.render(this.mainScene, this.cameraOrth)
  }

  isNowRenderFrame():boolean {
    return true
  }

  _resize():void {
    super._resize()

    const w = Func.sw()
    const h = Func.sh()

    this.renderSize.width = w
    this.renderSize.height = h

    this._updateOrthCamera(this.cameraOrth, w, h)

    let pixelRatio:number = window.devicePixelRatio || 1
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(w, h)
    this.renderer.clear()
  }
}