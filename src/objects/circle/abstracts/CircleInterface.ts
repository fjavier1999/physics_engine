import Vector2 from "../../coordinates/Vector2"
import { updateObject } from "../../RenderingSystem"

export default abstract class CircleInterface {
    // Attributes
    coords: Vector2
    radius: number
    color: string
    ctx: CanvasRenderingContext2D
    
    // Helper
    ctxCoords: Vector2
    lastFrameTimestamp: number
    deltaTime: number

    constructor(
        coords: Vector2,
        radius: number,
        color: string,
        ctx: CanvasRenderingContext2D
    ) {
        this.coords = coords
        this.radius = radius
        this.color = color
        this.ctx = ctx

        this.lastFrameTimestamp = 0
        this.deltaTime = 0

        this.ctxCoords = new Vector2(coords.x, ctx.canvas.height - coords.y)
    }

    setPos(coords: Vector2) {
        this.coords = coords

        this.ctxCoords = new Vector2(coords.x, this.ctx.canvas.height - coords.y)
    }
    
    isIn(coords: Vector2): boolean {
        return Math.abs(coords.distanceTo(this.coords)) < this.radius
    }
    
    update(updateObject: updateObject): void {
        this.deltaTime = (updateObject.now - this.lastFrameTimestamp) / 1000
        this.onUpdate(updateObject)
        this.lastFrameTimestamp = updateObject.now
    }
    abstract onUpdate(updateObject: updateObject): void
    abstract draw(): void
}
