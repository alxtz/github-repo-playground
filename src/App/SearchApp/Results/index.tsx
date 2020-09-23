import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store/types";
import loadingSvg from "~/assets/loading.svg";
import { searchForMoreResults } from "~/store/search/actions";
import {
  Container,
  SearchError,
  TryAgain,
  LoadingContainer,
  LoadingImg,
  ResultDescription,
  ResultTitle,
  Result,
  UsedKeyword,
  EmptyMessage
} from "./style";

export default function ScrollResults() {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { isSearching, searchResults, cachedKeyword, apiError } = useSelector(
    (state: RootState) => state.search
  );

  const listener = () => {
    const totalPageHeight = document.body.scrollHeight;
    const scrollPoint = window.scrollY + window.innerHeight;

    if (scrollPoint >= totalPageHeight) {
      if (!isSearching && !apiError) {
        dispatch(searchForMoreResults());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  useEffect(() => {
    if (apiError) {
      setCount(60);

      interval.current = setInterval(() => {
        setCount(prevCount => {
          if (prevCount - 1 === 0 && interval.current !== null) {
            clearInterval(interval.current);
            interval.current = null;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  }, [apiError]);

  return (
    <Container>
      {cachedKeyword && (
        <UsedKeyword>
          Showing search result for {`"${cachedKeyword}"`}
        </UsedKeyword>
      )}
      {searchResults === null && !isSearching && (
        <EmptyMessage>No results yet, click search!</EmptyMessage>
      )}
      {searchResults !== null &&
        searchResults.length !== 0 &&
        searchResults.map(result => {
          return (
            <Result key={result.id} data-test-id="results">
              <ResultTitle>
                {result.owner.login}/{result.name}
              </ResultTitle>
              <ResultDescription>{result.description}</ResultDescription>
            </Result>
          );
        })}
      {isSearching && (
        <LoadingContainer>
          <LoadingImg src={loadingSvg} />
        </LoadingContainer>
      )}
      {apiError && (
        <SearchError>
          GitHub API rate limit exceed, please wait for {count} seconds before
          retrying.
          <TryAgain
            onClick={() => dispatch(searchForMoreResults())}
            disabled={count !== 0}
          >
            {count === 0 ? "Try Again" : `Try Again in ${count}`}
          </TryAgain>
        </SearchError>
      )}
    </Container>
  );
}
