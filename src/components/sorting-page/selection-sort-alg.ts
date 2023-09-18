import { TValueNumber, ElementStates } from '../../types/element-states'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'
import { SetStateAction, Dispatch } from 'react'
import { swap } from '../string/string-alg'

export const selectionSort = async (
    onTop: boolean,
    arr: TValueNumber[],
    setMumbersArr: Dispatch<SetStateAction<TValueNumber[]>>,
    setOnTop: Dispatch<SetStateAction<boolean>>,
    setOnDown: Dispatch<SetStateAction<boolean>>) => {

    onTop ? setOnTop(true) : setOnDown(true)

    for (let i = 0; i < arr.length - 1; i++) {
        let item = i
        arr[item].color = ElementStates.Changing

        for (let j = i + 1; j < arr.length; j++) {
            arr[j].color = ElementStates.Changing
            setMumbersArr([...arr])
            await delay(SHORT_DELAY_IN_MS)

            if (onTop ? arr[item].value > arr[j].value : arr[j].value > arr[item].value) {
                arr[item].color = i === item ? ElementStates.Changing : ElementStates.Default
                item = j
                setMumbersArr([...arr])
                await delay(SHORT_DELAY_IN_MS)
            }
            if (j !== item) {
                arr[j].color = ElementStates.Default
                setMumbersArr([...arr])
                await delay(SHORT_DELAY_IN_MS)
            }
        }
        if (i === item) {
            arr[i].color = ElementStates.Modified
            setMumbersArr([...arr])
            await delay(SHORT_DELAY_IN_MS)

        } else {
            swap(arr, item, i)
            arr[i].color = ElementStates.Modified
            setMumbersArr([...arr])
            await delay(SHORT_DELAY_IN_MS)
        }
    }

    arr[arr.length - 1].color = ElementStates.Modified
    setMumbersArr([...arr])
    onTop ? setOnTop(false) : setOnDown(false)
}