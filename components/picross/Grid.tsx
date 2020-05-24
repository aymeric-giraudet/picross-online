import { useReducer } from "react";
import reducer, { initState } from "./Grid.reducer";

interface GridProps {
  rowSize: number;
  colSize: number;
}

const Grid: React.FC<GridProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, props, initState);
  //@ts-ignore
  const onTouchStart = (rowId: number, colId: number) => (evt) => {
    evt.preventDefault();
    dispatch({ type: "cellStartTouch", row: rowId, col: colId });
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
      dispatch({ type: "cellMoveTouch", row, col });
    }
  };
  const reinit = () => {
    console.log("reinit");
    dispatch({ type: "reinit" });
  };
  const onMouseEnter = (rowId: number, colId: number) => () => {
    if (state.mode !== "none")
      dispatch({ type: "cellMoveTouch", row: rowId, col: colId });
  };

  return (
    <div
      className="grid-cols-5 inline-grid"
      onTouchMove={onTouchMove}
      onTouchEnd={reinit}
      onMouseUp={reinit}
    >
      {state.grid.map((r, rowIdx) =>
        r.map((c, colIdx) => (
          <div
            key={rowIdx + colIdx}
            data-row={rowIdx}
            data-col={colIdx}
            onMouseDown={onTouchStart(rowIdx, colIdx)}
            onMouseEnter={onMouseEnter(rowIdx, colIdx)}
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
