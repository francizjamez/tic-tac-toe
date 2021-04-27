import Board from "./Components/Board";
import "./Styles/styles.css";

import { useState } from "react";

const initialStates = new Array(9).fill(" ");

function App() {
  const [gameState, setGameState] = useState("Game is in progress");
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([initialStates]);

  const checkGameState = (values) => {
    const board2D = generateBoard(values);

    let winnerX = checkWinner("X", board2D);
    let winnerO = checkWinner("O", board2D);
    let draw = checkDraw(values);

    if (winnerX || winnerO || draw) {
      setGameOver(true);
    }
    if (winnerX) {
      setGameState("Winner: Player 1");
    }
    if (winnerO) {
      setGameState("Winner: Player 2");
    }
    if (draw) {
      setGameState("It's a tie");
    }

    // saveHistory(values);
  };

  const saveHistory = (values) => {
    let newHistory = history.map((el) => [...el]);
    console.log(newHistory);
    newHistory.push([...values]);
    setHistory(newHistory);
  };

  return (
    <div className="App">
      <h1>{gameState}</h1>
      <Board
        stateCheck={checkGameState}
        gameOver={gameOver}
        saveHistory={saveHistory}
      />
    </div>
  );
}

function checkDraw(values) {
  return values.every((value) => value !== " ");
}

function checkWinner(player, board) {
  let win = player + player + player;

  for (let i = 0; i < board.length; i++) {
    if (board[i].join("") === win) {
      return true;
    }
  }

  for (let i = 0; i < board.length; i++) {
    let check = "";
    for (let j = 0; j < board[i].length; j++) {
      check += board[j][i];
    }
    if (check === win) {
      return true;
    }
  }

  let check = "";
  for (let i = 0; i < board.length; i++) {
    check += board[i][i];
  }
  if (check === win) {
    return true;
  }
  check = "";

  for (let i = 0; i < board.length; i++) {
    check += board[i][board.length - 1 - i];
  }
  if (check === win) {
    return true;
  }
  return false;
}

function generateBoard(values) {
  let board2D = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(values[i * 3 + j]);
    }
    board2D.push(row);
  }

  return board2D;
}

export default App;
