export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type TInput = {
  name: string;
  color: ElementStates;
}

export type TValueNumber = {
  value: number;
  color: ElementStates
}