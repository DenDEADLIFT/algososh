export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type TInput = {
  name: string;
  color: ElementStates
}