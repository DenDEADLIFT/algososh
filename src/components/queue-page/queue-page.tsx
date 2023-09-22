import styles from './queue-page.module.css'
import { FC, SyntheticEvent, useState } from "react"
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { queue } from './queue-page-class'
import { ElementStates } from '../../types/element-states'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { initialLoaderQueue } from '../../constants/initial-states'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'

export const QueuePage: FC = () => {

  const [inputValue, setInputValue] = useState("")
  const [symbolsArr, setSymbolsArr] = useState(queue.items)
  const [isLoader, setIsLoader] = useState({ initialLoaderQueue })

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  const addSymbol = async () => {
    if (inputValue) {
      setIsLoader((prevState) => ({ ...prevState, add: true }))
      queue.enqueue({ name: inputValue, color: ElementStates.Changing })
      setInputValue('')
      setSymbolsArr([...queue.items])
      await delay(SHORT_DELAY_IN_MS)
      queue.getContainer()[queue.tail - 1].color = ElementStates.Default
      setIsLoader((prevState) => ({ ...prevState, add: false }))
    }
  }

  const deleteSymbol = async () => {
    setIsLoader((prevState) => ({ ...prevState, delete: true }))
    queue.getContainer()[queue.head].color = ElementStates.Changing
    await delay(SHORT_DELAY_IN_MS)
    queue.dequeue()
    setSymbolsArr([...queue.items])
    setIsLoader((prevState) => ({ ...prevState, delete: false }))
  }

  const clear = () => {
    queue.clear()
    setSymbolsArr([...queue.items])
    setIsLoader((prevState) => ({ ...prevState, add: false, delete: false, clear: false }))
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.container}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          value={inputValue}
          onChange={(e) => handleChange(e)}
          extraClass="mr-25"
        />
        <Button
          text="Добавить"
          disabled={inputValue ? false : true}
          onClick={addSymbol}
          isLoader={isLoader.initialLoaderQueue.add}
        />
        <Button
          text="Удалить"
          disabled={queue.head === queue.tail ? true : false || isLoader.initialLoaderQueue.add}
          onClick={deleteSymbol}
          isLoader={isLoader.initialLoaderQueue.delete}
        />
        <Button
          text="Очистить"
          disabled={queue.isEmpty() || isLoader.initialLoaderQueue.add || isLoader.initialLoaderQueue.delete}
          onClick={clear}
          isLoader={isLoader.initialLoaderQueue.clear}
          extraClass="ml-40"
        />
      </form>
      <div className={styles.result}>
        {symbolsArr.map((i, key) => {
          return (
            <Circle
              state={i?.color}
              letter={i?.name ? i.name : ""}
              key={key}
              index={key}
              head={key === queue.head && !queue.isEmpty() ? "head" : ""}
              tail={key === queue.tail - 1 && !queue.isEmpty() ? "tail" : ""}
            />)
        })}
      </div>
    </SolutionLayout>
  )
}
