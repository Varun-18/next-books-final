import { createSlice } from "@reduxjs/toolkit";

const state = {
  keyword: null,
  books: [],
};

const slice = createSlice({
  name: "mainSlcie",
  initialState: state,
  reducers: {
    addKeyword: (state, action) => {
      return { ...state, keyword: action.payload };
    },
    addBooks: (state, action) => {
      return { ...state, books: action.payload };
    },
  },
});

export default slice.reducer;
export const { addKeyword, addBooks } = slice.actions;
