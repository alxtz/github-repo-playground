export enum SEARCH_ACTIONS {
  SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS",
  SET_IS_SEARCHING = "SET_IS_SEARCHING",
  APPEND_SEARCH_RESULTS = "APPEND_SEARCH_RESULTS",
  CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS",
  SET_API_ERROR = "SET_API_ERROR"
}

export type Result = {
  name: string;
  id: string;
  owner: {
    login: string;
  };
  description: string;
};

type SetSearchResults = {
  type: typeof SEARCH_ACTIONS.SET_SEARCH_RESULTS;
  results: Result[];
  keyword: string;
};

type SetIsSearching = {
  type: typeof SEARCH_ACTIONS.SET_IS_SEARCHING;
  isSearching: boolean;
};

type AppendSearchResults = {
  type: typeof SEARCH_ACTIONS.APPEND_SEARCH_RESULTS;
  results: Result[];
};

type ClearSearchResults = {
  type: typeof SEARCH_ACTIONS.CLEAR_SEARCH_RESULTS;
};

type SetApiError = {
  type: typeof SEARCH_ACTIONS.SET_API_ERROR;
  error: boolean;
};

export type ActionTypes =
  | SetSearchResults
  | SetIsSearching
  | AppendSearchResults
  | ClearSearchResults
  | SetApiError;
