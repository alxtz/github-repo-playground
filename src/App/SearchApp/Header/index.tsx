import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import loadingSvg from "~/assets/loading.svg";
import searchSvg from "~/assets/search.svg";
import githubLogoSvg from "~/assets/githubLogo.svg";
import { Result } from "~/store/search/types";
import { searchWithKeyword } from "~/store/search/actions";
import {
  QuickResultItem,
  InputContainer,
  Container,
  LoadingContainer,
  LoadingImg,
  GitHubLogoImg,
  Input,
  SearchImg,
  QuickResults,
  EmptyMessage
} from "./style";

const URL =
  "https://api.github.com/search/repositories?sort=stars&order=desc&page=1&per_page=5&q=";

export default function Header() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [quickRepos, setQuickRepos] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    setTimer(null);

    if (searchText !== "") {
      const newTimer = setTimeout(() => {
        setSearchLoading(true);
        fetch(URL + searchText)
          .then(stream => stream.json())
          .then(resp => {
            setSearchLoading(false);
            if (resp.items) {
              setQuickRepos(resp.items);
            }
          });
      }, 1500);
      setTimer(newTimer);
    }
  }, [searchText]);

  return (
    <Container>
      <GitHubLogoImg src={githubLogoSvg} />
      <InputContainer>
        <Input
          opened={searchText !== ""}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          id="search"
          placeholder="Search or jump to..."
        />
        {searchText !== "" && (
          <SearchImg
            src={searchSvg}
            onClick={() => {
              dispatch(searchWithKeyword(searchText));
              setSearchText("");
            }}
          />
        )}
        <QuickResults htmlFor="search" show={searchText !== ""}>
          {searchLoading ? (
            <LoadingContainer>
              <LoadingImg src={loadingSvg} />
              Searching
            </LoadingContainer>
          ) : quickRepos.length === 0 ? (
            <EmptyMessage>type to suggest repos</EmptyMessage>
          ) : (
            quickRepos.map((repo: Result) => {
              return (
                <QuickResultItem
                  key={repo.id}
                  onClick={() => {
                    dispatch(searchWithKeyword(repo.name));
                    setSearchText("");
                  }}
                >
                  {repo.name}
                </QuickResultItem>
              );
            })
          )}
        </QuickResults>
      </InputContainer>
    </Container>
  );
}
