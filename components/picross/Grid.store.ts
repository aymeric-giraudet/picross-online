import { create, SetState, GetState, StoreApi } from "zustand";
import produce from "immer";

type CellStatus = "empty" | "filled" | "marked";

interface GridState {
  grid: CellStatus[][];
  mode: "none" | "drawing" | "erasing" | "marking";
  touchedCells: Array<{ row: number; col: number }>;
  initGrid: (rowSize: number, colSize: number) => void;
  startDrawing: (rowIdx: number, colIdx: number) => void;
  draw: (rowIdx: number, colIdx: number) => void;
  stopDrawing: () => void;
}

type ImmerStateCreator<T> = (
  set: ImmerSetState<T>,
  get: GetState<T>,
  api: StoreApi<T>
) => T;
type ImmerSetState<T> = (partial: (state: T) => void) => void;

const immer = (config: ImmerStateCreator<GridState>) => (
  set: SetState<GridState>,
  get: GetState<GridState>,
  api: StoreApi<GridState>
  //@ts-ignore
) => config((fn) => set(produce(fn)), get, api);

export const [useStore] = create(
  immer((set) => ({
    grid: [],
    touchedCells: [],
    mode: "none",
    initGrid: (rowSize, colSize) =>
      set((state) => {
        state.grid = Array.from(Array(colSize), () =>
          Array(rowSize).fill("empty")
        );
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
  }))
);
