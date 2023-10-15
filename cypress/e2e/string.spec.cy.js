import { endPoints, circle, circlesArr } from '../../src/constants/test-constants'

describe('Страница запускается', function () {
    beforeEach(function () {
        cy.visit(endPoints.str)
        cy.get('[data-test="input"]').as('input')
        cy.get('[data-test="button"]').as('button')
    })

    it('Если полt не заполнено, кнопка неактивна', function () {
        cy.get('@input').should('have.value', '')
        cy.get('@button').should('be.disabled')
    })

    it("Разворот строки", () => {
        cy.get("input").type("012345").should("have.value", "012345")
        cy.contains("Развернуть").click()

        cy.get(circlesArr).as('circle');

        cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find(circle).should('contain', '0');
                }
                if (index === 5) {
                    cy.wrap(item).find(circle).should('contain', '5');
                }
            });

            cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find(circle).should('have.css', 'border',  '4px solid rgb(127, 224, 81)')
                }
                if (index === 1) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                }
                if (index === 5) {
                    cy.wrap(item).find(circle).should('have.css', 'border',  '4px solid rgb(127, 224, 81)')
                }
            });
            
        cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find(circle).should('contain', '5');
                }
                if (index === 1) {
                    cy.wrap(item).find(circle).should('contain', '1');
                }
                if (index === 1) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('contain', '4');
                }
                if (index === 5) {
                    cy.wrap(item).find(circle).should('contain', '0');
                }
            });

            cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 1) {
                    cy.wrap(item).find(circle).should('have.css', 'border',  '4px solid rgb(127, 224, 81)')
                }
                if (index === 2) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                }
                if (index === 3) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('have.css', 'border',  '4px solid rgb(127, 224, 81)')
                }
            });

            cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find(circle).should('contain', '5');
                }
                if (index === 1) {
                    cy.wrap(item).find(circle).should('contain', '4');
                }
                if (index === 2) {
                    cy.wrap(item).find(circle).should('contain', '2');
                }
                if (index === 3) {
                    cy.wrap(item).find(circle).should('contain', '3');
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('contain', '1');
                }
                if (index === 5) {
                    cy.wrap(item).find(circle).should('contain', '0');
                }
            });

            cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 2) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
                if (index === 3) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
            });

            cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find(circle).should('contain', '5');
                }
                if (index === 1) {
                    cy.wrap(item).find(circle).should('contain', '4');
                }
                if (index === 2) {
                    cy.wrap(item).find(circle).should('contain', '3');
                }
                if (index === 3) {
                    cy.wrap(item).find(circle).should('contain', '2');
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('contain', '1');
                }
                if (index === 5) {
                    cy.wrap(item).find(circle).should('contain', '0');
                }
            });

            cy.get('@circle')
            .should('have.length', '6')
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
                if (index === 1) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
                if (index === 2) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
                if (index === 3) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
                if (index === 4) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
                if (index === 5) {
                    cy.wrap(item).find(circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                }
            });

    })
})
