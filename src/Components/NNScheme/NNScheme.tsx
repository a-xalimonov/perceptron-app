import { useDispatch, useSelector } from "react-redux";
import { addLayer } from "../../Modules/nnSlice";
import { RootState } from "../../Modules/store";
import { Layer } from "./Layer/Layer";
import "./NNScheme.css";

function NNScheme() {
    const dispatch = useDispatch();
    const n = useSelector((state: RootState) => state.NeuralNetwork.layers.length);
    const input = useSelector((state: RootState) => state.NeuralNetwork.input);
    let layersElems: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
        layersElems.push(<Layer key={i} index={i} inputs={i === 0 ? input : undefined} />);
    }
    return (
        <div className="scheme">
            <div className="add-layer highlighted" onClick={() => dispatch(addLayer(true))}>
                +
            </div>
            {layersElems}
            <div className="add-layer highlighted" onClick={() => dispatch(addLayer(false))}>
                +
            </div>
        </div>
    );
}

export default NNScheme;
