import Cell from "./Cell";
import { useStore } from "./Grid.store";
import { useEffect } from "react";
import shallow from "zustand/shallow";

const Grid = ({ rowSize, colSize }) => {
  const grid = useStore(
    (state) => state.grid,
    (state, newState) => state.length === newState.length
  );
  const [initGrid, draw, stopDrawing] = useStore(
    (state) => [state.initGrid, state.draw, state.stopDrawing],
    shallow
  );
  useEffect(() => {
    initGrid(rowSize, colSize);
    return () => initGrid(rowSize, colSize);
  }, [rowSize, colSize]);

  const onTouchMove = (evt) => {
    const myLocation = evt.changedTouches[0];
    const realTarget = document.elementFromPoint(
      myLocation.clientX,
      myLocation.clientY
    );
    if (realTarget) {
      const rowString = realTarget.getAttribute("data-row");
      const colString = realTarget.getAttribute("data-col");
      if (rowString === null || colString === null) return;
      const row = parseInt(rowString);
      const col = parseInt(colString);
      draw(row, col);
    }
  };

  return (
    <div
      className="grid-cols-5 inline-grid mx-auto"
      onTouchMove={onTouchMove}
      onTouchEnd={stopDrawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    >
      {grid.map((r, rowIdx) =>
        r.map((_, colIdx) => (
          <Cell key={rowIdx + colIdx} rowIdx={rowIdx} colIdx={colIdx} />
        ))
      )}
    </div>
  );
};

export default Grid;
