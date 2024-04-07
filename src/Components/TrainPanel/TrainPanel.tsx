import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateModel } from "../../Modules/nnSlice";
import store from "../../Modules/store";

import "./TrainPanel.css";
import CalculateInput from "./CalculateInput/CalculateInput";
import { getModel } from "../../Modules/getModel";

function TrainPanel() {
    const dispatch = useDispatch();

    const [batchSize, setBatchSize] = useState(1);
    const [iterations, setIterations] = useState(10);
    const [lr, setLr] = useState(0.01);
    const [errors, setErrors] = useState([] as number[]);

    function batchSizeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setBatchSize(parseInt(e.target.value));
    }
    function iterationsChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setIterations(parseInt(e.target.value));
    }
    function lrChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setLr(parseFloat(e.target.value));
    }
    function trainHandler() {
        const model = getModel();
        const samples = store.getState().NeuralNetwork.samples;

        const data: number[][][] = [[], []];
        for (let sample of samples) {
            if (sample.x.length === model.inputs && sample.y.length === model.outputs) {
                data[0].push([...sample.x]);
                data[1].push([...sample.y]);
            }
        }
        if (data[0].length < 1) {
            return;
        }
        const newErrors = model.fit({
            data: data,
            lr: lr,
            batchSize: batchSize,
            iterations: iterations,
        });

        const newParams = model.layers.map(layer => {
            return {
                weights: layer.weights,
                bias: layer.bias.row(0),
            }
        });
        dispatch(updateModel(newParams));
        setErrors(newErrors);
    }

    return (
        <div className="train-panel">
            <div>
                <div>
                    <label>Batch Size </label>
                    <input type="number" value={batchSize} onChange={batchSizeChangeHandler} />
                </div>
                <div>
                    <label>Iterations </label>
                    <input type="number" value={iterations} onChange={iterationsChangeHandler} />
                </div>
                <div>
                    <label>Learning rate </label>
                    <input type="number" value={lr} onChange={lrChangeHandler} />
                </div>
                <button onClick={trainHandler}>Train</button>
            </div>
            <textarea
                readOnly
                value={errors
                    .map((err, it) => `Iteration: ${it + 1} | Error: ${err.toFixed(3)}`)
                    .join("\n")}
            />
            <CalculateInput />
        </div>
    );
}

export default TrainPanel;
