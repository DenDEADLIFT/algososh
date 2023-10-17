import "@testing-library/jest-dom/extend-expect";
import { swap } from "./string-alg";
import { TInput, TValueNumber, ElementStates } from "../../types/element-states";

describe('Тест разворота строки', () => {
    test('С чётным количеством символов', () => {
        const arr: TInput[] | TValueNumber[] = [
            {name: '1', color: ElementStates.Default},
            {name: '2', color: ElementStates.Default},
            {name: '3', color: ElementStates.Default},
            {name: '4', color: ElementStates.Default},
        ]
        swap(arr, 0, 3)
        expect(arr).toEqual([
            {name: '4', color: ElementStates.Default},
            {name: '2', color: ElementStates.Default},
            {name: '3', color: ElementStates.Default},
            {name: '1', color: ElementStates.Default},
        ])
    })

    test('С нечетным количеством символов', () => {
        const arr: TInput[] | TValueNumber[] = [
            {name: '1', color: ElementStates.Default},
            {name: '2', color: ElementStates.Default},
            {name: '3', color: ElementStates.Default},
        ]
        swap(arr, 0, 2)
        expect(arr).toEqual([
            {name: '3', color: ElementStates.Default},
            {name: '2', color: ElementStates.Default},
            {name: '1', color: ElementStates.Default},
        ])
    })

    test('C одним символом', () => {
        const arr: TInput[] | TValueNumber[] = [
            {name: '1', color: ElementStates.Default},
        ]
        swap(arr, 0, 0)
        expect(arr).toEqual([
            {name: '1', color: ElementStates.Default},
        ])
    })

    test('Пустая строка', () => {
        const arr: TInput[] | TValueNumber[] = [{name: '', color: ElementStates.Default}]
        swap(arr, 0, 0)
        expect(arr).toEqual([{name: '', color: ElementStates.Default}])
    })
})