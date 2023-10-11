// Начнем с функции getCurrentChar, на
// вход она будет принимать массив типа TextType и индекс текущего элемента, а
// возвращать новый массив типа TextType. Внутри самой функции будем перебирать
// входной массив и сравнивать индекс элемента массива с индексом текущего
// элемента, если индексы равны, то возвращаем элемент с классом current-char.
// Теперь создадим функцию compareChars, на вход она будет принимать массив типа
// TextType, индекс текущего элемента, количество ошибок и нажатую клавишу,
// возвращать будет новый массив типа TextType, новый индекс текущего элемента и
// новое количество ошибок. Внутри функции делаем примерно тоже самое, проходим
// по массиву, сравниваем индексы и проверяем, правильно ли нажата клавиша.

import { TextType } from "../types/types";

type GetCurrentCharType = (
  charsArray: TextType[],
  currentIndex: number
) => TextType[];

type CompareCharsType = (
  charsArray: TextType[],
  currentIndex: number,
  pressedKey: string,
  mistakes: number
) => [resultArr: TextType[], currentIndex: number, mistakes: number];

type restoreTextType = (charsArray: TextType[]) => TextType[];

export const getCurrentChar: GetCurrentCharType = (
  charsArray,
  currentIndex
) => {
  return charsArray.map((item, index) => {
    if (index === currentIndex) {
      return {
        ...item,
        class: "current-char",
      };
    }

    return item;
  });
};

export const compareChars: CompareCharsType = (
  charsArray,
  currentIndex,
  pressedKey,
  mistakes
) => {
  let newCurrentIndex = currentIndex;
  let newMistakes = mistakes;

  const resultArr = charsArray.map((item, index) => {
    if (index === currentIndex && item.char === pressedKey) {
      newCurrentIndex += 1;
      return {
        ...item,
        class: "right-char",
      };
    } else if (index === currentIndex && item.char !== pressedKey) {
      newMistakes += 1;
      return {
        ...item,
        class: "wrong-char",
      };
    }

    return item;
  });

  return [resultArr, newCurrentIndex, newMistakes];
};

export const restoreText: restoreTextType = (charsArray) => {
  return charsArray.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        class: "current-char",
      };
    }

    return {
      ...item,
      class: "",
    };
  });
};
