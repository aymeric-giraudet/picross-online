import { useState } from "react";

interface GridProps {
  rowSize: number;
  colSize: number;
}

const Grid: React.FC<GridProps> = (props) => {
  const [grid, setGrid] = useState(
    Array.from(Array(props.colSize), () => Array(props.rowSize).fill(false))
  );
  const [touchedCells, setTouchedCells] = useState<
    Array<{ row: number; col: number }>
  >([]);
  const [mode, setMode] = useState("draw");
  const onTouchStart: (
    rowId: number,
    colId: number
  ) => React.TouchEventHandler<HTMLDivElement> = (rowId, colId) => (_) => {
    setTouchedCells([{ row: rowId, col: colId }]);
    const touched = grid[rowId][colId];
    if (touched) {
      setGrid((grd) =>
        grd.map((r, rId) =>
          r.map((c, cId) => (rowId === rId && colId === cId ? false : c))
        )
      );
      setMode("erase");
    } else {
      setGrid((grd) =>
        grd.map((r, rId) =>
          r.map((c, cId) => (rowId === rId && colId === cId ? true : c))
        )
      );
      setMode("draw");
    }
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (evt) => {
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
      if (
        touchedCells.findIndex((tc) => tc.row === row && tc.col === col) !== -1
      )
        return;
      const cell = grid[row][col];
      if (mode === "draw" && cell === false) {
        setGrid((grd) =>
          grd.map((r, rId) =>
            r.map((c, cId) => (row === rId && col === cId ? true : c))
          )
        );
      } else if (mode === "erase" && cell === true) {
        setGrid((grd) =>
          grd.map((r, rId) =>
            r.map((c, cId) => (row === rId && col === cId ? false : c))
          )
        );
      }
      setTouchedCells((touchaid) => [...touchaid, { row, col }]);
    }
  };

  return (
    <div className="grid-cols-5 inline-grid" onTouchMove={onTouchMove}>
      {grid.map((r, rowIdx) =>
        r.map((c, colIdx) => (
          <div
            key={rowIdx + colIdx}
            data-row={rowIdx}
            data-col={colIdx}
            onTouchStart={onTouchStart(rowIdx, colIdx)}
            className={
              c
                ? "bg-gray-600 border border-black h-12 w-12"
                : "bg-gray-200 border border-black h-12 w-12"
            }
          />
        ))
      )}
    </div>
  );
};

export default Grid;
