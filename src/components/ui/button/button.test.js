import { Button } from './button'
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from "@testing-library/react"

describe('Тест компонента Button', () => {
    it('Без текста', () => {
        const tree = renderer.create(<Button />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('С текстом', () => {
        const tree = renderer.create(<Button text='Тест компонента Button' />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('В состоянии disabled', () => {
        const tree = renderer.create(<Button disabled={true} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('С лоадером', () => {
        const tree = renderer.create(<Button isLoader={true} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Вызывает alert', () => {
        const click = jest.fn()

        render(<Button onClick={click} text='Вызывает aler' />)

        const link = screen.getByText('Вызывает aler')

        fireEvent.click(link)

        expect(click).toHaveBeenCalled()
    })
})