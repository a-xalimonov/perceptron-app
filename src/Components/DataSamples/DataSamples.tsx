import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeSample, addSample } from "../../Modules/nnSlice"
import { RootState } from "../../Modules/store"
import NewDataSample from "./NewDataSample/NewDataSample"

import "./DataSamples.css"

function DataSamples() {
    const samples = useSelector(
        (state: RootState) => state.NeuralNetwork.samples
    )
    const inputs = useSelector(
        (state: RootState) => state.NeuralNetwork.layers[0].weights.length
    )
    const outputs = useSelector(
        (state: RootState) => state.NeuralNetwork.layers.slice(-1)[0].bias.length
    )
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(samples.length)

    function selectedHandler(index: number) {
        setSelected(index)
    }
    function setSample(x: number[], y: number[]) {
        dispatch(addSample({ index: selected, x, y }));
        setSelected(selected + 1);
    }
    function removeSampleHandler() {
        dispatch(removeSample(selected));
    }

    return (
        <div className="data-samples">
            <table className="samples-table">
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((val, index) => (
                        <tr
                            key={index}
                            onClick={() => selectedHandler(index)}
                            className={index === selected ? `highlighted active` : `highlighted`}
                        >
                            <td className={val.x.length !== inputs ? `wrong` : ``}>{`${val.x}`}</td>
                            <td className={val.y.length !== outputs ? `wrong` : ``}>{`${val.y}`}</td>
                        </tr>
                    ))}
                    <tr
                        onClick={() => selectedHandler(samples.length)}
                        className={samples.length === selected ? "highlighted active" : "highlighted"}
                    >
                        <td colSpan={2}>new</td>
                    </tr>
                </tbody>
            </table>
            <NewDataSample
                key={selected}
                sample={samples[selected]}
                setSample={setSample}
                removeSample={removeSampleHandler}
            />
        </div>
    )
}

export default DataSamples
