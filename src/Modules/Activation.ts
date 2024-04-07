interface ActivationFunc {
    func: (x: number) => number;
    deriv: (x: number) => number;
}
interface ActivationList {
    [id: string]: () => ActivationFunc;
}
const Activation: ActivationList = {
    identity: function (): ActivationFunc {
        return {
            func: (x) => x,
            deriv: (x) => 1,
        };
    },
    sigmoid: function (): ActivationFunc {
        const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
        return {
            func: sigmoid,
            deriv: (x) => sigmoid(x) * (1 - sigmoid(x)),
        };
    },
    relu: function (): ActivationFunc {
        return {
            func: (x) => (x > 0 ? x : 0),
            deriv: (x) => (x > 0 ? 1 : 0),
        };
    },
    tanh: function (): ActivationFunc {
        const tanh = (x: number) => {
            const eX = Math.exp(x);
            const eMX = Math.exp(-x);
            return (eX - eMX) / (eX + eMX);
        };
        return {
            func: tanh,
            deriv: (x) => 1 - tanh(x) ** 2,
        };
    },
};

export { Activation };
export type { ActivationFunc };
