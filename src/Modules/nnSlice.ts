import { createSlice } from "@reduxjs/toolkit";
import { getInitalValues } from "./getInitalValues";

export const nnSlice = createSlice({
    name: "NeuralNetwork",
    initialState: getInitalValues(),
    reducers: {
        addNeuron: (state, action) => {
            const n = action.payload;
            if (state.layers[n]) {
                state.layers[n].bias.push(0);
                state.layers[n].weights = state.layers[n].weights.map((arr) => [
                    ...arr,
                    2 * Math.random() - 1,
                ]);
            }
            if (state.layers[n + 1]) {
                state.layers[n + 1].weights = [
                    ...state.layers[n + 1].weights,
                    state.layers[n + 1].weights[0].map((a) => 2 * Math.random() - 1),
                ];
            }
        },
        removeNeuron: (state, action) => {
            const { n, m } = action.payload;

            if (state.layers[n]?.bias.length > 1 || state.layers[n + 1]?.weights.length > 1) {
                if (state.layers[n]) {
                    state.layers[n].bias.splice(m, 1);
                    state.layers[n].weights = state.layers[n].weights.map((arr) => {
                        arr.splice(m, 1);
                        return arr;
                    });
                }
                if (state.layers[n + 1]) {
                    state.layers[n + 1].weights.splice(m, 1);
                }
            } else if (state.layers.length > 1) {
                if (n === -1) {
                    state.layers.splice(0, 1);
                } else {
                    if (state.layers[n + 1]) {
                        state.layers[n + 1].weights = state.layers[n].weights.map((_) =>
                            state.layers[n + 1].weights[0].map((_) => 2 * Math.random() - 1)
                        );
                    }
                    state.layers.splice(n, 1);
                }
            }
        },
        addLayer: (state, action) => {
            const start: boolean = action.payload;
            if (start) {
                const newWeights = [state.layers[0].weights.map((a) => 2 * Math.random() - 1)];
                const newBias = state.layers[0].weights.map((a) => 0);
                state.layers = [
                    {
                        weights: newWeights,
                        bias: newBias,
                        activation: `sigmoid`,
                        calculated: [],
                    },
                    ...state.layers,
                ];
            } else {
                const lastBias = state.layers[state.layers.length - 1].bias;
                const newWeights = lastBias.map((_) => [2 * Math.random() - 1]);
                state.layers.push({
                    weights: newWeights,
                    bias: [0],
                    activation: `sigmoid`,
                    calculated: [],
                });
            }
        },
        setActivation: (state, action) => {
            const { index, activation } = action.payload;
            state.layers[index].activation = activation;
        },
        addSample: (state, action) => {
            const { index, x, y } = action.payload;
            state.samples[index] = { x: x, y: y };
        },
        removeSample: (state, action) => {
            state.samples.splice(action.payload, 1);
        },
        updateModel: (state, action) => {
            const newParams = action.payload;
            state.layers = state.layers.map((layer, n) => ({
                ...layer,
                ...newParams[n],
            }));
        },
        updateCalculated: (state, action) => {
            const { input, calculated } = action.payload;
            state.input = input;
            state.layers = state.layers.map((layer, n) => ({
                ...layer,
                calculated: calculated[n],
            }));
        },
    },
});

export const {
    addNeuron,
    removeNeuron,
    addLayer,
    addSample,
    removeSample,
    updateModel,
    setActivation,
    updateCalculated,
} = nnSlice.actions;

export default nnSlice.reducer;
