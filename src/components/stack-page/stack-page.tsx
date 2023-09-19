import styles from './stack-page.module.css'
import { FC, useState, SyntheticEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'
import { ElementStates, TinitialLoader, TInput } from '../../types/element-states'
import { stack } from './stack-page-alg'

export const StackPage: FC = () => {

  const initialLoader: TinitialLoader = {
    add: false,
    delete: false,
    clear: false,
  }

  const [inputValue, setInputValue] = useState<string>("")
  const [symbolsArr, setSymbolsArr] = useState<TInput[]>(stack.items)
  const [isLoader, setIsLoader] = useState(initialLoader)

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  const addSymbol = async () => {
    if (inputValue) {
      setIsLoader({ add: true, delete: false, clear: false })
      stack.push({ name: inputValue, color: ElementStates.Changing })
      setInputValue('')
      setSymbolsArr([...stack.items])
      await delay(SHORT_DELAY_IN_MS)
      stack.peak()!.color = ElementStates.Default
      setSymbolsArr([...stack.items])
      setIsLoader({ add: false, delete: false, clear: false })
    }
  }

  const deleteSymbol = async () => {
    setIsLoader({ add: false, delete: true, clear: false })
    stack.peak()!.color = ElementStates.Changing
    setSymbolsArr([...stack.items])
    stack.pop()
    await delay(SHORT_DELAY_IN_MS)
    setSymbolsArr([...stack.items])
    setIsLoader({ add: false, delete: false, clear: false })
  }

  const clear = () => {
    stack.clear()
    setSymbolsArr([...stack.items])
    setIsLoader({ add: false, delete: false, clear: false })
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${inputValue}`}
          onChange={handleChange}
          extraClass="mr-25"
        />

        <Button
          onClick={addSymbol}
          isLoader={isLoader.add}
          text="Добавить"
          disabled={inputValue ? false : true}
        />
        <Button
          onClick={deleteSymbol}
          isLoader={isLoader.delete}
          text="Удалить"
          disabled={!symbolsArr.length ? true : false || isLoader.add}
        />
        <Button
          onClick={clear}
          text="Очистить"
          disabled={isLoader.add || isLoader.delete || !symbolsArr.length}
          isLoader={isLoader.clear}
          extraClass="ml-40"
        />
      </div>
      <div className={styles.result}>
        {symbolsArr.map((i, key) => (
          <Circle
            key={key}
            index={key}
            letter={i.name}
            state={i.color}
            head={symbolsArr.length - 1 === key ? "top" : ''}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
