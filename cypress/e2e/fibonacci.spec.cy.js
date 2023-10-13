const arr = [0, 1, 1, 2, 3, 5, 8]

describe('Страница запускается', function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000/fibonacci")
        cy.get('[data-test="input"]').as('input')
        cy.get('[data-test="button"]').as('button')
    })

    it('Если полt не заполнено, кнопка неактивна', function () {
        cy.get('@input').should('be.empty')
        cy.get('@button').should('be.disabled')
    })

    it('Выполнение алгоритма', function () {
        cy.get('@input').type('5').should('have.value', '5')
        cy.contains('Рассчитать').should('not.be.disabled').click()

        cy.get('[class^=circle_content_')
            .should('have.length', '6')
            .each((i, key) => {
                cy.get(i).find('[class^=circle_circle__]').should('contain.text', arr[key])
            })
    })
})
