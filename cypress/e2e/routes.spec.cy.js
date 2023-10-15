import { endPoints, baseUrl } from '../../src/constants/test-constants'

describe('приложение работоспособно', function () {
    it('страница есть на сервере', function () {
        cy.visit(baseUrl)
        cy.contains('МБОУ АЛГОСОШ')
    });

    it('должна быть доступна страница разворота строки', function () {
        cy.visit(endPoints.str)
        cy.contains('Строка')

        cy.visit(endPoints.fib)
        cy.contains('Последовательность Фибоначчи')

        cy.visit(endPoints.sort)
        cy.contains('Сортировка массива')

        cy.visit(endPoints.stack)
        cy.contains('Стек')

        cy.visit(endPoints.queue)
        cy.contains('Очередь')

        cy.visit(endPoints.list)
        cy.contains('Связный список')
    })
}); 