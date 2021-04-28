import Board from "./Components/Board";
import History from "./Components/History";
import "./Styles/styles.css";

import { useState } from "react";

const initialStates = new Array(9).fill(" ");

function App() {
  const [gameState, setGameState] = useState("Game is in progress");
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([initialStates]);
  const [currentTurn, setCurrentTurn] = useState(initialStates);
  const [turnNumber, setTurnNumber] = useState(1);
  const [playerTurn, setPlayerTurn] = useState(0);

  const checkGameState = (values) => {
    const board2D = generateBoard(values);

    let winnerX = checkWinner("X", board2D);
    let winnerO = checkWinner("O", board2D);
    let draw = checkDraw(values);

    setGameOver(false);
    setGameState("Game is in progress");

    if (winnerX || winnerO || draw) {
      setGameOver(true);
    }
    if (draw) {
      setGameState("It's a tie");
    }
    if (winnerX) {
      setGameState("Winner: Player 1");
    }
    if (winnerO) {
      setGameState("Winner: Player 2");
    }
  };

  const goToMove = (turn) => {
    setCurrentTurn(history[turn]);
    checkGameState(history[turn]);
    setTurnNumber(turn + 1);
    setPlayerTurn(turn);
    console.log(turn);
  };

  const play = (values) => {
    setCurrentTurn([...values]);
    setTurnNumber(turnNumber + 1);
  };

  const saveHistory = (values) => {
    let newHistory = history.map((el) => [...el]);
    console.log(newHistory);
    newHistory[turnNumber] = [...values];
    newHistory = newHistory.slice(0, turnNumber + 1);

    console.log(newHistory);
    console.log(turnNumber);
    setHistory(newHistory);
  };

  return (
    <div className="App">
      <h1>{gameState}</h1>
      <div className="container">
        <Board
          stateCheck={checkGameState}
          gameOver={gameOver}
          saveHistory={saveHistory}
          currentTurn={currentTurn}
          play={play}
          turn={playerTurn}
          setTurn={setPlayerTurn}
        />
        <History turns={history} goToMove={goToMove} />
      </div>
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
