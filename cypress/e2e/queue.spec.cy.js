import { endPoints, circle, circlesArr, states } from '../../src/constants/test-constants'
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
 
describe('Страница запускается', function () {
    beforeEach(() => {
        cy.visit(endPoints.queue)
        cy.get('[data-test="input"]').as('input')
        cy.get('[data-test="add-button"]').as('add-button')
        cy.get('[data-test="delete-button"]').as('delete-button')
        cy.get('[data-test="clear-button"]').as('clear-button')
    })

    it('Инпут пустой и все кнопки неактивны', function () {
        cy.get('@input').should('be.empty')
        cy.get('@add-button').should('be.disabled')
        cy.get('@delete-button').should('be.disabled')
        cy.get('@clear-button').should('be.disabled')
    })

    it('Добавление и удаление элементов, очистка', function () {

        cy.get(circlesArr).as('circle')

        cy.get('@circle').should('have.length', 7)

        cy.get('@input').type('1')
        cy.get('@add-button').should('not.be.disabled').click()
        cy.get('@input').should('be.empty')

        cy.get('@circle')
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el).find(circle).should('have.css', 'border', states.Changing)
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el).find(circle).should('contain', '1')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
            })

        cy.get('@circle').should('have.length', 7)
        cy.get('@add-button').should('be.disabled')

        cy.get('@input').type('2')
        cy.get('@add-button').should('not.be.disabled').click()
        cy.get('@input').should('be.empty')

        cy.get('@circle')
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el).find(circle).should('have.css', 'border', states.Changing)
            })

        cy.get('@circle')
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el).find(circle).should('contain', '2')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').should('have.length', 7)
        cy.get('@add-button').should("be.disabled")
        cy.get('@clear-button').should('not.be.disabled')
        cy.get('@delete-button').should('not.be.disabled').click()

        cy.get('@circle')
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el).find(circle).should('have.css', 'border', states.Changing)
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el).find(circle).should('contain', '')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
            })

        cy.get('@circle')
            .each((el, i) => {
                if (i === 1)
                    cy.wrap(el).find(circle).should('contain', '2')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
            })

        cy.get('@circle').should('have.length', 7)
        cy.get('@input').should('be.empty')
        cy.get('@add-button').should('be.disabled')
        cy.get('@clear-button').should('not.be.disabled')
        cy.get('@delete-button').should('not.be.disabled')

        cy.get('@input').type('3')
        cy.get('@add-button').should('not.be.disabled').click()
        cy.get('@input').should('be.empty')

        cy.get('@circle')
            .each((el, i) => {
                if (i === 2)
                    cy.wrap(el).find(circle).should('have.css', 'border', states.Changing)
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .each((el, i) => {
                if (i === 2)
                    cy.wrap(el).find(circle).should('contain', '3')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
            })

        cy.get('@circle').should('have.length', 7)
        cy.get('@add-button').should('be.disabled')
        cy.get('@delete-button').should('not.be.disabled')

        cy.get('@clear-button').should('not.be.disabled').click()

        cy.get('@circle').should('have.length', 7)
        cy.get('@input').should('be.empty')
        cy.get('@add-button').should('be.disabled')
        cy.get('@delete-button').should('be.disabled')
        cy.get('@clear-button').should('be.disabled')

        cy.get('@circle')
            .each((el, i) => {
                if (i === 0)
                    cy.wrap(el).find(circle).should('contain', '')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
                if (i === 1)
                    cy.wrap(el).find(circle).should('contain', '')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
                if (i === 2)
                    cy.wrap(el).find(circle).should('contain', '')
                cy.wrap(el).find(circle).should('have.css', 'border', states.Default)
            })
    })
})