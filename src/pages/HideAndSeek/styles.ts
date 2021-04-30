import styled, { css } from "styled-components";

type PieceProps = {
  show: boolean;
};

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

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
  border: 1px solid;
`;

export const Piece = styled.button<PieceProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw / 10 - 1px);
  height: calc((100vh - 62px) / 10 - 10px);
  border: 1px solid #fff;
  background-color: #0f0;

  img {
    width: calc(100vw / 10 - 1px);
    height: calc((100vh - 62px) / 10 - 10px);
  }

  ${(props) =>
    props.show &&
    css`
      background-color: #f00;
    `}
`;
