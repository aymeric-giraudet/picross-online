import { useStore } from "./Grid.store";
import { shallow } from "zustand/shallow";

interface CellProps {
  rowIdx: number;
  colIdx: number;
}

const Cell: React.FC<CellProps> = ({ rowIdx, colIdx }) => {
  const value = useStore((state) => state.grid[rowIdx][colIdx]);
  const [startDrawing, draw] = useStore(
    (state) => [state.startDrawing, state.draw],
    shallow
  );
  const onTouchStart: React.TouchEventHandler = (evt) => {
    startDrawing(rowIdx, colIdx);
    draw(rowIdx, colIdx);
  };
  const onMouseDown: React.MouseEventHandler = (evt) => {
    evt.preventDefault();
    startDrawing(rowIdx, colIdx);
    draw(rowIdx, colIdx);
  };
  return (
    <div
      key={rowIdx + colIdx}
      data-row={rowIdx}
      data-col={colIdx}
      onTouchStart={onTouchStart}
      onTouchEnd={(e) => e.preventDefault()}
      onMouseDown={onMouseDown}
      onMouseEnter={() => draw(rowIdx, colIdx)}
      className={
        value === "filled"
          ? "bg-gray-600 border border-black h-12 w-12"
          : "bg-gray-200 border border-black h-12 w-12"
      }
    />
  );
};
export default Cell;
