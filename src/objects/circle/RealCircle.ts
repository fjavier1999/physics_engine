import Vector2 from "../coordinates/Vector2"
import { updateObject } from "../RenderingSystem"
import RealCircleInterface from "./abstracts/RealCircleInterface"

export default class RealCircle extends RealCircleInterface {

    energyLoss: number

    constructor(
        coords: Vector2,
        radius: number,
        mass: number,
        color: string,
        energyLoss: number,
        ctx: CanvasRenderingContext2D
    ) {
        // Gravity force (200 times earth one, 200 pixels 1 meter)
        const gravity = new Vector2(0, -9.80665 * mass * 200)
        super(coords, radius, mass, color, ctx, gravity)

        this.energyLoss = energyLoss
    }

    afterPhisicsUpdate(updateObject: updateObject): void {
        // If it touches a boundary, apply an oposing force
        if (
            this.coords.x - this.radius <= 0 ||
            this.coords.x + this.radius >= this.ctx.canvas.width
        ) {
            const newVelocity = new Vector2(-this.velocity.x, this.velocity.y)
            this.velocity = newVelocity.sub(newVelocity.multiplyConstant(this.energyLoss))
            // Fix the position so it doesn't go out of bounds
            this.coords.x - this.radius <= 0
                ? this.setPos(new Vector2(0 + this.radius, this.coords.y))
                : this.setPos(
                      new Vector2(
                          this.ctx.canvas.width - this.radius,
                          this.coords.y
                      )
                  )
        }

        if (
            this.coords.y - this.radius <= 0 ||
            this.coords.y + this.radius >= this.ctx.canvas.height
        ) {
            
            const newVelocity = new Vector2(this.velocity.x, -this.velocity.y)
            this.velocity = newVelocity.sub(newVelocity.multiplyConstant(this.energyLoss))
            // Fix the position so it doesn't go out of bounds
            this.coords.y - this.radius <= 0
                ? this.setPos(new Vector2(this.coords.x, 0 + this.radius))
                : this.setPos(
                      new Vector2(
                          this.coords.x,
                          this.ctx.canvas.height - this.radius
                      )
                  )
        }
    }
    draw(): void {
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
