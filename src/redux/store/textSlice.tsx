import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import getText from "../../api/getText";
import { TextType } from "../../types/types";

// Начнем с описания типа, здесь нам понадобится сам массив символов — text,
// состояние загрузки текста — isLoading, возможные ошибки загрузки – error, также
// нам нужно следить за индексом текущего символа – currentCharIndex, считать
// количество ошибок – mistakes и общее количество нажатий – pressingCount.
type TextState = {
  text: TextType[];
  isLoading: boolean;
  error: string | null | undefined;
  currentCharIndex: number;
  mistakes: number;
  pressingCount: number;
};

// Далее, используя метод createAsyncThunk, создаем функцию fetchText. Для
// типизации createAsyncThunk используем дженерик, в который мы передадим три
// параметра. Первым параметром будет string, т.к. мы ожидаем, что функция вернет
// нам строку, вторым параметром также будет string, т.к. именно строку мы будем
// передавать функции колбэку и третьим параметром укажем rejectValue, он нам
// понадобится для обработки ошибок.
// В сам метод createAsyncThunk мы передаем имя для action и асинхронную функцию
// для получения текста. Внутри этой асинхронной функции воспользуемся ранее
// созданной функцией getText, в которую передадим количество запрашиваемых
// предложений. В случае успеха будем возвращать response.data, в случае ошибки
// вернем встроенную функцию rejectWithValue с сообщением об ошибке.

export const fetchText = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "textSlice/textFetch",
  async function (sentences: string, { rejectWithValue }) {
    try {
      const response = await getText(sentences);
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

// В объекте reducers опишем редюсеры для работы с состоянием текста. setText для
// изменения массива с текстом, setCurrentCharIndex и setMistakes для изменения
// индекса текущего символа и количества ошибок соответственно,
// increasePressingCount для подсчета количества нажатий и resetTextState для сброса
// состояния к начальным значениям.
// В extraReducers будем обрабатывать action для функции fetchText. Во время
// загрузки изменяем состояние isLoading на true и обнулять error. При успешном
// получении данных будем разбивать полученную строку на символы и формировать
// массив объектов, который сохраним в text. Для символа с индексом 0 сразу будем
// устанавливать класс ‘current-char’. В случае ошибки будем присваивать в error
// сообщение об ошибке.

const initialState: TextState = {
  text: [],
  isLoading: false,
  error: null,
  currentCharIndex: 0,
  mistakes: 0,
  pressingCount: 0,
};

const textSlice = createSlice({
  name: "textSlice",
  initialState,
  reducers: {
    setText(state, action: PayloadAction<TextType[]>) {
      state.text = action.payload;
    },
    setCurrentCharIndex(state, action: PayloadAction<number>) {
      state.currentCharIndex = action.payload;
    },
    setMistakes(state, action: PayloadAction<number>) {
      state.mistakes = action.payload;
    },
    increasePressingCount(state) {
      state.pressingCount = state.pressingCount + 1;
    },
    resetTextState(state) {
      state.currentCharIndex = 0;
      state.mistakes = 0;
      state.pressingCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchText.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    //   .addCase();
  },
});
