import { useState } from "react";
import { useDispatch } from "react-redux";
import { getModel } from "../../../Modules/getModel";
import { Matrix } from "../../../Modules/Matrix";
import { updateCalculated } from "../../../Modules/nnSlice";

function CalculateInput() {
    const [inputVector, setInputVector] = useState(`0 0`);
    const dispatch = useDispatch();

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newChar = (e.nativeEvent as InputEvent).data;
        if (newChar === null || /[\d. -]/g.test(newChar)) {
            setInputVector(e.target.value.replace(/\.\./g, "."));
        }
    }
    function parseInput(str: string) {
        return str
            .trim()
            .split(" ")
            .map(parseFloat)
            .filter((a) => !isNaN(a));
    }
    function calculateHandler() {
        const model = getModel();
        const input = parseInput(inputVector);
        if (input.length === model.inputs) {
            model.forward([new Matrix([input])]);
            const calculated = [...model.layers.map((layer) => layer.values[0].A.row(0))];
            dispatch(updateCalculated({ input: input, calculated: calculated }));
        }
    }

    return (
        <div className="calculate-input">
            <div>
                <label>Input</label>
                <input type="text" onChange={inputChangeHandler} value={inputVector} />
            </div>
            <button onClick={calculateHandler}>Calculate</button>
        </div>
    );
}

export default CalculateInput;
