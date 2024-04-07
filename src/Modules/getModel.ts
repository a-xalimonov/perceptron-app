import { NeuralNetwork } from "./NeuralNetwork";
import { NNLayer } from "./NNLayer";
import store from "./store";


export function getModel() {
    const stateLayers = store.getState().NeuralNetwork.layers;
    const model = new NeuralNetwork(
        ...stateLayers.map(layer => new NNLayer(layer.weights, layer.bias, layer.activation))
    );
    return model;
}