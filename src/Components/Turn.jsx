import React from "react";

const Turn = ({ move, goToMove }) => {
  return (
    <div>
      <button className="turn" onClick={() => goToMove(move)}>
        Go to move {move}
      </button>
    </div>
  );
};

export default Turn;
