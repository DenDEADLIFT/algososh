export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type TInput = {
  head?: boolean;
  tail?: boolean;
  name?: string;
  value?: string;
  color: ElementStates;
}

export type TValueNumber = {
  value: number;
  color: ElementStates
}

export type TinitialLoader = {
  add?: boolean,
  delete?: boolean,
  clear?: boolean,
  changedIndexes?: number | null,
  updatedIndexes?: number | null,
  indexAtTopCircle?: number,
  circleLetterAtTop?: string,
  indexAtBottomCircle?: number,
  circleLetterAtBottom?: string,
  addingHead?: boolean,
  addingTail?: boolean,
  deletingHead?: boolean,
  deletingTail?: boolean,
  addingByIndex?: boolean,
  deletingByIndex?: boolean,
}

export interface ILinkedList<T> {
  prepend: (e: T) => void
  append: (e: T) => void
  addIndex: (e: T, i: number) => void
  deleteIndex: (i: number | null) => void
  deleteHead: () => void
  deleteTail: () => void
  toContainer: () => T[]
  isEmpty: () => boolean
  getByIndex: (i: number) => void
}