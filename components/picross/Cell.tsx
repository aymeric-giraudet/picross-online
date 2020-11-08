import { useStore } from "./Grid.store";
import shallow from "zustand/shallow";

interface CellProps {
  rowIdx: number;
  colIdx: number;
  rowSize: number;
  colSize: number;
}

const Cell: React.FC<CellProps> = ({ rowIdx, colIdx, rowSize, colSize }) => {
  const value = useStore((state) => state.grid[rowIdx][colIdx]);
  const [startDrawing, draw] = useStore(
    (state) => [state.startDrawing, state.draw],
    shallow
  );
  const onTouchStart: React.TouchEventHandler = () => {
    startDrawing(rowIdx, colIdx, 1);
    draw(rowIdx, colIdx);
  };
  const onMouseDown: React.MouseEventHandler = (evt) => {
    evt.preventDefault();
    startDrawing(rowIdx, colIdx, evt.nativeEvent.which as 1 | 3);
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
      onContextMenu={(e) => e.preventDefault()}
      style={{
        borderRightWidth: colIdx === colSize - 1 || colIdx % 5 === 4 ? 1 : 0,
        borderBottomWidth: rowIdx === rowSize - 1 || rowIdx % 5 === 4 ? 1 : 0,
      }}
      className={`flex items-center justify-center text-5xl border-l border-t border-black h-12 w-12 ${
        value === "filled" ? "bg-gray-600" : "bg-gray-200"
      }`}
    >
      {value === "marked" && "X"}
    </div>
  );
};
export default Cell;
