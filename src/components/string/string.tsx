import styles from './string.module.css'
import { FC, useState, SyntheticEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { TInput, ElementStates } from '../../types/element-states'
import { swap } from './string-alg'
import { DELAY_IN_MS, delay } from '../../constants/delays'

export const StringComponent: FC = () => {

  const [inputValue, setInputValue] = useState('')
  const [loader, setLoader] = useState<boolean>(false)
  const [stringArr, setStringArr] = useState<TInput[]>([])

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  const stringToArr = () => {
    const createArr = inputValue.split("").map((item: string) => {
      return {
        name: item,
        color: ElementStates.Default
      };
    })
    createElement(createArr)
  }

  const createElement = async (arr: TInput[]) => {
    setLoader(true);
    const mid = Math.floor(arr.length / 2)
    await delay(DELAY_IN_MS)
    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i
      
      if (i !== j) {
        arr[i].color = ElementStates.Changing
        arr[j].color = ElementStates.Changing
        setStringArr([...arr])
        await delay(DELAY_IN_MS)
      }
      swap(arr, i, j)
      arr[i].color = ElementStates.Modified
      arr[j].color = ElementStates.Modified
      setStringArr([...arr])
    }
    setLoader(false)
  }

  return (
    <SolutionLayout
      title="Строка"
    >
      <div
        className={styles.container}
      >
        <Input
          isLimitText={true}
          maxLength={11}
          onChange={(e) => handleChange(e)}
          data-test="input"
        />
        <Button
          type="submit"
          isLoader={loader}
          text="Развернуть"
          disabled={!inputValue.length}
          linkedList="small"
          data-test="button"
          onClick={stringToArr}
        />
      </div>
      <div className={styles.result}>
        {stringArr.map((item: TInput, index: number) => (
          <Circle 
          key={index}
          letter={item.name} 
          state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};