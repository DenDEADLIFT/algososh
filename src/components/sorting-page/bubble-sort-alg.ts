import { TValueNumber, ElementStates } from '../../types/element-states'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'
import { swap } from '../string/string-alg'

export const bubbleSort = async (onTop: boolean, arr: TValueNumber[], setArr: (newArr: TValueNumber[]) => void) => {

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing
      arr[j + 1].color = ElementStates.Changing
      setArr([...arr])
      await delay(SHORT_DELAY_IN_MS)

      if ((onTop ? arr[j].value > arr[j + 1].value : arr[j + 1].value > arr[j].value)) {
        swap(arr, j, j + 1)
        setArr([...arr])
      }
      await delay(SHORT_DELAY_IN_MS)

      arr[j].color = ElementStates.Default
      arr[j + 1].color = ElementStates.Default
      if (j === arr.length - i - 2) {
        arr[j + 1].color = ElementStates.Modified
      }
      setArr([...arr])
      await delay(SHORT_DELAY_IN_MS)
    }
  }
  arr.map((i: TValueNumber) => { i.color = ElementStates.Modified })
  return arr
}