import "@testing-library/jest-dom/extend-expect";
import { swap } from "./string-alg";

describe('Тест разворота строки', () => {
    test('С чётным количеством символов', () => {
        const arr = ["A", "B", "C", "D"]
        swap(arr, 1, 2)
        expect(arr).toEqual(["A", "C", "B", "D"])
    })

    test('С нечетным количеством символов', () => {
        const arr = ["A", "B", "C"]
        swap(arr, 0, 2)
        expect(arr).toEqual(["C", "B", "A"])
    })

    test('C одним символом', () => {
        const arr = ["A"]
        swap(arr, 0, 0)
        expect(arr).toEqual(["A"])
    })

    test('Пустая строка', () => {
        const arr = ['']
        swap(arr, 0, 0)
        expect(arr).toEqual([''])
    })
})