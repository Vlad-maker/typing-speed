import React from "react";
import { FunctionComponent } from "react";

//Components
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

const App: FunctionComponent = () => {
  return (
    <>
      <Header />

      <main className="container main"></main>

      <Footer />
    </>
  );
};

export default App;
