export default function Square({ value, onClick, isWinningSquare }) {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl font-bold rounded-lg 
          flex items-center justify-center 
          bg-white/20 text-white shadow-lg transition 
          transform hover:scale-105 active:scale-95 
          ${isWinningSquare ? "animate-pulse border-4 border-green-400" : ""}`}
    >
      {value}
    </button>
  );
}
