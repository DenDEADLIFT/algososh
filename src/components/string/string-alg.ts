import { TInput } from "../../types/element-states";

export const swap = (arr: TInput[], i: number, j: number) =>
  ([arr[i], arr[j]] = [arr[j], arr[i]]);