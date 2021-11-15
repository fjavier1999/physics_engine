import React from "react"

type Props = {
    running: boolean
    setRunning: (state: boolean) => void
}

const SimulationControls = ({ running, setRunning }: Props) => {
    return (
        <div className="simulation-controls">
            <h3>
                {running
                    ? "La simulación está activa"
                    : "La simulación está en pausa"}
            </h3>

            <div className="switch-container" onClick={() => setRunning(!running)}>
                <div
                    className="switch"
                    style={{
                        backgroundColor: running ? "#3C3C50" : "#A1A1AB",
                        left: running ? 30 : 5
                    }}
                ></div>
            </div>
        </div>
    )
}

export default SimulationControls
