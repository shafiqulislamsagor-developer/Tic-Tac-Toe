import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Board from "./Board";

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(Math.random() < 0.5);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }

    return null;
  };

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }
  }, [squares]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(Math.random() < 0.5);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-10 text-center shadow-xl text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Tic Tac Toe</h1>
        <div className="mb-4 text-xl">
          {winner
            ? `🎉 Winner: ${winner}`
            : squares.every(Boolean)
            ? "Draw!"
            : `Next Turn: ${xIsNext ? "X" : "O"}`}
        </div>
        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={winningLine}
        />
        <button
          onClick={resetGame}
          className="mt-6 px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded transition"
        >
          🔄 Reset Game
        </button>
      </div>
    </div>
  );
}
