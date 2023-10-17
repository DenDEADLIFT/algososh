import { Circle } from './circle'
import renderer from 'react-test-renderer'
import { ElementStates } from '../../../types/element-states'

describe('Тест компонента Circle', () => {

    it('Circle без буквы', () => {
        const tree = renderer.create(<Circle />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle с буквами', () => {
        const tree = renderer.create(<Circle letter='Circle' />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle с head', () => {
        const tree = renderer.create(<Circle head={'head'} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle с tail', () => {
        const tree = renderer.create(<Circle tail={'tail'} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle с react-элементом в head', () => {
        const tree = renderer.create(<Circle head={<Circle />} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle с react-элементом в tail', () => {
        const tree = renderer.create(<Circle tail={<Circle />} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle с index', () => {
        const tree = renderer.create(<Circle index={123} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle c пропом isSmall ===  true', () => {
        const tree = renderer.create(<Circle isSmall={true} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle в состоянии default', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle в состоянии changing', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Circle в состоянии modified', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})