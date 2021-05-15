import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  height: 60px;
  margin: 0 16px;
`;

export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100vw - 35px);
  height: calc(100vh - 210px);
`;

export const Piece = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc((100vw - 37px) / 3);
  height: calc((100vh - 225px) / 3);
  border: 5px solid #fff;
  background-color: #0f0;

  button {
    width: calc((100vw - 37px) / 3);
    height: calc((100vh - 225px) / 3);
    border: 0;
    background: transparent;
  }
`;
