import { useDispatch } from "react-redux";
import { Activation } from "../../../../Modules/Activation";
import { addNeuron, removeNeuron, setActivation } from "../../../../Modules/nnSlice";
import "./Nodes.css";

interface NodesProps {
    index: number;
    bias: number[];
    activation?: string;
    calculated: number[];
}
function Nodes({ index, bias, activation, calculated }: NodesProps) {
    const dispatch = useDispatch();

    function addNeuronHandler() {
        dispatch(addNeuron(index));
    }
    function removeNeuronHandler(_neuronIndex: number) {
        dispatch(
            removeNeuron({
                n: index,
                m: _neuronIndex,
            })
        );
    }
    function setActivationHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setActivation({ index: index, activation: e.target.value }));
    }
    function getColor(wheight: number): string {
        const red = Math.floor(256 * Math.max(0, -wheight));
        const green = Math.floor(256 * Math.max(0, wheight));
        return `rgb(${red}, ${green}, 0)`;
    }

    return (
        <div className="nodes">
            {activation && (
                <select className="highlighted" value={activation} onChange={setActivationHandler}>
                    {Object.keys(Activation).map((str) => (
                        <option key={str}>{str}</option>
                    ))}
                </select>
            )}
            {bias.map((value, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: getColor(value),
                        }}
                        className={`neuron highlighted`}
                        onClick={() => removeNeuronHandler(index)}
                    >
                        <span>{calculated[index]?.toFixed(2)}</span>
                    </div>
                );
            })}
            <div className="add-button highlighted" onClick={addNeuronHandler}>
                +
            </div>
        </div>
    );
}

export default Nodes;
