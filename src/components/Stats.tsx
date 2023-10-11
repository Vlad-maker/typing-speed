// Stats, который будем использовать
// для отображения статистики. Импортируем в него функции speedCounting,
// accuracyCounting и increaseSeconds. В качестве props этот компонент будет
// принимать только необязательных children.
// Создадим состояние для скорости и точности, а ошибки, нажатия, секунды и
// состояние таймера будем брать из глобального состояния. Воспользуемся хуком
// useEffect и при изменении количества ошибок, нажатий или секунд, будем вызывать
// функции speedCounting и accuracyCounting и устанавливать результаты вызова этих
// функции в соответствующее состояние.
// Добавим еще один useEffect, в котором будем проверять, включен ли таймер, и если
// включен, то будем увеличивать количество секунд.

import { FunctionComponent, useState, useEffect } from "react";

import "../style/stats.scss";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { increaseSeconds } from "../redux/store/timerSlice";

import { speedCounting, accuracyCounting } from "../helpers/statsCounting";

type StatsProps = {
  children?: JSX.Element | JSX.Element[];
};

const Stats: FunctionComponent<StatsProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const mistakes = useAppSelector((state) => state.textSlice.mistakes);
  const pressingCount = useAppSelector(
    (state) => state.textSlice.pressingCount
  );
  const seconds = useAppSelector((state) => state.timerSlice.seconds);
  const isTimerOn = useAppSelector((state) => state.timerSlice.isTimerOn);
  const [speed, setSpeed] = useState("0.00");
  const [accuracy, setAccuracy] = useState("0.00");

  useEffect(() => {
    const correctLetters = pressingCount - mistakes;

    setAccuracy(accuracyCounting(mistakes, pressingCount));
    setSpeed(speedCounting(correctLetters, seconds));
  }, [mistakes, pressingCount, seconds]);

  useEffect(() => {
    if (isTimerOn) {
      const timer = setTimeout(() => {
        dispatch(increaseSeconds());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTimerOn, seconds, dispatch]);

  return (
    <div className="stats-container">
      <div>
        <p className="mid-header uppercase-text stat-title">speed</p>
        <p className="uppercase-text paragraph">{speed} WPM</p>
      </div>
      <div>
        <p className="mid-header uppercase-text stat-title">accuracy</p>
        <p className="uppercase-text paragraph">{accuracy} %</p>
      </div>
      {children}
    </div>
  );
};

export default Stats;
