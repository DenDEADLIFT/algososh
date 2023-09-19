export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type TInput = {
  head?: boolean;
  tail?: boolean;
  name: string;
  color: ElementStates;
}

export type TValueNumber = {
  value: number;
  color: ElementStates
}

export type TinitialLoader = {
  add: boolean,
  delete: boolean,
  clear: boolean,
}