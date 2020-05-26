import { create } from "zustand";
import immer from "../../helpers/immer";

type CellStatus = "empty" | "filled" | "marked";

interface GridState {
  grid: CellStatus[][];
  mode: "none" | "filled" | "empty" | "marked" | "unmark";
  touchedCells: Array<{ row: number; col: number }>;
  success?: boolean;
  initGrid: (rowSize: number, colSize: number) => void;
  startDrawing: (rowIdx: number, colIdx: number, clickType: 1 | 3) => void;
  draw: (rowIdx: number, colIdx: number) => void;
  stopDrawing: () => void;
  validate: (solution: boolean[][]) => void;
}

const leftClickMode: { [key: string]: CellStatus} = {
  "empty": "filled",
  "filled": "empty",
  "marked": "filled"
};

export const [useStore] = create(
  immer<GridState>((set) => ({
    grid: [],
    touchedCells: [],
    mode: "none",
    initGrid: (rowSize, colSize) =>
      set((state) => {
        state.grid = Array.from(Array(colSize), () =>
          Array(rowSize).fill("empty")
        );
        state.success = undefined;
      }),
    startDrawing: (rowIdx, colIdx, clickType) =>
      set((state) => {
        const cellValue = state.grid[rowIdx][colIdx];
        if (clickType === 1) {
          state.mode = leftClickMode[cellValue];
        } else {
          state.mode =
            state.grid[rowIdx][colIdx] === "marked" ? "unmark" : "marked";
        }
      }),
    draw: (rowIdx, colIdx) =>
      set((state) => {
        if (
          state.mode === "none" ||
          state.touchedCells.some(
            (pos) => pos.row === rowIdx && pos.col === colIdx
          )
        )
          return;
        state.touchedCells.push({ row: rowIdx, col: colIdx });
        if(state.mode === "unmark") {
          state.grid[rowIdx][colIdx] = state.grid[rowIdx][colIdx] === "filled" ? "filled" : "empty";
          return;
        }
        state.grid[rowIdx][colIdx] = state.mode;
      }),
    stopDrawing: () =>
      set((state) => {
        state.mode = "none";
        state.touchedCells = [];
      }),
    validate: (solution) =>
      set((state) => {
        for (let row = 0; row < solution.length; row++) {
          for (let col = 0; col < solution[0].length; col++) {
            const solutionCell = solution[row][col];
            const gridCell = state.grid[row][col];
            if (
              (solutionCell && gridCell !== "filled") ||
              (!solutionCell && gridCell === "filled")
            ) {
              state.success = false;
              return;
            }
          }
        }
        state.success = true;
      }),
  }))
);
