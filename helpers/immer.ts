import { SetState, GetState, StoreApi } from "zustand";
import produce from "immer";

type ImmerStateCreator<T> = (
  set: ImmerSetState<T>,
  get: GetState<T>,
  api: StoreApi<T>
) => T;
type ImmerSetState<T> = (partial: (state: T) => void) => void;

const immer = <T>(config: ImmerStateCreator<T>) => (
  set: SetState<T>,
  get: GetState<T>,
  api: StoreApi<T>
  //@ts-ignore
) => config((fn) => set(produce(fn)), get, api);

export default immer;
