import { NeuralNetwork } from "./NeuralNetwork";
import { NNLayer } from "./NNLayer";

export interface layerData {
    weights: number[][],
    bias: number[],
    calculated: number[],
    activation: string,
}

export function getInitalValues() {
//     const model = new NeuralNetwork(
//         new NNLayer(2, 3),
//         new NNLayer(3, 3),
//         new NNLayer(3, 2)
//     );
    const model = new NeuralNetwork(
        new NNLayer(6, 5),
        new NNLayer(5, 4),
        new NNLayer(4, 3),
        new NNLayer(3, 2),
        new NNLayer(2, 3),
        new NNLayer(3, 4),
        new NNLayer(4, 5),
        new NNLayer(5, 6),
    );

    const layers: layerData[] = model.layers.map(layer => {
        return {
            weights: layer.weights.matrix,
            bias: layer.bias.row(0),
            activation: 'tanh',
            calculated: [] as number[],
        }
    })
    const input: number[] = [];
    // const samples = [
    //     {
    //         x: [1, 0],
    //         y: [0, 1],
    //     },
    // ];
    const samples = [
        {
            x: [1, 1, 1, 1, 1, 1],
            y: [1, 1, 1, 1, 1, 1],
        },
        {
            x: [0, 0, 0, 0, 0, 0],
            y: [0, 0, 0, 0, 0, 0],
        },
        {
            x: [1, 1, 1, 0, 0, 0],
            y: [1, 1, 1, 0, 0, 0],
        },
        {
            x: [0, 0, 0, 1, 1, 1],
            y: [0, 0, 0, 1, 1, 1],
        },
    ];
    return {layers, input, samples};
}