import React from "react";
import MoreDetails from "./MoreDetails";
function Card(index) {
  return (
    <div className="bg-violet-400">
      {item.name}
      <button
        onClick={() => {
          setOpenState(true);
        }}
      >
        See More details
      </button>
      {open && (
        <MoreDetails index={index} onClose={() => setOpenState(false)} />
      )}
    </div>
  );
}

export default Card;
