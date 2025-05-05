import Square from "./Square";

export default function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinningSquare = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {squares.map((_, i) => renderSquare(i))}
    </div>
  );
}
