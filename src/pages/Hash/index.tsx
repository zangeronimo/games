import { useCallback, useEffect, useState } from "react";
import {
  FaToiletPaper,
  FaSpider,
  FaCookie,
  FaSmileBeam,
  FaSadCry,
} from "react-icons/fa";
import { IconBaseProps } from "react-icons/lib";
import { Spinner } from "../../components/Spinner";
import { Container, Title, Board, Piece } from "./styles";

type PieceData = {
  label: number;
  show: boolean;
  icon?: React.ComponentType<IconBaseProps>;
};

export const Hash: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [winner, setWinner] = useState(false);
  const [win, setWin] = useState<boolean>(false);
  const [pieces, setPieces] = useState<PieceData[]>(
    new Array(9)
      .fill(null)
      .map((_, index) => ({ label: index + 1, show: false }))
  );

  const restart = useCallback(() => {
    setToggle(false);
    setWinner(false);
    setWin(false);
    const newPieces = new Array(9)
      .fill(null)
      .map((_, index) => ({ label: index + 1, show: false }));
    setPieces(newPieces);
  }, []);

  const handleClick = useCallback(
    (label: number) => {
      if (!winner) {
        const currentIcon = toggle ? FaCookie : FaSpider;
        const newPieces = pieces.map((item) => {
          if (item.label === label) {
            return { ...item, icon: currentIcon };
          }
          return item;
        });
        setPieces(newPieces);
        setToggle(!toggle);
      }
    },
    [toggle, pieces, winner]
  );

  const process = useCallback(() => {
    const free = pieces.filter((item) => item.icon === undefined);
    const selected = Math.floor(Math.random() * free.length);

    handleClick(free[selected]?.label);
  }, [handleClick, pieces]);

  const controller = useCallback(() => {
    if (!win && pieces && pieces.length > 0) {
      const win1 =
        pieces[0].icon !== undefined &&
        pieces[0].icon === pieces[1].icon &&
        pieces[0].icon === pieces[2].icon;
      const win2 =
        pieces[0].icon !== undefined &&
        pieces[0].icon === pieces[3].icon &&
        pieces[0].icon === pieces[6].icon;
      const win3 =
        pieces[0].icon !== undefined &&
        pieces[0].icon === pieces[4].icon &&
        pieces[0].icon === pieces[8].icon;
      const win4 =
        pieces[1].icon !== undefined &&
        pieces[1].icon === pieces[4].icon &&
        pieces[0].icon === pieces[7].icon;
      const win5 =
        pieces[2].icon !== undefined &&
        pieces[2].icon === pieces[5].icon &&
        pieces[2].icon === pieces[8].icon;
      const win6 =
        pieces[2].icon !== undefined &&
        pieces[2].icon === pieces[4].icon &&
        pieces[2].icon === pieces[6].icon;
      const win7 =
        pieces[3].icon !== undefined &&
        pieces[3].icon === pieces[4].icon &&
        pieces[3].icon === pieces[5].icon;
      const win8 =
        pieces[6].icon !== undefined &&
        pieces[6].icon === pieces[7].icon &&
        pieces[6].icon === pieces[8].icon;

      const win = win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8;
      if (win) {
        setWinner(win);
        setWin(toggle);
      }

      console.log(toggle);

      if (toggle) {
        process();
      }
    }
  }, [pieces, toggle, process, win]);

  useEffect(() => {
    controller();
  }, [toggle, controller]);

  return (
    <Container>
      <Title>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={restart}
        >
          <FaToiletPaper size={28} />
        </button>

        {!winner && toggle && <Spinner />}

        {winner && (
          <p>
            {win ? (
              <FaSmileBeam style={{ color: "#0f0" }} size={48} />
            ) : (
              <FaSadCry style={{ color: "#f00" }} size={48} />
            )}
          </p>
        )}
      </Title>
      <Board>
        {pieces &&
          pieces.map((piece) => (
            <Piece key={piece.label}>
              {piece.icon ? (
                <piece.icon size={64} />
              ) : (
                <button
                  disabled={toggle}
                  type="button"
                  onClick={() => handleClick(piece.label)}
                ></button>
              )}
            </Piece>
          ))}
      </Board>
    </Container>
  );
};
