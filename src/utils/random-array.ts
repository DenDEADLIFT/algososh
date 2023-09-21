import { ElementStates } from '../types/element-states'

export const randomArray = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export const newArray = (min: number, max: number) => {

    let newArr = [];
    for (let i = 0; i <= randomArray(min, max); i++)
    newArr.push({
        value: Math.floor(Math.random() * 100),
        color: ElementStates.Default,
      });
    return newArr;

  }
