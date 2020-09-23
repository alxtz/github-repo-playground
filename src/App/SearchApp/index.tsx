import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import Results from "./Results";

export default function SearchApp() {
  return (
    <Container>
      <Header />
      <Results />
    </Container>
  );
}

const Container = styled.div``;
