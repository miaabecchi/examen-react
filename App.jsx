import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(createBoard());
  const [treasureLocation, setTreasureLocation] = useState(generateTreasureLocation());
  const [gameOver, setGameOver] = useState(false);
  const [clickCount, setClickCount] = useState(0);

   function createBoard() {
    const newBoard = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push({ revealed: false, containsTreasure: false });
      }
      newBoard.push(row);
    }
    return newBoard;
  }
   function generateTreasureLocation() {
    const randomRow = Math.floor(Math.random() * 5);
    const randomCol = Math.floor(Math.random() * 5);
    return { row: randomRow, col: randomCol };
  }
  function handleCellClick(row, col) {
    if (gameOver) return; 

    const newBoard = [...board];
    newBoard[row][col].revealed = true;

    if (row === treasureLocation.row && col === treasureLocation.col) {
      newBoard[row][col].containsTreasure = true;
      setGameOver(true);
    }

    setBoard(newBoard);
    setClickCount(prev => prev + 1);
  }
  function restartGame() {
    setBoard(createBoard());
    setTreasureLocation(generateTreasureLocation());
    setGameOver(false);
    setClickCount(0);
  }
   return (
    <div className="juego">
      <h1>encontra el tesoro!</h1>
      <p>intentaste: {clickCount}</p>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell.revealed ? (cell.containsTreasure ? "treasure" : "revealed") : "hidden"}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.revealed && cell.containsTreasure && "tesoro"}
            </div>
          ))
        )}
      </div>
      {gameOver && <div className="mensaje victoria">encontraste el tesoro!</div>}
      <button className="reiciniar" onClick={restartGame}>reiniciar juego</button>
    </div>
  );
}

export default App;

