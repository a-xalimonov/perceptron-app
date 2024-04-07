import "./NewDataSample.css";
import { useState } from "react";

interface NewDataSampleProps {
    sample: {
        x: number[];
        y: number[];
    },
    setSample: (x: number[], y: number[]) => void,
    removeSample: () => void,
}

function NewDataSample({ sample, setSample, removeSample }: NewDataSampleProps) {
    const xInitial = sample ? sample.x.toString().replace(/,/g, ` `) : "";
    const yInitial = sample ? sample.y.toString().replace(/,/g, ` `) : "";

    const [xValue, setXValue] = useState(xInitial);
    const [yValue, setYValue] = useState(yInitial);

    function parseInput(str: string) {
        return str
            .trim()
            .split(" ")
            .map(parseFloat)
            .filter((a) => !isNaN(a));
    }
    function xChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newChar = (e.nativeEvent as InputEvent).data;
        if (newChar === null || /[\d. -]/g.test(newChar)) {
            setXValue(e.target.value.replace(/\.\./g, "."));
        }
    }
    function yChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newChar = (e.nativeEvent as InputEvent).data;
        if (newChar === null || /[\d. -]/g.test(newChar)) {
            setYValue(e.target.value.replace(/\.\./g, "."));
        }
    }
    function setSampleHandler() {
        const xArr = parseInput(xValue);
        const yArr = parseInput(yValue);
        if (xArr.length && yArr.length) {
            setSample(xArr, yArr)
        }
    }

    return (
        <div className="new-sample">
            <input type="text" onChange={xChangeHandler} value={xValue} />
            <input type="text" onChange={yChangeHandler} value={yValue} />
            <button onClick={setSampleHandler}>Add</button>
            <button onClick={removeSample}>Delete</button>
        </div>
    );
}

export default NewDataSample;
