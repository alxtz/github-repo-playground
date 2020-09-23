import { Reducer } from "redux";
import { ActionTypes, SEARCH_ACTIONS, Result } from "./types";

const initialState: State = {
  isSearching: false,
  searchResults: null,
  currentResultPage: 1,
  cachedKeyword: "",
  apiError: false
};

type State = {
  searchResults: Result[] | null;
  isSearching: boolean;
  currentResultPage: number;
  cachedKeyword: string;
  apiError: boolean;
};

export const search: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_IS_SEARCHING: {
      return {
        ...state,
        isSearching: action.isSearching
      };
    }

    case SEARCH_ACTIONS.SET_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.results,
        currentResultPage: 1,
        cachedKeyword: action.keyword
      };
    }

    case SEARCH_ACTIONS.APPEND_SEARCH_RESULTS: {
      const oldResults = state.searchResults || [];
      return {
        ...state,
        searchResults: [...oldResults, ...action.results],
        currentResultPage: state.currentResultPage + 1
      };
    }

    case SEARCH_ACTIONS.CLEAR_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: []
      };
    }

    case SEARCH_ACTIONS.SET_API_ERROR: {
      return {
        ...state,
        apiError: action.error
      };
    }

    default:
      return state;
  }
};
