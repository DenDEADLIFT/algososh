import styles from './fibonacci.module.css'
import { FC, useState, FormEvent, SyntheticEvent, ChangeEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { createFibonacci } from './fibonacci-alg'
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'

export const FibonacciPage: FC = () => {

  const [inputValue, setInputValue] = useState<number>(0)
  const [loader, setLoader] = useState<boolean>(false)
  const [numberArr, setNumberArr] = useState<number[]>([])

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => setInputValue(+e.currentTarget.value)

  const handleClick = async () => {
    const arr = createFibonacci(inputValue)
    setLoader(true)
    for (let i = 0; i < arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS)
      setNumberArr(arr.slice(0, i + 1))
    }
    setLoader(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={styles.container}
      >
        <Input
          type="number"
          isLimitText={true}
          max={19}
          onChange={(e) => handleChange(e)}
        />
        <Button
          isLoader={loader}
          type="submit"
          text="Рассчитать"
          disabled={inputValue < 1}
          linkedList="small"
          onClick={handleClick}
        />
      </form>
      <div className={styles.result}>
        {numberArr.map((item: number, key: number) =>
          <Circle
            letter={item.toString()}
            key={key}
          />
        )}
      </div>
    </SolutionLayout>
  );
};
