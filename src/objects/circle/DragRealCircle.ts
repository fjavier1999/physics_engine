import Vector2 from "../coordinates/Vector2"
import { updateObject } from "../RenderingSystem"
import RealCircle from "./RealCircle"

export default class DragRealCircle extends RealCircle {
    // Dragging variables
    isDragged: boolean
    offset?: Vector2

    constructor(
        coords: Vector2,
        radius: number,
        mass: number,
        color: string,
        energyLoss: number,
        ctx: CanvasRenderingContext2D
    ) {
        super(coords, radius, mass, color, energyLoss, ctx)
        this.isDragged = false
    }

    onUpdate(updateObject: updateObject) {
        const { cursorClicking, cursorCoordinates, cursorVelocity } =
            updateObject

        // Start dragging
        if (!this.isDragged && cursorClicking && this.isIn(cursorCoordinates)) {
            this.isDragged = true
            this.offset = this.coords.sub(cursorCoordinates)
        }

        if (this.isDragged) {
            // Stop dragging
            if (!cursorClicking) {
                this.isDragged = false
                this.offset = undefined
                this.velocity = cursorVelocity
            }

            // Update position on every update
            if (this.offset) {
                this.setPos(cursorCoordinates.sum(this.offset))
            }
        } else {
            super.onUpdate(updateObject)
        }
    }
}
