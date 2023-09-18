import styles from './sorting-page.module.css'
import { FC, useState, ChangeEvent } from "react"
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Button } from '../ui/button/button'
import { TValueNumber, ElementStates } from '../../types/element-states'
import { Direction } from '../../types/direction'
import { bubbleSort } from './bubble-sort-alg'
import { selectionSort } from './selection-sort-alg'
import { Column } from '../ui/column/column'
import { RadioInput } from '../ui/radio-input/radio-input'
import { randomArray } from '../../utils/random-array'

export const SortingPage: FC = () => {

  const [numbersArr, setMumbersArr] = useState<TValueNumber[]>([])
  const [checkbox, setCheckbox] = useState('select')
  const [onTop, setOnTop] = useState<boolean>(false)
  const [onDown, setOnDown] = useState<boolean>(false)

  const checkboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckbox(e.target.value)
  }

  const newArray = (min: number, max: number) => {

    let arr = [];
    for (let i = 0; i <= randomArray(min, max); i++)
      arr.push({
        value: Math.floor(Math.random() * 100),
        color: ElementStates.Default,
      });
    return arr;

  }

  const sortOnTop = () => {
    if (checkbox === "select") {
      selectionSort(true, numbersArr, setMumbersArr, setOnTop, setOnDown)
    } else {
      bubbleSort(true, numbersArr, setMumbersArr, setOnTop, setOnDown)
    }

  }

  const sortOnDown = () => {
    if (checkbox === "select") {
      selectionSort(false, numbersArr, setMumbersArr, setOnTop, setOnDown)
    } else {
      bubbleSort(false, numbersArr, setMumbersArr, setOnTop, setOnDown)
    }
  };

  console.log(onTop)
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container}>
        <RadioInput
          label="Выбор"
          extraClass="mr-15"
          value="select"
          checked={checkbox === 'select' ? true : false}
          onChange={checkboxChange}
        />
        <RadioInput
          label="Пузырёк"
          extraClass="mr-25"
          value="bubble"
          checked={checkbox === 'bubble' ? true : false}
          onChange={checkboxChange}
        />
        <Button
          text="По возрастанию"
          isLoader={onTop}
          disabled={onDown}
          sorting={Direction.Ascending}
          onClick={sortOnTop}
        />
        <Button
          text='По убыванию'
          isLoader={onDown}
          disabled={onTop}
          sorting={Direction.Descending}
          onClick={sortOnDown}
        />
        <Button
          text='Новый массив'
          disabled={onTop || onDown}
          linkedList='small'
          extraClass="ml-40"
          onClick={() => setMumbersArr(newArray(3, 17))}
        />
      </form>
      <div className={styles.result}>
        {numbersArr.map((i, key) => {
          return <Column
            key={key}
            index={i.value}
            state={i.color}
          />
        })}
      </div>
    </SolutionLayout>
  );
};
