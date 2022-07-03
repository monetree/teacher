import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: "question",
    initialState: {
        step1: null,
        step2: null,
        step3: null,
    },

    reducers: {
        createQuestion1: (state, action) => {
            const newState = { ...state, step1: { ...action.payload } };
            return newState;
        },
        createQuestion2: (state, action) => {
            const newState = { ...state, step2: { ...action.payload } };
            return newState;
        },
        createQuestion3: (state, action) => {
            const newState = { ...state, step3: { ...action.payload } };
            return newState;
        },
        clearQuestion: (state) => {
            const newState = { ...state, step1: null, step2: null, step3: null };
            return newState;
        }
    }
});


export const { createQuestion1, createQuestion2, createQuestion3, clearQuestion } = questionSlice.actions;

export default questionSlice.reducer;