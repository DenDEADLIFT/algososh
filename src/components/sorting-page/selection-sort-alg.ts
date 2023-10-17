import { TValueNumber, ElementStates } from '../../types/element-states'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'
import { useState } from 'react'
import { swap } from '../string/string-alg'

export const sortArray = async (onTop: boolean, arr: TValueNumber[], setArr: (newArr: TValueNumber[]) => void) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let item = i
        arr[item].color = ElementStates.Changing

        for (let j = i + 1; j < arr.length; j++) {
            arr[j].color = ElementStates.Changing
            setArr([...arr])
            await delay(SHORT_DELAY_IN_MS)

            if (onTop ? arr[item].value > arr[j].value : arr[j].value > arr[item].value) {
                arr[item].color = i === item ? ElementStates.Changing : ElementStates.Default
                item = j
                setArr([...arr])
                await delay(SHORT_DELAY_IN_MS)
            }
            if (j !== item) {
                arr[j].color = ElementStates.Default
                setArr([...arr])
                await delay(SHORT_DELAY_IN_MS)
            }
        }
        if (i === item) {
            arr[i].color = ElementStates.Modified
            setArr([...arr])
            await delay(SHORT_DELAY_IN_MS)

        } else {
            swap(arr, item, i)
            arr[i].color = ElementStates.Modified
            setArr([...arr])
            await delay(SHORT_DELAY_IN_MS)
        }
    }
}

export const useSelectionSort = () => {

    const [arrSelect, setArr] = useState<TValueNumber[]>([])

    const selectionSort = async (onTop: boolean, arr: TValueNumber[]) => {

        await sortArray(onTop, arr, setArr)

        arr[arr.length - 1].color = ElementStates.Modified
        setArr([...arr])
    }
    return { arrSelect, selectionSort }
}