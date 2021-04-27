import Tile from "./Tile";
import { useState, useEffect } from "react";

const Board = ({ stateCheck, gameOver, saveHistory }) => {
  const [turn, setTurn] = useState(0);
  const [values, setValues] = useState(new Array(9).fill(" "));

  const placeSymbol = (id, value) => {
    if (value !== " ") {
      return;
    }

    if (gameOver) {
      return;
    }
    let newValues = [...values];
    switch (turn % 2) {
      case 0:
        newValues[id] = "X";
        break;
      case 1:
        newValues[id] = "O";
        break;

      default:
        newValues[id] = "Error";
        break;
    }

    setTurn(turn + 1);
    setValues(newValues);
  };

  useEffect(() => {
    stateCheck(values);
    // saveHistory(values);
  }, [values, stateCheck]);

  useEffect(() => {
    stateCheck(values);
  }, [values, stateCheck]);

  let tileSet = new Array(9).fill(0);
  tileSet = tileSet.map((tile, i) => (
    <Tile
      id={i}
      value={values[i]}
      onClick={placeSymbol}
      key={i}
      stateCheck={stateCheck}
    />
  ));

  return (
    <div className="">
      <div className="board">{tileSet.map((tile) => tile)}</div>
    </div>
  );
};

export default Board;
