import { Activation, ActivationFunc } from "./Activation";
import { Matrix } from "./Matrix";

interface CalcValues {
    X: Matrix;
    Y: Matrix;
    A: Matrix;
}

export class NNLayer {
    weights: Matrix;
    bias: Matrix;
    activation: ActivationFunc;
    values: CalcValues[] = [];

    constructor(inputs: number, outputs: number, activation?: string);
    constructor(weights: number[][], bias: number[], activation?: string);
    constructor(
        inputsOrWeights: number | number[][],
        outputsOrBias: number | number[],
        activation: string = "identity"
    ) {
        let weightsArr: number[][], biasArr: number[];
        if (Array.isArray(inputsOrWeights) && Array.isArray(outputsOrBias)) {
            weightsArr = inputsOrWeights;
            biasArr = outputsOrBias;
        } else {
            const inputs = inputsOrWeights as number;
            const outputs = outputsOrBias as number;
            weightsArr = [];
            for (let i = 0; i < inputs; i++) {
                weightsArr[i] = [];
                for (let j = 0; j < outputs; j++) {
                    weightsArr[i].push(2 * Math.random() - 1)
                }
            }
            biasArr = new Array(outputs).fill(0);
        }
        this.weights = new Matrix(weightsArr);
        this.bias = new Matrix([biasArr]);
        this.activation = Activation[activation]();
    }

    get inputs() {
        return this.weights.rows;
    }

    get outputs() {
        return this.weights.columns;
    }

    setWeights(weights: number[][]): void {
        this.weights = new Matrix(weights);
    }

    setBias(bias: number[]): void {
        this.bias = new Matrix([bias]);
    }

    forward(input: Matrix[]): Matrix[] {
        this.values = [];
        for (let i = 0; i < input.length; i++) {
            const X = input[i];
            const Y = X.mult(this.weights).add(this.bias);
            const A = Y.map(this.activation.func);
            this.values[i] = {
                X: X,
                Y: Y,
                A: A,
            };
        }
        return this.values.map((val) => val.A);
    }

    backward(aGradArr: Matrix[], lr: number): Matrix[] {
        let xGradArr: Matrix[] = [];
        let wGradArr: Matrix[] = [];
        let bGradArr: Matrix[] = [];

        for (let i = 0; i < aGradArr.length; i++) {
            const vals = this.values[i];
            const aGrad = aGradArr[i];

            const yGrad = aGrad.product(vals.Y.map(this.activation.deriv));
            wGradArr[i] = vals.X.transpose().mult(yGrad);
            bGradArr[i] = yGrad;
            xGradArr[i] = yGrad.mult(this.weights.transpose());
        }
        const wGrad = wGradArr.reduce((prev, next) => prev.add(next));
        const bGrad = bGradArr.reduce((prev, next) => prev.add(next));
        
        this.weights = this.weights.add(wGrad.scalar(-lr));
        this.bias = this.bias.add(bGrad.scalar(-lr));
        return xGradArr;
    }
}
