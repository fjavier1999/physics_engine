import Vector2 from "../coordinates/Vector2"
import { updateObject } from "../RenderingSystem"
import CircleInterface from "./abstracts/CircleInterface"

export default class HoverCircle extends CircleInterface {
    isActive: boolean
    outlineColor: string
    outlineWidth: number

    constructor(
        coords: Vector2,
        radius: number,
        color: string,
        outlineColor: string,
        outlineWidth: number,
        ctx: CanvasRenderingContext2D
    ) {
        super(coords, radius, color, ctx)
        this.isActive = false
        this.outlineColor = outlineColor
        this.outlineWidth = outlineWidth
    }

    onUpdate({ cursorCoordinates }: updateObject): void {
        if (!this.isActive && this.isIn(cursorCoordinates)) this.isActive = true
        if (this.isActive && !this.isIn(cursorCoordinates))
            this.isActive = false
    }

    draw(): void {
        if (this.isActive) {
            this.ctx.fillStyle = this.outlineColor
            this.ctx.beginPath()
            this.ctx.arc(
                this.ctxCoords.x,
                this.ctxCoords.y,
                this.radius + this.outlineWidth,
                0,
                2 * Math.PI
            )
            this.ctx.fill()
        }
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(
            this.ctxCoords.x,
            this.ctxCoords.y,
            this.radius,
            0,
            2 * Math.PI
        )
        this.ctx.fill()
    }
}
