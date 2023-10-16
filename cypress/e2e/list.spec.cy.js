import { endPoints, circle, circlesArr, states } from '../../src/constants/test-constants'
import { DELAY_IN_MS } from '../../src/constants/delays'

describe('Страница запускается', function () {
    beforeEach(() => {
        cy.visit(endPoints.list)
        cy.get('[data-test="string-input"]').as('string-input')
        cy.get('[data-test="number-input"]').as('number-input')
        cy.get('[data-test="add-to-head-button"]').as('add-to-head-button')
        cy.get('[data-test="add-to-tail-button"]').as('add-to-tail-button')
        cy.get('[data-test="delete-from-head-button"]').as('delete-from-head-button')
        cy.get('[data-test="delete-from-tail-button"]').as('delete-from-tail-button')
        cy.get('[data-test="add-to-index-button"]').as('add-to-index-button')
        cy.get('[data-test="delete-from-index-button"]').as('delete-from-index-button')

        cy.get(circlesArr).as('circle')

        cy.get('@circle').should('have.length', 4)
    })

    it('Проверяем кнопки при пустых инпутах', function () {
        cy.get('@string-input').should('be.empty')
        cy.get('@number-input').should('be.empty')
        cy.get('@add-to-head-button').should('be.disabled')
        cy.get('@add-to-tail-button').should('be.disabled')
        cy.get('@delete-from-head-button').should('not.be.disabled')
        cy.get('@delete-from-tail-button').should('not.be.disabled')
        cy.get('@add-to-index-button').should('be.disabled')
        cy.get('@delete-from-index-button').should('be.disabled')
    })

    it('Добавление элемента в head и в tail', function () {

        //Добавление в head

        cy.get('@string-input').type('1')
        cy.get('@add-to-tail-button').should('not.be.disabled')
        cy.get('@add-to-head-button').should('not.be.disabled').click()

        cy.get('@circle')
            .should('have.length', 5)
            .find(circle)
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el)
                        .should('have.text', '1', 'have.css', 'border', states.Changing, 'width', '56px')
            })

        cy.wait(DELAY_IN_MS)

        cy.get('@circle')
            .find(circle)
            .should('contain', '1')
            .should('have.css', 'width', '80px')
            .should('have.css', 'border', states.Default)

        cy.get('@circle')
            .should('have.length', 5)
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el)
                        .should('contain', '0')
                        .should('contain', 'head')
            })

        cy.get('@string-input').should('be.empty')
        cy.get('@add-to-tail-button').should('be.disabled')
        cy.get('@add-to-head-button').should('be.disabled')

        //Добавление в tail

        cy.get('@string-input').type('2')
        cy.get('@add-to-head-button').should('not.be.disabled')
        cy.get('@add-to-tail-button').should('not.be.disabled').click()

        cy.get('@circle')
            .should('have.length', 6)
            .find(circle)
            .each((el, i) => {
                if (i === 6)
                    cy.wrap(el)
                        .should('have.text', '2', 'have.css', 'border', states.Changing, 'width', '56px')
            })

        cy.wait(DELAY_IN_MS)

        cy.get('@circle')
            .find(circle)
            .should('contain', '2')
            .should('have.css', 'width', '80px')
            .should('have.css', 'border', states.Default)

        cy.get('@circle')
            .should('have.length', 6)
            .each((el, i) => {
                if (i === 5)
                    cy.wrap(el)
                        .should('contain', '2')
                        .should('contain', 'tail')
            })

        cy.get('@string-input').should('be.empty')
        cy.get('@add-to-tail-button').should('be.disabled')
        cy.get('@add-to-head-button').should('be.disabled')

    })

    it('Удаление из head и из tail', function () {

        cy.get('@circle').should('have.length', 4)

        //Удаление из head

        cy.get('@delete-from-head-button').click()

        cy.wait(DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 3)
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el)
                        .should('contain', 'head')
            })

        //Удаление из tail

        cy.get('@delete-from-tail-button').click()

        cy.wait(DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 2)
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el)
                        .should('contain', 'tail')
            })
    })

    it('Добавление элемента по index', function () {

        cy.get('@number-input').type('1')

        cy.get('@add-to-index-button').should('be.disabled')
        cy.get('@delete-from-index-button').should('not.be.disabled')

        cy.get('@string-input').type('121')

        cy.get('@circle').should('have.length', 4)

        cy.get('@add-to-index-button').should('not.be.disabled').click()

        cy.get('@circle')
            .should('have.length', 5)
            .should('contain', '1')
            .should('have.css', 'width', '80px')
            .find(circle)
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el)
                        .should('have.text', '121', 'have.css', 'border', states.Changing, 'width', '56px')
            })


        cy.wait(DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 5)
            .should('contain', '0')
            .should('have.css', 'width', '80px')
            .find(circle)
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el)
                        .should('have.text', '121', 'have.css', 'border', states.Changing, 'width', '56px')
            })

        cy.get('@string-input').should('be.empty')
        cy.get('@number-input').should('be.empty')
        cy.get('@add-to-index-button').should('be.disabled')
        cy.get('@delete-from-index-button').should('be.disabled')
    })


    it('Удаление элемента по index', function () {
        cy.get('@number-input').type('1')

        cy.get('@add-to-index-button').should('be.disabled')
        cy.get('@delete-from-index-button').should('not.be.disabled')


        cy.get('@circle').should('have.length', 4)

        cy.get('@delete-from-index-button').should('not.be.disabled').click()

        cy.get('@circle')
            .find(circle)
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el)
                        .should('have.css', 'border', states.Changing)
            })

        cy.get('@circle')
            .find(circle)
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el)
                        .should('have.css', 'border', states.Changing)
            })

        cy.get('@circle').should('have.length', 3)

        cy.get('@number-input').should('be.empty')
        cy.get('@add-to-index-button').should('be.disabled')
        cy.get('@delete-from-index-button').should('be.disabled')
    })
})