import { sortArray } from './bubble-sort-alg';
import { ElementStates } from '../../types/element-states';

describe('Тест сортировки пузырьком', () => {
    it('Сортировка по возрастанию с пустым массивом', async () => {
        const sortArr = await sortArray(true, [], jest.fn());
        expect(sortArr).toEqual([]);
    });

    it('Сортировка по возрастанию с одним элементом', async () => {
        const sortArr = await sortArray(
            true,
            [
                { color: ElementStates.Modified, value: 42 }
            ],
            jest.fn()
        );
        expect(sortArr).toEqual([
            { color: ElementStates.Modified, value: 42 }
        ])
    })

    it('Сортировка по убыванию с одним элементом', async () => {
        const sortArr = await sortArray(
            false,
            [
                { color: ElementStates.Modified, value: 42 }
            ],
            jest.fn()
        );
        expect(sortArr).toEqual([
            { color: ElementStates.Modified, value: 42 }
        ])
    })

    it('Сортировка по возрастанию с несколькими элементами', async () => {
        const sortArr = await sortArray(
            true,
            [
                { color: ElementStates.Default, value: 42 },
                { color: ElementStates.Default, value: 61 },
                { color: ElementStates.Default, value: 10 },
            ],
            jest.fn()
        );
        expect(sortArr).toEqual([
            { color: ElementStates.Default, value: 10 },
            { color: ElementStates.Modified, value: 42 },
            { color: ElementStates.Modified, value: 61 },
        ])
    })

    it('Сортировка по убыванию с несколькими элементами', async () => {
        const sortArr = await sortArray(
            false,
            [
                { color: ElementStates.Default, value: 42 },
                { color: ElementStates.Default, value: 61 },
                { color: ElementStates.Default, value: 10 },
            ],
            jest.fn()
        )
        expect(sortArr).toEqual([
            { color: ElementStates.Default, value: 61 },
            { color: ElementStates.Modified, value: 42 },
            { color: ElementStates.Modified, value: 10 },
        ])
    })
})