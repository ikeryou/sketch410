import { EdgesGeometry, Object3D, SphereGeometry } from "three"
import { MyObject3D } from "../webgl/myObject3D"
import { Item } from "./item"
import { Func } from "../core/func"
import { MousePointer } from "../core/mousePointer"
import { Param } from "../core/param"
import { Util } from "../libs/util"

export class Panel extends MyObject3D {

  public panelId:number

  private _con:Array<Object3D> = []
  private _item:Array<Array<Item>> = []


  constructor(id: number) {
    super()

    this.panelId = id

    // const lineGeo = new EdgesGeometry(new BoxGeometry(1, 1, 1))
    // const fillGeo = new BoxGeometry(1, 1, 1)

    const seg = 2
    const lineGeo = new EdgesGeometry(new SphereGeometry(0.5, seg, seg))
    const fillGeo = new SphereGeometry(1, seg, seg)

    const num = 1 + (id * 3)
    for(let i = 0; i < num; i++) {
      const con = new Object3D()
      this.add(con)
      this._con.push(con)

      this._item.push([])

      const num2 = num
      for(let i2 = 0; i2 < num2; i2++) {
        const item = new Item({
          id:i2 + i,
          conId:i,
          lineGeo:lineGeo,
          fillGeo:fillGeo
        })
        con.add(item)
        this._item[i].push(item)
      }
    }
  }

  // ---------------------------------
  // 更新
  // ---------------------------------
  protected _update():void {
    super._update()

    const w = Func.sw()
    const h = Func.sh()

    const mx = MousePointer.instance.easeNormal.x * w * -0.5
    const my = MousePointer.instance.easeNormal.y * h * -0.5
    // const mx = 0
    // const my = 0

    const yMargin = 1
    const size = Param.instance.block.size.value * 0.001
    const itemSize = w * size
    this._item.forEach((val,i) => {
      val.forEach((val2,i2) => {
        val2.setSize(itemSize)
        val2.position.z = i * -(itemSize * yMargin) + (itemSize * yMargin * this._item.length * 0.5)
        val2.position.x = i2 * itemSize - (itemSize * val.length * 0.5)

        const dz = mx - val2.position.z
        const dx = my - val2.position.x

        // val2.centerDist = Math.sqrt(val2.position.z * val2.position.z + val2.position.x * val2.position.x)
        val2.centerDist = Math.sqrt(dz * dz + dx * dx)
        val2.centerDist = Util.map(val2.centerDist, Param.instance.block.max.value, 0, 0, w * (Param.instance.block.maxRange.value * 0.01))
      })
    })
  }
}