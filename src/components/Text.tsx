import { FunctionComponent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchText,
  setText,
  setCurrentCharIndex,
  increasePressingCount,
  setMistakes,
} from "../redux/store/textSlice";
import { setIsTimerOn } from "../redux/store/timerSlice";
import { setIsTestFinished } from "../redux/store/testSlice";

import { getCurrentChar, compareChars } from "../helpers/charTransform";

// Далее, в папке components создадим компонент Text. Импортируем в него функции
// getCurrentChar и compareChars. Из textSlice импортируем функции fetchText, setText,
// setCurrentCharIndex, increasePressingCount и setMistakes.
// Для получения текста, внутри хука useEffect будем вызывать функцию fetchText. В
// которую будем передавать переменную sentences.
// Добавим еще один useEffect, в котором при изменении индекса текущего символа,
// будем вызывать функцию getCurrentChar и изменять текст.
// Для обработки нажатия клавиш также используем useEffect. Внутри будем
// сравнивать currentCharIndex с длиной текста и если currentCharIndex меньше, то
// используя конструкцию Function Expression, создаем функцию обработчик. В этой
// функции будем вызывать функцию compareChars, и обновлять текст, индекс
// текущего символа, количество ошибок и количество нажатий.
// В этом компоненте мы используем условный рендеринг. Если есть ошибка, будем
// выводить на экран значение переменной error, если идет загрузка, будем
// отображать параграф с текстом «Loading text…», а когда текст загружен, будем
// выводить его на экран.

const Text: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.textSlice.text);
  const isLoading = useAppSelector((state) => state.textSlice.isLoading);
  const error = useAppSelector((state) => state.textSlice.error);
  const currentCharIndex = useAppSelector(
    (state) => state.textSlice.currentCharIndex
  );
  const mistakes = useAppSelector((state) => state.textSlice.mistakes);
  const pressingCount = useAppSelector(
    (state) => state.textSlice.pressingCount
  );
  const sentences = useAppSelector((state) => state.testSlice.sentences);

  useEffect(() => {
    dispatch(fetchText(sentences));
  }, [dispatch]);

  useEffect(() => {
    const newText = getCurrentChar(text, currentCharIndex);
    dispatch(setText(newText));
  }, [dispatch, currentCharIndex]);

  //   Теперь нам необходимо добавить включение и выключение таймера в компонент
  // Text. Перед созданием обработчика нажатия клавиш, будем проверять количество
  // нажатий и при первом нажатии запускать таймер. Внутри функции keyPressHandler
  // будем проверять новое значение индекса текущего символа, и если оно равно
  // длине текста, то будем выключать таймер и устанавливать состояние isTestFinished в
  // значение true.

  useEffect(() => {
    if (pressingCount === 0 && text.length > 0) {
      dispatch(setIsTimerOn(true));
    }

    if (currentCharIndex < text.length) {
      const keyPressHandler = (event: KeyboardEvent) => {
        const [newText, newCurrentIndex, newMistakes] = compareChars(
          text,
          currentCharIndex,
          event.key,
          mistakes
        );

        dispatch(setCurrentCharIndex(newCurrentIndex));
        dispatch(setText(newText));
        dispatch(setMistakes(newMistakes));
        dispatch(increasePressingCount());

        if (newCurrentIndex === text.length) {
          dispatch(setIsTimerOn(false));
          dispatch(setIsTestFinished(true));
        }
      };

      document.addEventListener("keypress", keyPressHandler);

      return () => {
        document.removeEventListener("keypress", keyPressHandler);
      };
    }
  }, [dispatch, text]);

  return (
    <div className="test-text-wrapper">
      {error && <p className="error-text">{error}</p>}
      {isLoading ? (
        <p className="test-loading-text">Loading text...</p>
      ) : (
        <div>
          {text.map((item, index) => {
            return (
              <span className={item.class} key={index}>
                {item.char}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Text;
