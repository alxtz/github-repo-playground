import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import githubLogoSvg from "~/assets/githubLogo.svg";
import loadingSvg from "~/assets/loading.svg";
import searchSvg from "~/assets/search.svg";
import ScrollResults from "~/components/ScrollResults";
import { searchWithKeyword } from "~/store/search/actions";

const URL =
  "https://api.github.com/search/repositories?sort=stars&order=desc&page=1&per_page=5&q=";

export default function Main() {
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [timer, setTimer] = useState(null);
  const [quickRepos, setQuickRepos] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    clearTimeout(timer);
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
      <Header>
        <GitHubLogoImg src={githubLogoSvg} />
        <InputContainer>
          <Input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
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
              quickRepos.map(repo => {
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
      </Header>
      <ScrollResults />
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  background-color: #24292e;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 32px;
`;

const GitHubLogoImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  background-color: hsla(0, 0%, 100%, 0.125);
  border: 0;
  font-weight: 400;
  color: #fff;
  height: 28px;
  border-radius: 6px;
  padding: 0px 12px;
  min-width: 275px;
  transition: all 0.3s ease;

  &:focus {
    outline: 0;
  }

  ${props =>
    props.opened &&
    `
      color: black;
      background-color: white;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
  `}
`;

const QuickResults = styled.label`
  position: absolute;
  width: 100%;
  border-top: 1px solid #e1e4e8;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: white;
  display: none;
  overflow: hidden;

  ${props =>
    props.show &&
    `
      display: block;
  `}
`;

const QuickResultItem = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  color: #1b1f23;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  padding-left: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid #e1e4e8;
  }

  &:hover {
    background-color: rgb(3, 102, 214);
    color: white;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const LoadingImg = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const SearchImg = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  cursor: pointer;
  right: 10px;
  top: 6px;
`;

const EmptyMessage = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 14px;
`;
