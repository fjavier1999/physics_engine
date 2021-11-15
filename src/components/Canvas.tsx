import React, { useRef, useEffect } from "react"

// objects
import RenderingSystem from "../objects/RenderingSystem"
import HoverCircle from "../objects/circle/HoverCircle"
import Vector2 from "../objects/coordinates/Vector2"
import DragCircle from "../objects/circle/DragCircle"
import RealCircle from "../objects/circle/RealCircle"
import DragRealCircle from "../objects/circle/DragRealCircle"

const getObjects = (ctx: CanvasRenderingContext2D) => [
    new HoverCircle(new Vector2(900, 900), 50, "red", "#000000", 5, ctx),
    new DragCircle(new Vector2(100, 100), 50, "yellow", "blue", ctx),
    new RealCircle(new Vector2(700, 700), 50, 10, "purple", 0.1, ctx),
    new DragRealCircle(new Vector2(800, 600), 50, 10, "blue", 0.1, ctx),
]

type Props = {
    running: boolean
}
const Canvas = ({ running }: Props) => {
    const ref = useRef<HTMLCanvasElement>(null)
    const simulation = useRef<RenderingSystem | undefined>(undefined)

    useEffect(() => {
        const canvas = ref.current
        const ctx = canvas?.getContext("2d")
        let animationId = 0
        if (ctx) {
            if (!simulation.current) {
                simulation.current = new RenderingSystem(
                    ctx,
                    getObjects(ctx),
                    running
                )
            } else {
                simulation.current.setRunning(running)
            }

            animationId = simulation.current.render()
        }

        return () => {
            window.cancelAnimationFrame(animationId)
        }
    }, [running])

    return (
        <canvas
            ref={ref}
            width={1600}
            height={1200}
            className="simulation-canvas"
        ></canvas>
    )
}

export default Canvas
