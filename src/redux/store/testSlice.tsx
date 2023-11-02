import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// тип для состояния теста

type TestState = {
  isTestStarted: boolean;
  isTestFinished: boolean;
  sentences: string;
};

// начальное состояние

const initialState: TestState = {
  isTestStarted: false,
  isTestFinished: false,
  sentences: "4",
};

// Далее, с помощью метода createSlice создадим слайс для нашего приложения.
// Четыре редьюсера, по одному для работы с каждым отдельным
// состоянием и один общий, для сброса состояния теста к исходным значениям. Для
// типизации action.payload воспользуемся встроенным типом PayloadAction,
// которому в качестве дженерика будем передавать необходимый тип.

const testSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    setIsTestStarted(state, action: PayloadAction<boolean>) {
      state.isTestStarted = action.payload;
    },
    setIsTestFinished(state, action: PayloadAction<boolean>) {
      state.isTestFinished = action.payload;
    },
    setSentences(state, action: PayloadAction<string>) {
      state.sentences = action.payload;
    },
    resetTestState(state) {
      state.isTestStarted = false;
      state.isTestFinished = false;
      state.sentences = "4";
    },
  },
});

export const {
  setIsTestStarted,
  setIsTestFinished,
  setSentences,
  resetTestState,
} = testSlice.actions;

export default testSlice.reducer;
