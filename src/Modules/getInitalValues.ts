import { NeuralNetwork } from "./NeuralNetwork";
import { NNLayer } from "./NNLayer";

export interface layerData {
    weights: number[][],
    bias: number[],
    calculated: number[],
    activation: string,
}

export function getInitalValues() {
    const model = new NeuralNetwork(
        new NNLayer(2, 3),
        new NNLayer(3, 3),
        new NNLayer(3, 2)
    );
    const layers: layerData[] = model.layers.map(layer => {
        return {
            weights: layer.weights,
            bias: layer.bias[0],
            activation: 'tanh',
            calculated: [] as number[],
        }
    })
    const input: number[] = [];
    const samples = [
        {
            x: [1, 0],
            y: [0, 1],
        },
    ];
    return {layers, input, samples};
}