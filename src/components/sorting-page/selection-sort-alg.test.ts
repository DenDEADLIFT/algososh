import { ElementStates } from '../../types/element-states';
import { selectionSort } from './selection-sort-alg'

describe('Тест сортировки выбором', () => {
    it('Сортировка по возрастанию с пустым массивом', async () => {
        const arr = await selectionSort(true, [], jest.fn());
        expect(arr).toEqual([]);
    });

    it('Сортировка по возрастанию с одним элементом', async () => {
        const arr = await selectionSort(
            true,
            [
                { color: ElementStates.Default, value: 42 }
            ],
            jest.fn()
        );
        expect(arr).toEqual([
            { color: ElementStates.Modified, value: 42 }
        ])
    })

    it('Сортировка по убыванию с одним элементом', async () => {
        const arr = await selectionSort(
            false,
            [
                { color: ElementStates.Default, value: 42 }
            ],
            jest.fn()
        );
        expect(arr).toEqual([
            { color: ElementStates.Modified, value: 42 }
        ])
    })

    it('Сортировка по возрастанию с несколькими элементами', async () => {
        const arr = await selectionSort(
            true,
            [
                { color: ElementStates.Default, value: 42 },
                { color: ElementStates.Default, value: 61 },
                { color: ElementStates.Default, value: 10 },
            ],
            jest.fn()
        );
        expect(arr).toEqual([
            { color: ElementStates.Modified, value: 10 },
            { color: ElementStates.Modified, value: 42 },
            { color: ElementStates.Modified, value: 61 },
        ])
    })

    it('Сортировка по убыванию с несколькими элементами', async () => {
        const arr = await selectionSort(
            false,
            [
                { color: ElementStates.Default, value: 42 },
                { color: ElementStates.Default, value: 61 },
                { color: ElementStates.Default, value: 10 },
            ],
            jest.fn()
        )
        expect(arr).toEqual([
            { color: ElementStates.Modified, value: 61 },
            { color: ElementStates.Modified, value: 42 },
            { color: ElementStates.Modified, value: 10 },
        ])
    })
})