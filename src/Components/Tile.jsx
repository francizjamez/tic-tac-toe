const Tile = ({ value, id, onClick }) => {
  return (
    <button className="tile" onClick={() => onClick(id, value)}>
      {value}
    </button>
  );
};

export default Tile;
