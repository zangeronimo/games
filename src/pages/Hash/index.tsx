import { useCallback, useEffect, useState } from "react";
import {
  FaToiletPaper,
  FaSpider,
  FaCookie,
  FaSmileBeam,
  FaSadCry,
  FaPoo,
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
  const [older, setOlder] = useState(false);
  const [pieces, setPieces] = useState<PieceData[]>(
    new Array(9)
      .fill(null)
      .map((_, index) => ({ label: index + 1, show: false }))
  );

  const restart = useCallback(() => {
    setToggle(false);
    setWinner(false);
    setWin(false);
    setOlder(false);
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

  const hasPossibilityToWin = useCallback(
    (start: number, pos1: number, pos2: number) => {
      if (pieces[start].icon === FaCookie) {
        if (pieces[pos1].icon === FaCookie) {
          return pieces[pos2].icon === undefined && pos2;
        }
      }
      if (pieces[start].icon === FaCookie) {
        if (pieces[pos2].icon === FaCookie) {
          return pieces[pos1].icon === undefined && pos1;
        }
      }
      if (pieces[pos1].icon === FaCookie) {
        if (pieces[pos2].icon === FaCookie) {
          return pieces[start].icon === undefined && start;
        }
      }
    },
    [pieces]
  );

  const process = useCallback(() => {
    const win1 = hasPossibilityToWin(0, 1, 2);
    const win2 = hasPossibilityToWin(0, 3, 6);
    const win3 = hasPossibilityToWin(0, 4, 8);
    const win4 = hasPossibilityToWin(1, 4, 7);
    const win5 = hasPossibilityToWin(2, 5, 8);
    const win6 = hasPossibilityToWin(2, 4, 8);
    const win7 = hasPossibilityToWin(3, 4, 5);
    const win8 = hasPossibilityToWin(6, 7, 8);

    if (win1) {
      handleClick(pieces[win1]?.label);
    } else if (win2) {
      handleClick(pieces[win2]?.label);
    } else if (win3) {
      handleClick(pieces[win3]?.label);
    } else if (win4) {
      handleClick(pieces[win4]?.label);
    } else if (win5) {
      handleClick(pieces[win5]?.label);
    } else if (win6) {
      handleClick(pieces[win6]?.label);
    } else if (win7) {
      handleClick(pieces[win7]?.label);
    } else if (win8) {
      handleClick(pieces[win8]?.label);
    } else {
      const free = pieces.filter((item) => item.icon === undefined);
      if (free.length === 0) {
        setOlder(true);
      } else {
        const selected = Math.floor(Math.random() * free.length);
        handleClick(free[selected]?.label);
      }
    }
  }, [handleClick, pieces, hasPossibilityToWin]);

  const checkWinner = useCallback(
    (start: number, pos1: number, pos2: number) => {
      return (
        pieces[start].icon !== undefined &&
        pieces[start].icon === pieces[pos1].icon &&
        pieces[start].icon === pieces[pos2].icon
      );
    },
    [pieces]
  );

  const controller = useCallback(() => {
    if (!win && pieces && pieces.length > 0) {
      const win1 = checkWinner(0, 1, 2);
      const win2 = checkWinner(0, 3, 6);
      const win3 = checkWinner(0, 4, 8);
      const win4 = checkWinner(1, 4, 7);
      const win5 = checkWinner(2, 5, 8);
      const win6 = checkWinner(2, 4, 6);
      const win7 = checkWinner(3, 4, 5);
      const win8 = checkWinner(6, 7, 8);

      const win = win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8;

      if (win) {
        setWinner(win);
        setWin(toggle);
      }

      if (toggle) {
        process();
      }
    }
  }, [pieces, toggle, process, win, checkWinner]);

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

        {older && !winner && <FaPoo style={{ color: "#434304" }} size={48} />}
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
