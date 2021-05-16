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
  const [mode, setMode] = useState(1);
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

  const handleChanceDificult = useCallback(
    (m: number) => {
      restart();
      setMode(m);
    },
    [restart]
  );

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

  const hasPossibilityToLose = useCallback(
    (start: number, pos1: number, pos2: number) => {
      if (pieces[start].icon === FaSpider) {
        if (pieces[pos1].icon === FaSpider) {
          if (pieces[pos2].icon === undefined) return pos2;
        }
      }
      if (pieces[start].icon === FaSpider) {
        if (pieces[pos2].icon === FaSpider) {
          if (pieces[pos1].icon === undefined) return pos1;
        }
      }
      if (pieces[pos1].icon === FaSpider) {
        if (pieces[pos2].icon === FaSpider) {
          if (pieces[start].icon === undefined) return start;
        }
      }
    },
    [pieces]
  );

  const hasPossibilityToWin = useCallback(
    (start: number, pos1: number, pos2: number) => {
      if (pieces[start].icon === FaCookie) {
        if (pieces[pos1].icon === FaCookie) {
          if (pieces[pos2].icon === undefined) return pos2;
        }
      }
      if (pieces[start].icon === FaCookie) {
        if (pieces[pos2].icon === FaCookie) {
          if (pieces[pos1].icon === undefined) return pos1;
        }
      }
      if (pieces[pos1].icon === FaCookie) {
        if (pieces[pos2].icon === FaCookie) {
          if (pieces[start].icon === undefined) return start;
        }
      }
    },
    [pieces]
  );

  const mode1 = useCallback(() => {
    if (mode === 0) return false;

    const win1 = hasPossibilityToWin(0, 1, 2);
    const win2 = hasPossibilityToWin(0, 3, 6);
    const win3 = hasPossibilityToWin(0, 4, 8);
    const win4 = hasPossibilityToWin(1, 4, 7);
    const win5 = hasPossibilityToWin(2, 5, 8);
    const win6 = hasPossibilityToWin(2, 4, 8);
    const win7 = hasPossibilityToWin(3, 4, 5);
    const win8 = hasPossibilityToWin(6, 7, 8);

    if (win1 || win1 === 0) {
      handleClick(pieces[win1]?.label);
    } else if (win2 || win2 === 0) {
      handleClick(pieces[win2]?.label);
    } else if (win3 || win3 === 0) {
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
      return false;
    }

    return true;
  }, [handleClick, hasPossibilityToWin, pieces, mode]);

  const mode2 = useCallback(() => {
    if (mode < 2) return false;

    const lose1 = hasPossibilityToLose(0, 1, 2);
    const lose2 = hasPossibilityToLose(0, 3, 6);
    const lose3 = hasPossibilityToLose(0, 4, 8);
    const lose4 = hasPossibilityToLose(1, 4, 7);
    const lose5 = hasPossibilityToLose(2, 5, 8);
    const lose6 = hasPossibilityToLose(2, 4, 6);
    const lose7 = hasPossibilityToLose(3, 4, 5);
    const lose8 = hasPossibilityToLose(6, 7, 8);

    if (lose1 || lose1 === 0) {
      handleClick(pieces[lose1]?.label);
    } else if (lose2 || lose2 === 0) {
      handleClick(pieces[lose2]?.label);
    } else if (lose3 || lose3 === 0) {
      handleClick(pieces[lose3]?.label);
    } else if (lose4) {
      handleClick(pieces[lose4]?.label);
    } else if (lose5) {
      handleClick(pieces[lose5]?.label);
    } else if (lose6) {
      handleClick(pieces[lose6]?.label);
    } else if (lose7) {
      handleClick(pieces[lose7]?.label);
    } else if (lose8) {
      handleClick(pieces[lose8]?.label);
    } else {
      return false;
    }

    return true;
  }, [handleClick, hasPossibilityToLose, pieces, mode]);

  const mode3 = useCallback(() => {
    if (mode < 3) return false;

    if (pieces[4].icon === undefined) {
      handleClick(pieces[4].label);
    } else if (
      pieces[5].icon === FaSpider &&
      pieces[6].icon === FaSpider &&
      pieces[7].icon === undefined
    ) {
      handleClick(pieces[7].label);
    } else if (
      pieces[3].icon === undefined &&
      pieces[4].icon === FaCookie &&
      pieces[2].icon !== FaSpider &&
      pieces[3].icon !== FaSpider &&
      pieces[5].icon !== FaSpider &&
      pieces[7].icon !== FaSpider
    ) {
      handleClick(pieces[3].label);
    } else if (pieces[0].icon === undefined) {
      handleClick(pieces[0].label);
    } else if (pieces[2].icon === undefined) {
      handleClick(pieces[2].label);
    } else if (pieces[6].icon === undefined) {
      handleClick(pieces[6].label);
    } else if (pieces[8].icon === undefined) {
      handleClick(pieces[8].label);
    } else {
      return false;
    }

    return true;
  }, [handleClick, pieces, mode]);

  const process = useCallback(() => {
    if (!mode1()) {
      if (!mode2()) {
        if (!mode3()) {
          const free = pieces.filter((item) => item.icon === undefined);
          if (free.length === 0) setOlder(true);
          const selected = Math.floor(Math.random() * free.length);
          handleClick(free[selected]?.label);
        }
      }
    }
  }, [handleClick, pieces, mode1, mode2, mode3]);

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

        <div>
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
        </div>

        <select
          value={mode}
          onChange={(e) => handleChanceDificult(Number(e.target.value))}
        >
          <option value={0}>Fácil</option>
          <option value={1}>Médio</option>
          <option value={2}>Difícil</option>
          <option value={3}>Geminiano</option>
        </select>
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
