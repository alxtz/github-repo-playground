import styled from "@emotion/styled";

export const TryAgain = styled.button`
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

export const SearchError = styled.div`
  color: #d73a49;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
`;

export const UsedKeyword = styled.div`
  margin-bottom: 20px;
`;

export const Container = styled.div`
  background-color: #f6f8fa;
  min-height: calc(100vh - 60px);
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const EmptyMessage = styled.div`
  font-size: 16px;
  text-align: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoadingImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 20px;
`;

export const Result = styled.div`
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px;
  padding: 16px;
  background: white;

  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

export const ResultTitle = styled.a`
  color: #24292e!;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const ResultDescription = styled.div`
  color: #586069;
  font-size: 14px;
`;
