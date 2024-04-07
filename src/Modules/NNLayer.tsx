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
        if (Array.isArray(inputsOrWeights) && Array.isArray(outputsOrBias)) {
            this.weights = new Matrix(inputsOrWeights);
            this.bias = new Matrix([outputsOrBias]);
        } else {            
            const inputs = inputsOrWeights as number;
            const outputs = outputsOrBias as number;
            this.weights = new Matrix();            
            for (let i = 0; i < inputs; i++) {
                this.weights[i] = [];
                for (let j = 0; j < outputs; j++) {
                    this.weights[i].push(2 * Math.random() - 1)
                }
            }
            this.bias = new Matrix([new Array(outputs).fill(0)]);
        }
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
            const A = Y.map2d(this.activation.func);
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

            const yGrad = aGrad.product(vals.Y.map2d(this.activation.deriv));
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
