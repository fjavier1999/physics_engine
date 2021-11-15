import Vector2 from "../../coordinates/Vector2"
import { updateObject } from "../../RenderingSystem"
import CircleInterface from "./CircleInterface"

export default abstract class RealCircleInterface extends CircleInterface {
    mass: number
    force: Vector2
    velocity: Vector2
    acceleration: Vector2

    constructor(
        coords: Vector2,
        radius: number,
        mass: number,
        color: string,
        ctx: CanvasRenderingContext2D,
        initialForce?: Vector2
    ) {
        super(coords, radius, color, ctx)
        this.mass = mass

        this.force = initialForce ? initialForce : new Vector2(0, 0)
        this.velocity = new Vector2(0, 0)
        this.acceleration = new Vector2(0, 0)
    }

    onUpdate(updateObject: updateObject): void {
        this.acceleration = this.force.multiplyConstant(Math.pow(this.mass, -1))
        this.velocity = this.velocity.sum(
            this.acceleration.multiplyConstant(this.deltaTime)
        )
        this.setPos(
            this.coords.sum(this.velocity.multiplyConstant(this.deltaTime))
        )

        this.afterPhisicsUpdate(updateObject)
    }

    addForce(force: Vector2): void {
        this.force = this.force.sum(force)
    }

    abstract afterPhisicsUpdate(updateObject: updateObject): void
}
