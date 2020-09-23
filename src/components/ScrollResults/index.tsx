import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store/types";
import loadingSvg from "~/assets/loading.svg";
import { searchForMoreResults } from "~/store/search/actions";

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
          if (prevCount - 1 === 0) {
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
            <Result key={result.id}>
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

const TryAgain = styled.button`
  display: inline-block;
  width: 120px;
  border-radius: 6px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  padding: 5px 0px;
  cursor: pointer;
  margin-top: 10px;
  color: #24292e;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: #edeff2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchError = styled.div`
  color: #d73a49;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
`;

const UsedKeyword = styled.div`
  margin-bottom: 20px;
`;

const Container = styled.div`
  background-color: #f6f8fa;
  min-height: calc(100vh - 60px);
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const EmptyMessage = styled.div`
  font-size: 16px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 20px;
`;

const Result = styled.div`
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px;
  padding: 16px;
  background: white;

  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const ResultTitle = styled.a`
  color: #24292e!;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const ResultDescription = styled.div`
  color: #586069;
  font-size: 14px;
`;
