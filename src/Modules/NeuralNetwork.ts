import { Matrix } from "./Matrix";
import { Loss, LossFunc } from "./Loss";
import { NNLayer } from "./NNLayer";

class NeuralNetwork {
    layers: NNLayer[];
    loss: LossFunc;

    constructor(..._layers: NNLayer[]) {
        this.layers = _layers;
        this.loss = Loss.MSE();
    }

    get inputs() {
        return this.layers[0].inputs;
    }

    get outputs() {
        return (this.layers.at(-1) as NNLayer).outputs;
    }

    forward(input: Matrix[]): Matrix[] {
        let output = input;
        for (let i = 0; i < this.layers.length; i++) {
            output = this.layers[i].forward(output);
        }
        return output;
    }

    backward(yPred: Matrix[], yTrue: Matrix[], lr: number) {
        let grad = this.loss.deriv(yPred, yTrue);
        for (let i = this.layers.length - 1; i >= 0; i--) {
            grad = this.layers[i].backward(grad, lr);
        }
    }

    fit({ data, lr, batchSize, iterations }: fitParameters) {
        const batchArr: number[][][][] = new Array(Math.ceil(data[0].length / batchSize));
        for (let i = 0; i < batchArr.length; i++) {
            batchArr[i] = [data[0].splice(0, batchSize), data[1].splice(0, batchSize)];
        }
        const errors = [];
        for (let i = 0; i < iterations; i++) {
            const [xArr, yTrueArr] = batchArr[i % batchArr.length];

            const x = xArr.map((arr) => new Matrix([arr]));
            const yTrue = yTrueArr.map((arr) => new Matrix([arr]));

            const yPred = this.forward(x);
            errors.push(this.loss.func(yPred, yTrue));
            this.backward(yPred, yTrue, lr);
        }
        return errors;
    }
}

interface fitParameters {
    data: number[][][];
    lr: number;
    batchSize: number;
    iterations: number;
}

export { NeuralNetwork };
