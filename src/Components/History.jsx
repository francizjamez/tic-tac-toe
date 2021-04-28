import Turn from "./Turn";

const History = ({ turns, goToMove }) => {
  return (
    <div className="history">
      {turns.map((el, i) => (
        <Turn move={i} goToMove={goToMove} />
      ))}
    </div>
  );
};

export default History;
