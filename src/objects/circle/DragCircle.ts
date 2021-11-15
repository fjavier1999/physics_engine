import Vector2 from "../coordinates/Vector2"
import { updateObject } from "../RenderingSystem"
import CircleInterface from "./abstracts/CircleInterface"

export default class DragCircle extends CircleInterface {
    // Attributes
    draggedColor: string

    // Dragging variables
    isDragged: boolean
    offset?: Vector2

    constructor(
        coords: Vector2,
        radius: number,
        color: string,
        draggedColor: string,
        ctx: CanvasRenderingContext2D
    ) {
        super(coords, radius, color, ctx)
        this.isDragged = false
        this.draggedColor = draggedColor
    }

    onUpdate({ cursorCoordinates, cursorClicking }: updateObject): void {
        // Start dragging
        if (!this.isDragged && cursorClicking && this.isIn(cursorCoordinates)) {
            this.isDragged = true
            this.offset = this.coords.sub(cursorCoordinates)
        }

        // Stop dragging
        if (this.isDragged && !cursorClicking) {
            this.isDragged = false
            this.offset = undefined
        }

        // Update position on every update
        if (this.isDragged && this.offset) {
            this.setPos(cursorCoordinates.sum(this.offset))
        }
    }
    draw(): void {
        this.ctx.fillStyle = this.isDragged ? this.draggedColor : this.color
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
