import { useState } from "react"
import Canvas from "./components/Canvas"
import SimulationControls from "./components/SimulationControls"

function App() {
    const [running, setRunning] = useState(false)
    return (
        <div className="container">
            <SimulationControls running={running} setRunning={setRunning} />
            <Canvas running={running} />
        </div>
    )
}

export default App
