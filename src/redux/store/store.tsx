import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import textReducer from "./textSlice";
import timerReducer from "./timerSlice";

const store = configureStore({
  reducer: {
    testSlice: testReducer,
    textSlice: textReducer,
    timerSlice: timerReducer,
  },
});

export default store;

// Для RootState воспользуемся встроенной TypeScript утилитой –
//  ReturnType, которая будет принимать определение типа метода getState, а
// возвращать тип возвращаемого getState значения. Для определения
// типа AppDispatch воспользуемся оператором typeof.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
