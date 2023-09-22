import { TInput, TValueNumber } from "../../types/element-states";

export const swap = (arr: TInput[] | TValueNumber[], i: number, j: number) =>
  ([arr[i], arr[j]] = [arr[j], arr[i]]);