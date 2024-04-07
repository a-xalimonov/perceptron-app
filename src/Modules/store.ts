import { configureStore } from "@reduxjs/toolkit"
import nnReducer from "./nnSlice"

const store = configureStore({
	reducer: {
		NeuralNetwork: nnReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
