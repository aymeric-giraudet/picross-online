import { create } from "zustand";
import immer from "../../helpers/immer";

type CellStatus = "empty" | "filled" | "marked";

interface GridState {
  grid: CellStatus[][];
  mode: "none" | "drawing" | "erasing" | "marking";
  touchedCells: Array<{ row: number; col: number }>;
  success?: boolean;
  initGrid: (rowSize: number, colSize: number) => void;
  startDrawing: (rowIdx: number, colIdx: number) => void;
  draw: (rowIdx: number, colIdx: number) => void;
  stopDrawing: () => void;
  validate: (solution: boolean[][]) => void;
}

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
    startDrawing: (rowIdx, colIdx) =>
      set((state) => {
        state.mode =
          state.grid[rowIdx][colIdx] === "empty" ? "drawing" : "erasing";
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
        let value: CellStatus = state.mode === "drawing" ? "filled" : "empty";
        state.grid[rowIdx][colIdx] = value;
      }),
    stopDrawing: () =>
      set((state) => {
        state.mode = "none";
        state.touchedCells = [];
      }),
    validate: (solution) => set((state) => {
      for(let row = 0; row < solution.length; row++) {
        for(let col = 0; col < solution[0].length; col++) {
          const solutionCell = solution[row][col];
          const gridCell = state.grid[row][col];
          if((solutionCell && gridCell !== "filled") || (!solutionCell && gridCell === "filled")) {
            state.success = false;
            return;
          }
        }
      }
      state.success = true;
    })
  }))
);
