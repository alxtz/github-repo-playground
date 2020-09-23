import React from "react";
import { Provider } from "react-redux";

import store from "~/store/store";
import SearchApp from "./SearchApp";

import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <SearchApp />
      </Provider>
    </>
  );
}

export default App;
