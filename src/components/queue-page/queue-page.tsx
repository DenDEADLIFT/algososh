import styles from './queue-page.module.css'
import { FC, SyntheticEvent, useState } from "react"
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { queue } from './queue-page-alg'
import { ElementStates, TinitialLoader } from '../../types/element-states'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'

export const QueuePage: FC = () => {

  const initialLoader: TinitialLoader = {
    add: false,
    delete: false,
    clear: false,
  }

  const [inputValue, setInputValue] = useState("")
  const [symbolsArr, setSymbolsArr] = useState(queue.items)
  const [isLoader, setIsLoader] = useState(initialLoader)

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  const addSymbol = async () => {
    if (inputValue) {
      setIsLoader({ add: true, delete: false, clear: false })
      queue.enqueue({ name: inputValue, color: ElementStates.Changing })
      setInputValue('')
      setSymbolsArr([...queue.items])
      await delay(SHORT_DELAY_IN_MS)
      queue.getContainer()[queue.tail - 1].color = ElementStates.Default
      setIsLoader({ add: false, delete: false, clear: false })
    }
  }

  const deleteSymbol = async () => {
    setIsLoader({ add: false, delete: true, clear: false })
    queue.getContainer()[queue.head].color = ElementStates.Changing
    await delay(SHORT_DELAY_IN_MS)
    queue.dequeue()
    setSymbolsArr([...queue.items])
    setIsLoader({ add: false, delete: false, clear: false })
  }

  const clear = () => {
    queue.clear()
    setSymbolsArr([...queue.items])
    setIsLoader({ add: false, delete: false, clear: false })
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
          isLoader={isLoader.add}
        />
        <Button
          text="Удалить"
          disabled={queue.head === queue.tail ? true : false || isLoader.add}
          onClick={deleteSymbol}
          isLoader={isLoader.delete}
        />
        <Button
          text="Очистить"
          disabled={queue.isEmpty() || isLoader.add || isLoader.delete}
          onClick={clear}
          isLoader={isLoader.clear}
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
