import React from "react";
import { Provider } from "react-redux";

import store from "~/store/store";
import Main from "~/components/Main";

import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}

export default App;
