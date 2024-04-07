import { Matrix } from "./Matrix";
export interface LossFunc {
    func: (yPred: Matrix[], yTrue: Matrix[]) => number;
    deriv: (yPred: Matrix[], yTrue: Matrix[]) => Matrix[];
}
export class Loss {
    static MSE(): LossFunc {
        return {
            func: (yPredArr, yTrueArr) => {
                let err = 0;
                for (let i = 0; i < yPredArr.length; i++) {
                    const yPred = yPredArr[i].row(0);
                    const yTrue = yTrueArr[i].row(0);
                    for (let j = 0; j < yPred.length; j++) {
                        err += (yPred[j] - yTrue[j]) ** 2;
                    }
                }
                err /= yPredArr.length * yPredArr[0].columns;
                return err;
            },
            deriv: (yPredArr, yTrueArr) => {
                let deriv: Matrix[] = [];
                for (let i = 0; i < yPredArr.length; i++) {
                    const yPred = yPredArr[i];
                    const yTrue = yTrueArr[i];
                    deriv[i] = yPred.sub(yTrue).scalar(2 / yPred.columns / yPredArr.length)
                }
                return deriv;
            },
        };
    }
}
