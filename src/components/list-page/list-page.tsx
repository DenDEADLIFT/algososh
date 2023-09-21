import styles from "./list-page.module.css"
import { useState, FC, ChangeEvent } from "react"
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { ElementStates, TinitialLoader } from '../../types/element-states'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { LinkedList } from './list-page-class'
import { ArrowIcon } from '../ui/icons/arrow-icon'
import { randomArray } from '../../utils/random-array'
import { initialStateList } from '../../constants/initial-states'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'

const newStringsArray = (min: number, max: number) => {
  const length = randomArray(min, max)
  return Array.from({ length }, () => Math.floor(Math.random() * 100).toString())
}

const initialArray: string[] = newStringsArray(4, 4)
const linkedList = new LinkedList(initialArray)

export const ListPage: FC = () => {

  const [inputSymbols, setInputSymbols] = useState<string>('')
  const [inputIndex, setInputIndex] = useState<number | null>(null)
  const [symbols, setSymbolsArr] = useState<string[]>(linkedList.container)
  const [state, setState] = useState<TinitialLoader>(initialStateList)

  const addingHead = async () => {
    setState((prevState) => ({ ...prevState, addingHead: true }))
    if (!inputSymbols) return null
    linkedList.prepend(inputSymbols)
    setState((prevState) => ({ ...prevState, indexAtTopCircle: 0, circleLetterAtTop: inputSymbols }))
    setInputSymbols('')
    await delay(SHORT_DELAY_IN_MS)
    setSymbolsArr(linkedList.container)
    setState((prevState) => ({ ...prevState, indexAtTopCircle: - 1, circleLetterAtTop: '', updatedIndexes: null }))
    await delay(SHORT_DELAY_IN_MS)
    setState((prevState) => ({ ...prevState, updatedIndexes: null, addingHead: false }))

  }

  const addingTail = async () => {
    setState((prevState) => ({ ...prevState, addingTail: true, indexAtTopCircle: linkedList.container.length - 2 }))
    if (!inputSymbols) return null
    linkedList.append(inputSymbols)
    setState((prevState) => ({ ...prevState, circleLetterAtTop: inputSymbols }))
    setInputSymbols('')
    await delay(SHORT_DELAY_IN_MS)
    setSymbolsArr(linkedList.container)
    setState((prevState) => ({ ...prevState, indexAtTopCircle: -1, circleLetterAtTop: '', updatedIndexes: linkedList.container.length - 1 }))
    await delay(SHORT_DELAY_IN_MS)
    setState((prevState) => ({ ...prevState, indexAtTopCircle: -1, updatedIndexes: null, addingTail: false }))
    setInputIndex(null)
  }

  const deletingHead = async () => {
    setState((prevState) => ({ ...prevState, deletingHead: true }))
    setSymbolsArr(symbols.map((i, index) => index === 0 ? i = '' : i))
    setState((prevState) => ({ ...prevState, indexAtBottomCircle: 0, circleLetterAtBottom: linkedList.getHead }))
    linkedList.deleteHead()
    await delay(SHORT_DELAY_IN_MS)
    setSymbolsArr(linkedList.container)
    setState((prevState) => ({ ...prevState, indexAtBottomCircle: -1, circleLetterAtBottom: '', deletingHead: false }))
  }

  const deletingTail = async () => {
    setState((prevState) => ({ ...prevState, deletingTail: true }))
    setSymbolsArr(symbols.map((i, index) => index === linkedList.container.length - 1 ? i = '' : i))
    setState((prevState) => ({ ...prevState, indexAtBottomCircle: linkedList.container.length, circleLetterAtBottom: linkedList.getTail }))
    linkedList.deleteTail()
    await delay(SHORT_DELAY_IN_MS)
    setSymbolsArr(linkedList.container)
    setState((prevState) => ({ ...prevState, indexAtBottomCircle: -1, circleLetterAtBottom: '', deletingTail: false }))
  }

  const addingByIndex = async () => {
    let count: number = -1;
    setState((prevState) => ({ ...prevState, addingByIndex: true }))
    if (!inputIndex) return
    const recursiveFunction = async () => {
      if (count <= inputIndex) {
        setState((prevState) => ({ ...prevState, indexAtTopCircle: count, circleLetterAtTop: inputSymbols, changedIndexes: count }))
        count++
        await delay(SHORT_DELAY_IN_MS)
        recursiveFunction()
      } else {
        linkedList.addIndex(inputSymbols, inputIndex)
        await delay(SHORT_DELAY_IN_MS)
        setState((prevState) => ({ ...prevState, updatedIndexes: inputIndex }))
        setSymbolsArr(linkedList.container)
        setState((prevState) => ({ ...prevState, indexAtTopCircle: - 1, circleLetterAtTop: '' }))
        await delay(SHORT_DELAY_IN_MS)
        setState((prevState) => ({ ...prevState, changedIndexes: null, updatedIndexes: null, addingByIndex: false }))
      }
    }
    recursiveFunction()
    setInputIndex(null)
    setInputSymbols('')
  }

  const deletingByIndex = async () => {
    setState((prevState) => ({ ...prevState, changedIndexes: null, updatedIndexes: null, deletingByIndex: true }))
    if (!inputIndex) return
    for (let i = 0; i <= inputIndex; i++) {
      await delay(SHORT_DELAY_IN_MS)
      setState((prevState) => ({ ...prevState, changedIndexes: i }))
    }
    setState((prevState) => ({ ...prevState, changedIndexes: inputIndex }))
    setSymbolsArr(symbols.map((i, key) => key === inputIndex ? '' : i))
    setState((prevState) => ({ ...prevState, indexAtBottomCircle: inputIndex, circleLetterAtBottom: linkedList.getByIndex(inputIndex) }))
    linkedList.deleteIndex(inputIndex)
    await delay(SHORT_DELAY_IN_MS)
    setState((prevState) => ({ ...prevState, changedIndexes: null }))
    setSymbolsArr(linkedList.container)
    setState((prevState) => ({ ...prevState, indexAtBottomCircle: -1, circleLetterAtBottom: '' }))
    await delay(SHORT_DELAY_IN_MS)
    setState((prevState) => ({ ...prevState, changedIndexes: null, deletingByIndex: false }))
    setInputSymbols('')
    setInputIndex(null)
  }

  const changeColor = (i: number): ElementStates => {
    if (state.updatedIndexes !== null && state.updatedIndexes !== undefined && state.updatedIndexes === i) {
      return ElementStates.Modified
    } else if (state.changedIndexes !== null && state.changedIndexes !== undefined && state.changedIndexes === i) {
      return ElementStates.Changing
    } else {
      return ElementStates.Default
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          placeholder="Введите значение"
          maxLength={4}
          type="text"
          isLimitText={true}
          value={inputSymbols}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputSymbols(e.currentTarget.value)}
          extraClass={styles.input}
        />
        <Button
          text="Добавить в head"
          onClick={addingHead}
          disabled={inputSymbols === '' || state.addingTail || state.deletingHead
            || state.deletingTail || state.addingByIndex || state.deletingByIndex}
          isLoader={state.addingHead}
          extraClass={styles.small_button}
        />
        <Button
          text="Добавить в tail"
          onClick={addingTail}
          disabled={inputSymbols === '' || state.addingHead || state.deletingHead
            || state.deletingTail || state.addingByIndex || state.deletingByIndex}
          isLoader={state.addingTail}
          extraClass={styles.small_button}
        />
        <Button
          text="Удалить из head"
          onClick={deletingHead}
          isLoader={state.deletingHead}
          disabled={state.addingTail || state.addingHead
            || state.deletingTail || state.addingByIndex || state.deletingByIndex}
          extraClass={styles.small_button}
        />
        <Button
          text="Удалить из tail"
          onClick={deletingTail}
          isLoader={state.deletingTail}
          disabled={state.addingTail || state.addingHead || state.deletingHead || state.addingByIndex
            || state.deletingByIndex}
          extraClass={styles.small_button}
        />
      </div>
      <div className={styles.index_container}>
        <Input
          placeholder="Введите индекс"
          type="number"
          max={symbols.length - 1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setInputIndex(Number(e.target.value)) }}
          value={inputIndex ?? ''}
          extraClass={styles.input}
        />
        <Button
          text="Добавить по индексу"
          onClick={addingByIndex}
          disabled={!inputSymbols || inputIndex === undefined || state.addingHead || state.deletingHead
            || state.deletingTail || state.addingTail || state.deletingByIndex}
          isLoader={state.addingByIndex}
          extraClass={styles.big_button}
        />
        <Button
          text="Удалить по индексу"
          onClick={deletingByIndex}
          disabled={!inputIndex || state.addingHead || state.deletingHead
            || state.deletingTail || state.addingTail || state.addingByIndex}
          isLoader={state.deletingByIndex}
          extraClass={styles.big_button}
        />
      </div>
      <div className={styles.result}>
        {symbols.map((i, key, arr) => (
          <div className={styles.under_element} key={key}>
            {arr.indexOf(i) === state.indexAtTopCircle &&
              (<Circle
                letter={state.circleLetterAtTop}
                isSmall={true}
                state={ElementStates.Changing}
                extraClass={styles.add_element}
              />
              )}
            <Circle
              letter={i}
              index={key}
              head={key === 0 && state.indexAtTopCircle ? "head" : ''}
              tail={arr.length - 1 === key && !state.circleLetterAtBottom ? "tail" : ''}
              state={changeColor(arr.indexOf(i))}
            />
            {arr.indexOf(i) === state.indexAtBottomCircle &&
              (<Circle
                letter={state.circleLetterAtBottom}
                isSmall={true}
                state={ElementStates.Changing}
                extraClass={styles.delete_element}
              />
              )}
            {arr.length - 1 !== key && <ArrowIcon />}
          </div>
        )
        )}
      </div>
    </SolutionLayout>
  )
}