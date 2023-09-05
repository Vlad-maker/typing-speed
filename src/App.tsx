import React from "react";
import { FunctionComponent } from "react";

// style
import "./style/typography.scss";

//store
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { setIsTestStarted, setSentences } from "./redux/store/testSlice";

//Components
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Test from "./components/Test";
import ModalWindow from "./components/ui/ModalWindow";
import Button from "./components/ui/Button";

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isTestStarted = useAppSelector(
    (state) => state.testSlice.isTestStarted
  );

  // Создадим функцию testStateToggler, внутри которой будем изменять состояние
  // isTestStarted на true, тем самым запуская тест.
  const testStateToggler = () => dispatch(setIsTestStarted(true));

  // В блок <main> добавим рендер по условию, если isTestStarted – true, то
  // отрисовываем Test, если false, то отрисовываем ModalWindow. В ModalWindow
  // передаем Button с функцией testStateToggler для события onClick.
  return (
    <>
      <Header />

      <main className="container main">
        {isTestStarted ? (
          <Test />
        ) : (
          <ModalWindow title="Typing speed test">
            <Button btnText="Start" onClick={testStateToggler} />
          </ModalWindow>
        )}
      </main>

      <Footer />
    </>
  );
};

export default App;
