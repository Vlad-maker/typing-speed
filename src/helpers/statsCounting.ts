// Функция accuracyCounting будет принимать количество ошибок и общее количество
// нажатий, а возвращать процент правильно нажатых клавиш. Так как общее
// количество нажатий может быть равно нулю, необходимо это проверить.
// Функция speedCounting принимает количество правильных символов и количество
// секунд. Возвращает скорость печати (количество слов в минуту). Для вычисления
// скорости необходимо перевести секунды в минуты, а количество правильных
// символов в количество слов (обычно подобные приложения берут среднюю длину
// слов равную пяти символам). Секунды могут быть равны нулю, поэтому их также
// необходимо проверить.

export function accuracyCounting(mistakes: number, pressingCount: number) {
  if (pressingCount) {
    return (100 - (mistakes / pressingCount) * 100).toFixed(2);
  }

  return "0.00";
}

export function speedCounting(correctLetters: number, seconds: number) {
  if (seconds) {
    const words = correctLetters / 5;
    const minutes = seconds / 60;

    return (words / minutes).toFixed(2);
  }

  return "0.00";
}
