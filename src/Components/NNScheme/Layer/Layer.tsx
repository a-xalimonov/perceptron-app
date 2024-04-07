import { useSelector } from "react-redux";
import { RootState } from "../../../Modules/store";
import Edges from "./Edges/Edges";
import Nodes from "./Nodes/Nodes";

interface LayerProps {
    index: number;
    inputs?: number[];
}

function Layer({ index, inputs }: LayerProps) {
    const { weights, bias, activation, calculated } = useSelector(
        (state: RootState) => state.NeuralNetwork.layers[index]
    );
    return (
        <>
            {index === 0 && <Nodes index={index - 1} bias={weights.map(a => 0)} calculated={inputs as number[]}/>}
            <Edges weights={weights} />
            <Nodes index={index} bias={bias} activation={activation} calculated={calculated}/>
        </>
    );
}

export { Layer };
