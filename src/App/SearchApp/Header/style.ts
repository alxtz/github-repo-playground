import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: #24292e;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 32px;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input<{ opened: boolean }>`
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

export const QuickResults = styled.label<{ show: boolean }>`
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

export const QuickResultItem = styled.div`
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
`;

export const LoadingImg = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const GitHubLogoImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

export const SearchImg = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  cursor: pointer;
  right: 10px;
  top: 6px;
`;

export const EmptyMessage = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 14px;
`;
