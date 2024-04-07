import DataSamples from "../DataSamples/DataSamples"
import NNScheme from "../NNScheme/NNScheme"
import TrainPanel from "../TrainPanel/TrainPanel"
import "./App.css"

function App() {
    return (
        <div className="App">
            <DataSamples />
            <TrainPanel />
            <NNScheme />
        </div>
    )
}

export default App
