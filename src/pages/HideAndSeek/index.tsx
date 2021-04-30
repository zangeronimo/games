import { useCallback, useEffect, useState } from "react";
import { Container, Board, Title, Piece } from "./styles";
import spider from "../../assets/spider-man.jpeg";

type PieceData = {
  label: string;
  show: boolean;
};

export const HideAndSeek: React.FC = () => {
  const [clicked, setClicked] = useState(0);
  const [hider, setHider] = useState(0);
  const [winner, setWinner] = useState(false);
  const [pieces, setPieces] = useState<PieceData[]>([]);

  const newPieces = useCallback(() => {
    return new Array(100)
      .fill(null)
      .map((_, index) => ({ label: String(index + 1), show: false }));
  }, []);

  useEffect(() => {
    const pieces = newPieces();

    setPieces(pieces);
  }, [newPieces]);

  useEffect(() => {
    setHider(Math.floor(Math.random() * 100) + 1);
  }, []);

  useEffect(() => {
    const newPieces = pieces.map((piece) => {
      if (clicked === hider) {
        setWinner(true);
        piece.show = true;
        return piece;
      }

      if (clicked < hider && clicked >= Number(piece.label)) {
        piece.show = true;
      }

      if (clicked > hider && clicked <= Number(piece.label)) {
        piece.show = true;
      }

      return piece;
    });

    if (newPieces.length > 0) setPieces(newPieces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked, hider, setWinner]);

  const newGamme = useCallback(() => {
    setWinner(false);
    setClicked(0);
    setPieces(newPieces());
    setHider(Math.floor(Math.random() * 100) + 1);
  }, [newPieces]);

  return (
    <Container>
      <Title>
        Jogar esconde-esconde
        <button type="button" onClick={newGamme}>
          Novo Jogo
        </button>
      </Title>
      <Board>
        {pieces &&
          pieces.map((piece) => (
            <Piece
              key={piece.label}
              type="button"
              show={piece.show}
              onClick={() => setClicked(Number(piece.label))}
            >
              {String(hider) === piece.label && winner && (
                <img src={spider} alt="spider" />
              )}
            </Piece>
          ))}
      </Board>
    </Container>
  );
};
