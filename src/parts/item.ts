import { LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three"
import { MyObject3D } from "../webgl/myObject3D"
import { Util } from "../libs/util"

export class Item extends MyObject3D {

  public itemId:number = 0

  private _line: LineSegments
  private _fill: Mesh
  private _con: Object3D
  private _scale: Vector3 = new Vector3()
  private _t:number = 0

  public centerDist:number = 0


  constructor(opt:any = {}) {
    super()

    this._con = new Object3D()
    this.add(this._con)

    this.itemId = opt.id
    this._t = this.itemId * 10

    this._scale.x = opt.scale

    this._fill = new Mesh(
      opt.fillGeo,
      new MeshBasicMaterial({
        color:this.itemId % 2 == 0 ? 0x000000 : (Util.hit(3) ? 0xff0000 : 0x000000),
        // depthTest:false,
      })
    )
    this._con.add(this._fill)

    this._line = new LineSegments(
      opt.lineGeo,
      new LineBasicMaterial({
        color:0xffffff,
        // depthTest:false,
      })
    )
    this._con.add(this._line)


    if(Util.hit()) {
      // this._fill.visible = false
      // this._fill.position.y = this._line.position.y = -0.5
    } else {
      // this._fill.position.y = this._line.position.y = 0.5
    }

    if(this.itemId % 2 == 0) {
      this._con.visible = this._line.visible = false
    }

    this._resize()
  }


  public setSize(val:number):void {
    const kake = 0.0001
    this.scale.set(val * 1, val, val * kake)
  }


  // ---------------------------------
  // 更新
  // ---------------------------------
  protected _update():void {
    super._update()

    // if(this.itemId % 2 == 0) return

    this._t += 10

    const radian = Util.radian(this._t)
    this._con.scale.y = Util.map(Math.sin(radian), 0.1, 0.3 + this.centerDist, -1, 1)
    this._con.scale.z = Util.map(Math.cos(radian), 0.1, 0.3 + this.centerDist, -1, 1)

    this._con.rotation.z = Util.radian(Math.sin(radian * -0.25) * 180)
    // this._con.scale.z = Util.instance.map(Math.cos(radian), 0.2, 1, -1, 1)

    // this._con.rotation.z += -0.01

    // this._con.position.y = Util.map(Math.sin(radian), -this._noise.y, this._noise.y, -1, 1)
  }
}