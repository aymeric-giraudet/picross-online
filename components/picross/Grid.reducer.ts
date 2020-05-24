interface GridState {
  grid: boolean[][];
  mode: "none" | "draw" | "erase";
  touchedCells: Array<{ row: number; col: number }>;
}

export const initState = ({
  rowSize,
  colSize,
}: {
  rowSize: number;
  colSize: number;
}): GridState => ({
  grid: Array.from(Array(colSize), () => Array(rowSize).fill(false)),
  mode: "none",
  touchedCells: [],
});

const reducer = (state: GridState, action: any): GridState => {
  switch (action.type) {
    case "cellStartTouch": {
      const { row, col } = action;
      if (
        state.touchedCells.findIndex(
          (tc) => tc.row === row && tc.col === col
        ) !== -1
      )
        return state;
      return {
        ...state,
        touchedCells: [{ row, col }],
        mode: state.grid[row][col] ? "erase" : "draw",
        grid: state.grid.map((r, rowIdx) =>
          r.map((cell, colIdx) =>
            rowIdx === row && colIdx === col ? !cell : cell
          )
        ),
      };
    }
    case "cellMoveTouch": {
      if(state.mode === "none") {
        return state;
      }
      const { row, col } = action;
      if (
        state.touchedCells.findIndex(
          (tc) => tc.row === row && tc.col === col
        ) !== -1
      )
        return state;
      return {
        ...state,
        touchedCells: [...state.touchedCells, { row, col }],
        grid: state.grid.map((r, rowIdx) =>
          r.map((cell, colIdx) =>
            rowIdx === row && colIdx === col ? state.mode === "draw" : cell
          )
        ),
      };
    }
    case "reinit": {
      return { ...state, touchedCells: [], mode: "none" };
    }
  }
  return state;
};

export default reducer;
