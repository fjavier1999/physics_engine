import CircleInterface from "./circle/abstracts/CircleInterface"
import Vector2 from "./coordinates/Vector2"

export type updateObject = {
    now: number
    cursorCoordinates: Vector2
    cursorVelocity: Vector2
    cursorClicking: boolean
}

export default class RenderingSystem {
    // Elements being rendered
    objects: Array<CircleInterface>

    // HTML related
    ctx: CanvasRenderingContext2D
    running: boolean
    lastCursorRecord: number

    // Time universe
    lastTime: number

    //Interesting information send to the update function
    updateObject: updateObject = {
        now: 0,
        cursorCoordinates: new Vector2(-1, -1),
        cursorVelocity: new Vector2(0, 0),
        cursorClicking: false,
    }

    constructor(
        ctx: CanvasRenderingContext2D,
        objects: Array<CircleInterface>,
        running: boolean
    ) {
        this.ctx = ctx
        this.objects = objects
        this.running = running

        this.lastTime = Date.now()
        this.lastCursorRecord = Date.now()

        ctx.canvas.addEventListener("mousemove", (e) => {
            const newCursorCoordinates = new Vector2(
                (e.clientX - ctx.canvas.getBoundingClientRect().left) * 2,
                ctx.canvas.height -
                    (e.clientY - ctx.canvas.getBoundingClientRect().top) * 2
            )
            this.updateObject.cursorVelocity = newCursorCoordinates
                .sub(this.updateObject.cursorCoordinates)
                .multiplyConstant(
                    Math.pow((e.timeStamp - this.lastCursorRecord) * 0.001, -1)
                )
            this.updateObject.cursorCoordinates = newCursorCoordinates
            this.lastCursorRecord = e.timeStamp
        })

        ctx.canvas.addEventListener(
            "mousedown",
            () => (this.updateObject.cursorClicking = true)
        )
        ctx.canvas.addEventListener(
            "mouseup",
            () => (this.updateObject.cursorClicking = false)
        )
    }

    // What should be executed every frame
    render(): number {
        this.updateObject.now += Date.now() - this.lastTime

        // From scratch
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.beginPath()

        // First we have to update every item on the scene
        this.objects.forEach((o) => o.update(this.updateObject))

        // Now after the updates, we can draw the new state
        this.objects.forEach((o) => o.draw())

        // Aaaaand repeat (if active)
        if (this.running) {
            this.lastTime = Date.now()
            return window.requestAnimationFrame(() => this.render())
        }

        return -1
    }

    setRunning(state: boolean): void {
        // When pause, we get the current ellapsed time and add it to now
        if (!state) {
            this.updateObject.now += Date.now() - this.lastTime
        }

        // When continue, set last time to now
        if (state) {
            this.lastTime = Date.now()
        }

        this.running = state
    }
}
