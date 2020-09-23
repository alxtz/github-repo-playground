import { Dispatch, GetState } from "~/store/types";
import { ActionTypes, SEARCH_ACTIONS } from "./types";

const URL = "https://api.github.com/search/repositories?page=1&per_page=10&q=";

export const searchWithKeyword = keyword => (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch({
    type: SEARCH_ACTIONS.SET_IS_SEARCHING,
    isSearching: true
  });

  dispatch({
    type: SEARCH_ACTIONS.CLEAR_SEARCH_RESULTS
  });

  fetch(URL + keyword)
    .then(stream => stream.json())
    .then(resp => {
      dispatch({
        type: SEARCH_ACTIONS.SET_IS_SEARCHING,
        isSearching: false
      });

      if (resp.items) {
        dispatch({
          type: SEARCH_ACTIONS.SET_SEARCH_RESULTS,
          results: resp.items,
          keyword
        });
      } else {
        dispatch({
          type: SEARCH_ACTIONS.SET_API_ERROR,
          error: true
        });
      }
    });
};

export const searchForMoreResults = keyword => (
  dispatch: Dispatch<ActionTypes>,
  getState: GetState
) => {
  dispatch({
    type: SEARCH_ACTIONS.SET_IS_SEARCHING,
    isSearching: true
  });

  const { currentResultPage, cachedKeyword } = getState().search;

  const URL = `https://api.github.com/search/repositories?page=${currentResultPage +
    1}&per_page=10&q=${cachedKeyword}`;

  if (getState().search.apiError) {
    dispatch({
      type: SEARCH_ACTIONS.SET_API_ERROR,
      error: false
    });
  }

  fetch(URL)
    .then(stream => stream.json())
    .then(resp => {
      dispatch({
        type: SEARCH_ACTIONS.SET_IS_SEARCHING,
        isSearching: false
      });

      dispatch({
        type: SEARCH_ACTIONS.APPEND_SEARCH_RESULTS,
        results: resp.items
      });
    })
    .catch(() => {
      dispatch({
        type: SEARCH_ACTIONS.SET_API_ERROR,
        error: true
      });
    });
};
