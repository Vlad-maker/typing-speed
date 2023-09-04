import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TestState = {
  isTestStarted: boolean;
  isTestFinished: boolean;
  sentences: string;
};

const initialState: TestState = {
  isTestStarted: false,
  isTestFinished: false,
  sentences: "4",
};
