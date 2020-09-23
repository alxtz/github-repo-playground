import React from "react";
import { Global, css } from "@emotion/core";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          padding: 0;
          margin: 0;
          -webkit-font-smoothing: antialiased;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      `}
    />
  );
}
